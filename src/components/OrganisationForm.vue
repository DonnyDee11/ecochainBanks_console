<template>
	<div>
		<div class="auth-container">
			<div class="auth-branding">
				<!-- Include your branding component here -->
				<Authbranding />
			</div>
			<div class="auth-form">
				<v-form v-model="valid" ref="form">
					<v-container>
						<v-row>
							<v-col cols="12">
								<h2 class="auth-heading">Just a few details...</h2>
							</v-col>
						</v-row>

						<v-col cols="12">
							<label>Location</label>
							<v-text-field class="rounded-border" placeholder="Where is you organisation based?"
								v-model="location" v-bind="commonProps" append-inner-icon="mdi-account-outline"
								required></v-text-field>
						</v-col>

						<v-col cols="12">
							<label>Industry</label>
							<v-text-field class="rounded-border" placeholder="What industry is your organisation in?"
								v-model="industry" v-bind="commonProps" append-inner-icon="mdi-account-outline"
								required></v-text-field>
						</v-col>

						<v-col cols="12">
							<label>Size</label>
							<v-text-field class="rounded-border" placeholder="How many people are in your organisation?"
								v-model="size" v-bind="commonProps" append-inner-icon="mdi-account-outline"
								required></v-text-field>
						</v-col>

						<v-col cols="12">
							<label>Description</label>
							<v-text-field class="rounded-border" placeholder="Describe your organisation?"
								v-model="description" v-bind="commonProps" append-inner-icon="mdi-account-outline"
								required></v-text-field>
						</v-col>

						<!-- <v-col cols="12">
							<label>User Type</label>
							<v-radio-group v-model="userType" column>
								<v-radio label="Employee" value="radio-1"></v-radio>
								<v-radio label="Investor" value="radio-2"></v-radio>
							</v-radio-group>
						</v-col> -->

						<v-row class="mt-3">
							<v-col cols="12">
								<v-btn block @click="submitForm" :disabled="!valid" variant="flat" color="#3056D3"
									class="text-none">
									Complete Registration
								</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</div>
		</div>
	</div>
</template>


<script>
import Authbranding from './AuthBranding.vue';
import axios from 'axios';
import config from './config';

export default {
	data() {
		return {
			commonProps: {
				variant: 'outlined',
				color: '#3C7931',
				class: 'custom-border',
			},
			valid: false,
			location: '',
			industry: '',
			size: '',
			description: ''

		};
	},
	components: {
		Authbranding
	},
	methods: {
		async submitForm() {
			if (this.valid) {
				console.log('Form is valid, proceed with submission');
				try {
					const token = localStorage.getItem('access_token');
					const headers = {
						'Authorization': 'Bearer ' + token
					};

					const response = await axios.post(config.backendApiUrl.concat("/update_org"), {
						location: this.location,
						industry: this.industry,
						size: this.size,
						description: this.description
					}, { headers: headers });
					// Handle the response from the backend here
					console.log('Response from backend:', response.data);

					if (response.data.success) {
						console.log("Attempting redirect...")
						this.$router.push('/dashboard');
					} else {
						console.error('Register failed:', response.data.message);
					}
				} catch (error) {
					console.error('Error:', error);
					// Handle errors here
				}
			} else {
				console.log('Form is not valid');
			}
		}
	},
};
</script>





  


  
<style scoped>
.auth-container {
	display: grid;
	grid-template-columns: 1.5fr 2fr;
	/* Split the container into two columns */
	gap: 80px;
	/* Gap between branding and form */
	align-items: center;
	height: 100vh;
	/* Optionally, set the height to fill the viewport */
}

/* Style the form component */
.auth-form {
	margin-top: -50px;
}

.auth-heading {
	margin-top: 40px;
	text-align: left;
	font-family: 'Abyssinica SIL', sans-serif;


}
</style>
  