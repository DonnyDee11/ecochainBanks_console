<template>
    <div>
        <v-container>
      <h1>Admin - All Submissions</h1>
  
      <v-table v-if="submissions.length > 0">  
        <thead>
          <tr>
            <th>Submission ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="submission in submissions" :key="submission.SubmissionID">
            <td>{{ submission.SubmissionID }}</td>
            <td>{{ submission.UserID }}</td>
            <td>{{ submission.Status }}</td> 
            <td>{{ submission.Date }}</td>
            </tr>
        </tbody>
      </v-table>

      <div v-else-if="isLoading"> 
      <v-progress-circular indeterminate color="primary"></v-progress-circular> 
    </div>
  
      <div v-else> 
        <p>No submissions found.</p> 
      </div>
    </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import config from './config'; 
  
  export default {
    data() {
      return {
        submissions: [],
        isLoading: true,  // Add a loading state
        error: null  // To store any error messages
      };
    },
    mounted() {
      this.fetchSubmissions();
    },
    methods: {
      async fetchSubmissions() {
        try {
          const token = localStorage.getItem('access_token');
          const response = await axios.get(config.backendApiUrl + '/admin/submissions', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
  
          this.submissions = response.data; 
        } catch (error) {
          console.error('Error fetching submissions:', error);
          this.error = "Failed to fetch submissions. Please try again later."; // Set error message
        // You could add more specific error handling based on error.response.status
      } finally {
        this.isLoading = false;  // Set loading state to false after the request is complete
      }
      }
    }
  };
  </script>