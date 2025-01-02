<template>
    <div>
      <h1>Auditor - Pending Submissions</h1>
      <v-container>

      <v-table>
        <thead>
          <tr>
            <td colspan="4">
              <h1>{{ name }}</h1>
            </td>

          </tr>
        </thead>

        <tbody>
          <tr>
            <td><b>Location</b></td>
            <td>{{ location }}</td>
            <td><b>Industry</b></td>
            <td>{{ industry }}</td>
          </tr>
          <tr>
            <td><b>Size</b></td>
            <td>{{ size }}</td>

            <td><b>Description</b></td>
            <td>{{ description }}</td>
          </tr>
        </tbody>
      </v-table>

      </v-container>
      <v-container>
      <v-table v-if="submissions.length > 0">
        <thead>
          <tr>
            <th>Submission ID</th>
            <th>User Name</th>
            <th>Date</th>
            <th>Outliers</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="submission in submissions" :key="submission.SubmissionID">
            <td>{{ submission.SubmissionID }}</td>
            <td>{{ submission.UserName }}</td>
            <td>{{ submission.Date }}</td>
            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs">
                    <v-table> 
                      <thead>
                        <tr>
                          <th>Metric</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="outlier in submission.Outliers.split(', ')" :key="outlier">
                          <td>{{ outlier.split(': ')[0].replace('EnvironmentalMetrics: ', '') }}</td> 
                          <td>{{ outlier.split(': ')[1].split(' (')[0] }}</td> 
                        </tr>
                      </tbody>
                    </v-table>
                  </span>
                </template>
              </v-menu>
            </td>
            <td>
              <v-btn @click="viewSubmission(submission.SubmissionID)" color="primary">View</v-btn>
              <v-btn @click="approveSubmission(submission.SubmissionID)" color="green">Approve</v-btn>
              <v-btn @click="rejectSubmission(submission.SubmissionID)" color="red">Reject</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
    <!-- Loading Spinner and Text -->
    <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Submitting your report and generating an ecochain NFT</p>
    </div>
  
      <!-- <div v-else>
        <p>No pending submissions found.</p>
      </div> -->
    </div>

      

  
  </template>
  
  <script>
  import axios from 'axios';
  import config from './config';
  
  export default {
    data() {
      return {
        name: '',
			email: '',
			algo_add: '',
			location: '',
			industry: '',
			size: '',
			description: '',
      submissions: [],
      loading: false
      };
    },
    mounted() {
      // this.fetchSubmissions();
      this.fetchSubmissions();
    },
    methods: {
      formatOutliers(outliersString) { 
    if (outliersString) {
      return outliersString.split(', ').map(outlier => {
        const [metricType, metric] = outlier.split(': ');
        return `${metric}: ${this.submission[metricType][metric]}`; 
      });
    } else {
      return [];
     }
  },

      async fetchSubmissions() {
			try {
				const token = localStorage.getItem('access_token');
				const headers = {
					'Authorization': 'Bearer ' + token
				};

				const response = await axios.get(config.backendApiUrl.concat("/auditor/submissions"), { headers: headers });

				if (response.data.success) {
					this.name = response.data.name;
					this.email = response.data.email;
					this.algo_add = response.data.algo_add;
					this.submissions = response.data.submissions;
					this.location = response.data.location;
					this.industry = response.data.industry;
					this.size = response.data.size;
					this.description = response.data.description;
				} else {
					console.error('Error fetching dashboard data');
				}
			} catch (error) {
				console.error('There was an error fetching the data', error);
			}
		},
      // async fetchSubmissions() {
      //     try {
      //       const token = localStorage.getItem('access_token');
      //       const response = await axios.get(config.backendApiUrl + '/auditor/submissions', {
      //         headers: {
      //           'Authorization': 'Bearer ' + token
      //         }
      //       });
    
      //       this.submissions = response.data; 
      //     } catch (error) {
      //       console.error('Error fetching submissions:', error);
      //       this.error = "Failed to fetch submissions. Please try again later."; // Set error message
      //     // You could add more specific error handling based on error.response.status
      //   } finally {
      //     this.isLoading = false;  // Set loading state to false after the request is complete
      //   }
      //   },
      viewSubmission(submissionId) {
        // Pass the submissionId as a query parameter
        this.$router.push(`/SubmissionDetails/${submissionId}`); 
      },
      getStatusText(status) {
			switch (status) {
				case 0: return 'In Progress';
				case 1: return 'Pending';
        case 2: return 'Approved for Baas';
				case 3: return 'Approved for Minting';
				case 4: return 'Complete';
				case 4: return 'Rejected';
				default: return 'Unknown';
			}
      },
      async approveSubmission(submissionId) {
        try {
          const token = localStorage.getItem('access_token');
          await axios.post(config.backendApiUrl + '/auditor/submissions', {
            submission_id: submissionId,
            action: 'approved'
          }, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          // Refresh submissions list or provide feedback to the user
          this.fetchSubmissions();
        } catch (error) {
          console.error('Error approving submission:', error);
          // Handle error, e.g., display an error message
        }
      },
      async rejectSubmission(submissionId) {
        try {
          const token = localStorage.getItem('access_token');
          await axios.post(config.backendApiUrl + '/auditor/submissions', {
            submission_id: submissionId,
            action: 'rejected'
          }, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          // Refresh submissions list or provide feedback to the user
          this.fetchSubmissions();
        } catch (error) {
          console.error('Error rejecting submission:', error);
          // Handle error, e.g., display an error message
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


/* No Submissions Message */
.no-submissions {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #666; /* Lighter gray */
}


.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* or 'absolute' depending on your layout needs */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8); /* semi-transparent white */
  z-index: 1000; /* to ensure it's above other content */
}

.spinner {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-right: 20px; /* Space between spinner and text */
}

</style>