<template>
  <div id="footer" >
    <p class="footer">Feel free to take a look at my <a  class="footer" href='https://github.com/mckrieger/creative5'>Github Repository</a></p>
  </div>
</template>

<script>
 export default {
   name: 'AppFooter'
 }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito|Open+Sans|Quicksand|Roboto|Source+Sans+Pro|Tajawal');

 #footer {
  list-style-type: none;
  height: 60px;
  width: 100vw;
  bottom:0;
  margin-top:0px;
  position:absolute;
  overflow:hidden;
  background-color: #061625;
  text-align: center;
  color: gray;
  text-decoration: none;
  font-family: serif;
}

a.footer:visited{
  color: gray;
}

p.footer {
  padding-bottom:15px;
}

</style>
