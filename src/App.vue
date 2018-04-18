<template>
<div id="app">

    <div id="content">
      <app-header/>
      <router-view/>
    </div>
  <app-footer/>
</div>
</template>

<script>
 import AppHeader from './components/AppHeader';
 import AppFooter from './components/AppFooter';

 export default {
   name: 'App',
   components: { AppHeader, AppFooter }
 }
</script>

<style>
 /* https://color.adobe.com/CS04-color-theme-1994456/?showPublished=true */
 body {
     font-size: 18px;
     position: relative;
      margin: 0;
      margin-bottom: 0rem;
      min-height: 100%;
     background-color:#FFF;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
 }

 html {
   height: 100%;
   box-sizing: border-box;
   margin:0;
 }

 .feed {
     width: 600px;
 }
 .feed img {
     width: 100%;
 }

 button {
     color: #fff;
     min-width: 100px;
     line-height: 1em;
     border: none;
     border-radius: 5px;
     color: white;
     padding: 5px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 1rem;
     margin: 4px 2px;
 }
 button.primary {
     background-color: #FFC200;
     color: #000;
 }
 button.secondary {
     background-color: #FFF01A;
     color: #000;
 }
 button.alternate {
     background-color: #77C4D3;
 }
 button:focus {
     outline: none;
 }
 button:hover {
     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
 }
 button:active {
     transform: translateY(4px);
 }
 input {
     height: 20px;
     padding: 10px;
 }
 a {
     color: #77C4D3;
 }
 .flexWrapper {
     display:flex;
 }
 .flexRight {
     margin-left: auto;
 }
 .error {
     color: #F35537;
 }
 .column {
     width: 800px;
 }

 #content {
 padding-bottom:60px;
 }
</style>
