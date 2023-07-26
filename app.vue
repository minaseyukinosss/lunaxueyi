<template>
  <div class="app-layout flex flex-col justify-between">
     <div class="page-container">
       <!-- <Header /> -->
       <NuxtPage />
     </div>
     <!-- <Footer /> -->
   </div>
 </template>
 
 <script setup>
 </script>
 
 <style lang="scss" scoped>
 .app-layout {
   .page-container {
     min-height: 100vh;
   }
   @media screen and (max-aspect-ratio: 4/4) {
     .page-container {
       min-height: 50vh;
     }
   }
 }
 </style>