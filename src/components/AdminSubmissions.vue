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
            <td>{{ getStatusText(submission.Status) }}</td> 
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
      },
      getStatusText(status) {
			switch (status) {
				case 0: return 'In Progress';
				case 1: return 'Pending';
				case 2: return 'Complete';
				case 3: return 'Rejected';
				case 4: return 'Rejected at BaaS';
				default: return 'Unknown';
			}
		}
    }
  };
  </script>

<style scoped>
/* Page Heading */
.page-heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333; /* Dark gray */
}

/* Table Styles */
.styled-table {
  border-collapse: collapse; 
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.table-header {
  background-color: #f5f5f5; /* Light gray background */
  font-weight: bold;
  text-align: left;
  padding: 12px;
  border: 1px solid #ddd; /* Light gray border */
}

.table-row {
  border: 1px solid #ddd;
}

.table-row:nth-child(even) {
  background-color: #f9f9f9; /* Alternate row color */
}

.table-row td {
  padding: 10px;
}

/* Loading Container */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

/* No Submissions Message */
.no-submissions {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #666; /* Lighter gray */
}
</style>