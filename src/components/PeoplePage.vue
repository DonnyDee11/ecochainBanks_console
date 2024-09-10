<template>
    <div class="table">
        <v-table class="scrollable-table" style = "width:100%">
            <thead>
                <tr>
                    <td colspan="3" class="text-left text-no-wrap">
                        Complete the sub sections by inputting the scoring achieved for each metric
                    </td>
                    <td colspan="2" class="text-left">
                        <input type="radio" v-model="allApplicable" value="true" />
                        Mark entire category as not applicable
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th class="text-left">Sub section</th>
                    <th class="text-left">Metric</th>
                    <th class="text-left">Scoring</th>
                    <th class="text-left">Applicable</th>
                    <th class="text-left">Scoring achieved</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in metrics" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.Metric }}</td>
                    <td>
                      <a href="https://www.weforum.org/stakeholdercapitalism/our-metrics" target="_blank">
                            <i class="ti-eye"></i> View details and rationale
                        </a>
                    </td>
                    <td>
                        <v-switch 
                            v-model="item.isApplicable" 
                            @change="() => handleSwitchChange(item, index)" 
                            color="#219653">
                        </v-switch>
                    </td>
                    <td>
                        <v-text-field
                            v-model="item.scoringAchieved"
                            :disabled="!item.isApplicable"
                            variant="outlined"
                            style="margin-left: 16px; margin-top: 16px;">
                            <template v-slot:prepend>
                                <span>%</span>
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
    name: 'PeoplePage',
    data() {
        return {
            allApplicable: false, 
            metrics: [
                {
                    name: 'Dignity and equality',
                    Metric: 'Diversity and Inclusion',
                    isApplicable: true,
                    scoringAchieved: '',
                },
                {
                    name: '',
                    Metric: 'Wage Level',
                    isApplicable: true,
                    scoringAchieved: '',
                },
                {
                    name: '',
                    Metric: 'Pay equality',
                    isApplicable: true,
                    scoringAchieved: '',
                },
                {
                    name: 'Health and wellbeing ',
                    Metric: 'Rate of fatalities',
                    isApplicable: true,
                    scoringAchieved: '',
                },
            ],
        };
    },
    methods: {
        handleSwitchChange(item, index) {
            if (!item.isApplicable) {
                this.metrics[index].scoringAchieved = '';
            }
        },
          saveMetricsToParent() {
          this.$emit('updateMetrics', this.metrics);
          console.log(this.metrics)
      }
        
    },
    watch: {
        allApplicable(newValue) {
            this.metrics.forEach(item => (item.isApplicable = !newValue));
        },
       metrics: {
        deep: true,
        handler() {
           this.saveMetricsToParent();
        }
     },
    },
    computed: {
      sectionStatus() {
        if (this.metrics.every(item => item.isApplicable)) {
          return 'Complete';
        } else if (this.metrics.every(item => !item.isApplicable)) {
          return 'Not Applicable';
        } else {
          return 'Partial';
        }
      },
  }
  }
  </script>
  
  
    
  
  
  <style scoped>
  .scrollable-table {
     max-height: 400px; /* Adjust this value to your needs */
     
      overflow: auto;
    
  }
  
  </style>