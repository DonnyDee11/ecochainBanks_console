<template>
  <div v-if="submission">
    <h2>Submission Details (ID: {{ submission.submission.SubmissionID }})</h2>
    <p>Bank Name: {{ submission.submission.Name }}</p>
    <p>Outliers: {{ submission.submission.Outliers }}</p>

    <v-form @submit.prevent="submitFeedback">
      <v-textarea v-model="feedback" label="Auditor Feedback" outlined rows="3"></v-textarea>
      <v-btn type="submit" color="primary">Submit Feedback</v-btn>
    </v-form>
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
    computed: {
    outliers() {
      if (this.submission && this.submission.submission.Outliers) {
        return this.submission.submission.Outliers.split(', ');  
      } else {
        return [];
      }}},
    methods: {
      async fetchSubmissionDetails() {
        try {
          const submissionId = this.$route.params.submissionId;
          const token = localStorage.getItem('access_token');
          const response = await axios.get(config.backendApiUrl + `/auditor/submissions/${submissionId}`, {
  headers: { Authorization: `Bearer ${token}` }
});
          this.submission = response.data;
        } catch (error) {
          console.error('Error fetching submission details:', error);
        }
      },
      async submitFeedback() {
      try {
        const submissionId = this.$route.params.submission_id;
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