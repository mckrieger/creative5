<template>
  <div class="column">
    <img src="/static/images/Roomie Logo6.png"/>
    <h1>Rate a roommate. Find a roommate.</h1>
    <h2>So you're not moving in blind.</h2>
    <div id="pitch" class="segment">
      <p>Our goal here at Roomie is to connect like-minded people and spare everyone the
      awkwardness and concern that comes with moving to a new place.</p>
    </div>

    <div id="quote" class="segment">
      <p>"It's like RateMyProfessor and Tinder combined, but for roommates"<br/> -- Satisfied User</p>
    </div>
    <div id="quote2" class="segment">
      <p>"Dude, this thing has saved my life so many times. My cousin doesn't use this
        and he gets the nastiest roommates." <br/>--Elated User</p>
    </div>
    <div id="buttons">
      <router-link :to="{name: 'RegisterPage'}"><button class="secondary" id="registerButton">Sign Up</button></router-link>
      <router-link :to="{name: 'HomePage'}"><button class="secondary" id="signInButton">Log In</button></router-link>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
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
       });
     }
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
 #pitch{

 }

 .segment{
 padding: 30px;
 background-color: #658DA8;
 width:550px;
 margin: auto;
 margin-bottom:10px;
 }


 #quote {
  background-color: #FFF01A;
  font-family: 'Roboto', sans-serif;

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
