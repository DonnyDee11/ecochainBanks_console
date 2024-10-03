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
          { name: 'Board composition & diversity', metric: 'Number of Board Members', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Independent Non-Executive Directors', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Executive Directors', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Non-Executive Directors', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Independent Board Chairman', isApplicable: true, scoringAchieved: '' },  // Consider using v-select or checkbox here
          { name: '', metric: 'Black, Asian and Coloured (ACI) Executive Board Members', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Black, Asian and Coloured (ACI) Women Executive Board Members', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Black, Asian and Coloured (ACI) Independent Non-Executive Board Members', isApplicable: true, scoringAchieved: '' },
  
          // Board Effectiveness 
          { name: 'Board Effectiveness', metric: 'Total Number of Board Meetings', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Training Hours', isApplicable: true, scoringAchieved: '' },
  
          // Workforce Diversity
          { name: 'Workforce Diversity', metric: 'White Males', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'White Females', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'ACI Females', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'ACI Males', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Non SA Board Members', isApplicable: true, scoringAchieved: '' },
  
          // Board Member Tenure and Age
          { name: 'Board Member Tenure and Age', metric: 'Board Members < 1 year', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members 1 to 3 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members 4 to 6 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members 7 to 9 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members > 9 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members 40 to 49 Years Age', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members 50 to 59 Years Age', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members 60 to 69 Years Age', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Board Members 70+', isApplicable: true, scoringAchieved: '' },
  
          // Executive Management 
          { name: 'Executive Management', metric: 'Total Number of Exco Members', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Executive Directors on Exco', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Prescribed Officers', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Ex Officio Members', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Women Exco Members', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'ACI Exco Members', isApplicable: true, scoringAchieved: '' },
  
          // Executive Management Tenure
          { name: 'Executive Management Tenure', metric: 'Exco Members 0 to 3 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Exco Members 4 to 6 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Exco Members 7 to 9 Years', isApplicable: true, scoringAchieved: '' },
  
          // Executive Management Bank Tenure 
          { name: 'Executive Management Bank Tenure', metric: 'Exco Members 0 to 10 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Exco Members 11 to 20 Years', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Exco Members > 20 Years', isApplicable: true, scoringAchieved: '' },
  
          // Shareholder Rights
          { name: 'Shareholder Rights', metric: 'Controlling Shareholder', isApplicable: true, scoringAchieved: '' },  // Consider using v-select or checkbox here
          { name: '', metric: 'Multiple Shareholder Rights', isApplicable: true, scoringAchieved: '' },  // Consider using v-select or checkbox here
  
          // CEO Shareholding
          { name: 'CEO Shareholding', metric: 'Beneficial Shares (Direct Ownership) - CEO', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Beneficial Shares (Indirect Ownership) - CEO', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Shares Owned - CEO', isApplicable: true, scoringAchieved: '' },
  
          // CFO Shareholding
          { name: 'CFO Shareholding', metric: 'Beneficial Shares (Direct Ownership) - CFO', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Beneficial Shares (Indirect Ownership) - CFO', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Shares Owned - CFO', isApplicable: true, scoringAchieved: '' },
  
          // COO Shareholding
          { name: 'COO Shareholding', metric: 'Beneficial Shares (Direct Ownership) - COO', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Beneficial Shares (Indirect Ownership) - COO', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Shares Owned - COO', isApplicable: true, scoringAchieved: '' },

          // Ethics and Integrity
          { name: 'Ethics and integrity', metric: 'Employees Completed Ethics Training', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Contractors Completed Ethics Training', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Subsidiaries Completed Ethics Training', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Reported Cases', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Cases Still Under Investigation', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Substantiated Cases', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Unsubstantiated Cases', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Disciplinary Cases Reported', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Disciplinary Cases Concluded', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Ethical & Disciplinary Cases Concluded', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Ongoing Disciplinary Cases', isApplicable: true, scoringAchieved: '' },
          
          // Additional Metrics
          { name: 'Additional Metrics', metric: 'System Availability', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Privacy Related Incidents', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Privacy Related Incidents Reported to Regulator', isApplicable: true, scoringAchieved: '' },
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


      prependIcon(metricName) {
    const percentageMetrics = [
      'System Availability',
      'Gender Diversity on Board',
      'Internal Promotional Success Rate',
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


watch: {
  metrics: {
    deep: true,
    handler() {
      this.saveMetricsToParent();  // Call the renamed method
    }
  }}}        
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
          