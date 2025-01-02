<template>
  <div v-if="submission">
    <h2>Submission Details (ID: {{ submission.SubmissionID }})</h2> 
    <p>Bank Name: {{ submission.Name }}</p>  
    <p>Outliers: {{ submission.Outliers }}</p>

    <v-btn @click="$router.push('/AuditorSubmissions')" color="primary">Back</v-btn>

    <!-- <v-form @submit.prevent="submitFeedback">
      <v-textarea v-model="feedback" label="Auditor Feedback" outlined rows="3"></v-textarea>
      <v-btn type="submit" color="primary">Submit Feedback</v-btn>
    </v-form> -->
<!-- 
    <v-table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
          <th>Difference from Mean</th>
          <th>Thresholds</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(outlier, index) in (submission.Outliers ? submission.Outliers.split(', ') : [])" :key="index">
          <td>{{ outlier.split(': ')[0] }}</td>
          <td>{{ outlier.split(': ')[1].split(' (')[0] }}</td>
          <td>{{ outlier.split('(Difference: ')[1].split(',')[0] }}</td>
          <td>{{ outlier.split('Thresholds: ')[1].split(')')[0] }}</td>
        </tr>
      </tbody>
    </v-table> -->
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import config from './config';

  export default {
    name: 'SubmissionDetails',
    data() {
      return {
        submission: null,
        feedback: ''
      };
    },
    
    mounted() {
      this.fetchSubmissionDetails();
    },
    methods: {
      async fetchSubmissionDetails() {
        try {
          // Get the submissionId from the query parameters
          const submissionId = this.$route.params.submissionId;  
          const token = localStorage.getItem('access_token');
          const response = await axios.get(config.backendApiUrl + `/auditor_review/${submissionId}`, {  // Use the correct route name
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data && response.data.submission) {
            this.submission = response.data.submission;    // Assign the entire response.data to this.submission
          } else {
            console.error("Submission data not found in the response:", response.data);
          }
        } catch (error) {
          console.error('Error fetching submission details:', error);
        }
      },
      async submitFeedback() {
      try {
        const submissionId = this.$route.query.submissionID;
        const token = localStorage.getItem('access_token');
        await axios.post(`/auditor/submissions/${submissionId}/feedback`, {  // New route for feedback
          feedback: this.feedback
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Optionally, display a success message or clear the feedback field
        this.feedback = ''; 
        alert('Feedback submitted successfully!'); 
    } catch (error) {
        console.error('Error submitting feedback:', error);
        // Handle error, e.g., display an error message
        }
    }
}
};
  </script>