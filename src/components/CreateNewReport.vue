<template>
  <div class="form-wizard-outer">
    <h1 text: center> ESG Submission </h1>
    <br>
    <br>
    <FormWizard @on-complete="onComplete" @on-change="(...args) => beforeChange(...args)" color="#219653" step-size="xs"
      back-button-text="Back to previous section" next-button-text="Next section" finish-button-text="Submit">

      <div class="form-wizard-container">
        <TabContent title="Submission Info" icon="ti-info-alt" text-center>
          <BackgroundInfo @updateData="updateData" />
        </TabContent>
        <TabContent title="Social" icon="ti-user">
            <SocialMetricsPage ref="SocialMetricsPage" @updateSocialMetrics="updateSocialMetrics" />
        </TabContent>
        <TabContent title="Environmental" icon="ti-world">
            <EnvironmentalMetricsPage ref="EnvironmentalMetricsPage" @updateEnvironmentalMetrics="updateEnvironmentalMetrics" />
          </TabContent>
          <TabContent title="Governance" icon="ti-shield">
            <GovernanceMetricsPage ref="GovernanceMetricsPage" @updateGovernanceMetrics="updateGovernanceMetrics" />
          </TabContent>
        <TabContent title="Review and Submit" icon="ti-check-box">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <td colspan="4">
                  <h1>Submission Information</h1>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="review-cell">Company</td>
                <td class="review-cell">{{ company }}</td>
                <td class="review-cell">Submitted by</td>
                <td class="review-cell">{{ full_name }}</td>
              </tr>
              <tr>
                <td class="review-cell">Submission Period</td>
                <td colspan="3" class="review-cell">{{ formattedPeriod }}</td>
              </tr>
              <tr>
                <td colspan="4"><br>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tbody>
                      <tr>
                        <td class="review-cell">Sections included in Submission</td>
                        <td class="review-cell"></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td class="review-cell">Social</td>
                        <td class="review-cell">
                          <div class="status-cell" :style="getCellStyle(getSectionStatus('socialMetricsPage'))">
                            {{ getSectionStatus('socialMetricsPage') }}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="review-cell">Environmental</td>
                        <td class="review-cell">
                          <div class="status-cell" :style="getCellStyle(getSectionStatus('environmentalMetricsPage'))">
                            {{ getSectionStatus('environmentalMetricsPage') }}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="review-cell">Governance</td>
                        <td class="review-cell">
                          <div class="status-cell" :style="getCellStyle(getSectionStatus('governanceMetricsPage'))">
                            {{ getSectionStatus('governanceMetricsPage') }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table><br>

          <v-checkbox v-model="checkbox" color="#219653">
            <template v-slot:label>
              <div>
                By checking this box, I confirm that all metrics provided are accurate. I accept responsibility for any
                audit discrepancies. Upon submission, an email will be sent, the data will be blockchain-recorded, and an
                NFT will be minted. All actions are final and irreversible.
              </div>
            </template>
          </v-checkbox>

        </TabContent>
      </div>
    </FormWizard>
  </div>
  <!-- Loading Spinner and Text -->
<div v-if="loading" class="loading-container">
  <div class="spinner"></div>
  <p>Submitting your report and generating an ecochain NFT</p>
</div>


  <v-dialog v-model="dialogVisible" max-width="700px">
    <v-card>
      <v-card-title class="mb-4">
        <span class="text-h5">Please tick the checkbox</span>
      </v-card-title>

      <v-card-text class="mb-4">
        Please check the box before continuing
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#219653" text @click="dialogVisible = false">Okay</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Local registration
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import BackgroundInfo from './BackgroundInfo.vue';
import PeoplePage from './PeoplePage.vue';
import GovernancePage from './GovernancePage.vue';
import PlanetPage from './PlanetPage.vue';
import ProsperityPage from './ProsperityPage.vue';
import SocialMetricsPage from './SocialMetrics.vue';
import EnvironmentalMetricsPage from './EnvironmentalMetrics.vue';
import GovernanceMetricsPage from './GovernanceMetrics.vue';
import axios from 'axios';
import config from './config';

export default {
  components: {
    FormWizard,
    TabContent,
    BackgroundInfo,
    PeoplePage,
    GovernancePage,
    PlanetPage,
    ProsperityPage,
    SocialMetricsPage,
    EnvironmentalMetricsPage,
    GovernanceMetricsPage,
  },

  data() {

    return {
      company: '',
      full_name: '',
      start_period: null,
      end_period: null,
      socialMetrics: [], 
      environmentalMetrics: [],
      governanceMetrics: [],
      firstName: '',
      lastName: '',
      startDate: '',
      endDate: '',
      checkbox: false,
      dialogVisible: false,
      canSubmit: false,
      loading: false



    };
  },
  computed: {
    formattedPeriod() {
      if (this.start_period && this.end_period) {
        const startDate = new Date(this.start_period).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        const endDate = new Date(this.end_period).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        return `${startDate} - ${endDate}`;
      }
      return '';
    }
  },

  // Gather all metrics data into a single object
  allMetricsData() {
    return {
      social: this.extractApplicableMetrics(this.socialMetrics),
      environmental: this.extractApplicableMetrics(this.environmentalMetrics),
      governance: this.extractApplicableMetrics(this.governanceMetrics)
    };
  },

  methods: {


    getSectionStatus(section) {
      // Determine the status of a section based on the page's data
      const pageData = this.$refs[section];
      if (pageData && pageData.sectionStatus) {
        return pageData.sectionStatus;
      }
      return 'N/A';
    },
    getCellStyle(condition) {
      if (condition === 'Complete') {
        return {
          'color': 'rgba(33, 150, 83, 1)',
          'background-color': 'rgba(33, 150, 83, 0.08)'
        };
      } else if (condition === 'Partial') {
        return {
          'color': 'rgba(255, 167, 11, 1)',
          'background-color': 'rgba(255, 167, 11, 0.08)'
        };
      } else if (condition === 'Not Started') {
        return {
          'color': 'rgba(211, 64, 83, 1)',
          'background-color': 'rgba(211, 64, 83, 0.08)'
        };
      }
    },
    onSubmitButtonClick(event) {
      event.preventDefault();
      this.onComplete();
    },

    updateSocialMetrics(metrics) {
    this.socialMetrics = metrics.map(metric => ({
      metric: metric.metric,
      scoringAchieved: metric.scoringAchieved
    }));

    console.log('Social metrics updated:', this.socialMetrics); // Log the updated array
  },

  updateEnvironmentalMetrics(metrics) {
    this.environmentalMetrics = metrics.map(metric => ({
      metric: metric.metric,
      scoringAchieved: metric.scoringAchieved
    }));

    console.log('Environmental metrics updated:', this.environmentalMetrics); // Log the updated array
  },

  updateGovernanceMetrics(metrics) {
    this.governanceMetrics = metrics.map(metric => ({
      metric: metric.metric,
      scoringAchieved: metric.scoringAchieved
    }));

    console.log('Governance metrics updated:', this.governanceMetrics); // Log the updated array
  },


    updateData(data) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.startDate = data.startDate;
      this.endDate = data.endDate;

    },
    async saveSocialMetrics() {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': 'Bearer ' + token
    };

    try {
      // No need to check for isApplicable anymore
      const extractedSocialMetrics = this.socialMetrics.reduce((acc, metric) => {
        if (metric.scoringAchieved.trim() !== '') { 
          acc[metric.metric] = metric.scoringAchieved; 
        }
        return acc;
      }, {});

      const response = await axios.post(config.backendApiUrl.concat("/input_social_metrics/" + this.$route.query.submissionID), 
        extractedSocialMetrics, 
        { headers: headers }
      );

      if (response.data.success) {
        console.log('Social metrics saved successfully:', response.data.message);
      } else {
        console.error('Error saving social metrics:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving social metrics:', error.message);
    }
  },

  async saveEnvironmentalMetrics() {

    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': 'Bearer ' + token
    };

    
    try {
    const extractedEnvironmentalMetrics = this.environmentalMetrics.reduce((acc, metric) => {
      if (metric.scoringAchieved.trim() !== '') {
        acc[metric.metric] = metric.scoringAchieved;
      }
      return acc;
    }, {});

    console.log("Environmental metrics being sent:", extractedEnvironmentalMetrics);

      // Send extractedEnvironmentalMetrics directly (without nesting)
      const response = await axios.post(config.backendApiUrl.concat("/input_environmental_metrics/" + this.$route.query.submissionID),
        extractedEnvironmentalMetrics,  // Send directly
        { headers: headers }
      );

      if (response.data.success) {
        console.log('Environmental metrics saved successfully:', response.data.message);
      } else {
        console.error('Error saving environmental metrics:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving environmental metrics:', error.message);
    }
  },

  async saveGovernanceMetrics() {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': 'Bearer ' + token
    };

    try {
      // No need to check for isApplicable anymore
      const extractedGovernanceMetrics = this.governanceMetrics.reduce((acc, metric) => {
        if (metric.scoringAchieved.trim() !== '') {
          acc[metric.metric] = metric.scoringAchieved; 
        }
        return acc;
      }, {});

      const response = await axios.post(config.backendApiUrl.concat("/input_governance_metrics/" + this.$route.query.submissionID), 
        extractedGovernanceMetrics, 
        { headers: headers }
      );

      if (response.data.success) {
        console.log('Governance metrics saved successfully:', response.data.message);
      } else {
        console.error('Error saving governance metrics:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving governance metrics:', error.message);
    }
  },
    async saveReportInfo() {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': 'Bearer ' + token
      };

      const dataToSend = {
        FirstName: this.firstName,
        LastName: this.lastName,
        StartPeriod: this.startDate,
        EndPeriod: this.endDate
      };
      console.log(this.firstName, this.lastName, this.startDate, this.endDate);

      console.log("Data being sent to the backend:", dataToSend);

      try {
        const response = await axios.post(
          config.backendApiUrl.concat("/input_submission/" + this.$route.query.submissionID),
          dataToSend,
          { headers: headers }
        );

        if (response.data.success) {
          console.log('Report info saved successfully:', response.data.message);
        } else {
          console.error('Error saving report info:', response.data.message);
        }
      } catch (error) {
        console.error('Error saving report info:', error.message);
      }
    },
    
    async onComplete() {
      console.log("in submitting");
      
      // Check the checkbox before proceeding
      if (!this.canSubmit) {
        if (!this.checkbox) {
          this.dialogVisible = true;
          return;
        }
      }

      this.loading = true; // Start the loading spinner

      try {
        // Gather all metrics data
        const data = {
          social: this.socialMetrics,
          environmental: this.environmentalMetrics,
          governance: this.governanceMetrics
        };

        const token = localStorage.getItem('access_token');
        const headers = {'Authorization': 'Bearer ' + token};
        
        // const response = await axios.post(config.backendApiUrl.concat("/trans/" + this.$route.query.submissionID), data, { headers: headers });
        
        // if (response.data.success) {
        //     // Redirect to MintPage with submissionID as a query parameter
        //     this.$router.push({ name: 'MintPage', query: { submissionID: this.$route.query.submissionID } });
        //   } else if (response.data.message === "Submission flagged for review due to outliers. Please wait for auditor approval.") {
        //     // Redirect to the ReviewPending page
        //     this.$router.push({ name: 'ReviewPending', query: { submissionID: this.$route.query.submissionID } });
        //   } else {
        //     // Handle other errors
        //     alert(`Error: ${response.data.message}`);
        //   }
        
          const response = await axios.post(config.backendApiUrl.concat("/detect_outliers/" + this.$route.query.submissionID),
          data, { headers: headers });

            if (response.data.success) {
              // No outliers, proceed to the next page (e.g., "Send to BaaS")
              this.$router.push({ name: 'SendToBaaSPage', query: { submissionID: this.$route.query.submissionID } });  // Replace 'SendToBaaSPage' with the actual name
            } else {
              // Outliers detected, redirect to ReviewPending
              this.$router.push({ name: 'ReviewPending', query: { submissionID: this.$route.query.submissionID } });
            }
        } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        this.loading = false; // Stop the loading spinner regardless of success or error
        }
      },


    beforeChange(activeTabIndex, nextTabIndex) {
      console.log('beforeChange function triggered')
      console.log('Navigating from', activeTabIndex, 'to', nextTabIndex);
      switch (activeTabIndex) {
        case 0: // Submission Info tab
          this.saveReportInfo();
          break;
        case 1: // Social tab
          this.saveSocialMetrics();
          break;
        case 2: // Environmental tab
          this.saveEnvironmentalMetrics();
          break;
        case 3: // Governance tab
          this.saveGovernanceMetrics();
          this.fetchSubmissionData();
          break;
        case 5: // Review and Submit tab

          break;
      }
    },



    
    async submitDataToBackend() {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': 'Bearer ' + token
      };

      const response = await axios.post(config.backendApiUrl.concat("/trans/" + this.$route.query.submissionID),
        this.allMetricsData,  // Send the combined metrics data
        { headers: headers }
      );

      if (response.data.success) {
        this.$router.push({ name: 'SuccessPage', query: { submissionID: this.$route.query.submissionID } });
      } else {
        // Handle the case where outliers are detected
         if (response.data.message.includes('Submission flagged for review')) {
        // Redirect to the ReviewPending page
          this.$router.push({ name: 'ReviewPending', query: { submissionID: this.$route.query.submissionID } });
        } else {
          alert(`Error: ${response.data.message}`);
        }
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      this.loading = false;
    }
  },

    async fetchSubmissionData() {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': 'Bearer ' + token
      };

      const submissionID = this.$route.query.submissionID;
      if (!submissionID) {
        console.error('No submission ID provided');
        return;
      }
      
      try {
        const response = await axios.get(config.backendApiUrl.concat("/get_submission/" + this.$route.query.submissionID), { headers: headers });
        
        if (response.data.success) {
          this.company = response.data.company;
          this.full_name = response.data.full_name;
          this.start_period = response.data.start_period;
          this.end_period = response.data.end_period;
        } else {
          console.error('Error fetching submission data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching submission data:', error.message);
      }
    },
  }};

</script>

<style>
@import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");

.form-wizard-container {
  background-color: white;
  padding: 20px 30px 20px 40px;
  margin: 10px 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.form-wizard-outer {
  padding: 50px;
}

.review-cell {
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  height: 45px;
  padding: 15px;
}

.status-cell {
  border-radius: 100px;
  align-items: center;
  display: inline-block;
  justify-content: center;

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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}



</style>