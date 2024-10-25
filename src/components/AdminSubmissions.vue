<template>
    <div>
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
  
      <div v-else> 
        <p>No submissions found.</p> 
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import config from './config'; 
  
  export default {
    data() {
      return {
        submissions: []
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
          // Handle error, e.g., display an error message to the user
        }
      }
    }
  };
  </script>