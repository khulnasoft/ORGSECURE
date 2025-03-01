name: CI Workflow

on:
  push:
    branches:
      - main
      - 'feature/*'
      - 'bugfix/*'
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 0 * * 1' # Runs every Monday at midnight

jobs:
  dependabot:
    name: Dependabot Check
    runs-on: ubuntu-latest
    steps:
      - name: Check for outdated dependencies
        uses: dependabot/dependabot-core
        with:
          package-manager: 'npm' # Change to your package manager (e.g., 'npm', 'bundler', etc.)
          directory: '/' # Change to your project directory if needed
          schedule: 'daily' # Change to your preferred schedule

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14' # Change to your required Node.js version

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

  codeql:
    name: CodeQL Analysis
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: 'javascript' # Change to your project's language(s)

      - name: Build the code
        run: npm run build # Change this if your build command is different

      - name: Run CodeQL Analysis
        uses: github/codeql-action/analyze@v2

  security-checks:
    name: Security Checks
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Run security checks
        run: |
          npm audit --production # Change this command based on your package manager