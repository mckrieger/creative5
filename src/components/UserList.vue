<template>
  <div id="userFeed">
    <div v-for="user in users" class="row">
      <div class='pics'><img v-bind:src="user.image"/></div>

        <span class="user">{{user.name}}</span>
        <router-link :to="{ name: 'UserPage', params: {userID: user.userID}}">
          <span class="handle">@{{user.username}}</span>
        </router-link><br/>
        <hr/>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'UserList',
   props: ['users'],
 }

</script>

<style scoped>
 .item {
     border-bottom: 1px solid #ddd;
     padding: 10px;
 }
 .user {
     font-weight: bold;
     margin-right: 10px;
 }
 img {
    width:80px;
    display: block;
 }

 .pics {
    width: 80px;
    display:inline;
 }

 #userFeed {
    display:block;
    width: 600px;
    margin: auto;
 }

 .row {
  display: inline;
  width: 100%;
  padding-top: 15px;
 }
 .handle {
     margin-right: 10px;
     color: #666;
 }
</style>
