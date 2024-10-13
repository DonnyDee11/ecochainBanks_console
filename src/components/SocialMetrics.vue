<template>
    <div class="table">
      <v-table class="scrollable-table" style="width: 100%">
        <thead>
          <tr>
            <td colspan="3" class="text-left text-no-wrap">
              Complete the sub-sections below by inputting the scoring achieved for each metric
            </td>
            <td></td>
          </tr>
          <tr>
            <th class="text-left">Sub-section</th>
            <th class="text-left">Metric</th>
            <th class="text-left">Scoring achieved</th>
          </tr>
        </thead>
  
        <tbody>
          <tr v-for="(item, index) in metrics" :key="item.name">
            <td>{{ item.category }}</td>  
            <td>{{ item.name }}</td>
            <td>
              <v-text-field 
              v-model="item.scoringAchieved" 
              variant="outlined" 
              style="margin-top: 16px; width: 100%;"
              
            >
            <template v-slot:prepend>
              <span>{{ prependIcon(item.metric) }}</span>
            </template>
          </v-text-field> 
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SocialMetricsPage',
  
    data() {
      return {
        metrics: [
          // Customer Satisfaction
          { category: 'Customer Satisfaction', name: 'Customer Complaints', metric: 'CustomerComplaints', scoringAchieved: '' },
          { category: '', name: 'Customer Satisfaction Score', metric: 'CustomerSatisfactionScore', scoringAchieved: '' },

          // Human Capital Development
          { category: 'Human Capital Development', name: 'Permanent Employees (Male)', metric: 'PermanentEmployeesMale', scoringAchieved: '' },
          { category: '', name: 'Permanent Employees (Female)', metric: 'PermanentEmployeesFemale', scoringAchieved: '' },
          { category: '', name: 'Temporary Employees', metric: 'TemporaryEmployees', scoringAchieved: '' },
          { category: '', name: 'Full-Time Employees (Male)', metric: 'FullTimeEmployeesMale', scoringAchieved: '' },
          { category: '', name: 'Full-Time Employees (Female)', metric: 'FullTimeEmployeesFemale', scoringAchieved: '' },
          { category: '', name: 'Part-Time Employees (Male)', metric: 'PartTimeEmployeesMale', scoringAchieved: '' },
          { category: '', name: 'Part-Time Employees (Female)', metric: 'PartTimeEmployeesFemale', scoringAchieved: '' },
          { category: '', name: 'Employee Turnover Rate', metric: 'EmployeeTurnoverRate', scoringAchieved: '' },
          { category: '', name: 'Training and Development Spend per Employee', metric: 'TrainingAndDevelopmentSpendPerEmployee', scoringAchieved: '' },
          { category: '', name: 'Lost Time Injury Frequency Rate', metric: 'LostTimeInjuryFrequencyRate', scoringAchieved: '' },
          { category: '', name: 'Employee Engagement Score', metric: 'EmployeeEngagementScore', scoringAchieved: '' },
          { category: '', name: 'Gender Pay Gap', metric: 'GenderPayGap', scoringAchieved: '' },

          // Training, Bursaries & Learnerships
          { category: 'Training, Bursaries & Learnerships', name: 'Total Training Spend', metric: 'TotalTrainingSpend', scoringAchieved: '' },
          { category: '', name: 'Total Training Spend as % of Basic Payroll', metric: 'TotalTrainingSpendBasicPayroll', scoringAchieved: '' },
          { category: '', name: 'Training Spend per Employee', metric: 'TrainingSpendPerEmployee', scoringAchieved: '' },
          { category: '', name: 'Number of Training Beneficiaries', metric: 'TrainingBeneficiaries', scoringAchieved: '' },
          { category: '', name: 'Average Training Hours per Employee', metric: 'AverageTrainingHours', scoringAchieved: '' },
          { category: '', name: 'Training Spend on Black Employees', metric: 'TrainingSpendBlackEmployees', scoringAchieved: '' },
          { category: '', name: 'Training Spend on Black Female Employees', metric: 'TrainingSpendBlackFemaleEmployees', scoringAchieved: '' },
          { category: '', name: 'Training Spend on Black Female Employees with Disabilities', metric: 'TrainingSpendBlackFemaleEmployeesWithDisabilities', scoringAchieved: '' },
          { category: '', name: 'Training Spend on Female Employees', metric: 'TrainingSpendFemaleEmployees', scoringAchieved: '' },
          { category: '', name: 'Training Spend on Female Employees with Disabilities', metric: 'TrainingSpendFemaleEmployeesWithDisabilities', scoringAchieved: '' },
          { category: '', name: 'Total number of internal bursaries awarded', metric: 'TotalInternalBursaries', scoringAchieved: '' },
          { category: '', name: 'Actual payment on bursaries', metric: 'ActualPaymentOnBursaries', scoringAchieved: '' },
          { category: '', name: 'Number of learnerships/ internships offered to unemployed people and people with disabilities', metric: 'LearnershipOfferedToUnemployedAndDisabled', scoringAchieved: '' },
          { category: '', name: 'Total number of learnerships and internships', metric: 'LearnershipsAndInternships', scoringAchieved: '' },
          { category: '', name: 'Number of learnership students absorbed into permanent employment in the company', metric: 'LearnershipStudentsAdsorbedIntoEmployment', scoringAchieved: '' },
          { category: '', name: 'Number of employees who attended Management/Leadership Development Programmes', metric: 'NumberEmployeesAttendedManagementLeadership', scoringAchieved: '' },

          // Graduate Programme
          { category: 'Graduate Programme', name: 'Total Graduate Programme Intake', metric: 'TotalGraduateProgramIntake', scoringAchieved: '' },
          { category: '', name: 'Graduate Programme Intake (Female)', metric: 'GraduateProgramIntakeFemale', scoringAchieved: '' },
          { category: '', name: 'Total Graduate Programme Absorption', metric: 'TotalGraduateProgramAbsorption', scoringAchieved: '' },
          { category: '', name: 'Graduate Programme Absorption rate', metric: 'GraduateProgramAbsorptionRate', scoringAchieved: '' },

          // Employee Profile & Movements
          { category: 'Employee Profile & Movements', name: 'Total Number of Employees (beginning of the year)', metric: 'TotalNumberOfEmployeesBeginningYear', scoringAchieved: '' },
          { category: '', name: 'Total Number of Employees (end of the year)', metric: 'TotalNumberOfEmployeesEndOfYear', scoringAchieved: '' },
          { category: '', name: 'New Hires (Permanent Employees)', metric: 'NewHiresPermanentEmployees', scoringAchieved: '' },
          { category: '', name: 'New Hires (Permanent Employees) with 3 months\' probation', metric: 'NewHiresPermanentEmployeesWith3MonthsProbation', scoringAchieved: '' },
          { category: '', name: 'Temporary Employees', metric: 'TemporaryEmployees', scoringAchieved: '' },
          { category: '', name: 'Terminations (Permanent Employees)', metric: 'TerminationsPermanentEmployees', scoringAchieved: '' },
          { category: '', name: 'Resignations', metric: 'Resignations', scoringAchieved: '' },
          { category: '', name: 'Voluntary Retrenchments', metric: 'VoluntaryRetrenchments', scoringAchieved: '' },
          { category: '', name: 'Involuntary Retrenchments', metric: 'InvoluntaryRetrenchments', scoringAchieved: '' },
          { category: '', name: 'Dismissals', metric: 'Dismissals', scoringAchieved: '' },
          { category: '', name: 'Non-Temporary Employees', metric: 'NonTemporaryEmployees', scoringAchieved: '' },
          { category: '', name: 'Total Employee Internal Transfers', metric: 'TotalEmployeeInternalTransfers', scoringAchieved: '' },
          { category: '', name: 'Vacancies Filled by Internal Candidates', metric: 'VacanciesFilledByInternalCandidates', scoringAchieved: '' },
          { category: '', name: 'Internal Promotional Success Rate', metric: 'InternalPromotionalSuccessRate', scoringAchieved: '' },
          { category: '', name: 'Total Employee Promotions', metric: 'TotalEmployeePromotions', scoringAchieved: '' },
          { category: '', name: 'New Hires (Women)', metric: 'NewHiresWomen', scoringAchieved: '' },

          // Per Region
          { category: 'Per Region', name: 'South African Employees (Male)', metric: 'SouthAfricanEmployeesMale', scoringAchieved: '' },
          { category: '', name: 'South African Employees (Female)', metric: 'SouthAfricanEmployeesFemale', scoringAchieved: '' },
          { category: '', name: 'International Employees (Male)', metric: 'InternationalEmployeesMale', scoringAchieved: '' },
          { category: '', name: 'International Employees (Female)', metric: 'InternationalEmployeesFemale', scoringAchieved: '' },

          // Employee Equity Demographics
          { category: 'Employee Equity Demographics', name: 'Black Female Employees', metric: 'BlackFemaleEmployees', scoringAchieved: '' },
          { category: '', name: 'Coloured Employees', metric: 'ColouredEmployees', scoringAchieved: '' },
          { category: '', name: 'Indian Employees', metric: 'IndianEmployees', scoringAchieved: '' },
          { category: '', name: 'Asian Employees', metric: 'AsianEmployees', scoringAchieved: '' },
          { category: '', name: 'White Employees', metric: 'WhiteEmployees', scoringAchieved: '' },
          { category: '', name: 'Male Employees', metric: 'MaleEmployees', scoringAchieved: '' },
          { category: '', name: 'Female Employees', metric: 'FemaleEmployees', scoringAchieved: '' },
          { category: '', name: 'Disability Representation (Number of Employees)', metric: 'DisabilityRepresentationNumberOfEmployees', scoringAchieved: '' },

          // Per Disability Type
          { category: 'Per Disability Type', name: 'Sensory', metric: 'SensoryDisability', scoringAchieved: '' },
          { category: '', name: 'Physical', metric: 'PhysicalDisability', scoringAchieved: '' },
          { category: '', name: 'Mental', metric: 'MentalDisability', scoringAchieved: '' },
          { category: '', name: 'Multiple', metric: 'MultipleDisabilities', scoringAchieved: '' },

          // Additional Labor Statistics
          // Additional Labor Statistics
          { category: 'Additional Labor Statistics', name: 'Employee Costs and Benefits', metric: 'EmployeeCostsAndBenefits', scoringAchieved: '' },
          { category: '', name: 'Total Basic Payroll (Rands)', metric: 'TotalBasicPayrollRands', scoringAchieved: '' },
          { category: '', name: 'Average annual salary - Unionized permanent employees (Rands)', metric: 'AnnualSalaryUnionizedEmployees', scoringAchieved: '' },
          { category: '', name: 'Number of unionised employees', metric: 'UnionizedEmployees', scoringAchieved: '' },
          { category: '', name: 'Number of retrenched individuals', metric: 'RetrenchedIndividuals', scoringAchieved: '' },
          { category: '', name: 'Average number of annual leave days taken by employees', metric: 'AverageAnnualLeaveDaysTaken', scoringAchieved: '' },
          { category: '', name: 'Average number of sick leave days taken by employees', metric: 'AverageSickLeaveDaysTaken', scoringAchieved: '' },

          // Incident Reporting
          { category: 'Incident Reporting', name: 'Number of employee grievances reported', metric: 'EmployeeGrievances', scoringAchieved: '' },
          { category: '', name: 'Number of incidents of misconduct that have been reported in the year', metric: 'IncidentsOfMisconduct', scoringAchieved: '' },
          { category: '', name: 'Number of medical incidents that have occurred during the year', metric: 'MedicalIncidents', scoringAchieved: '' },
          { category: '', name: 'Number of workmen\'s compensation claims', metric: 'WorkmensCompensationClaims', scoringAchieved: '' },
          { category: '', name: 'Number of people injured in work-related incidents', metric: 'NumberInjured', scoringAchieved: '' },
          { category: '', name: 'Number of fatalities (bank members)', metric: 'NumberofFatalitiesBankMembers', scoringAchieved: '' },
          { category: '', name: 'Number of fatalities (non-bank members)', metric: 'NumberofFatalitiesNonBankMembers', scoringAchieved: '' },

          // Financial Inclusion
          { category: 'Financial Inclusion', name: 'Mortgage Loans Granted', metric: 'MortgageLoansGranted', scoringAchieved: '' },
          { category: '', name: 'Mortgage Loans Value (Total)', metric: 'MortgageLoansValueTotal', scoringAchieved: '' },
          { category: '', name: 'Mortgage Loans (Affordable Housing) (Total)', metric: 'MortgageLoansAffordableHousingTotal', scoringAchieved: '' },
          { category: '', name: 'Mortgage Loans (Affordable Housing) (Value Total)', metric: 'MortgageLoansAffordableHousingValueTotal', scoringAchieved: '' },

          // Physical Footprint
          { category: 'Physical Footprint', name: 'Outlets', metric: 'Outlets', scoringAchieved: '' },
          { category: '', name: 'ATMs', metric: 'ATMs', scoringAchieved: '' },
          { category: '', name: 'POS Devices', metric: 'POSDevices', scoringAchieved: '' },
          { category: '', name: 'Total Clients', metric: 'TotalClients', scoringAchieved: '' },
          { category: '', name: 'Digitally Active Clients', metric: 'DigitallyActiveClients', scoringAchieved: '' },

          // Digital Footprint
          { category: 'Digital Footprint', name: 'Digitally Active Clients', metric: 'DigitallyActiveClients', scoringAchieved: '' },

          // Suppliers
          { category: 'Suppliers', name: 'Total Number of Suppliers', metric: 'TotalNumberSuppliers', scoringAchieved: '' },
          { category: '', name: 'Total Procurement Spend', metric: 'TotalProcurementSpend', scoringAchieved: '' },
          { category: '', name: 'Total Procurement Spend on Exempt Micro Enterprises (EMEs)', metric: 'TotalProcurementSpendExemptMicroenterprises', scoringAchieved: '' },
          { category: '', name: 'Total Procurement Spend on Qualifying Small Enterprises (QSEs)', metric: 'TotalProcurementSpendQualifyingSmallEnterprises', scoringAchieved: '' },
          { category: '', name: 'Total Procurement Spend on 51% Black Owned Suppliers', metric: 'TotalProcurementSpend51PercentBlackOwned', scoringAchieved: '' },
          { category: '', name: 'Total Procurement Spend on 30% Black Women Owned Suppliers', metric: 'TotalProcurementSpend30PercentBlackOwned', scoringAchieved: '' },
          { category: '', name: 'Local Procurement Spend', metric: 'LocalProcurementSpend', scoringAchieved: '' },

          // Regulators
          { category: 'Regulators', name: 'Total Number of environmental incidents (Level 1 + Level 2 + Level 3)', metric: 'TotalEnvironmentalIncidents', scoringAchieved: '' },
          { category: '', name: 'Total value of environmental fines and penalties (Level 1 + Level 2 + Level 3)', metric: 'TotalEnvironmentalFines', scoringAchieved: '' },
        ],
    }
},


computed: {
  sectionStatus() {
    const anyFieldFilled = this.metrics.some(item => item.scoringAchieved.trim() !== '');
    const allFieldsFilled = this.metrics.every(item => item.scoringAchieved.trim() !== '');

    if (allFieldsFilled) {
      return 'Complete';
    } else if (anyFieldFilled) {  // Add this condition for "Partial"
      return 'Partial';
    } else {
      return 'Not Started';
    }
  }
},

methods: {
  prependIcon(metricName) {
    // Customize prepend icon based on metric type
    const numericalMetrics = [
      'Customer Satisfaction Score', 'Employee Turnover Rate', 'Training and Development Spend per Employee',
      'Lost Time Injury Frequency Rate', 'Employee Engagement Score', 'Average number of annual leave days taken by employees',
      'Average number of sick leave days taken by employees', 'Total Basic Payroll (Rands)',
      'Average annual salary - Unionized permanent employees (Rands)', 'Actual payment on bursaries', 
      'Graduate Programme Absorption rate', 'Internal Promotional Success Rate',
      'Total Procurement Spend', 'Total Procurement Spend on Exempt Micro Enterprises (EMEs)',
      'Total Procurement Spend on Qualifying Small Enterprises (QSEs)', 'Total Procurement Spend on 51% Black Owned Suppliers',
      'Total Procurement Spend on 30% Black Women Owned Suppliers', 'Local Procurement Spend',
      'Total value of environmental fines and penalties (Level 1 + Level 2 + Level 3)'
    ];

    if (numericalMetrics.includes(metricName)) {
      return '%'; 
    } else {
      return '#'; // No prepend icon for other metrics
    }
  },

    getInputComponent(metricName) {
      // Customize input component based on metric type
      if (metricName === 'Gender Pay Gap') {
        return 'v-select'; // Or another suitable component for textual/categorical input
      } else if (metricName === 'Independent Board Chairman' || metricName === 'Multiple Shareholder Rights') {
        return 'v-checkbox'; 
      } else {
        return 'v-text-field'; // Default to v-text-field for other metrics
      }
    },

    
    saveMetricsToParent() {
      // Extract applicable metrics and their scores
      const applicableMetrics = this.metrics.map(metric => ({
        metric: metric.metric,
        scoringAchieved: metric.scoringAchieved
      }));

      this.$emit('updateSocialMetrics', applicableMetrics); 
      console.log(applicableMetrics);
    }
  },

  watch: {
    metrics: {
      deep: true,
      handler() {
        this.saveMetricsToParent();
      }
    },
  }
}
</script>

<style scoped>
.scrollable-table {
  max-height: 55vh; 
  overflow: auto;
}

/* Style for the table header */
th {
  background-color: #f0f0f0; /* Light gray background */
  font-weight: bold;
  text-align: left;
  padding: 10px;
}

/* Style for table rows */
tr:nth-child(even) {
  background-color: #f9f9f9; /* Alternate row color for better readability */
}

/* Style for table cells */
td {
  padding: 8px;
  border-bottom: 1px solid #ddd; /* Light gray border between rows */
}

/* Style for the "View details and rationale" link */
a {
  color: #219653; /* Match your button color */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.v-input__prepend-inner {
  color: #219653; /* Or any color you prefer */
}
</style>