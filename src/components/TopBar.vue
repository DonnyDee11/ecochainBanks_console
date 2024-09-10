<template>
  <div class="top-bar">
  
    <v-toolbar
    color="white"
    dense
    floating
  >
    <v-text-field
      hide-details
      prepend-icon="mdi-magnify"
      single-line
      label="Type to search"
      
    ></v-text-field>

    <v-btn icon>
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-chat-processing-outline</v-icon>
    </v-btn>
  </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'TopBar'
};
</script>

<style scoped>
.top-bar {
  height: 80px;
  width: 100%;  /* Stretch to the width of the container */
  background-color: #ffffff;  /* White background, but you can change this */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  /* Slight bottom shadow */
}
</style>
