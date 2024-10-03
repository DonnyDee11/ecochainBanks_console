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
  <!-- <button @click="onSubmitButtonClick">Submit</button> -->
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

//     updateSocialMetrics(metrics) {
//     // Update properties based on the new social metrics
//     this.customerComplaints = metrics.find(m => m.metric === 'Customer Complaints').scoringAchieved;
//     this.customerSatisfactionScore = metrics.find(m => m.metric === 'Customer Satisfaction Score').scoringAchieved;

//     // Human Capital Development
//     this.permanentEmployeesMale = metrics.find(m => m.metric === 'Permanent Employees (Male)').scoringAchieved;
//     this.permanentEmployeesFemale = metrics.find(m => m.metric === 'Permanent Employees (Female)').scoringAchieved;
//     this.temporaryEmployees = metrics.find(m => m.metric === 'Temporary Employees').scoringAchieved;
//     this.fullTimeEmployeesMale = metrics.find(m => m.metric === 'Full-Time Employees (Male)').scoringAchieved;
//     this.fullTimeEmployeesFemale = metrics.find(m => m.metric === 'Full-Time Employees (Female)').scoringAchieved;
//     this.partTimeEmployeesMale = metrics.find(m => m.metric === 'Part-Time Employees (Male)').scoringAchieved;
//     this.partTimeEmployeesFemale  = metrics.find(m => m.metric === 'Part-Time Employees (Female)').scoringAchieved;
//     this.employeeTurnoverRate = metrics.find(m => m.metric === 'Employee Turnover Rate').scoringAchieved;
//     this.trainingAndDevelopmentSpendPerEmployee = metrics.find(m => m.metric === 'Training and Development Spend per Employee').scoringAchieved;
//     this.lostTimeInjuryFrequencyRate = metrics.find(m => m.metric === 'Lost Time Injury Frequency Rate').scoringAchieved;
//     this.employeeEngagementScore = metrics.find(m => m.metric === 'Employee Engagement Score').scoringAchieved;
//     this.genderPayGap = metrics.find(m => m.metric === 'Gender Pay Gap').scoringAchieved;

//     this.topManagementBlackFemaleEmployees = metrics.find(m => m.metric === 'Top Management (Black Female)').scoringAchieved;
//     this.topManagementAfricanEmployees = metrics.find(m => m.metric === 'Top Management (African)').scoringAchieved;
//     this.topManagementColouredEmployees = metrics.find(m => m.metric === 'Top Management (Coloured)').scoringAchieved;
//     this.topManagementIndianEmployees = metrics.find(m => m.metric === 'Top Management (Indian)').scoringAchieved;
//     this.topManagementAsianEmployees = metrics.find(m => m.metric === 'Top Management (Asian)').scoringAchieved;
//     this.topManagementWhiteEmployees = metrics.find(m => m.metric === 'Top Management (White)').scoringAchieved;
//     this.topManagementDisabledEmployees = metrics.find(m => m.metric === 'Top Management (Disabled)').scoringAchieved;

//     // Senior Management
//     this.seniorManagementTotalNumber = metrics.find(m => m.metric === 'Senior Management (Total number)').scoringAchieved;
//     this.seniorManagementMaleEmployees = metrics.find(m => m.metric === 'Senior Management (Male)').scoringAchieved;
//     this.seniorManagementFemaleEmployees = metrics.find(m => m.metric === 'Senior Management (Female)').scoringAchieved;
//     this.seniorManagementBlackMaleEmployees = metrics.find(m => m.metric === 'Senior Management (Black Male)').scoringAchieved;
//     this.seniorManagementBlackFemaleEmployees = metrics.find(m => m.metric === 'Senior Management (Black Female)').scoringAchieved;
//     this.seniorManagementACIEmployees = metrics.find(m => m.metric === 'Senior Management (ACI)').scoringAchieved;
//     this.seniorManagementColouredEmployees = metrics.find(m => m.metric === 'Senior Management (Coloured)').scoringAchieved;
//     this.seniorManagementIndianEmployees = metrics.find(m => m.metric === 'Senior Management (Indian)').scoringAchieved;
//     this.seniorManagementAsianEmployees = metrics.find(m => m.metric === 'Senior Management (Asian)').scoringAchieved;
//     this.seniorManagementWhiteEmployees = metrics.find(m => m.metric === 'Senior Management (White)').scoringAchieved;
//     this.seniorManagementDisabledEmployees = metrics.find(m => m.metric === 'Senior Management (Disabled)').scoringAchieved;

//     // Middle Management
//     this.middleManagementTotalNumber = metrics.find(m => m.metric === 'Middle Management (Total number)').scoringAchieved;
//     this.middleManagementMaleEmployees = metrics.find(m => m.metric === 'Middle Management (Male)').scoringAchieved;
//     this.middleManagementFemaleEmployees = metrics.find(m => m.metric === 'Middle Management (Female)').scoringAchieved;
//     this.middleManagementBlackEmployees = metrics.find(m => m.metric === 'Middle Management (Black)').scoringAchieved;
//     this.middleManagementACIEmployees = metrics.find(m => m.metric === 'Middle Management (ACI)').scoringAchieved;
//     this.middleManagementColouredEmployees = metrics.find(m => m.metric === 'Middle Management (Coloured)').scoringAchieved;
//     this.middleManagementIndianEmployees = metrics.find(m => m.metric === 'Middle Management (Indian)').scoringAchieved;
//     this.middleManagementAsianEmployees = metrics.find(m => m.metric === 'Middle Management (Asian)').scoringAchieved;
//     this.middleManagementWhiteEmployees = metrics.find(m => m.metric === 'Middle Management (White)').scoringAchieved;
//     this.middleManagementDisabledEmployees = metrics.find(m => m.metric === 'Middle Management (Disabled)').scoringAchieved;

//     // Junior Management
//     this.juniorManagementTotalNumber = metrics.find(m => m.metric === 'Junior Management (Total number)').scoringAchieved;
//     this.juniorManagementMaleEmployees = metrics.find(m => m.metric === 'Junior Management (Male)').scoringAchieved;
//     this.juniorManagementFemaleEmployees = metrics.find(m => m.metric === 'Junior Management (Female)').scoringAchieved;
//     this.juniorManagementBlackMaleEmployees = metrics.find(m => m.metric === 'Junior Management (Black Male)').scoringAchieved;
//     this.juniorManagementBlackFemaleEmployees = metrics.find(m => m.metric === 'Junior Management (Black Female)').scoringAchieved;
//     this.juniorManagementACIEmployees = metrics.find(m => m.metric === 'Junior Management (ACI)').scoringAchieved;
//     this.juniorManagementColouredEmployees = metrics.find(m => m.metric === 'Junior Management (Coloured)').scoringAchieved;
//     this.juniorManagementIndianEmployees = metrics.find(m => m.metric === 'Junior Management (Indian)').scoringAchieved;
//     this.juniorManagementAsianEmployees = metrics.find(m => m.metric === 'Junior Management (Asian)').scoringAchieved;
//     this.juniorManagementWhiteEmployees = metrics.find(m => m.metric === 'Junior Management (White)').scoringAchieved;
//     this.juniorManagementDisabledEmployees = metrics.find(m => m.metric === 'Junior Management (Disabled)').scoringAchieved;

//     // Semi-Skilled
//     this.semiSkilledTotalNumber = metrics.find(m => m.metric === 'Semi-Skilled (Total number)').scoringAchieved;
//     this.semiSkilledFemaleEmployees = metrics.find(m => m.metric === 'Semi-Skilled  (Female)').scoringAchieved;
//     this.semiSkilledBlackMaleEmployees = metrics.find(m => m.metric === 'Semi-Skilled (Black Male)').scoringAchieved;
//     this.semiSkilledBlackFemaleEmployees = metrics.find(m => m.metric === 'Semi-Skilled (Black Female)').scoringAchieved;
//     this.semiSkilledACIEmployees = metrics.find(m => m.metric === 'Semi-Skilled (ACI)').scoringAchieved;
//     this.semiSkilledColouredEmployees = metrics.find(m => m.metric === 'Semi-Skilled (Coloured)').scoringAchieved;
//     this.semiSkilledIndianEmployees = metrics.find(m => m.metric === 'Semi-Skilled (Indian)').scoringAchieved;
//     this.semiSkilledAsianEmployees = metrics.find(m => m.metric === 'Semi-Skilled (Asian)').scoringAchieved;
//     this.semiSkilledWhiteEmployees = metrics.find(m => m.metric === 'Semi-Skilled (White)').scoringAchieved;
//     this.semiSkilledDisabledEmployees = metrics.find(m => m.metric === 'Semi-Skilled (Disabled)').scoringAchieved;

//     // Unskilled
//     this.unskilledTotalNumber = metrics.find(m => m.metric === 'Unskilled (Total number)').scoringAchieved;
//     this.unskilledFemaleEmployees = metrics.find(m => m.metric === 'Unskilled (Female)').scoringAchieved;
//     this.unskilledBlackMaleEmployees = metrics.find(m => m.metric === 'Unskilled (Black Male)').scoringAchieved;
//     this.unskilledBlackFemaleEmployees = metrics.find(m => m.metric === 'Unskilled (Black Female)').scoringAchieved;
//     this.unskilledACIEmployees = metrics.find(m => m.metric === 'Unskilled (ACI)').scoringAchieved;
//     this.unskilledColouredEmployees = metrics.find(m => m.metric === 'Unskilled (Coloured)').scoringAchieved;
//     this.unskilledIndianEmployees = metrics.find(m => m.metric === 'Unskilled (Indian)').scoringAchieved;
//     this.unskilledAsianEmployees = metrics.find(m => m.metric === 'Unskilled (Asian)').scoringAchieved;
//     this.unskilledWhiteEmployees = metrics.find(m => m.metric === 'Unskilled (White)').scoringAchieved;
//     this.unskilledDisabledEmployees = metrics.find(m => m.metric === 'Unskilled (Disabled)').scoringAchieved;

//     // Per Disability Type
//     this.sensoryDisability = metrics.find(m => m.metric === 'Sensory').scoringAchieved;
//     this.physicalDisability = metrics.find(m => m.metric === 'Physical').scoringAchieved;
//     this.mentalDisability = metrics.find(m => m.metric === 'Mental').scoringAchieved;
//     this.multipleDisabilities = metrics.find(m => m.metric === 'Multiple').scoringAchieved;

//     // Financial Inclusion
//     this.mortgageLoansGranted = metrics.find(m => m.metric === 'Mortgage Loans Granted').scoringAchieved;
//     this.mortgageLoansValueTotal = metrics.find(m => m.metric === 'Mortgage Loans Value (Total)').scoringAchieved;
//     this.mortgageLoansAffordableHousingTotal = metrics.find(m => m.metric === 'Mortgage Loans (Affordable Housing) (Total)').scoringAchieved;
//     this.mortgageLoansAffordableHousingValueTotal = metrics.find(m => m.metric === 'Mortgage Loans (Affordable Housing) (Value Total)').scoringAchieved;

//     // Physical Footprint
//     this.outlets = metrics.find(m => m.metric === 'Outlets').scoringAchieved;
//     this.atms = metrics.find(m => m.metric === 'ATMs').scoringAchieved;
//     this.posDevices = metrics.find(m => m.metric === 'POS Devices').scoringAchieved;
//     this.totalClients = metrics.find(m => m.metric === 'Total Clients').scoringAchieved;
//     this.digitallyActiveClients = metrics.find(m => m.metric === 'Digitally Active Clients').scoringAchieved;

//     // Suppliers
//     this.totalNumberSuppliers = metrics.find(m => m.metric === 'Total Number of Suppliers').scoringAchieved;
//     this.totalProcurementSpend = metrics.find(m => m.metric === 'Total Procurement Spend').scoringAchieved;
//     this.totalProcurementSpendExemptMicroenterprises = metrics.find(m => m.metric === 'Total Procurement Spend on Exempt Micro Enterprises (EMEs)').scoringAchieved;
//     this.totalProcurementSpendQualifyingSmallEnterprises = metrics.find(m => m.metric === 'Total Procurement Spend on Qualifying Small Enterprises (QSEs)').scoringAchieved;
//     this.totalProcurementSpend51PercentBlackOwned = metrics.find(m => m.metric === 'Total Procurement Spend on 51% Black Owned Suppliers').scoringAchieved;
//     this.totalProcurementSpend30PercentBlackOwned = metrics.find(m => m.metric === 'Total Procurement Spend on 30% Black Women Owned Suppliers').scoringAchieved;
//     this.localProcurementSpend = metrics.find(m => m.metric === 'Local Procurement Spend').scoringAchieved;

//     // Regulators
//     this.totalEnvironmentalIncidents = metrics.find(m => m.metric === 'Total Number of environmental incidents (Level 1 + Level 2 + Level 3)').scoringAchieved;
//     this.totalEnvironmentalFines = metrics.find(m => m.metric === 'Total value of environmental fines and penalties (Level 1 + Level 2 + Level 3)').scoringAchieved;
//   },

//   updateEnvironmentalMetrics(metrics) {
//   // Update properties based on the new environmental metrics
//   this.totalEnergyUse = metrics.find(m => m.metric === 'Total Energy Use').scoringAchieved;
//   this.totalRenewableEnergy = metrics.find(m => m.metric === 'Total Renewable Energy').scoringAchieved;
//   this.totalNonRenewableEnergy = metrics.find(m => m.metric === 'Total Non-Renewable Energy').scoringAchieved;
//   this.nonRenewableEnergySources = metrics.find(m => m.metric === 'Non-Renewable Energy Sources').scoringAchieved;

//   // Greenhouse gas emissions
//   this.carbonEmissions = metrics.find(m => m.metric === 'Carbon Emissions').scoringAchieved;
//   this.carEmissions = metrics.find(m => m.metric === 'Car Emissions').scoringAchieved;
//   this.refrigerantGasEmissions = metrics.find(m => m.metric === 'Refrigerant Gas Emissions').scoringAchieved;
//   this.dieselGeneratorsEmissions = metrics.find(m => m.metric === 'Diesel Generators Emissions').scoringAchieved;
//   this.electricityEmissions = metrics.find(m => m.metric === 'Electricity Emissions').scoringAchieved;
//   this.atmEmissions = metrics.find(m => m.metric === 'ATM Emissions').scoringAchieved;
//   this.totalIndirectEmissions = metrics.find(m => m.metric === 'Total Indirect Emissions').scoringAchieved;
//   this.flightEmissions = metrics.find(m => m.metric === 'Flight Emissions').scoringAchieved;
//   this.cashInTransitEmissions = metrics.find(m => m.metric === 'Cash-In-Transit Emissions').scoringAchieved;
//   this.carRentalsEmissions = metrics.find(m => m.metric === 'Car Rentals Emissions').scoringAchieved;
//   this.cloudComputingEmissions = metrics.find(m => m.metric === 'Cloud Computing Emissions').scoringAchieved;
//   this.courierEmissions = metrics.find(m => m.metric === 'Courier Emissions').scoringAchieved;
//   this.paperUsageEmissions = metrics.find(m => m.metric === 'Paper Usage Emissions').scoringAchieved;
//   this.wasteDisposalEmissions = metrics.find(m => m.metric === 'Waste Disposal Emissions').scoringAchieved;
//   this.employeeCommutingEmissions = metrics.find(m => m.metric === 'Employee Commuting Emissions').scoringAchieved;
//   this.electricityTransmissionLossesEmissions = metrics.find(m => m.metric === 'Electricity Transmission Losses Emissions').scoringAchieved;
//   this.carbonEmissionsPerMeterSquared = metrics.find(m => m.metric === 'Carbon Emissions Per Meter Squared').scoringAchieved;

//   // Waste Management
//   this.totalWaste = metrics.find(m => m.metric === 'Total Waste').scoringAchieved;
//   this.recycledWaste = metrics.find(m => m.metric === 'Recycled Waste').scoringAchieved;
//   this.wasteToLandfill = metrics.find(m => m.metric === 'Waste to Landfill').scoringAchieved;
// },

//   updateGovernanceMetrics(metrics) {
//     // Update properties based on the new governance metrics
//     this.numberOfBoardMembers = metrics.find(m => m.metric === 'Number of Board Members').scoringAchieved;
//     this.independentNonExecutiveDirectors = metrics.find(m => m.metric === 'Independent Non-Executive Directors').scoringAchieved;
//     this.executiveDirectors = metrics.find(m => m.metric === 'Executive Directors').scoringAchieved;
//     this.nonExecutiveDirectors = metrics.find(m => m.metric === 'Non-Executive Directors').scoringAchieved;
//     this.independentBoardChairman = metrics.find(m => m.metric === 'Independent Board Chairman').scoringAchieved;
//     this.blackACIExecutiveBoardMembers = metrics.find(m => m.metric === 'Black, Asian and Coloured (ACI) Executive Board Members').scoringAchieved;
//     this.blackACIWomenExecutiveBoardMembers = metrics.find(m => m.metric === 'Black, Asian and Coloured (ACI) Women Executive Board Members').scoringAchieved;
//     this.blackACIIndependentNonExecutiveBoardMembers = metrics.find(m => m.metric === 'Black, Asian and Coloured (ACI) Independent Non-Executive Board Members').scoringAchieved;

//     this.totalNumberOfBoardMeetings = metrics.find(m => m.metric === 'Total Number of Board Meetings').scoringAchieved;
//     this.boardTrainingHours = metrics.find(m => m.metric === 'Board Training Hours').scoringAchieved;

//     this.whiteMales = metrics.find(m => m.metric === 'White Males').scoringAchieved;
//     this.whiteFemales = metrics.find(m => m.metric === 'White Females').scoringAchieved;
//     this.aciFemales = metrics.find(m => m.metric === 'ACI Females').scoringAchieved;
//     this.aciMales = metrics.find(m => m.metric === 'ACI Males').scoringAchieved;
//     this.nonSABoardMembers = metrics.find(m => m.metric === 'Non SA Board Members').scoringAchieved;

//     this.boardMembersLessThan1Year = metrics.find(m => m.metric === 'Board Members < 1 year').scoringAchieved;
//     this.boardMembers1To3Years = metrics.find(m => m.metric === 'Board Members 1 to 3 Years').scoringAchieved;
//     this.boardMembers4To6Years = metrics.find(m => m.metric === 'Board Members 4 to 6 Years').scoringAchieved;
//     this.boardMembers7To9Years = metrics.find(m => m.metric === 'Board Members 7 to 9 Years').scoringAchieved;
//     this.boardMembersMoreThan9Years = metrics.find(m => m.metric === 'Board Members > 9 Years').scoringAchieved;
//     this.boardMembers40To49YearsAge = metrics.find(m => m.metric === 'Board Members 40 to 49 Years Age').scoringAchieved;
//     this.boardMembers50To59YearsAge = metrics.find(m => m.metric === 'Board Members 50 to 59 Years Age').scoringAchieved;
//     this.boardMembers60To69YearsAge = metrics.find(m => m.metric === 'Board Members 60 to 69 Years Age').scoringAchieved;
//     this.boardMembers70Plus = metrics.find(m => m.metric === 'Board Members 70+').scoringAchieved;

//     this.totalNumberOfExcoMembers = metrics.find(m => m.metric === 'Total Number of Exco Members').scoringAchieved;
//     this.executiveDirectorsExco = metrics.find(m => m.metric === 'Executive Directors on Exco').scoringAchieved;
//     this.prescribedOfficers = metrics.find(m => m.metric === 'Prescribed Officers').scoringAchieved;
//     this.exOfficioMembers = metrics.find(m => m.metric === 'Ex Officio Members').scoringAchieved;
//     this.womenExcoMembers = metrics.find(m => m.metric === 'Women Exco Members').scoringAchieved;
//     this.aciExcoMembers = metrics.find(m => m.metric === 'ACI Exco Members').scoringAchieved;

//     this.excoMembers0To3Years = metrics.find(m => m.metric === 'Exco Members 0 to 3 Years').scoringAchieved;
//     this.excoMembers4To6Years = metrics.find(m => m.metric === 'Exco Members 4 to 6 Years').scoringAchieved;
//     this.excoMembers7To9Years = metrics.find(m => m.metric === 'Exco Members 7 to 9 Years').scoringAchieved;

//     this.excoMembers0To10Years = metrics.find(m => m.metric === 'Exco Members 0 to 10 Years').scoringAchieved;
//     this.excoMembers11To20Years = metrics.find(m => m.metric === 'Exco Members 11 to 20 Years').scoringAchieved;
//     this.excoMembersMoreThan20Years = metrics.find(m => m.metric === 'Exco Members > 20 Years').scoringAchieved;

//     this.controllingShareholder = metrics.find(m => m.metric === 'Controlling Shareholder').scoringAchieved;
//     this.multipleShareholderRights = metrics.find(m => m.metric === 'Multiple Shareholder Rights').scoringAchieved;

//     this.beneficialSharesDirectOwnershipCEO = metrics.find(m => m.metric === 'Beneficial Shares (Direct Ownership) - CEO').scoringAchieved;
//     this.beneficialSharesIndirectOwnershipCEO = metrics.find(m => m.metric === 'Beneficial Shares (Indirect Ownership) - CEO').scoringAchieved;
//     this.totalSharesOwnedCEO = metrics.find(m => m.metric === 'Total Shares Owned - CEO').scoringAchieved;

//     this.beneficialSharesDirectOwnershipCFO = metrics.find(m => m.metric === 'Beneficial Shares (Direct Ownership) - CFO').scoringAchieved;
//     this.beneficialSharesIndirectOwnershipCFO = metrics.find(m => m.metric === 'Beneficial Shares (Indirect Ownership) - CFO').scoringAchieved;
//     this.totalSharesOwnedCFO = metrics.find(m => m.metric === 'Total Shares Owned - CFO').scoringAchieved;

//     this.beneficialSharesDirectOwnershipCOO = metrics.find(m => m.metric === 'Beneficial Shares (Direct Ownership) - COO').scoringAchieved;
//     this.beneficialSharesIndirectOwnershipCOO = metrics.find(m => m.metric === 'Beneficial Shares (Indirect Ownership) - COO').scoringAchieved;
//     this.totalSharesOwnedCOO = metrics.find(m => m.metric === 'Total Shares Owned - COO').scoringAchieved;

//     // Audit
//     this.auditors = metrics.find(m => m.metric === 'Auditors').scoringAchieved;
//     this.auditorTenure = metrics.find(m => m.metric === 'Auditor Tenure').scoringAchieved;
//     this.auditFees = metrics.find(m => m.metric === 'Audit Fees').scoringAchieved;

//     // Executive Remuneration 
//     this.executiveRemunerationLinkedToESG = metrics.find(m => m.metric === 'Executive Remuneration Linked to ESG').scoringAchieved;

//     // CEO Remuneration
//     this.ceoGuaranteedPackage = metrics.find(m => m.metric === 'CEO Guaranteed Package').scoringAchieved;
//     this.ceoShortTermIncentive = metrics.find(m => m.metric === 'CEO Short-term incentive').scoringAchieved;
//     this.ceoLongTermIncentive = metrics.find(m => m.metric === 'CEO Long-term incentive').scoringAchieved;
//     this.ceoTotalRemuneration = metrics.find(m => m.metric === 'CEO Total remuneration').scoringAchieved;
//     this.ceoSharePriceAsMultipleOfGuaranteedPackage = metrics.find(m => m.metric === 'CEO Share Price as Multiple of Guaranteed Package').scoringAchieved;

//     // CFO Remuneration
//     this.cfoGuaranteedPackage = metrics.find(m => m.metric === 'CFO Guaranteed Package').scoringAchieved;
//     this.cfoShortTermIncentive = metrics.find(m => m.metric === 'CFO Short-term incentive').scoringAchieved;
//     this.cfoLongTermIncentive = metrics.find(m => m.metric === 'CFO Long-term incentive').scoringAchieved;
//     this.cfoTotalRemuneration = metrics.find(m => m.metric === 'CFO Total remuneration').scoringAchieved;

//     // COO Remuneration
//     this.cooGuaranteedPackage = metrics.find(m => m.metric === 'COO Guaranteed Package').scoringAchieved;
//     this.cooShortTermIncentive = metrics.find(m => m.metric === 'COO Short-term incentive').scoringAchieved;
//     this.cooLongTermIncentive = metrics.find(m => m.metric === 'COO Long-term incentive').scoringAchieved;
//     this.cooTotalRemuneration = metrics.find(m => m.metric === 'COO Total remuneration').scoringAchieved;

//     // Ethics and Integrity
//     this.employeesCompletedEthicsTraining = metrics.find(m => m.metric === 'Employees Completed Ethics Training').scoringAchieved;
//     this.contractorsCompletedEthicsTraining = metrics.find(m => m.metric === 'Contractors Completed Ethics Training').scoringAchieved;
//     this.subsidiariesCompletedEthicsTraining = metrics.find(m => m.metric === 'Subsidiaries Completed Ethics Training').scoringAchieved;
//     this.reportedCases = metrics.find(m => m.metric === 'Reported Cases').scoringAchieved;
//     this.casesStillUnderInvestigation = metrics.find(m => m.metric === 'Cases Still Under Investigation').scoringAchieved;
//     this.substantiatedCases = metrics.find(m => m.metric === 'Substantiated Cases').scoringAchieved;
//     this.unsubstantiatedCases = metrics.find(m => m.metric === 'Unsubstantiated Cases').scoringAchieved;
//     this.disciplinaryCasesReported = metrics.find(m => m.metric === 'Disciplinary Cases Reported').scoringAchieved;
//     this.disciplinaryCasesConcluded = metrics.find(m => m.metric === 'Disciplinary Cases Concluded').scoringAchieved;
//     this.ethicalDisciplinaryCasesConcluded = metrics.find(m => m.metric === 'Ethical & Disciplinary Cases Concluded').scoringAchieved;
//     this.ongoingDisciplinaryCases = metrics.find(m => m.metric === 'Ongoing Disciplinary Cases').scoringAchieved;

//     // Additional Metrics
//     this.systemAvailability = metrics.find(m => m.metric === 'System Availability').scoringAchieved;
//     this.privacyRelatedIncidents = metrics.find(m => m.metric === 'Privacy Related Incidents').scoringAchieved;
//     this.privacyRelatedIncidentsReportedToRegulator = metrics.find(m => m.metric === 'Privacy Related Incidents Reported to Regulator').scoringAchieved;
//   },
    // updateProsperityMetrics(metrics) {
    //   this.totalTaxPaid = metrics.find(m => m.Metric === 'Total tax paid').scoringAchieved;
    //   this.newEmployees = metrics.find(m => m.Metric === 'Absolute number of new employees').scoringAchieved;
    //   this.employeeTurnover = metrics.find(m => m.Metric === 'Absolute number of employee turnover').scoringAchieved;
    //   this.economicContributionMetric = metrics.find(m => m.Metric === 'Economic Contribution').scoringAchieved;
    //   this.totalRnDExpenses = metrics.find(m => m.Metric === 'Total R&D expenses ($)').scoringAchieved;
    //   this.totalCapExDepreciation = metrics.find(m => m.Metric === 'Total capital expenditures (CapEx) Depreciation').scoringAchieved;
    //   this.shareBuybacksDividends = metrics.find(m => m.Metric === 'Share buybacks + Dividend payments').scoringAchieved;
    // },

    // updateGovernanceMetrics(metrics) {
    //   this.ethicalBehaviorTraining = metrics.find(m => m.Metric === 'Anti-corruption training').scoringAchieved;
    //   this.previousYearCorruptionIncidents = metrics.find(m => m.Metric === 'Confirmed corruption incidents for previous year').scoringAchieved;
    //   this.currentYearCorruptionIncidents = metrics.find(m => m.Metric === 'Confirmed corruption incidents in the current year').scoringAchieved;

    // },
    // updatePlanetMetrics(metrics) {
    //   this.greenhouseGasEmissions = metrics.find(m => m.Metric === 'Greenhouse Gas (GHG) emissions').scoringAchieved;
    //   this.tcfdImplementation = metrics.find(m => m.Metric === 'TCFD implementation').scoringAchieved;
    //   this.waterConsumptionInStressedAreas = metrics.find(m => m.Metric === 'Water consumption and withdrawal in  water-stressed areas').scoringAchieved;
    //   this.landUseEcologicalSensitivity = metrics.find(m => m.Metric === 'Land use and ecological sensitivity').scoringAchieved;
    //   console.log("in update method");
    //   console.log('Greenhouse Gas Emissions:', this.greenhouseGasEmissions);
    //   console.log('TCFD Implementation:', this.tcfdImplementation);
    //   console.log('Water Consumption in Stressed Areas:', this.waterConsumptionInStressedAreas);
    //   console.log('Land Use Ecological Sensitivity:', this.landUseEcologicalSensitivity);
    // },
    // handleMetricsUpdate(metrics) {
    //   this.diversityInclusion = metrics.find(m => m.Metric === 'Diversity and Inclusion').scoringAchieved;
    //   this.payEquality = metrics.find(m => m.Metric === 'Pay equality').scoringAchieved;
    //   this.wageLevel = metrics.find(m => m.Metric === 'Wage Level').scoringAchieved;
    //   this.healthSafetyLevel = metrics.find(m => m.Metric === 'Rate of fatalities').scoringAchieved;
    // },
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
      // No need to check for isApplicable anymore
      const extractedEnvironmentalMetrics = this.environmentalMetrics.reduce((acc, metric) => {
        if (metric.scoringAchieved.trim() !== '') {
          acc[metric.metric] = metric.scoringAchieved; 
        }
        return acc;
      }, {});

      const response = await axios.post(config.backendApiUrl.concat("/input_environmental_metrics/" + this.$route.query.submissionID), 
        extractedEnvironmentalMetrics, 
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
    // async saveProsperityMetrics() {
    //   const token = localStorage.getItem('access_token');
    //   const headers = {
    //     'Authorization': 'Bearer ' + token
    //   };
    //   console.log("in saveProsperityMetrics method");
    //   console.log('Total Tax Paid:', this.totalTaxPaid);
    //   console.log('Absolute Number of New Employees:', this.newEmployees);
    //   console.log('Absolute Number of Employee Turnover:', this.employeeTurnover);
    //   console.log('Economic Contribution:', this.economicContributionMetric);
    //   console.log('Total R&D Expenses:', this.totalRnDExpenses);
    //   console.log('Total Capital Expenditures:', this.totalCapExDepreciation);
    //   console.log('Share Buybacks + Dividend Payments:', this.shareBuybacksDividends);

    //   try {
    //     const response = await axios.post(config.backendApiUrl.concat("/input_prosperitymetrics/" + this.$route.query.submissionID), {
    //       TotalTaxPaid: this.totalTaxPaid,
    //       AbsNumberOfNewEmps: this.newEmployees,
    //       AbsNumberOfNewEmpTurnover: this.employeeTurnover,
    //       EconomicContribution: this.economicContributionMetric,
    //       TotalRNDExpenses: this.totalRnDExpenses,
    //       TotalCapitalExpenditures: this.totalCapExDepreciation,
    //       ShareBuyBacksAndDividendPayments: this.shareBuybacksDividends
    //     }, { headers: headers });

    //     if (response.data.success) {
    //       console.log('Prosperity metrics saved successfully:', response.data.message);
    //     } else {
    //       console.error('Error saving prosperity metrics:', response.data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error saving prosperity metrics:', error.message);
    //   }
    // },

    // async savePlanetMetrics() {
    //   const token = localStorage.getItem('access_token');
    //   const headers = {
    //     'Authorization': 'Bearer ' + token
    //   };
    //   console.log("in savePlanetMetrics method");
    //   console.log('Greenhouse Gas Emissions:', this.greenhouseGasEmissions);
    //   console.log('Water Consumption in Stressed Areas:', this.waterConsumptionInStressedAreas);
    //   console.log('Land Use Ecological Sensitivity:', this.landUseEcologicalSensitivity);
    //   try {
    //     const response = await axios.post(config.backendApiUrl.concat("/input_planetmetrics/" + this.$route.query.submissionID), {
    //       GreenhouseGasEmission: this.greenhouseGasEmissions,
    //       WaterConsumption: this.waterConsumptionInStressedAreas,
    //       LandUse: this.landUseEcologicalSensitivity
    //     }, { headers: headers });

    //     if (response.data.success) {
    //       console.log('Planet metrics saved successfully:', response.data.message);
    //     } else {
    //       console.error('Error saving planet metrics:', response.data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error saving planet metrics:', error.message);
    //   }
    // },

    // async saveGovernanceMetrics() {
    //   const token = localStorage.getItem('access_token');
    //   const headers = {
    //     'Authorization': 'Bearer ' + token
    //   };
    //   console.log("in here")
    //   try {
    //     const response = await axios.post(config.backendApiUrl.concat("/input_governancemetrics/" + this.$route.query.submissionID), {
    //       AntiCorruptionTraining: this.ethicalBehaviorTraining,
    //       ConfirmedCorruptionIncidentPrev: this.previousYearCorruptionIncidents,
    //       ConfirmedCorruptionIncidentCurrent: this.currentYearCorruptionIncidents
    //     }, { headers: headers });

    //     if (response.data.success) {
    //       console.log('Governance metrics saved successfully:', response.data.message);
    //     } else {
    //       console.error('Error saving governance metrics:', response.data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error saving governance metrics:', error.message);
    //   }
    // },
    // async savePeopleMetrics() {
    //   const token = localStorage.getItem('access_token');
    //   const headers = {
    //     'Authorization': 'Bearer ' + token
    //   };

    //   try {

    //     const response = await axios.post(config.backendApiUrl.concat("/input_peoplemetrics/" + this.$route.query.submissionID), {
    //       DiversityAndInclusion: this.diversityInclusion,
    //       PayEquality: this.payEquality,
    //       WageLevel: this.wageLevel,
    //       HealthAndSafetyLevel: this.healthSafetyLevel
    //     }, { headers: headers });

    //     if (response.data.success) {
    //       console.log('Metrics saved successfully:', response.data.message);
    //     } else {
    //       console.error('Error saving metrics:', response.data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error saving metrics:', error.message);
    //   }
    // },

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
  // this.verifyCheckboxBeforeSubmit();
  // if (!this.canSubmit) {
  //   if (!this.checkbox) {
  //     return alert('Please tick the checkbox before proceeding.');
  //   }
  // }

  this.loading = true; // Start the loading spinner

  try {
    // Gather all metrics data
    const data = {
      social: this.socialMetrics,
      environmental: this.environmentalMetrics,
      governance: this.governanceMetrics
    };

  const token = localStorage.getItem('access_token');
  const headers = {
    'Authorization': 'Bearer ' + token
  };

  
    // const response = await axios.post(config.backendApiUrl.concat("/trans/" + this.$route.query.submissionID), {}, { headers: headers });
    const response = await axios.post(config.backendApiUrl.concat("/trans/" + this.$route.query.submissionID), 
      data, { headers: headers }
    );

    if (response.data.success) {
      this.$router.push({ name: 'SuccessPage', query: { submissionID: this.$route.query.submissionID } });
    } else {
      alert(`Error: ${response.data.message}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    this.loading = false; // Stop the loading spinner regardless of success or error
  }
},



beforeChange(activeTabIndex, nextTabIndex) {
  console.log('beforeChange function triggered');
  console.log('Navigating from', activeTabIndex, 'to', nextTabIndex);

  // No need for a switch statement anymore
  if (activeTabIndex === 0) {
    this.saveReportInfo();
  } else if (activeTabIndex >= 1 && activeTabIndex <= 3) { // Social, Environmental, or Governance tab
    this.saveMetrics(activeTabIndex); 
  } 
  // No need for case 5 (Review and Submit) as it doesn't save data on change
},



    // beforeChange(activeTabIndex, nextTabIndex) {
    //   console.log('beforeChange function triggered')
    //   console.log('Navigating from', activeTabIndex, 'to', nextTabIndex);
    //   switch (activeTabIndex) {
    //     case 0: // Submission Info tab
    //       this.saveReportInfo();
    //       break;
    //     case 1: // Social tab
    //       this.saveSocialMetrics();
    //       break;
    //     case 2: // Environmental tab
    //       this.saveEnvironmentalMetrics();
    //       break;
    //     case 3: // Governance tab
    //       this.saveGovernanceMetrics();
    //       this.fetchSubmissionData();
    //       break;
    //     case 5: // Review and Submit tab

    //       break;
    //   }
    // },


    verifyCheckboxBeforeSubmit() {
      if (!this.checkbox) {
        // Display a warning or notification about the unchecked checkbox
        alert('Please tick the checkbox before proceeding.');
        return;
      }

    },
    
  //   async submitDataToBackend() {
  //   try {
  //     const token = localStorage.getItem('access_token');
  //     const headers = {
  //       'Authorization': 'Bearer ' + token
  //     };

  //     const response = await axios.post(config.backendApiUrl.concat("/trans/" + this.$route.query.submissionID),
  //       this.allMetricsData,  // Send the combined metrics data
  //       { headers: headers }
  //     );

  //     if (response.data.success) {
  //       this.$router.push({ name: 'SuccessPage', query: { submissionID: this.$route.query.submissionID } });
  //     } else {
  //       alert(`Error: ${response.data.message}`);
  //     }
  //   } catch (error) {
  //     alert(`Error: ${error.message}`);
  //   } finally {
  //     this.loading = false;
  //   }
  // },

  async saveMetrics(tabIndex) {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': 'Bearer ' + token
      };

      // Get the metrics data for the current tab
      let metricsData;
      let endpoint;
      switch (tabIndex) {
        case 1: 
          metricsData = this.socialMetrics; 
          endpoint = "/input_social_metrics/" + this.$route.query.submissionID; 
          break;
        case 2: 
          metricsData = this.environmentalMetrics; 
          endpoint = "/input_environmental_metrics/" + this.$route.query.submissionID; 
          break;
        case 3: 
          metricsData = this.governanceMetrics; 
          endpoint = "/input_governance_metrics/" + this.$route.query.submissionID; 
          break;
        default:
          console.error('Invalid tab index in saveMetrics');
          return;
      }

      const extractedMetrics = metricsData.reduce((acc, metric) => {
        if (metric.scoringAchieved.trim() !== '') {
          acc[metric.metric] = metric.scoringAchieved;
        }
        return acc;
      }, {});

      const response = await axios.post(config.backendApiUrl.concat(endpoint), extractedMetrics, { headers });

      if (response.data.success) {
        console.log('Metrics saved successfully:', response.data.message);
      } else {
        console.error('Error saving metrics:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving metrics:', error.message);
    }
  },


    async fetchSubmissionData() {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': 'Bearer ' + token
      };
      
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