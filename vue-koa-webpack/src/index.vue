<template>
  <div>
      <h1>Vuew create App</h1>
      <router-view/>
  </div>
</template>

<script>
  export default {
    created(){
      console.log('created App');
    }
  }
</script>
