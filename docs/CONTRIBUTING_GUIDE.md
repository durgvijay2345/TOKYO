# 📘 Contribution Guide: 4-Day Sprint Workflow

Welcome to the team! This guide will walk you through strictly how to clone the repository, create your own branch, and push your code over our 4-day sprint cycle. 

**CRITICAL RULE:** Never push code directly to the `main` branch.

---

## 📅 Day 1: Setup & Branching

Before you write any code, you need to get the project on your machine and create your own isolated workspace (branch).

1. **Clone the repository to your computer:**
   ```bash
   git clone https://github.com/durgvijay2345/TOKYO.git
   cd TOKYO
   ```

2. **Always start by making sure your `main` branch is up to date:**
   ```bash
   git checkout main
   git pull origin main
   ```

3. **Create your feature branch:**
   Name your branch something descriptive based on what you are assigned.
   ```bash
   # Example names: feature/login-ui, bugfix/database-crash
   git checkout -b feature/your-feature-name
   ```

You are now in your own branch! Any code you write here won't affect anyone else on the team. Run `npm run install:all` to install dependencies and begin coding.

---

## 📅 Day 2 & 3: Coding & Daily Saves

As you write code over the next two days, it is incredibly important to "save your progress" to GitHub at the end of every day. This prevents data loss if your computer crashes.

At the end of your workday, run these commands in your terminal:

1. **Check which files you changed:**
   ```bash
   git status
   ```

2. **Stage all your changes:**
   ```bash
   git add .
   ```

3. **Commit (save) your changes with a short message explaining what you did today:**
   ```bash
   git commit -m "Day 2 progress: Built the new React components for the dashboard"
   ```

4. **Upload (push) your branch to GitHub:**
   *Note: You only need the `-u origin...` part the very first time you push a new branch.*
   ```bash
   git push -u origin feature/your-feature-name
   ```
   *(For Day 3, you can just type `git push`)*

---

## 📅 Day 4: Final Review & Pull Request

Today is the deadline. You need to verify your code works, push your final changes, and ask the Tech Lead to merge your code into the `main` production branch.

1. **Test your code locally:**
   Make sure `npm run dev` starts successfully and there are no errors in the console.

2. **Push your final code:**
   ```bash
   git add .
   git commit -m "Finalizing feature and fixing remaining bugs"
   git push
   ```

3. **Open the Pull Request (PR):**
   * Go to the repository page on GitHub.com.
   * You will see a green banner that says *"feature/your-feature-name had recent pushes"*. Click **Compare & pull request**.
   * Write a short description detailing exactly what you built in the description box.
   * Click the green **Create pull request** button.

🎉 **You are done!** The Tech Lead will now review your Pull Request. If they request changes, simply make the edits on your computer, `git add`, `git commit`, and `git push` again. The Pull Request will update automatically!
