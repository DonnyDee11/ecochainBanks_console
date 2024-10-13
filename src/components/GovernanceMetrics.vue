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
            <td>{{ item.name }}</td>
            <td>{{ item.metric }}</td>
            <td>
              <v-text-field 
              v-model="item.scoringAchieved" 
              variant="outlined" 
              style="margin-top: 16px; width: 100%;"
              
            ><template v-slot:prepend>
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
    name: 'GovernanceMetricsPage',
  
    data() {
      return {
        allApplicable: false,
        metrics: [
      // Board composition & diversity
          { category: 'Board composition & diversity', name: 'Number of Board Members', metric: 'NumberOfBoardMembers', scoringAchieved: '' },
          { category: '', name: 'Independent Non-Executive Directors', metric: 'IndependentNonExecutiveDirectors', scoringAchieved: '' },
          { category: '', name: 'Executive Directors', metric: 'ExecutiveDirectors', scoringAchieved: '' },
          { category: '', name: 'Non-Executive Directors', metric: 'NonExecutiveDirectors', scoringAchieved: '' },
          { category: '', name: 'Independent Board Chairman', metric: 'IndependentBoardChairman', scoringAchieved: '' },
          { category: '', name: 'Black, Asian and Coloured (ACI) Executive Board Members', metric: 'BlackACIExecutiveBoardMembers', scoringAchieved: '' },
          { category: '', name: 'Black, Asian and Coloured (ACI) Women Executive Board Members', metric: 'BlackACIWomenExecutiveBoardMembers', scoringAchieved: '' },
          { category: '', name: 'Black, Asian and Coloured (ACI) Independent Non-Executive Board Members', metric: 'BlackACIIndependentNonExecutiveBoardMembers', scoringAchieved: '' },

          // Board Effectiveness 
          { category: 'Board Effectiveness', name: 'Total Number of Board Meetings', metric: 'TotalNumberOfBoardMeetings', scoringAchieved: '' },
          { category: '', name: 'Board Training Hours', metric: 'BoardTrainingHours', scoringAchieved: '' },

          // Workforce Diversity
          { category: 'Workforce Diversity', name: 'White Males', metric: 'WhiteMales', scoringAchieved: '' },
          { category: '', name: 'White Females', metric: 'WhiteFemales', scoringAchieved: '' },
          { category: '', name: 'ACI Females', metric: 'ACIFemales', scoringAchieved: '' },
          { category: '', name: 'ACI Males', metric: 'ACIMales', scoringAchieved: '' },
          { category: '', name: 'Non SA Board Members', metric: 'NonSABoardMembers', scoringAchieved: '' },

          // Board Member Tenure and Age
          { category: 'Board Member Tenure and Age', name: 'Board Members < 1 year', metric: 'BoardMembersLessThan1Year', scoringAchieved: '' },
          { category: '', name: 'Board Members 1 to 3 Years', metric: 'BoardMembers1To3Years', scoringAchieved: '' },
          { category: '', name: 'Board Members 4 to 6 Years', metric: 'BoardMembers4To6Years', scoringAchieved: '' },
          { category: '', name: 'Board Members 7 to 9 Years', metric: 'BoardMembers7To9Years', scoringAchieved: '' },
          { category: '', name: 'Board Members > 9 Years', metric: 'BoardMembersMoreThan9Years', scoringAchieved: '' },
          { category: '', name: 'Board Members 40 to 49 Years Age', metric: 'BoardMembers40To49YearsAge', scoringAchieved: '' },
          { category: '', name: 'Board Members 50 to 59 Years Age', metric: 'BoardMembers50To59YearsAge', scoringAchieved: '' },
          { category: '', name: 'Board Members 60 to 69 Years Age', metric: 'BoardMembers60To69YearsAge', scoringAchieved: '' },
          { category: '', name: 'Board Members 70+', metric: 'BoardMembers70Plus', scoringAchieved: '' },

          // Executive Management 
          { category: 'Executive Management', name: 'Total Number of Exco Members', metric: 'TotalNumberOfExcoMembers', scoringAchieved: '' },
          { category: '', name: 'Executive Directors on Exco', metric: 'ExecutiveDirectorsExco', scoringAchieved: '' },
          { category: '', name: 'Prescribed Officers', metric: 'PrescribedOfficers', scoringAchieved: '' },
          { category: '', name: 'Ex Officio Members', metric: 'ExOfficioMembers', scoringAchieved: '' },
          { category: '', name: 'Women Exco Members', metric: 'WomenExcoMembers', scoringAchieved: '' },
          { category: '', name: 'ACI Exco Members', metric: 'ACIExcoMembers', scoringAchieved: '' },

          // Executive Management Tenure
          { category: 'Executive Management Tenure', name: 'Exco Members 0 to 3 Years', metric: 'ExcoMembers0To3Years', scoringAchieved: '' },
          { category: '', name: 'Exco Members 4 to 6 Years', metric: 'ExcoMembers4To6Years', scoringAchieved: '' },
          { category: '', name: 'Exco Members 7 to 9 Years', metric: 'ExcoMembers7To9Years', scoringAchieved: '' },

          // Executive Management Bank Tenure 
          { category: 'Executive Management Bank Tenure', name: 'Exco Members 0 to 10 Years', metric: 'ExcoMembers0To10Years', scoringAchieved: '' },
          { category: '', name: 'Exco Members 11 to 20 Years', metric: 'ExcoMembers11To20Years', scoringAchieved: '' },
          { category: '', name: 'Exco Members > 20 Years', metric: 'ExcoMembersMoreThan20Years', scoringAchieved: '' },

          // Shareholder Rights
          { category: 'Shareholder Rights', name: 'Controlling Shareholder', metric: 'ControllingShareholder', scoringAchieved: '' },
          { category: '', name: 'Multiple Shareholder Rights', metric: 'MultipleShareholderRights', scoringAchieved: '' },

          // CEO Shareholding
          { category: 'CEO Shareholding', name: 'Beneficial Shares (Direct Ownership) - CEO', metric: 'BeneficialSharesDirectOwnershipCEO', scoringAchieved: '' },
          { category: '', name: 'Beneficial Shares (Indirect Ownership) - CEO', metric: 'BeneficialSharesIndirectOwnershipCEO', scoringAchieved: '' },
          { category: '', name: 'Total Shares Owned - CEO', metric: 'TotalSharesOwnedCEO', scoringAchieved: '' },

          // CFO Shareholding
          { category: 'CFO Shareholding', name: 'Beneficial Shares (Direct Ownership) - CFO', metric: 'BeneficialSharesDirectOwnershipCFO', scoringAchieved: '' },
          { category: '', name: 'Beneficial Shares (Indirect Ownership) - CFO', metric: 'BeneficialSharesIndirectOwnershipCFO', scoringAchieved: '' },
          { category: '', name: 'Total Shares Owned - CFO', metric: 'TotalSharesOwnedCFO', scoringAchieved: '' },

          // COO Shareholding
          { category: 'COO Shareholding', name: 'Beneficial Shares (Direct Ownership) - COO', metric: 'BeneficialSharesDirectOwnershipCOO', scoringAchieved: '' },
          { category: '', name: 'Beneficial Shares (Indirect Ownership) - COO', metric: 'BeneficialSharesIndirectOwnershipCOO', scoringAchieved: '' },
          { category: '', name: 'Total Shares Owned - COO', metric: 'TotalSharesOwnedCOO', scoringAchieved: '' },

          // Ethics and Integrity
          { category: 'Ethics and integrity', name: 'Employees Completed Ethics Training', metric: 'EmployeesCompletedEthicsTraining', scoringAchieved: '' },
          { category: '', name: 'Contractors Completed Ethics Training', metric: 'ContractorsCompletedEthicsTraining', scoringAchieved: '' },
          { category: '', name: 'Subsidiaries Completed Ethics Training', metric: 'SubsidiariesCompletedEthicsTraining', scoringAchieved: '' },
          { category: '', name: 'Reported Cases', metric: 'ReportedCases', scoringAchieved: '' },
          { category: '', name: 'Cases Still Under Investigation', metric: 'CasesStillUnderInvestigation', scoringAchieved: '' },
          { category: '', name: 'Substantiated Cases', metric: 'SubstantiatedCases', scoringAchieved: '' },
          { category: '', name: 'Unsubstantiated Cases', metric: 'UnsubstantiatedCases', scoringAchieved: '' },
          { category: '', name: 'Disciplinary Cases Reported', metric: 'DisciplinaryCasesReported', scoringAchieved: '' },
          { category: '', name: 'Disciplinary Cases Concluded', metric: 'DisciplinaryCasesConcluded', scoringAchieved: '' },
          { category: '', name: 'Ethical & Disciplinary Cases Concluded', metric: 'EthicalDisciplinaryCasesConcluded', scoringAchieved: '' },
          { category: '', name: 'Ongoing Disciplinary Cases', metric: 'OngoingDisciplinaryCases', scoringAchieved: '' },

          // Additional Metrics
          { category: 'Additional Metrics', name: 'System Availability', metric: 'SystemAvailability', scoringAchieved: '' },
          { category: '', name: 'Privacy Related Incidents', metric: 'PrivacyRelatedIncidents', scoringAchieved: '' },
          { category: '', name: 'Privacy Related Incidents Reported to Regulator', metric: 'PrivacyRelatedIncidentsReportedToRegulator', scoringAchieved: '' },
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
      const percentageMetrics = [
        'SystemAvailability',
      ];

      if (percentageMetrics.includes(metricName)) {
        return '%';
      } else {
        return '#';
      }
    },

    saveMetricsToParent() {  // Renamed from updateGovernanceMetricsToParent
    // Extract applicable metrics and their scores
    const applicableMetrics = this.metrics.map(metric => ({
      metric: metric.metric,
      scoringAchieved: metric.scoringAchieved
    }));

    this.$emit('updateGovernanceMetrics', applicableMetrics); 
    console.log(applicableMetrics);
  },
  },


watch: {
  metrics: {
    deep: true,
    handler() {
      this.saveMetricsToParent();  // Call the renamed method
    }
  },
}
}        
</script>

<style scoped>
.scrollable-table {
    max-height: 55vh;
    /* Adjust this value to your needs */


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

/* Add this style to set the color of the prepend icon */
.v-input__prepend-inner {
  color: #219653; /* Or any color you prefer */
}
</style>
          