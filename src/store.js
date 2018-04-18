import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import axios from 'axios';

Vue.use(Vuex);

const getAuthHeader = () => {
  return { headers: {'Authorization': localStorage.getItem('token')}};
}

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    loginError: '',
    registerError: '',
    feed: [],
    users: [],
    userView: [],
    feedView: [],
    showing: 'people',
  },
  getters: {
    user: state => state.user,
    showing: state => state.showing,
    getToken: state => state.token,
    loggedIn: state => {
      if (state.token === '')
	return false;
      return true;
    },
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    feed: state => state.feed,
    users: state => state.users,
    feedView: state => state.feedView,
    userView: state => state.userView,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setShowing (state, showing) {
      state.showing = showing;
    },
    setToken (state, token) {
      state.token = token;
      if (token === '')
	localStorage.removeItem('token');
      else
	localStorage.setItem('token', token)
      console.log(localStorage.getItem('token'));
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setFeed (state, feed) {
      state.feed = feed;
    },
    setUsers (state, users) {
      state.users = users;
    },
    setUserView (state, user) {
      state.userView = user;
    },
    setFeedView (state, feed) {
      state.feedView = feed;
    },
  },
  actions: {
    // Initialize //
    initialize(context) {
      let token = localStorage.getItem('token');
      if (token) {
	// see if we can use the token to get my user account
	axios.get("/api/me",getAuthHeader()).then(response => {
	  context.commit('setToken',token);
	  context.commit('setUser',response.data.user);
	}).catch(err => {
	  // remove token and user from state
	  context.commit('setUser',{});
	  context.commit('setToken','');
	});
      }
    },
    // Registration, Login //
    register(context,user) {
      let headers = {headers: {'Content-Type': 'multipart/form-data'}}
      let formData = new FormData();
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('name', user.name);
      formData.append('username', user.username);
      formData.append('gender', user.gender);
      formData.append('age', user.age);
      formData.append('snoring', user.snoring);
      formData.append('time', user.time);
      formData.append('extra', user.extra);
      formData.append('clean', user.clean);
      formData.append('hobbies', user.hobbies);
      formData.append('quiet', user.quiet);
      formData.append('expectation', user.expectation);
      formData.append('other', user.other);
      if (user.image) {
        formData.append('image', user.image);
      }
      return axios.post("/api/users", formData, headers).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setToken',response.data.token);
	context.commit('setRegisterError',"");
	context.commit('setLoginError',"");
  router.push('/');
      }).catch(error => {
	context.commit('setUser',{});
	context.commit('setToken','');
	context.commit('setLoginError',"");
	if (error.response) {
	  if (error.response.status === 403)
	    context.commit('setRegisterError',"That email address already has an account.");
	  else if (error.response.status === 409)
	    context.commit('setRegisterError',"That user name is already taken.");
	  return;
	}
	context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },

    login(context,user) {
      return axios.post("/api/login",user).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setToken',response.data.token);
	context.commit('setRegisterError',"");
	context.commit('setLoginError',"");
      }).catch(error => {
	context.commit('setUser',{});
	context.commit('setToken','');
	context.commit('setRegisterError',"");
	if (error.response) {
	  if (error.response.status === 403 || error.response.status === 400)
	    context.commit('setLoginError',"Invalid login.");
	  context.commit('setRegisterError',"");
	  return;
	}
	console.log(error);
	context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setToken','');
    },
    // Users //
    // get a user, must supply {username: username} of user you want to get
    getUser(context,user) {
      return axios.get("/api/users/" + user.id).then(response => {
	context.commit('setUserView',response.data.user);
      }).catch(err => {
	console.log("getUser failed:",err);
      });
    },
    // get posts of a user, must supply {id:id} of user you want to get posts for
    getUserposts(context,user) {
      return axios.get("/api/users/" + user.id + "/posts").then(response => {
	context.commit('setFeedView',response.data.posts);
      }).catch(err => {
	console.log("getUserposts failed:",err);
      });
    },
    // posting //
    addPost(context,post) {
      // setup headers
            let headers = getAuthHeader();
            headers.headers['Content-Type'] = 'multipart/form-data'
            // setup form data
            let formData = new FormData();
            formData.append('post',post.post);
            if (post.image) {
             formData.append('image',post.image);
            }
            axios.post("/api/users/" + context.state.user.id + "/posts",formData,headers).then(response => {	return context.dispatch('getFeed');
      }).catch(err => {
	console.log("addpost failed:",err);
      });
    },
    // Searching //
    doSearch(context,keywords) {
      return axios.get("/api/posts/search?keywords=" + keywords).then(response => {
	context.commit('setFeed',response.data.posts);
      }).catch(err => {
	console.log("doSearch failed:",err);
      });
    },
    doHashTagSearch(context,hashtag) {
      return axios.get("/api/posts/hash/" + hashtag).then(response => {
	context.commit('setFeed',response.data.posts);
      }).catch(err => {
	console.log("doHashTagSearch failed:",err);
      });
    },

    updateShowing(context, showing){
      context.commit('setShowing', showing);
    },

    // get posts of people near you
    getFeed(context) {
      return axios.get("/api/users/" + context.state.user.id + "/feed").then(response => {
	context.commit('setFeed',response.data.posts);
      }).catch(err => {
	console.log("getFeed failed:",err);
      });
    },

    //get users near your
    getUsers(context) {
      return axios.get("/api/users").then(response => {
        context.commit('setUsers', response.data.users);
      }).catch(err => {
        console.log("getUsers failed:", err);
      });
    },


  }
});
