<template>
  <div class="form-wizard-outer">
    <h1 text: center> ESG Submission </h1>
    <br>
    <br>
    <FormWizard @on-complete="onComplete" @on-change="(...args) => beforeChange(...args)" color="#219653" step-size="xs"
      back-button-text="Back to previous section" next-button-text="Next section" finish-button-text="Submit">

      <div class="form-wizard-container">
        <TabContent title="Submission Info" icon="ti-wallet" text-center>
          <BackgroundInfo @updateData="updateData" />
        </TabContent>
        <TabContent title="Social" icon="ti-user">
            <SocialMetricsPage ref="socialMetricsPage" @updateSocialMetrics="updateSocialMetrics" />
        </TabContent>
        <TabContent title="Environmental" icon="ti-world">
            <EnvironmentalMetricsPage ref="environmentalMetricsPage" @updateEnvironmentalMetrics="updateEnvironmentalMetrics" />
          </TabContent>
          <TabContent title="Governance" icon="ti-shield">
            <GovernanceMetricsPage ref="governanceMetricsPage" @updateGovernanceMetrics="updateGovernanceMetrics" />
          </TabContent>
        <!-- <TabContent title="People" icon="ti-user">
          <PeoplePage ref="PeoplePage" @updateMetrics="handleMetricsUpdate" />
        </TabContent>
        <TabContent title="Governance" icon="ti-shield">
          <GovernancePage ref="GovernancePage" @updateGovernanceMetrics="updateGovernanceMetrics" />
        </TabContent>
        <TabContent title="Planet" icon="ti-world">
          <PlanetPage ref="PlanetPage" @updatePlanetMetrics="updatePlanetMetrics" />
        </TabContent>
        <TabContent title="Prosperity" icon="ti-wallet">
          <ProsperityPage ref="ProsperityPage" @updateProsperityMetrics="updateProsperityMetrics" />
        </TabContent> -->
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
                    <!-- <tbody>
                      <tr>
                        <td class="review-cell">Sections included in Submission</td>
                        <td class="review-cell"></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td class="review-cell">People</td>
                        <td class="review-cell">
                          <div class="status-cell" :style="getCellStyle(getSectionStatus('PeoplePage'))">
                            {{ getSectionStatus('PeoplePage') }}</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="review-cell">Planet</td>
                        <td class="review-cell">
                          <div class="status-cell" :style="getCellStyle(getSectionStatus('PlanetPage'))">{{
                            getSectionStatus('PlanetPage') }}</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="review-cell">Prosperity</td>
                        <td class="review-cell">
                          <div class="status-cell" :style="getCellStyle(getSectionStatus('ProsperityPage'))">{{
                            getSectionStatus('ProsperityPage') }}</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="review-cell">Governance</td>
                        <td class="review-cell">
                          <div class="status-cell" :style="getCellStyle(getSectionStatus('GovernancePage'))">{{
                            getSectionStatus('GovernancePage') }}</div>
                        </td>
                      </tr>
                    </tbody> -->
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
      // diversityInclusion: '',
      // payEquality: '',
      // wageLevel: '',
      // healthSafetyLevel: '',
      // dialogVisible: false,
      // checkbox: false,
      firstName: '',
      lastName: '',
      startDate: '',
      endDate: '',
      // ethicalBehaviorTraining: '',
      // previousYearCorruptionIncidents: '',
      // currentYearCorruptionIncidents: '',
      // greenhouseGasEmissions: '',
      // tcfdImplementation: '',
      // waterConsumptionInStressedAreas: '',
      // landUseEcologicalSensitivity: '',
      // totalTaxPaid: '',
      // newEmployees: '',
      // employeeTurnover: '',
      // economicContributionMetric: '',
      // totalRnDExpenses: '',
      // totalCapExDepreciation: '',
      // shareBuybacksDividends: '',
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
      // Update properties based on the new social metrics
      this.customerComplaints = this.findMetricValue(metrics, 'Customer Complaints');
      this.customerSatisfactionScore = this.findMetricValue(metrics, 'Customer Satisfaction Score');

      // Human Capital Development
      this.permanentEmployeesMale = this.findMetricValue(metrics, 'Permanent Employees (Male)');
      this.permanentEmployeesFemale = this.findMetricValue(metrics, 'Permanent Employees (Female)');
      this.temporaryEmployees = this.findMetricValue(metrics, 'Temporary Employees');
      this.fullTimeEmployeesMale = this.findMetricValue(metrics, 'Full-Time Employees (Male)');
      this.fullTimeEmployeesFemale = this.findMetricValue(metrics, 'Full-Time Employees (Female)');
      this.partTimeEmployeesMale = this.findMetricValue(metrics, 'Part-Time Employees (Male)');
      this.partTimeEmployeesFemale  = this.findMetricValue(metrics, 'Part-Time Employees (Female)');
      this.employeeTurnoverRate = this.findMetricValue(metrics, 'Employee Turnover Rate');
      this.trainingAndDevelopmentSpendPerEmployee = this.findMetricValue(metrics, 'Training and Development Spend per Employee');
      this.lostTimeInjuryFrequencyRate = this.findMetricValue(metrics, 'Lost Time Injury Frequency Rate');
      this.employeeEngagementScore = this.findMetricValue(metrics, 'Employee Engagement Score');
      this.genderPayGap = this.findMetricValue(metrics, 'Gender Pay Gap');

      // Training, Bursaries & Learnerships
      this.totalTrainingSpend = this.findMetricValue(metrics, 'Total Training Spend');
      this.totalTrainingSpendBasicPayroll = this.findMetricValue(metrics, 'Total Training Spend as % of Basic Payroll');
      this.trainingSpendPerEmployee = this.findMetricValue(metrics, 'Training Spend per Employee');
      this.trainingBeneficiaries = this.findMetricValue(metrics, 'Number of Training Beneficiaries');
      this.averageTrainingHours = this.findMetricValue(metrics, 'Average Training Hours per Employee');
      this.trainingSpendBlackEmployees = this.findMetricValue(metrics, 'Training Spend on Black Employees');
      this.trainingSpendBlackFemaleEmployees = this.findMetricValue(metrics, 'Training Spend on Black Female Employees');
      this.trainingSpendBlackFemaleEmployeesWithDisabilities = this.findMetricValue(metrics, 'Training Spend on Black Female Employees with Disabilities');
      this.trainingSpendFemaleEmployees = this.findMetricValue(metrics, 'Training Spend on Female Employees');
      this.trainingSpendFemaleEmployeesWithDisabilities = this.findMetricValue(metrics, 'Training Spend on Female Employees with Disabilities');
      this.totalInternalBursaries = this.findMetricValue(metrics, 'Total number of internal bursaries awarded');
      this.actualPaymentOnBursaries = this.findMetricValue(metrics, 'Actual payment on bursaries');
      this.learnershipOfferedToUnemployedAndDisabled = this.findMetricValue(metrics, 'Number of learnerships/ internships offered to unemployed people and people with disabilities');
      this.learnershipsAndInternships = this.findMetricValue(metrics, 'Total number of learnerships and internships');
      this.learnershipStudentsAdsorbedIntoEmployment = this.findMetricValue(metrics, 'Number of learnership students absorbed into permanent employment in the company');
      this.numberEmployeesAttendedManagementLeadership = this.findMetricValue(metrics, 'Number of employees who attended Management/Leadership Development Programmes');

      // Graduate Programme
      this.totalGraduateProgramIntake = this.findMetricValue(metrics, 'Total Graduate Programme Intake');
      this.graduateProgramIntakeFemale = this.findMetricValue(metrics, 'Graduate Programme Intake (Female)');
      this.totalGraduateProgramAbsorption = this.findMetricValue(metrics, 'Total Graduate Programme Absorption');
      this.graduateProgramAbsorptionRate = this.findMetricValue(metrics, 'Graduate Programme Absorption rate');

      // Employee Profile & Movements
      this.totalNumberOfEmployeesBeginningYear = this.findMetricValue(metrics, 'Total Number of Employees (beginning of the year)');
      this.totalNumberOfEmployeesEndOfYear = this.findMetricValue(metrics, 'Total Number of Employees (end of the year)');
      this.newHiresPermanentEmployees = this.findMetricValue(metrics, 'New Hires (Permanent Employees)');
      this.newHiresPermanentEmployeesWith3MonthsProbation = this.findMetricValue(metrics, 'New Hires (Permanent Employees) with 3 months\' probation');
      this.temporaryEmployees = this.findMetricValue(metrics, 'Temporary Employees');
      this.terminationsPermanentEmployees = this.findMetricValue(metrics, 'Terminations (Permanent Employees)');
      this.resignations = this.findMetricValue(metrics, 'Resignations');
      this.voluntaryRetrenchments = this.findMetricValue(metrics, 'Voluntary Retrenchments');
      this.involuntaryRetrenchments = this.findMetricValue(metrics, 'Involuntary Retrenchments');
      this.dismissals = this.findMetricValue(metrics, 'Dismissals');
      this.nonTemporaryEmployees = this.findMetricValue(metrics, 'Non-Temporary Employees');
      this.totalEmployeeInternalTransfers = this.findMetricValue(metrics, 'Total Employee Internal Transfers');
      
      // Employee Movements (continued)
      this.vacanciesFilledByInternalCandidates = this.findMetricValue(metrics, 'Vacancies Filled by Internal Candidates');
      this.internalPromotionalSuccessRate = this.findMetricValue(metrics, 'Internal Promotional Success Rate');
      this.totalEmployeePromotions = this.findMetricValue(metrics, 'Total Employee Promotions');
      this.newHiresWomen = this.findMetricValue(metrics, 'New Hires (Women)');

      // Per Region
      this.southAfricanEmployeesMale = this.findMetricValue(metrics, 'South African Employees (Male)');
      this.southAfricanEmployeesFemale = this.findMetricValue(metrics, 'South African Employees (Female)');
      this.internationalEmployeesMale = this.findMetricValue(metrics, 'International Employees (Male)');
      this.internationalEmployeesFemale = this.findMetricValue(metrics, 'International Employees (Female)');

      // Employee Equity Demographics
      this.blackFemaleEmployees = this.findMetricValue(metrics, 'Black Female Employees');
      this.colouredEmployees = this.findMetricValue(metrics, 'Coloured Employees');
      this.indianEmployees = this.findMetricValue(metrics, 'Indian Employees');
      this.asianEmployees = this.findMetricValue(metrics, 'Asian Employees');
      this.whiteEmployees = this.findMetricValue(metrics, 'White Employees');
      this.maleEmployees = this.findMetricValue(metrics, 'Male Employees');
      this.femaleEmployees = this.findMetricValue(metrics, 'Female Employees');
      this.disabilityRepresentationNumberOfEmployees = this.findMetricValue(metrics, 'Disability Representation (Number of Employees)');

      // Per Disability Type
      this.sensoryDisability = this.findMetricValue(metrics, 'Sensory');
      this.physicalDisability = this.findMetricValue(metrics, 'Physical');
      this.mentalDisability = this.findMetricValue(metrics, 'Mental');
      this.multipleDisabilities = this.findMetricValue(metrics, 'Multiple');

      // Additional Labor Statistics
      this.employeeCostsAndBenefits = this.findMetricValue(metrics, 'Employee Costs and Benefits');
      this.totalBasicPayrollRands = this.findMetricValue(metrics, 'Total Basic Payroll (Rands)');
      this.annualSalaryUnionizedEmployees = this.findMetricValue(metrics, 'Average annual salary - Unionized permanent employees (Rands)');
      this.unionizedEmployees = this.findMetricValue(metrics, 'Number of unionised employees');
      this.retrenchedIndividuals = this.findMetricValue(metrics, 'Number of retrenched individuals');
      this.averageAnnualLeaveDaysTaken = this.findMetricValue(metrics, 'Average number of annual leave days taken by employees');
      this.averageSickLeaveDaysTaken = this.findMetricValue(metrics, 'Average number of sick leave days taken by employees');

      // Incident Reporting
      this.employeeGrievances = this.findMetricValue(metrics, 'Number of employee grievances reported');
      this.incidentsOfMisconduct = this.findMetricValue(metrics, 'Number of incidents of misconduct that have been reported in the year');
      this.medicalIncidents = this.findMetricValue(metrics, 'Number of medical incidents that have occurred during the year');
      this.workmensCompensationClaims = this.findMetricValue(metrics, 'Number of workmen\'s compensation claims');
      this.numberInjured = this.findMetricValue(metrics, 'Number of people injured in work-related incidents');
      this.numberofFatalitiesBankMembers = this.findMetricValue(metrics, 'Number of fatalities (bank members)');
      this.numberofFatalitiesNonBankMembers = this.findMetricValue(metrics, 'Number of fatalities (non-bank members)');

      // Top Management
      this.topManagementTotalNumber = this.findMetricValue(metrics, 'Top Management (Total number)');
      this.topManagementMaleEmployees = this.findMetricValue(metrics, 'Top Management (Male)');
      this.topManagementFemaleEmployees = this.findMetricValue(metrics, 'Top Management (Female)');
      this.topManagementBlackMaleEmployees = this.findMetricValue(metrics, 'Top Management (Black Male)');
      this.topManagementBlackFemaleEmployees = this.findMetricValue(metrics, 'Top Management (Black Female)');
      this.topManagementAfricanEmployees = this.findMetricValue(metrics, 'Top Management (African)');
      this.topManagementColouredEmployees = this.findMetricValue(metrics, 'Top Management (Coloured)');
      this.topManagementIndianEmployees = this.findMetricValue(metrics, 'Top Management (Indian)');
      this.topManagementAsianEmployees = this.findMetricValue(metrics, 'Top Management (Asian)');
      this.topManagementWhiteEmployees = this.findMetricValue(metrics, 'Top Management (White)');
      this.topManagementDisabledEmployees = this.findMetricValue(metrics, 'Top Management (Disabled)');

      // Senior Management
      this.seniorManagementTotalNumber = this.findMetricValue(metrics, 'Senior Management (Total number)');
      this.seniorManagementMaleEmployees = this.findMetricValue(metrics, 'Senior Management (Male)');
      this.seniorManagementFemaleEmployees = this.findMetricValue(metrics, 'Senior Management (Female)');
      this.seniorManagementBlackMaleEmployees = this.findMetricValue(metrics, 'Senior Management (Black Male)');
      this.seniorManagementBlackFemaleEmployees = this.findMetricValue(metrics, 'Senior Management (Black Female)');
      this.seniorManagementACIEmployees = this.findMetricValue(metrics, 'Senior Management (ACI)');
      this.seniorManagementColouredEmployees = this.findMetricValue(metrics, 'Senior Management (Coloured)');
      this.seniorManagementIndianEmployees = this.findMetricValue(metrics, 'Senior Management (Indian)');
      this.seniorManagementAsianEmployees = this.findMetricValue(metrics, 'Senior Management (Asian)');
      this.seniorManagementWhiteEmployees = this.findMetricValue(metrics, 'Senior Management (White)');
      this.seniorManagementDisabledEmployees = this.findMetricValue(metrics, 'Senior Management (Disabled)');

      // Middle Management
      this.middleManagementTotalNumber = this.findMetricValue(metrics, 'Middle Management (Total number)');
      this.middleManagementMaleEmployees = this.findMetricValue(metrics, 'Middle Management (Male)');
      this.middleManagementFemaleEmployees = this.findMetricValue(metrics, 'Middle Management (Female)');
      this.middleManagementBlackEmployees = this.findMetricValue(metrics, 'Middle Management (Black)');
      this.middleManagementACIEmployees = this.findMetricValue(metrics, 'Middle Management (ACI)');
      this.middleManagementColouredEmployees = this.findMetricValue(metrics, 'Middle Management (Coloured)');
      this.middleManagementIndianEmployees = this.findMetricValue(metrics, 'Middle Management (Indian)');
      this.middleManagementAsianEmployees = this.findMetricValue(metrics, 'Middle Management (Asian)');
      this.middleManagementWhiteEmployees = this.findMetricValue(metrics, 'Middle Management (White)');
      this.middleManagementDisabledEmployees = this.findMetricValue(metrics, 'Middle Management (Disabled)');

      // Junior Management
      this.juniorManagementTotalNumber = this.findMetricValue(metrics, 'Junior Management (Total number)');
      this.juniorManagementMaleEmployees = this.findMetricValue(metrics, 'Junior Management (Male)');
      this.juniorManagementFemaleEmployees = this.findMetricValue(metrics, 'Junior Management (Female)');
      this.juniorManagementBlackMaleEmployees = this.findMetricValue(metrics, 'Junior Management (Black Male)');
      this.juniorManagementBlackFemaleEmployees = this.findMetricValue(metrics, 'Junior Management (Black Female)');
      this.juniorManagementACIEmployees = this.findMetricValue(metrics, 'Junior Management (ACI)');
      this.juniorManagementColouredEmployees = this.findMetricValue(metrics, 'Junior Management (Coloured)');
      this.juniorManagementIndianEmployees = this.findMetricValue(metrics, 'Junior Management (Indian)');
      this.juniorManagementAsianEmployees = this.findMetricValue(metrics, 'Junior Management (Asian)');
      this.juniorManagementWhiteEmployees = this.findMetricValue(metrics, 'Junior Management (White)');
      this.juniorManagementDisabledEmployees = this.findMetricValue(metrics, 'Junior Management (Disabled)');

      // Semi-Skilled
      this.semiSkilledTotalNumber = this.findMetricValue(metrics, 'Semi-Skilled (Total number)');
      this.semiSkilledFemaleEmployees = this.findMetricValue(metrics, 'Semi-Skilled  (Female)');
      this.semiSkilledBlackMaleEmployees = this.findMetricValue(metrics, 'Semi-Skilled (Black Male)');
      this.semiSkilledBlackFemaleEmployees = this.findMetricValue(metrics, 'Semi-Skilled (Black Female)');
      this.semiSkilledACIEmployees = this.findMetricValue(metrics, 'Semi-Skilled (ACI)');
      this.semiSkilledColouredEmployees = this.findMetricValue(metrics, 'Semi-Skilled (Coloured)');
      this.semiSkilledIndianEmployees = this.findMetricValue(metrics, 'Semi-Skilled (Indian)');
      this.semiSkilledAsianEmployees = this.findMetricValue(metrics, 'Semi-Skilled (Asian)');
      this.semiSkilledWhiteEmployees = this.findMetricValue(metrics, 'Semi-Skilled (White)');
      this.semiSkilledDisabledEmployees = this.findMetricValue(metrics, 'Semi-Skilled (Disabled)');

      // Unskilled
      this.unskilledTotalNumber = this.findMetricValue(metrics, 'Unskilled (Total number)');
      this.unskilledFemaleEmployees = this.findMetricValue(metrics, 'Unskilled (Female)');
      this.unskilledBlackMaleEmployees = this.findMetricValue(metrics, 'Unskilled (Black Male)');
      this.unskilledBlackFemaleEmployees = this.findMetricValue(metrics, 'Unskilled (Black Female)');
      this.unskilledACIEmployees = this.findMetricValue(metrics, 'Unskilled (ACI)');
      this.unskilledColouredEmployees = this.findMetricValue(metrics, 'Unskilled (Coloured)');
      this.unskilledIndianEmployees = this.findMetricValue(metrics, 'Unskilled (Indian)');
      this.unskilledAsianEmployees = this.findMetricValue(metrics, 'Unskilled (Asian)');
      this.unskilledWhiteEmployees = this.findMetricValue(metrics, 'Unskilled (White)');
      this.unskilledDisabledEmployees = this.findMetricValue(metrics, 'Unskilled (Disabled)');

      // Per Disability Type
      this.sensoryDisability = this.findMetricValue(metrics, 'Sensory');
      this.physicalDisability = this.findMetricValue(metrics, 'Physical');
      this.mentalDisability = this.findMetricValue(metrics, 'Mental');
      this.multipleDisabilities = this.findMetricValue(metrics, 'Multiple');

      // Financial Inclusion
      this.mortgageLoansGranted = this.findMetricValue(metrics, 'Mortgage Loans Granted');
      this.mortgageLoansValueTotal = this.findMetricValue(metrics, 'Mortgage Loans Value (Total)');
      this.mortgageLoansAffordableHousingTotal = this.findMetricValue(metrics, 'Mortgage Loans (Affordable Housing) (Total)');
      this.mortgageLoansAffordableHousingValueTotal = this.findMetricValue(metrics, 'Mortgage Loans (Affordable Housing) (Value Total)');

      // Physical Footprint
      this.outlets = this.findMetricValue(metrics, 'Outlets');
      this.atms = this.findMetricValue(metrics, 'ATMs');
      this.posDevices = this.findMetricValue(metrics, 'POS Devices');
      this.totalClients = this.findMetricValue(metrics, 'Total Clients');
      this.digitallyActiveClients = this.findMetricValue(metrics, 'Digitally Active Clients');

      // Suppliers
      this.totalNumberSuppliers = this.findMetricValue(metrics, 'Total Number of Suppliers');
      this.totalProcurementSpend = this.findMetricValue(metrics, 'Total Procurement Spend');
      this.totalProcurementSpendExemptMicroenterprises = this.findMetricValue(metrics, 'Total Procurement Spend on Exempt Micro Enterprises (EMEs)');
      this.totalProcurementSpendQualifyingSmallEnterprises = this.findMetricValue(metrics, 'Total Procurement Spend on Qualifying Small Enterprises (QSEs)');
      this.totalProcurementSpend51PercentBlackOwned = this.findMetricValue(metrics, 'Total Procurement Spend on 51% Black Owned Suppliers');
      this.totalProcurementSpend30PercentBlackOwned = this.findMetricValue(metrics, 'Total Procurement Spend on 30% Black Women Owned Suppliers');
      this.localProcurementSpend = this.findMetricValue(metrics, 'Local Procurement Spend');

      // Regulators
      this.totalEnvironmentalIncidents = this.findMetricValue(metrics, 'Total Number of environmental incidents (Level 1 + Level 2 + Level 3)');
      this.totalEnvironmentalFines = this.findMetricValue(metrics, 'Total value of environmental fines and penalties (Level 1 + Level 2 + Level 3)');
        },

      updateEnvironmentalMetrics(metrics) {
      // Update properties based on the new environmental metrics
      this.totalEnergyUse = this.findMetricValue(metrics, 'Total Energy Use');
      this.totalRenewableEnergy = this.findMetricValue(metrics, 'Total Renewable Energy');
      this.totalNonRenewableEnergy = this.findMetricValue(metrics, 'Total Non-Renewable Energy');
      this.nonRenewableEnergySources = this.findMetricValue(metrics, 'Non-Renewable Energy Sources');

      // Greenhouse gas emissions
      this.carbonEmissions = this.findMetricValue(metrics, 'Carbon Emissions');
      this.carEmissions = this.findMetricValue(metrics, 'Car Emissions');
      this.refrigerantGasEmissions = this.findMetricValue(metrics, 'Refrigerant Gas Emissions');
      this.dieselGeneratorsEmissions = this.findMetricValue(metrics, 'Diesel Generators Emissions');
      this.electricityEmissions = this.findMetricValue(metrics, 'Electricity Emissions');
      this.atmEmissions = this.findMetricValue(metrics, 'ATM Emissions');
      this.totalIndirectEmissions = this.findMetricValue(metrics, 'Total Indirect Emissions');
      this.flightEmissions = this.findMetricValue(metrics, 'Flight Emissions');
      this.cashInTransitEmissions = this.findMetricValue(metrics, 'Cash-In-Transit Emissions');
      this.carRentalsEmissions = this.findMetricValue(metrics, 'Car Rentals Emissions');
      this.cloudComputingEmissions = this.findMetricValue(metrics, 'Cloud Computing Emissions');
      this.courierEmissions = this.findMetricValue(metrics, 'Courier Emissions');
      this.paperUsageEmissions = this.findMetricValue(metrics, 'Paper Usage Emissions');
      this.wasteDisposalEmissions = this.findMetricValue(metrics, 'Waste Disposal Emissions');
      this.employeeCommutingEmissions = this.findMetricValue(metrics, 'Employee Commuting Emissions');
      this.electricityTransmissionLossesEmissions = this.findMetricValue(metrics, 'Electricity Transmission Losses Emissions');
      this.carbonEmissionsPerMeterSquared = this.findMetricValue(metrics, 'Carbon Emissions Per Meter Squared');

      // Waste Management
      this.totalWaste = this.findMetricValue(metrics, 'Total Waste');
      this.recycledWaste = this.findMetricValue(metrics, 'Recycled Waste');
      this.wasteToLandfill = this.findMetricValue(metrics, 'Waste to Landfill');
    },

    updateGovernanceMetrics(metrics) {
      // Update properties based on the new governance metrics
      this.numberOfBoardMembers = this.findMetricValue(metrics, 'Number of Board Members');
      this.independentNonExecutiveDirectors = this.findMetricValue(metrics, 'Independent Non-Executive Directors');
      this.executiveDirectors = this.findMetricValue(metrics, 'Executive Directors');
      this.nonExecutiveDirectors = this.findMetricValue(metrics, 'Non-Executive Directors');
      this.independentBoardChairman = this.findMetricValue(metrics, 'Independent Board Chairman');
      this.blackACIExecutiveBoardMembers = this.findMetricValue(metrics, 'Black, Asian and Coloured (ACI) Executive Board Members');
      this.blackACIWomenExecutiveBoardMembers = this.findMetricValue(metrics, 'Black, Asian and Coloured (ACI) Women Executive Board Members');
      this.blackACIIndependentNonExecutiveBoardMembers = this.findMetricValue(metrics, 'Black, Asian and Coloured (ACI) Independent Non-Executive Board Members');

      this.totalNumberOfBoardMeetings = this.findMetricValue(metrics, 'Total Number of Board Meetings');
      this.boardTrainingHours = this.findMetricValue(metrics, 'Board Training Hours');

      this.whiteMales = this.findMetricValue(metrics, 'White Males');
      this.whiteFemales = this.findMetricValue(metrics, 'White Females');
      this.aciFemales = this.findMetricValue(metrics, 'ACI Females');
      this.aciMales = this.findMetricValue(metrics, 'ACI Males');
      this.nonSABoardMembers = this.findMetricValue(metrics, 'Non SA Board Members');

      this.boardMembersLessThan1Year = this.findMetricValue(metrics, 'Board Members < 1 year');
      this.boardMembers1To3Years = this.findMetricValue(metrics, 'Board Members 1 to 3 Years');
      this.boardMembers4To6Years = this.findMetricValue(metrics, 'Board Members 4 to 6 Years');
      this.boardMembers7To9Years = this.findMetricValue(metrics, 'Board Members 7 to 9 Years');
      this.boardMembersMoreThan9Years = this.findMetricValue(metrics, 'Board Members > 9 Years');
      this.boardMembers40To49YearsAge = this.findMetricValue(metrics, 'Board Members 40 to 49 Years Age');
      this.boardMembers50To59YearsAge = this.findMetricValue(metrics, 'Board Members 50 to 59 Years Age');
      this.boardMembers60To69YearsAge = this.findMetricValue(metrics, 'Board Members 60 to 69 Years Age');
      this.boardMembers70Plus = this.findMetricValue(metrics, 'Board Members 70+');

      this.totalNumberOfExcoMembers = this.findMetricValue(metrics, 'Total Number of Exco Members');
      this.executiveDirectorsExco = this.findMetricValue(metrics, 'Executive Directors on Exco');
      this.prescribedOfficers = this.findMetricValue(metrics, 'Prescribed Officers');
      this.exOfficioMembers = this.findMetricValue(metrics, 'Ex Officio Members');
      this.womenExcoMembers = this.findMetricValue(metrics, 'Women Exco Members');
      this.aciExcoMembers = this.findMetricValue(metrics, 'ACI Exco Members');

      this.excoMembers0To3Years = this.findMetricValue(metrics, 'Exco Members 0 to 3 Years');
      this.excoMembers4To6Years = this.findMetricValue(metrics, 'Exco Members 4 to 6 Years');
      this.excoMembers7To9Years = this.findMetricValue(metrics, 'Exco Members 7 to 9 Years');

      this.excoMembers0To10Years = this.findMetricValue(metrics, 'Exco Members 0 to 10 Years');
      this.excoMembers11To20Years = this.findMetricValue(metrics, 'Exco Members 11 to 20 Years');
      this.excoMembersMoreThan20Years = this.findMetricValue(metrics, 'Exco Members > 20 Years');

      this.controllingShareholder = this.findMetricValue(metrics, 'Controlling Shareholder');
      this.multipleShareholderRights = this.findMetricValue(metrics, 'Multiple Shareholder Rights');

      this.beneficialSharesDirectOwnershipCEO = this.findMetricValue(metrics, 'Beneficial Shares (Direct Ownership) - CEO');
      this.beneficialSharesIndirectOwnershipCEO = this.findMetricValue(metrics, 'Beneficial Shares (Indirect Ownership) - CEO');
      this.totalSharesOwnedCEO = this.findMetricValue(metrics, 'Total Shares Owned - CEO');

      this.beneficialSharesDirectOwnershipCFO = this.findMetricValue(metrics, 'Beneficial Shares (Direct Ownership) - CFO');
      this.beneficialSharesIndirectOwnershipCFO = this.findMetricValue(metrics, 'Beneficial Shares (Indirect Ownership) - CFO');
      this.totalSharesOwnedCFO = this.findMetricValue(metrics, 'Total Shares Owned - CFO');

      this.beneficialSharesDirectOwnershipCOO = this.findMetricValue(metrics, 'Beneficial Shares (Direct Ownership) - COO');
      this.beneficialSharesIndirectOwnershipCOO = this.findMetricValue(metrics, 'Beneficial Shares (Indirect Ownership) - COO');
      this.totalSharesOwnedCOO = this.findMetricValue(metrics, 'Total Shares Owned - COO');

      // Audit
      this.auditors = this.findMetricValue(metrics, 'Auditors');
      this.auditorTenure = this.findMetricValue(metrics, 'Auditor Tenure');
      this.auditFees = this.findMetricValue(metrics, 'Audit Fees');

      // Executive Remuneration 
      this.executiveRemunerationLinkedToESG = this.findMetricValue(metrics, 'Executive Remuneration Linked to ESG');

      // CEO Remuneration
      this.ceoGuaranteedPackage = this.findMetricValue(metrics, 'CEO Guaranteed Package');
      this.ceoShortTermIncentive = this.findMetricValue(metrics, 'CEO Short-term incentive');
      this.ceoLongTermIncentive = this.findMetricValue(metrics, 'CEO Long-term incentive');
      this.ceoTotalRemuneration = this.findMetricValue(metrics, 'CEO Total remuneration');
      this.ceoSharePriceAsMultipleOfGuaranteedPackage = this.findMetricValue(metrics, 'CEO Share Price as Multiple of Guaranteed Package');

      // CFO Remuneration
      this.cfoGuaranteedPackage = this.findMetricValue(metrics, 'CFO Guaranteed Package');
      this.cfoShortTermIncentive = this.findMetricValue(metrics, 'CFO Short-term incentive');
      this.cfoLongTermIncentive = this.findMetricValue(metrics, 'CFO Long-term incentive');
      this.cfoTotalRemuneration = this.findMetricValue(metrics, 'CFO Total remuneration');

      // COO Remuneration
      this.cooGuaranteedPackage = this.findMetricValue(metrics, 'COO Guaranteed Package');
      this.cooShortTermIncentive = this.findMetricValue(metrics, 'COO Short-term incentive');
      this.cooLongTermIncentive = this.findMetricValue(metrics, 'COO Long-term incentive');
      this.cooTotalRemuneration = this.findMetricValue(metrics, 'COO Total remuneration');

      // Ethics and Integrity
      this.employeesCompletedEthicsTraining = this.findMetricValue(metrics, 'Employees Completed Ethics Training');
      this.contractorsCompletedEthicsTraining = this.findMetricValue(metrics, 'Contractors Completed Ethics Training');
      this.subsidiariesCompletedEthicsTraining = this.findMetricValue(metrics, 'Subsidiaries Completed Ethics Training');
      this.reportedCases = this.findMetricValue(metrics, 'Reported Cases');
      this.casesStillUnderInvestigation = this.findMetricValue(metrics, 'Cases Still Under Investigation');
      this.substantiatedCases = this.findMetricValue(metrics, 'Substantiated Cases');
      this.unsubstantiatedCases = this.findMetricValue(metrics, 'Unsubstantiated Cases');
      this.disciplinaryCasesReported = this.findMetricValue(metrics, 'Disciplinary Cases Reported');
      this.disciplinaryCasesConcluded = this.findMetricValue(metrics, 'Disciplinary Cases Concluded');
      this.ethicalDisciplinaryCasesConcluded = this.findMetricValue(metrics, 'Ethical & Disciplinary Cases Concluded');
      this.ongoingDisciplinaryCases = this.findMetricValue(metrics, 'Ongoing Disciplinary Cases');

      // Additional Metrics
      this.systemAvailability = this.findMetricValue(metrics, 'System Availability');
      this.privacyRelatedIncidents = this.findMetricValue(metrics, 'Privacy Related Incidents');
      this.privacyRelatedIncidentsReportedToRegulator = this.findMetricValue(metrics, 'Privacy Related Incidents Reported to Regulator');
      },
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
      const extractedSocialMetrics = this.socialMetrics.reduce((acc, metric) => {
        if (metric.isApplicable && metric.scoringAchieved.trim() !== '') { 
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
        if (metric.isApplicable && metric.scoringAchieved.trim() !== '') {
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
      const extractedGovernanceMetrics = this.governanceMetrics.reduce((acc, metric) => {
        if (metric.isApplicable && metric.scoringAchieved.trim() !== '') {
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

  const token = localStorage.getItem('access_token');
  const headers = {
    'Authorization': 'Bearer ' + token
  };

  console.log("submitting");

  this.loading = true; // Start the loading spinner

  try {
    const response = await axios.post(config.backendApiUrl.concat("/trans/" + this.$route.query.submissionID), {}, { headers: headers });

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
  }
};

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