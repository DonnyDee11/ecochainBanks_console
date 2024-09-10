<template>
	<div class="auth-container">
		<div class="auth-branding">
			<Authbranding />
		</div>

		<div class="auth-form">
			<v-form v-model="valid">
				<v-container>
					<v-row>
						<v-col cols="12">
							<h2 class="auth-heading">Sign in to Ecochain</h2>
						</v-col>

						<v-col cols="12">
							<label>Email</label>
							<v-text-field class="rounded-border" v-model="email" :rules="emailRules"
								placeholder="Enter your email" append-inner-icon="mdi-email-outline" v-bind="commonProps"
								required></v-text-field>
						</v-col>

						<v-col cols="12">
							<label>Password</label>
							<v-text-field class="rounded-border" v-model="password" type="password" :rules="passwordRules"
								placeholder="Enter your password" append-inner-icon="mdi-lock-outline" v-bind="commonProps"
								required></v-text-field>
						</v-col>

					</v-row>
					<v-row class="mt-3">
						<v-col cols="12">
							<v-btn block @click="submitForm" :disabled="!valid" variant="flat" :color="'#3056D3'"
								class="text-none">
								Sign in
							</v-btn>
							<v-col cols="12" v-for="(error, index) in errors" :key="index">
								<v-alert type="error" dense>
									{{ error }}
								</v-alert>
							</v-col>

							<p class="mt-3">
								Don't have an account?
								<router-link to="/SignUp">Sign up</router-link>

							</p>

						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</div>
	</div>
</template>

<script>
import Authbranding from './AuthBranding.vue';
import axios from 'axios';
import config from './config';

export default {
	components: { Authbranding },
	data() {

		return {
			errors: [],
			valid: false,
			email: '',
			password: '',
			commonProps: {
				variant: 'outlined',
				color: '#3C7931',
				class: 'custom-border',
			},
			emailRules: [
				value => !!value || 'Email is required.',
				value => /.+@.+\..+/.test(value) || 'Email entered is not valid.',
			],
			passwordRules: [
				value => !!value || 'Please type password.',
				value => value.length >= 6 || 'Minimum 6 characters required.',
			],
		};
	},

	methods: {
	async submitForm() {
		this.errors = [];

		if (this.valid) {
			console.log('Form is valid, proceed with submission');
			try {
				const response = await axios.post(config.backendApiUrl.concat("/login"), {
					email: this.email,
					password: this.password,
				});

				console.log('Response from backend:', response.data);

				if (response.data.access_token) {
					console.log("Login successful. Redirecting...");
					localStorage.setItem('access_token', response.data.access_token);
					this.$router.push('/dashboard');
				} else {
					this.errors.push(response.data.message || "An error occurred during login.");
				}
			} catch (error) {
				console.error('Error during login:', error.message);
				this.errors.push("Please ensure your entered the correct email & password");
			}
		} else {
			this.errors.push("Please ensure all fields are filled out correctly.");
		}
	}
}

};


</script>



<style scoped>
.auth-container {
	display: grid;
	grid-template-columns: 1.5fr 2fr;
	gap: 80px;
	align-items: center;
	height: 100vh;
}

.auth-form {
	margin-top: -50px;
}

.auth-heading {
	margin-bottom: 30px;
	text-align: left;
	font-family: 'Abyssinica SIL', sans-serif;
}</style>