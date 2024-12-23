<template>
    <div v-if="submission">
      <h2>Submission Details (ID: {{ submission.SubmissionID }})</h2>
      <p>Bank Name: {{ submission.bankName }}</p> 
      <p>Outliers: {{ submission.Outliers }}</p>
      </div>
</template>
  
  <script>
  export default {
    
    data() {
      return {
        submission: null
      };
    },
    mounted() {
      this.fetchSubmissionDetails();
    },
    methods: {
      async fetchSubmissionDetails() {
        try {
          const submissionId = this.$route.params.submission_id;
          const token = localStorage.getItem('access_token');
          const response = await axios.get(`/auditor/submissions/${submissionId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.submission = response.data;
        } catch (error) {
          console.error('Error fetching submission details:', error);
        }
      }
    }
  };
  </script>