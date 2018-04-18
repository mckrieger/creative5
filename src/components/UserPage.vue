<template>
  <div class="column">
    <h2>
      {{userView.name}}
    </h2>
    <div id="buttons" v-if="userView.username !=user.username">
      <button v-on:click="popup()" class="primary" >Chat with {{userView.name}}</button>
      <button v-on:click="popup()" class="primary" >Give {{userView.name}} a review</button>
    </div>
    <img v-bind:src="'/' + userView.image"/>


    <div  v-if="userView.extra == 0"  id='extra'>
      <div class="detail"><p class="title">Gender: </p><p>{{userView.gender}}</p></div>
      <div class="detail"><p class="title">Age: </p><p>{{userView.age}}</p></div>
      <div class="detail"><p class="title">Snores: </p><p>{{userView.snoring}}</p></div>
      <div class="detail"><p class="title">Cleanliness: </p><p>{{userView.clean}}</p></div>
      <div class="detail"><p class="title">Hobbies/Interests: </p><p>{{userView.hobbies}}</p></div>
      <div class="detail"><p class="title">Talkativity: </p><p>{{userView.quiet}}</p></div>
      <div class="detail"><p class="title">Expectations: </p><p>{{userView.expectation}}</p></div>
      <div class="detail"><p class="title">Other Info: </p><p>{{userView.other}}</p></div>
    </div>

    <button v-if="userView.username == user.username" class="primary" v-on:click="popup()">Edit Profile</button>
  </div>
</template>

<script>
 import FeedList from './FeedList';
 import UserList from './UserList';
 export default {
   name: 'UserPage',
   components: { FeedList, UserList },
   data() {
     return {
       showposts: true,
     }
   },
   created: function() {
     this.$store.dispatch('getUser',{id:this.$route.params.userID});

     console.log(this.userView);
   },
   computed: {
     user: function() {
       return this.$store.getters.user;
     },
     userView: function() {
       return this.$store.getters.userView;
     },
     followingView: function() {
       return this.$store.getters.followingView;
     },
     followersView: function() {
       return this.$store.getters.followersView;
     },
     isFollowing: function() {
       return this.$store.getters.isFollowing(this.userView.id);
     },
     feed: function() {
       return this.$store.getters.feedView;
     },
   },
   watch: {
     '$route.params.userID'() {
       this.$store.dispatch('getUser',{id:this.$route.params.userID});
       this.$store.dispatch('getUserposts',{id:this.$route.params.userID});
       this.$store.dispatch('getFollowingView',{id:this.$route.params.userID});
       this.$store.dispatch('getFollowersView',{id:this.$route.params.userID});
       this.showposts = true;
     }
   },
   methods: {
     follow: function() {
       this.$store.dispatch('follow',{id:this.userView.id});
     },
     unfollow: function() {
       this.$store.dispatch('unfollow',{id:this.userView.id});
     },
     toggle: function() {
       this.showposts = !this.showposts;
     },
     popup: function() {
      window.alert("This part isn't functional yet. Sorry!");
     },

   }
 }
</script>


<!-- Yellows:FFC200  E5AF00  CB9B00  B28800  Browns: 7F6100  403000    -->
<!-- Blues:006F94  005B7A   3289A6  43B9E0  004961  -->
<!-- Combo: bases, others: 423A38  FFE17E  658DA8  -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito|Open+Sans|Quicksand|Montserrat|Roboto|Source+Sans+Pro|Tajawal');
 img {
     width: 300px;
     margin: auto;
     display:block;
 }

 .selected {
    background-color: gray;
 }

 p {
    display: inline;
 }

#extra {
    padding: 20px 0px 20px 0px;
}

.detail {
font-family: 'Roboto', sans-serif;
font-size: 15px;
}

.title {
    font-size: 20px;
    font-weight: bold;
}


 h2 {
     margin-top: 20px;
     font-size: 45px;
     font-weight: normal;
     margin-bottom: 5px;
     font-weight:900;
     font-family: 'Roboto', serif;
     margin:auto;
     display:block;
     width: 300px;
 }
.column {
  width: 300px;
  display: block;
  margin: auto;
}

.primary {
  margin-left:0;
}
</style>
