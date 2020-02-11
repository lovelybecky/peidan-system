<template>
  <div id="app">
	<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created(){
    //this.$router.push('/')
  }
}
</script>

<style>
body{
		margin: 0;
	}
</style>
