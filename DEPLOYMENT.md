# Azure Deployment Guide for Time Travelers' Emporium

## Overview
This guide will help you deploy the Time Travelers' Emporium React application to Azure Static Web Apps, which is the most cost-effective solution for demo applications.

## Prerequisites
- Azure subscription with access to the resource group: `rg-timetravellers-empordium-demo`
- GitHub account
- Git repository for your project

## Step-by-Step Deployment

### 1. Push Code to GitHub
First, make sure your code is in a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Create Azure Static Web App

1. Go to the Azure Portal: https://portal.azure.com
2. Navigate to your resource group: `rg-timetravellers-empordium-demo`
3. Click "Create" → Search for "Static Web App" → Click "Create"

#### Configuration:
- **Subscription**: Your subscription
- **Resource Group**: `rg-timetravellers-empordium-demo`
- **Name**: `time-travelers-emporium` (or your preferred name)
- **Plan Type**: Free (perfect for demos)
- **Region**: Choose the closest to your users
- **Source**: GitHub
- **GitHub Account**: Sign in to your GitHub account
- **Organization**: Your GitHub username/organization
- **Repository**: Select your repository
- **Branch**: `main`
- **Build Presets**: React
- **App location**: `/` (root)
- **Output location**: `dist`

4. Click "Review + Create" → "Create"

### 3. Automatic Configuration
Azure will automatically:
- Create a GitHub Actions workflow in your repository
- Set up the necessary secrets in your GitHub repository
- Configure CI/CD for automatic deployments

### 4. Monitor Deployment
1. Go to GitHub → Your Repository → Actions tab
2. You should see a workflow running
3. Once complete, your app will be available at the URL provided in the Azure portal

## Expected Costs
- **Azure Static Web Apps (Free tier)**:
  - 100 GB bandwidth per month (FREE)
  - Custom domains (FREE)
  - SSL certificates (FREE)
  - Global distribution (FREE)

This means your demo will cost **$0/month** unless you exceed 100 GB of bandwidth.

## URL Structure
Your application will be available at:
- Primary URL: `https://<app-name>.<random-id>.azurestaticapps.net`
- You can later add a custom domain if needed

## Configuration Files Created
- `.github/workflows/azure-static-web-apps.yml`: GitHub Actions workflow
- `staticwebapp.config.json`: Azure Static Web Apps configuration for React Router

## Troubleshooting
- If routes don't work properly, the `staticwebapp.config.json` ensures React Router works correctly
- Build logs are available in GitHub Actions
- Application logs are available in Azure Portal → Your Static Web App → Functions

## Security Notes
Since this is a demo application with hardcoded credentials:
- Consider adding environment variables for sensitive data in production
- The current setup is perfect for demo purposes

## Next Steps After Deployment
1. Test all application features on the live URL
2. Share the URL with demo users
3. Monitor usage in Azure Portal if needed

Your application will automatically redeploy whenever you push changes to the main branch!
