<template>
<div class="column">
<form v-on:submit.prevent="register">
  <p> Create an account</p>
  <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
  <input class="wide" v-model="username" placeholder="Username"><br/>
  <input class="wide" v-model="email" placeholder="Email Address"><br/>
  <input class="wide" type="password" v-model="password" placeholder="Password"><br/>


  <p class="detail">Here at Roomie, you can look for roommates, give reviews, or just browse what's out there.<br/>If you are looking for a roommate, we suggest you check the box below so people know more about you.</p>
  <label for="extra">Fill out extra info? </label><input id="extra" type="checkbox" v-model="extra"></input>
  <div id="extraInfo" v-if="extra">
  <hr/>
    <div id="gender">
      <label>What is your gender?</label><br/>
      <button id="male" v-on:click="gender = 'male'" v-bind:class="{ selected: gender == 'male' }" >Male</button> <button id="female" v-on:click="gender = 'female'" v-bind:class="{ selected: gender == 'female'}">Female</button>
    </div>
  <label for="age">How old are you?</label>
  <p>{{age}}</p><input id="clean" type="range" min="17" max="80" value="23" step="1" class="wide" v-model="age" ></input><br/>
    <div id="snore">
      <label for="snore">Do you snore? </label><input id="snore" type="checkbox" v-model="snore"></input><br/>
    </div>
    <label for="clean">How clean do you like the apartment to be? (10 is spotless)</label>
    <p>{{clean}}</p><input id="clean" type="range" min="1" max="10" value="5" step="1" class="wide" v-model="clean" ></input><br/>
    <label for="hobbies">What are you interested in? (Hobbies, etc.) </label><br/><input id="hobbies" class="wide" v-model="hobbies" placeholder='"Football", "Board Games", etc."'></input><br/>
    <label for="quiet">How talkative/reserved are you?</label><br/><input id="quiet" class="wide" v-model="quiet" placeholder='"I keep to myself", "I talk a lot"'></input><br/>
    <label for="time">How much time do you usually spend in the apartment?</label><br/><input id="time" class="wide" v-model="time" placeholder='"I only sleep there", "My bf and I are always there"'></input><br/>
    <label for="expectations">What do you want your interactions with your roommate to look like?<br/> (What are your expectations?) </label><br/><input id="expectation" class="wide" v-model="expectation" placeholder='"I want to be best friends", "I just need to tolerate them"'></input><br/>
    <label for="ideal">What is your ideal roommate like? </label><br/><input id="ideal" class="wide" v-model="ideal" placeholder='"Enthusiastic, but respectful of my sleep"'></input><br/>
    <label for="other">What else should we know about you? </label><br/><input id="other" class="wide" v-model="other" placeholder='"I work nightshifts", "I have a dog", etc. '></input><br/>


  </div> <br/>
  <button class="alternate" type="submit">Register</button>
</form>
  <p class="error">{{registerError}}</p>
</div>
</template>

<script>
 export default {
   name: 'RegisterPage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
       gender: '',
       age: '25',
       snoring: false,
       time: '',
       extra: false,
       clean: '5',
       hobbies: '',
       quiet: '',
       expectation: '',
       other: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
	      username: this.username,
         email: this.email,
          password: this.password,
	         name: this.name,
           gender: this.gender,
           age: this.age,
           snoring: this.snoring,
           time: this.time,
           extra: this.extra,
           clean: this.clean,
           hobbies: this.hobbies,
           quiet: this.quiet,
           expectation: this.expectation,
           other: this.other,
       });
     },
     updateSlider: function(val) {
          document.getElementById('textInput').value=val;
        },
   }
 }
</script>

<!-- Yellows:FFC200  E5AF00  CB9B00  B28800  Browns: 7F6100  403000    -->
<!-- Blues:006F94  005B7A   3289A6  43B9E0  004961  -->
<!-- Combo: bases, others: 423A38  FFE17E  658DA8  -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito|Open+Sans|Quicksand|Roboto|Source+Sans+Pro|Tajawal');
 img {
     width: 300px;
     margin: auto;
     display:block;
 }

 .selected {
    background-color: gray;
 }

 input {
  margin-bottom: 30px;
  margin-top: 5px;
 }

 .wide {
  width: 300px;
 }

#gender, #snore {
padding-bottom:30px;
}

 .segment{
 padding: 30px;
 background-color: #658DA8;
 width:550px;
 margin: auto;
 margin-bottom:10px;
 }

.detail {
font-family: 'Roboto', sans-serif;
font-size: .7em
}


 h1 {
    padding-top:20px;
     margin-bottom: 0px;
     display: block;
     margin: auto;

 }
 h2 {
     margin-top: 0px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
     font-family: 'Roboto', sans-serif;

 }
.column {
  width: 100%;
  text-align: center;

}
</style>
