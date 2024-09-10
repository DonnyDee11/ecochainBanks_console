
<template>
  <div class= "content-wrapper ">
     <SideNavBar v-if="showSideNavBar"/>
  


  <div class = "page-content "> 
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import SideNavBar from './components/SideNavBar.vue';

export default {
  name: 'App',
  components: { SideNavBar },
    
computed: {
    showSideNavBar() {
 
      // Exclude sidebar for these routes
      const excludedRoutes = ['LandingPage', 'SignUp', 'OrganisationForm'];
      return !excludedRoutes.includes(this.$route.name);
    }
  }

    

    
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  background-color: #F1F5F9;

  height: 100vh;
  
}

.content-wrapper {
  display: flex;
  height: 100vh;
  background-color: #F1F5F9;
  overflow: hidden;
}
.page-content {
  flex: 1;
  overflow-y: auto; /* Add scroll if content overflows */
}



</style>