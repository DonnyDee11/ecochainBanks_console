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
          { name: 'Customer Satisfaction', metric: 'Customer Complaints', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Customer Satisfaction Score', isApplicable: true, scoringAchieved: '' },
  
          // Human Capital Development
          { name: 'Human Capital Development', metric: 'Permanent Employees (Male)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Permanent Employees (Female)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Temporary Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Full-Time Employees (Male)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Full-Time Employees (Female)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Part-Time Employees (Male)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Part-Time Employees (Female)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Employee Turnover Rate', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Training and Development Spend per Employee', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Lost Time Injury Frequency Rate', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Employee Engagement Score', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Gender Pay Gap', isApplicable: true, scoringAchieved: '' }, // Consider using a different input type here 
  
          // Training, Bursaries & Learnerships
          { name: 'Training, Bursaries & Learnerships', metric: 'Total Training Spend', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Training Spend as % of Basic Payroll', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Training Spend per Employee', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of Training Beneficiaries', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Average Training Hours per Employee', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Training Spend on Black Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Training Spend on Black Female Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Training Spend on Black Female Employees with Disabilities', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Training Spend on Female Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Training Spend on Female Employees with Disabilities', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total number of internal bursaries awarded', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Actual payment on bursaries', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of learnerships/ internships offered to unemployed people and people with disabilities', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total number of learnerships and internships', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of learnership students absorbed into permanent employment in the company', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of employees who attended Management/Leadership Development Programmes', isApplicable: true, scoringAchieved: '' },
  
          // Graduate Programme
          { name: 'Graduate Programme', metric: 'Total Graduate Programme Intake', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Graduate Programme Intake (Female)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Graduate Programme Absorption', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Graduate Programme Absorption rate', isApplicable: true, scoringAchieved: '' },
  
          // Employee Profile & Movements
          { name: 'Employee Profile & Movements', metric: 'Total Number of Employees (beginning of the year)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Number of Employees (end of the year)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'New Hires (Permanent Employees)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'New Hires (Permanent Employees) with 3 months\' probation', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Temporary Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Terminations (Permanent Employees)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Resignations', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Voluntary Retrenchments', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Involuntary Retrenchments', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Dismissals', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Non-Temporary Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Employee Internal Transfers', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Vacancies Filled by Internal Candidates', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Internal Promotional Success Rate', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Employee Promotions', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'New Hires (Women)', isApplicable: true, scoringAchieved: '' },
  
          // Per Region
          { name: 'Per Region', metric: 'South African Employees (Male)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'South African Employees (Female)', isApplicable: true, scoringAchieved: '' },

          // Employee Equity Demographics
          { name: 'Employee Equity Demographics', metric: 'Black Female Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Coloured Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Indian Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Asian Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'White Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Male Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Female Employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Disability Representation (Number of Employees)', isApplicable: true, scoringAchieved: '' },

          // Per Disability Type
          { name: 'Per Disability Type', metric: 'Sensory', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Physical', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Mental', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Multiple', isApplicable: true, scoringAchieved: '' },

          // Additional Labor Statistics
          { name: 'Additional Labor Statistics', metric: 'Employee Costs and Benefits', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Basic Payroll (Rands)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Average annual salary - Unionized permanent employees (Rands)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of unionised employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of retrenched individuals', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Average number of annual leave days taken by employees', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Average number of sick leave days taken by employees', isApplicable: true, scoringAchieved: '' },

          // Incident Reporting
          { name: 'Incident Reporting', metric: 'Number of employee grievances reported', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of incidents of misconduct that have been reported in the year', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of medical incidents that have occurred during the year', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of workmen\'s compensation claims', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of people injured in work-related incidents', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of fatalities (bank members)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Number of fatalities (non-bank members)', isApplicable: true, scoringAchieved: '' },

          // Financial Inclusion
          { name: 'Financial Inclusion', metric: 'Mortgage Loans Granted', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Mortgage Loans Value (Total)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Mortgage Loans (Affordable Housing) (Total)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Mortgage Loans (Affordable Housing) (Value Total)', isApplicable: true, scoringAchieved: '' },

          // Physical Footprint
          { name: 'Physical Footprint', metric: 'Outlets', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'ATMs', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'POS Devices', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Clients', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Digitally Active Clients', isApplicable: true, scoringAchieved: '' },

          // Digital Footprint
          { name: 'Digital Footprint', metric: 'Digitally Active Clients', isApplicable: true, scoringAchieved: '' },

          // Suppliers
          { name: 'Suppliers', metric: 'Total Number of Suppliers', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Procurement Spend', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Procurement Spend on Exempt Micro Enterprises (EMEs)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Procurement Spend on Qualifying Small Enterprises (QSEs)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Procurement Spend on 51% Black Owned Suppliers', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total Procurement Spend on 30% Black Women Owned Suppliers', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Local Procurement Spend', isApplicable: true, scoringAchieved: '' },

          // Regulators
          { name: 'Regulators', metric: 'Total Number of environmental incidents (Level 1 + Level 2 + Level 3)', isApplicable: true, scoringAchieved: '' },
          { name: '', metric: 'Total value of environmental fines and penalties (Level 1 + Level 2 + Level 3)', isApplicable: true, scoringAchieved: '' },
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