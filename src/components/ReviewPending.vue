<template>
    <v-container class="auth-container">
      <v-row>
        <v-col>
          <v-img src="@/assets/review_photo.png" alt="Submission Under Review" class="review_photo"></v-img>
        </v-col>
  
        <v-col>
          <h2 style="margin-bottom: 20px;">Submission Under Review</h2>
  
          <p style="margin-bottom: 20px;">
            Your submission has been flagged for review due to potential outliers. 
            An auditor will review your data, and you will be notified when the review is complete.
          </p>

          <v-row self-align="right" justify="center">
            <v-col cols="6">

          <v-btn block color="#219653" class="text-none" @click="$router.push('/dashboard')">
          Go to Dashboard
        </v-btn>
      </v-col>
          </v-row>

        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import config from './config';
  
  export default {
    name: 'ReviewPending',
  };

  
  </script>
  
  <style scoped>
  .auth-container {
    display: grid;
    gap: 10px;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
  
  .success-photo {
    width: 500px;
    height: 500px;
    position: center;
  }

  .review_photo {
    width: 500px;
    height: 500px;
    position: center;
  }
  </style>