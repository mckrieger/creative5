<template>
  <div class="feed">
    <div>
    <form enctype="multipart/form-data" v-on:submit.prevent="post" class="postForm">
       <textarea v-model="text" placeholder=""/>
       <div v-bind:style="{inactive: !imagePreview, active:imagePreview }">
         <img class="preview" v-bind:src="imageData">
       </div>
       <div class="buttons">
         <div class="icon">
           <label for="file-input">
             <i class="far fa-image" aria-hidden="true"></i>
           </label>
           <input id="file-input" type="file" v-on:change="previewImage" accept="image/*" class="input-file">
         </div>
         <div class="buttonWrap">
           <button class="primary" type="submit">Post</button>
         </div>
      	</div>
      </form>

      <div id="selectors">
        <button v-on:click="showPeople()" v-bind:class="{ selected: showing == 'people' }">Show People Near Me</button>
        <button v-on:click="showPosts()" v-bind:class="{ selected: showing == 'posts' }">Show Posts Near Me</button>
      </div>
    </div>
    <p v-if="showing == 'people'"></p>
    <user-list class="feed" v-if="showing == 'people'" v-bind:users="users" />
    <feed-list class="feed" v-else v-bind:feed="feed" />
  </div>
</template>

<script>
 import FeedList from './FeedList';
 import UserList from './UserList';
 export default {
   name: 'UserFeed',
   data () {
     return {
       text: '',
       imageData: '',
       imagePreview: false,
       file: '',
     }
   },
   components: { FeedList, UserList },
   computed: {
     feed: function() {
       return this.$store.getters.feed;
     },
     users: function() {
        return this.$store.getters.users;
     },
     showing: function() {
        return this.$store.getters.showing;
     },
   },
   created: function() {
     this.$store.dispatch('getFeed');
     this.$store.dispatch('getUsers');
   },
   methods: {
     post: function() {
       this.$store.dispatch('addPost',{
         post: this.text,
         image: this.file,
       }).then(post => {
	       this.text = "";
         this.imageData = '';
         this.imagePreview = false;
         this.file = '';
       });
     },
     showPeople: function() {
        this.$store.dispatch('updateShowing', 'people');
     },
     showPosts: function() {
        this.$store.dispatch('updateShowing', 'posts');
     },
     previewImage: function(event) {
       const input = event.target;
       // Ensure that you have a file before attempting to read it
       if (input.files && input.files[0]) {
        this.file = input.files[0];
         // create a new FileReader to read this image and convert to base64 format
         const reader = new FileReader();
         // Define a callback function to run, when FileReader finishes its job
         reader.onload = (e) => {
           // Read image as base64 and set to imageData
          this.imageData = e.target.result;
          this.imagePreview = true;
         }
         // Start the reader job - read file as a data url (base64 format)
         reader.readAsDataURL(input.files[0]);
       }
     },
   }
 }
</script>

<style scoped>

 .postForm {
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
 }
 .buttons {
      display: flex;
     justify-content: space-between;
 }
 .icon {
     font-size: 2em;
     padding: 0px;
 }
 .icon:active {
     transform: translateY(4px);
 }
 .buttonWrap {
     width: 20%;
 }
 .feed {
 display:block;
 width: 600px;
 margin:auto;
 }
 #postButton {
     height: 2em;
     font-size: 0.9em;
     float: right;
 }
 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }

 .selected{
  background-color:gray;
 }
</style>
