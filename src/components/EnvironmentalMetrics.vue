<template>
  <div class="table">
    <v-table class="scrollable-table" style="width: 100%">
      <thead>
        <tr>
          <td colspan="2" class="text-left text-no-wrap">
            Complete the sub-sections below by inputting the scoring achieved for each metric
          </td>
          <td colspan="1" class="text-left">
            <input type="radio" v-model="allApplicable" value="true" />
            Mark entire category as not applicable
          </td>
          <td></td>
        </tr>
        <tr>
          <th class="text-left">Sub-section</th>
          <th class="text-left">Metric</th>
          <!-- <th class="text-left">Scoring</th>
          <th class="text-left">Applicable</th> -->
          <th class="text-left">Scoring achieved</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in metrics" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.metric }}</td>
          <!-- <td>
            <a href="https://www.weforum.org/stakeholdercapitalism/our-metrics" target="_blank">
              <i class="ti-eye"></i> View details and rationale
            </a>
          </td>
          <td>
            <v-switch v-model="item.isApplicable" @change="handleSwitchChange(item, index)" color="#219653"></v-switch>
          </td> -->
          <td>
            <v-text-field 
              v-model="item.scoringAchieved" 
              :disabled="!item.isApplicable" 
              variant="outlined" 
              style="margin-top: 16px; width: 100%;"
              :prepend-inner-icon="prependIcon(index)"
            ></v-text-field>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  name: 'EnvironmentalMetricsPage',

  data() {
    return {
      allApplicable: false, 
      metrics: [
        // Energy Use
        { name: 'Energy Use', metric: 'Total Energy Use', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Total Renewable Energy', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Total Non-Renewable Energy', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Non-Renewable Energy Sources', isApplicable: true, scoringAchieved: '' }, // Consider using a different input type here (e.g., select, multi-select, or text area) 

        // Greenhouse gas emissions
        { name: 'Greenhouse gas emissions', metric: 'Carbon Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Car Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Refrigerant Gas Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Diesel Generators Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Electricity Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'ATM Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Total Indirect Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Flight Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Cash-In-Transit Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Car Rentals Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Cloud Computing Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Courier Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Paper Usage Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Waste Disposal Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Employee Commuting Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Electricity Transmission Losses Emissions', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Carbon Emissions Per Meter Squared', isApplicable: true, scoringAchieved: '' },

        // Waste Management
        { name: 'Waste Management', metric: 'Total Waste', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Recycled Waste', isApplicable: true, scoringAchieved: '' },
        { name: '', metric: 'Waste to Landfill', isApplicable: true, scoringAchieved: '' },
      ],
    }
  },

  // computed: {
  //     sectionStatus() {
  //   if (this.metrics.every(item => item.isApplicable)) {
  //     return 'Complete';
  //   } else if (this.metrics.every(item => !item.isApplicable)) {
  //     return 'Not Applicable';
  //   } else {
  //     return 'Partial';
  //   }
  // }
  // },

  computed: {
    sectionStatus() {
      // Check if all text fields have some value (not empty strings)
      const allFieldsFilled = this.metrics.every(item => item.scoringAchieved.trim() !== '');

      if (allFieldsFilled) {
        return 'Complete';
      } else if (this.metrics.every(item => item.scoringAchieved.trim() === '')) {
        return 'Not Started'; 
      } else {
        return 'Partial';
      }
    }
  },


  methods: {
    prependIcon(index) {
      // Customize prepend icon based on metric type or index
      if (index === 0 || index === 1 || index === 2 ) { // Assuming these are numerical metrics
        return '$';
      } else { 
        return '#'; 
      }
    },
    handleSwitchChange(item, index) {
    if (!item.isApplicable) {
      // If the metric is marked as not applicable, clear its scoringAchieved
      this.metrics[index].scoringAchieved = '';
    }
  },
    saveMetricsToParent() {
      this.$emit('updateEnvironmentalMetrics', this.metrics); 
      console.log(this.metrics);
    }
  },

  watch: {
  allApplicable(newValue) {
    const applicable = newValue === 'false';
    this.metrics.forEach(item => (item.isApplicable = applicable));
  },
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
  max-height: 55vh; /* Adjust this value as needed */
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
</style>