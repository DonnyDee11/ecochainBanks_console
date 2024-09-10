## 🚀 Setting Up Your Workspace for EcoChainConsole

### Prerequisites

1. **Node.js and npm**: Ensure you have Node.js and npm installed. If not, [download and install Node.js](https://nodejs.org/), which includes npm.

   Verify the installation by running:

   ```bash
   node -v
   npm -v
   ```

2. **Vue CLI (Optional)**: This provides a full system for rapid Vue.js development. Install it via:

   ```bash
   npm install -g @vue/cli
   ```

### Step-by-Step Guide

1. **Clone the EcoChainConsole Repository**:

   Get a copy of the project on your local machine:

   ```bash
   git clone https://github.com/DonnyDee11/ecochainBanks_console.git
   ```

2. **Navigate to the EcoChainConsole Directory**:

   ```bash
   cd ecochainBanks_console
   ```

3. **Install Dependencies**:

   Install the necessary packages the project uses:

   ```bash
   npm install
   ```

4. **Create a Feature Branch**:

   Before you start making changes, create a new branch for the specific feature or fix you're working on. This ensures that the `main` branch remains stable.

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Replace `your-feature-name` with a descriptive name for your feature.

5. **Run the Development Server**:

   Start the local development server:

   ```bash
   npm run serve
   ```

   The project should launch in your default web browser. If not, navigate to the displayed URL in your terminal (usually `http://localhost:8080/`).

6. **Making Changes**:

   - Work on your feature, making changes as needed.
   - Regularly commit your work to save progress on your feature branch.

     ```bash
     git add .
     git commit -m "Describe the changes or progress made"
     ```

7. **Merging Your Feature**:

   Once your feature is complete and tested, and your branch runs locally:

   - Switch back to the main branch:

     ```bash
     git checkout main
     ```

   - Merge your feature branch into the main branch:

     ```bash
     git merge feature/your-feature-name
     ```

8. **Pushing Changes**:

   Push the merged changes to the GitHub repository:

   ```bash
   git push origin main
   ```

The branching strategy ensures that the `main` branch always remains stable and that new features or changes are developed and tested in isolation before being integrated. 

### Final Thoughts

Congratulations! 🎉 You've set up your workspace for the EcoChainConsole project and learned the workflow for feature development. Dive deeper into Vue.js development by exploring the [Vue.js documentation](https://vuejs.org/v2/guide/) and related tools.
