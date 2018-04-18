// Express Setup //
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup //
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt setup
const jwt = require('jsonwebtoken');
let jwtSecret = process.env.jwtSecret;
if (jwtSecret === undefined) {
  console.log("You need to define a jwtSecret environment variable to continue.");
  knex.destroy();
  process.exit();
}


// multer setup
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${req.userID}-${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({storage: storage});

// Verify the token that a client gives us.
// This is setup as middleware, so it can be passed as an additional argument to Express after
// the URL in any route. This will restrict access to only those clients who possess a valid token.
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(403).send({ error: 'No token provided.' });
  jwt.verify(token, jwtSecret, function(err, decoded) {
    if (err)
      return res.status(500).send({ error: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userID = decoded.id;
    next();
  });
}

// Login //

app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result) {
      let token = jwt.sign({ id: user.id }, jwtSecret, {
	expiresIn: '24h' // expires in 24 hours
      });
      res.status(200).json({user:{username:user.username,name:user.name,id:user.id},token:token});
    } else {
      res.status(403).send("Invalid credentials");
    }
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// Registration //

app.post('/api/users', upload.single('image'), (req, res) => {

  let path = ''
  if(req.file){
    console.log('Image path added')
    path= req.file.path;
  }
  console.log(req.body.username);
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {


    return knex('users').insert({email: req.body.email,
         hash: hash,
         username:req.body.username,
				 name:req.body.name,
         role: 'user',
         gender: req.body.gender,
         age: req.body.age,
         image: path,
         snoring: req.body.snoring,
         time: req.body.time,
         extra: req.body.extra,
         clean: req.body.clean,
         hobbies: req.body.hobbies,
         quiet: req.body.quiet,
         expectation: req.body.expectation,
         other: req.body.other
       });
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('username','name','id');
  }).then(user => {
    let token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: '24h' // expires in 24 hours
    });
    res.status(200).json({user:user,token:token});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// Users //

// Get my account
app.get('/api/me', verifyToken, (req,res) => {
  knex('users').where('id',req.userID).first().select('username','name','id').then(user => {
    res.status(200).json({user:user});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.get('/api/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  // get user record
  knex('users').where('id',id).first().select('username','name','id','gender', 'age', 'snoring', 'time','extra', 'clean', 'hobbies', 'quiet','expectation','other','image').then(user => {
    res.status(200).json({user:user});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

/*
app.delete('/api/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().del().then(user => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});
*/

// User posts //

app.get('/api/users/:id/posts', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('posts','users.id','posts.user_id')
    .where('users.id',id)
    .orderBy('created','desc')
    .select('rating','username','name','created').then(posts => {
      res.status(200).json({posts:posts});
    }).catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

app.post('/api/users/:id/posts', verifyToken, upload.single('image'), (req, res) => {
  let id = parseInt(req.params.id);
  if (id !== req.userID) {
    res.status(403).send();
    return;
  }
  let path = ''
  if (req.file)
    path = req.file.path;
  knex('users').where('id',id).first().then(user => {
    return knex('posts').insert({user_id: id, description:req.body.post, created: new Date(), image:path});
  }).then(ids => {
    return knex('posts').where('id',ids[0]).first();
  }).then(posts => {
    res.status(200).json({posts:posts});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

/*
app.delete('/api/users/:id/posts/:postId', (req, res) => {
  let id = parseInt(req.params.id);
  let postId = parseInt(req.params.postId);
  knex('users').where('id',id).first().then(user => {
    return knex('posts').where({'user_id':id,id:postId}).first().del();
  }).then(posts => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});
*/

// All posts //

app.get('/api/posts/search', (req, res) => {
  if (!req.query.keywords)
    return res.status(400).send();
  let offset = 0;
  if (req.query.offset)
    offset = parseInt(req.query.offset);
  let limit = 50;
  if (req.query.limit)
    limit = parseInt(req.query.limit);
  knex('users').join('posts','users.id','posts.user_id')
    .whereRaw("MATCH (text) AGAINST('" + req.query.keywords + "')")
    .orderBy('created','desc')
    .limit(limit)
    .offset(offset)
    .select('text','username','name','created','image','users.id as userID').then(posts => {
      res.status(200).json({posts:posts});
    }).catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});


// // get the posts of those you are following
// // use limit to limit the results to a certain number
// // use offset to provide an offset into the results (e.g., starting at results number 10)
app.get('/api/users/:id/feed', (req,res) => {
  // id of the person we are interested in
  let id = parseInt(req.params.id);
  // offset into the results
  let offset = 0;
  if (req.query.offset)
    offset = parseInt(req.query.offset);
  // number of results we should return
  let limit = 50;
  if (req.query.limit)
    limit = parseInt(req.query.limit);

  knex('posts').join('users','posts.user_id', 'users.id')
  .orderBy('created','desc')
  .limit(limit)
  .offset(offset).select('description','posts.id as postID','posts.image as image','created','user_id', 'users.name as name', 'users.username as username')
  .then(posts=> {
    res.status(200).json({posts:posts});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

//get users near you
app.get('/api/users', (req,res) => {
  let offset = 0;
  if (req.query.offset)
    offset = parseInt(req.query.offset);
  let limit = 50;
  if (req.query.limit)
    limit = parseInt(req.query.limit);
  knex('users').limit(limit).offset(offset).orderBy('id','desc')
    .select('name','username','image', 'id as userID')
    .then(users => {
  res.status(200).json({users:users});
    }).catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
