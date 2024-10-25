<template>
    <div>
      <h1>Admin - All Submissions</h1>
  
      <v-table>
        <thead>
          <tr>
            <th>Submission ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
            </v-table>
    </div>
  </template>
  
  <script>
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
          const response = await fetch('/admin/submissions', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch submissions');
          }
  
          const data = await response.json();
          this.submissions = data;
        } catch (error) {
          console.error('Error fetching submissions:', error);
          // Handle error, e.g., display an error message to the user
        }
      }
    }
  };
  </script>