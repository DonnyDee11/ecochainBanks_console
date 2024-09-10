<template>
  <div class="auth-branding">
    <!-- Company Logo -->
    <div class="logo-section">
      <v-img 
      src="@/assets/logo.jpeg" alt="Company Logo" class="company-logo">
      </v-img>
    </div>

    <!-- Description -->
    <div class="description-section">
      <p class="company-description"><i>Revolutionising compliance through innovation</i></p>
    </div>

    <!-- Picture -->
    <div class="picture-section">
    <v-img 
      src="@/assets/brandingphoto.png" alt="Company photo" class = "company-picture" >
    </v-img>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AuthBranding'
}
</script>

<style scoped>
.auth-branding {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;  
}

.company-logo {
  width: 250px; 
  height: 80px;
  margin-top: -100px;
  margin-left: 100px;

}

.description-section {
  text-align: center;
  max-width: 350px; 
  margin-left: 100px;
  height : 250px;
  color: #64748B
}

.company-picture {
  width: 440px; 
  height: 450px;
  margin-left: 100px;
  margin-top: -200px;

}
</style>