<template>
    <v-container class="auth-container">
      <v-row>
        <!-- Image on the left -->
        <v-col>
          <v-img src="@/assets/successphoto.png" alt="Success Photo" class="success-photo"></v-img>
        </v-col>
  
        <!-- Content on the right -->
        <v-col>
          <h2 style="margin-bottom: 20px;">Submission Successful!</h2>

          <div style="margin-bottom: 20px;">
            <strong>BaaS TXID:</strong> {{ baas_tx_id }}
          </div>
          <div style="margin-bottom: 20px;">
            <strong>BaaS TX URL:</strong> <a :href="baas_tx_url" target="_blank">{{ baas_tx_url }}</a>
          </div>
  
          <p style="margin-bottom: 20px;">Your submission has been reviewed and approved. You can now proceed to claim your NFT.</p>

          
          <v-row 
          self-align="right" 
          justify="center">
            <v-col cols="6">
              <v-btn 
              block 
              color="#219653" 
              class="text-none" 
              @click="successPage">
                Mint NFT
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
    name: 'MintPage',
    data() {
      return {
        baas_tx_id: null,
        baas_tx_url: null
      };
    },
    mounted() {
      this.fetchBaaSData();
    },
    methods: {
    async fetchBaaSData() {
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          'Authorization': 'Bearer ' + token
        };

        const submissionID = this.$route.query.submissionID;
        const response = await axios.get(config.backendApiUrl.concat("/transaction_complete/" + submissionID), { headers: headers });

        if (response.data.success) {
          this.baas_tx_id = response.data.baas_tx_id;
          this.baas_tx_url = response.data.baas_tx_url;
        } else {
          console.error('Error fetching BaaS data');
        }
      } catch (error) {
        console.error('There was an error fetching the data', error);
      }
    },
    async successPage() {
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          'Authorization': 'Bearer ' + token
        };

        const response = await axios.post(config.backendApiUrl.concat("/mint/" + this.$route.query.submissionID), {}, { headers: headers });

        if (response.data.success) {
          this.$router.push({ name: 'SuccessPage', query: { submissionID: this.$route.query.submissionID } });
        } else {
          alert(`Error: ${response.data.message}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  }
}
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
    position: center
  }
  </style>