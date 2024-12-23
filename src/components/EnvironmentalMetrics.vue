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
  name: 'EnvironmentalMetricsPage',

  data() {
    return {
      allApplicable: false, 
      metrics: [
          // Energy Use
        { category: 'Energy Use', name: 'Total Energy Use', metric: 'TotalEnergyUse', scoringAchieved: '' },
        { category: '', name: 'Total Renewable Energy', metric: 'TotalRenewableEnergy', scoringAchieved: '' },
        { category: '', name: 'Total Non-Renewable Energy', metric: 'TotalNonRenewableEnergy', scoringAchieved: '' },
        { category: '', name: 'Non-Renewable Energy Sources', metric: 'NonRenewableEnergySources', scoringAchieved: '' }, 

        // Greenhouse gas emissions
        { category: 'Greenhouse gas emissions', name: 'Carbon Emissions', metric: 'CarbonEmissions', scoringAchieved: '' },
        { category: 'Emissions', name: 'Scope 1', metric: 'Scope1', scoringAchieved: '' },
        { category: '', name: 'Scope 2', metric: 'Scope2', scoringAchieved: '' },  
        { category: '', name: 'Scope 3', metric: 'Scope3', scoringAchieved: '' },  
        { category: '', name: 'Car Emissions', metric: 'CarEmissions', scoringAchieved: '' },
        { category: '', name: 'Refrigerant Gas Emissions', metric: 'RefrigerantGasEmissions', scoringAchieved: '' },
        { category: '', name: 'Diesel Generators Emissions', metric: 'DieselGeneratorsEmissions', scoringAchieved: '' },
        { category: '', name: 'Electricity Emissions', metric: 'ElectricityEmissions', scoringAchieved: '' },
        { category: '', name: 'ATM Emissions', metric: 'ATMEmissions', scoringAchieved: '' },
        { category: '', name: 'Total Indirect Emissions', metric: 'TotalIndirectEmissions', scoringAchieved: '' },
        { category: '', name: 'Flight Emissions', metric: 'FlightEmissions', scoringAchieved: '' },
        { category: '', name: 'Cash-In-Transit Emissions', metric: 'CashInTransitEmissions', scoringAchieved: '' },
        { category: '', name: 'Car Rentals Emissions', metric: 'CarRentalsEmissions', scoringAchieved: '' },
        { category: '', name: 'Cloud Computing Emissions', metric: 'CloudComputingEmissions', scoringAchieved: '' },
        { category: '', name: 'Courier Emissions', metric: 'CourierEmissions', scoringAchieved: '' },
        { category: '', name: 'Paper Usage Emissions', metric: 'PaperUsageEmissions', scoringAchieved: '' },
        { category: '', name: 'Waste Disposal Emissions', metric: 'WasteDisposalEmissions', scoringAchieved: '' },
        { category: '', name: 'Employee Commuting Emissions', metric: 'EmployeeCommutingEmissions', scoringAchieved: '' },
        { category: '', name: 'Electricity Transmission Losses Emissions', metric: 'ElectricityTransmissionLossesEmissions', scoringAchieved: '' },
        { category: '', name: 'Carbon Emissions Per Meter Squared', metric: 'CarbonEmissionsPerMeterSquared', scoringAchieved: '' },

        // Waste Management
        { category: 'Waste Management', name: 'Total Waste', metric: 'TotalWaste', scoringAchieved: '' },
        { category: '', name: 'Recycled Waste', metric: 'RecycledWaste', scoringAchieved: '' },
        { category: '', name: 'Waste to Landfill', metric: 'WasteToLandfill', scoringAchieved: '' },
        { category: 'Water Management', name: 'Total Water Consumption', metric: 'TotalWaterConsumption', scoringAchieved: '' },
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
        'Total Energy Use', 
        'Total Renewable Energy', 
        'Total Non-Renewable Energy', 
        'Carbon Emissions',
        'Car Emissions', 
        'Refrigerant Gas Emissions', 
        'Diesel Generators Emissions', 
        'Electricity Emissions', 
        'ATM Emissions', 
        'Total Indirect Emissions', 
        'Flight Emissions', 
        'Cash-In-Transit Emissions', 
        'Car Rentals Emissions', 
        'Cloud Computing Emissions', 
        'Courier Emissions', 
        'Paper Usage Emissions', 
        'Waste Disposal Emissions', 
        'Employee Commuting Emissions', 
        'Electricity Transmission Losses Emissions', 
        'Carbon Emissions Per Meter Squared', 
        'Total Waste', 
        'Recycled Waste', 
        'Waste to Landfill'
      ];

      if (numericalMetrics.includes(metricName)) {
        return '#'; 
      } else {
        return ''; // No prepend icon for other metrics
      }
    },
    
    saveMetricsToParent() {
      // Extract applicable metrics and their scores
      const applicableMetrics = this.metrics.map(metric => ({
        metric: metric.metric,
        scoringAchieved: metric.scoringAchieved
      }));

      this.$emit('updateEnvironmentalMetrics', applicableMetrics); 
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