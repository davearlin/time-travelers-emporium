# Deployment Guide

This guide explains how to deploy the Time Travelers' Emporium full-stack application to Azure with minimal costs.

## 🏗️ Architecture Overview

- **Frontend**: React app deployed to Azure Static Web Apps (FREE tier)
- **Backend**: Express.js API + MCP server deployed to Azure Container Instances (~$3-5/month)
- **Total Cost**: ~$3-5/month for demo usage

## 🚀 Quick Deploy Steps

### 1. Prerequisites ✅

**You already have these configured:**
- ✅ Azure resource group: `rg-timetravellers-empordium-demo`
- ✅ GitHub secrets for Static Web Apps:
  - `AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_SKY_060FD1310` (main branch)
  - `AZURE_STATIC_WEB_APPS_API_TOKEN_PURPLE_DUNE_0599E3E10` (afterrebrand branch)
  - Additional environment tokens for other deployments
- ✅ Azure Static Web Apps instances ready and working

**Additional setup needed for backend:**
- Azure CLI installed and logged in (for backend container deployment)
- GitHub Container Registry permissions (automatically configured)

### 2. Frontend Deployment (Azure Static Web Apps) ✅

**Your frontend deployment is already configured!**

The workflows are set up to deploy:
- **Main branch** → Green Sky environment (`AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_SKY_060FD1310`)
- **Afterrebrand branch** → Purple Dune environment (`AZURE_STATIC_WEB_APPS_API_TOKEN_PURPLE_DUNE_0599E3E10`)

The updated workflows will:
1. Build the frontend from the `frontend/` directory
2. Deploy to your existing Azure Static Web Apps
3. Only trigger on frontend/shared code changes (optimized)

1. **Automatic**: Push to `main` branch triggers deployment
2. **Manual**: Go to GitHub Actions and run the "Azure Static Web Apps CI/CD - Frontend" workflow

The workflow will:
- Build the React app from `frontend/` directory
- Deploy to Azure Static Web Apps
- Provide a public URL (e.g., `https://purple-dune-0599e3e10.azurestaticapps.net`)

### 3. Backend Deployment (Azure Container Instances)

The backend will deploy to your existing resource group: `rg-timetravellers-empordium-demo`

#### Setup Steps:

**No additional setup needed!** The workflow is configured to use your existing resource group.

The backend deployment workflow will:
1. Build a Docker container with your Express.js API + MCP server
2. Push to GitHub Container Registry (free for public repos)  
3. Deploy to Azure Container Instances in your existing resource group
4. Create a public endpoint like: `https://time-travelers-backend-123.eastus.azurecontainer.io`

#### Trigger Deployment:

**Automatic**: Push changes to `backend/` or `shared/` folders
**Manual**: Run "Deploy Backend to Azure Container Instances" workflow in GitHub Actions
   Go to GitHub → Settings → Secrets and add:
   ```
   AZURE_RESOURCE_GROUP=time-travelers-rg
   ```

3. **Trigger Deployment**:
   - Push changes to `backend/` or `shared/` folders
   - Or manually trigger "Deploy Backend to Azure Container Instances" workflow

#### Option B: Use Azure CLI

```bash
# Login to Azure
az login

# Create resource group
az group create --name time-travelers-rg --location "East US"

# The GitHub Action will handle container deployment
```

### 4. Connect Frontend to Backend

The deployment workflows automatically configure the frontend to connect to the deployed backend:

- **Production**: `https://time-travelers-backend-{run-number}.eastus.azurecontainer.io`
- **Development**: `http://localhost:3001` (for local development)

## 🔧 Configuration Details

### Environment Variables

The frontend uses these environment variables:

```bash
# Production (automatic)
VITE_API_BASE_URL=https://time-travelers-backend-{run-number}.eastus.azurecontainer.io

# Development (local)
VITE_API_BASE_URL=http://localhost:3001
```

### Workflow Triggers

1. **Frontend workflows** trigger on changes to:
   - `frontend/**`
   - `shared/**`
   - Workflow files

2. **Backend workflow** triggers on changes to:
   - `backend/**`
   - `shared/**`
   - Workflow files

### Cost Optimization

1. **Azure Static Web Apps**: FREE tier (100GB bandwidth/month)
2. **Azure Container Instances**: Pay-per-second billing
   - CPU: 0.5 cores (~$10/month if running 24/7, ~$3/month for demo usage)
   - Memory: 1GB
   - **Cost Control**: Container automatically stops when not in use

## 🧪 Testing the Deployment

### Frontend Testing
1. Visit the Azure Static Web Apps URL
2. Verify all pages load correctly
3. Test authentication (launchuser/password)
4. Add items to cart and proceed to checkout

### Backend Testing
1. Test API health check: `GET {backend-url}/health`
2. Test products endpoint: `GET {backend-url}/api/products`
3. Test MCP server: Connect via WebSocket or stdio

### MCP Server Testing
The MCP server is available at the same URL as the REST API but uses different transport:
- **HTTP**: For web-based MCP clients
- **stdio**: For command-line MCP clients

## 🔍 Monitoring & Troubleshooting

### GitHub Actions Logs
- Check workflow logs in GitHub Actions tab
- Look for build or deployment failures

### Azure Logs
```bash
# Check container logs
az container logs --resource-group time-travelers-rg --name time-travelers-backend

# Check container status
az container show --resource-group time-travelers-rg --name time-travelers-backend --query instanceView
```

### Common Issues

1. **Build Failures**: Check Node.js version compatibility
2. **Container Start Issues**: Verify environment variables
3. **CORS Errors**: Backend automatically configures CORS for frontend domain

## 💰 Cost Management

### Minimize Costs
1. **Stop container when not demoing**:
   ```bash
   az container stop --resource-group time-travelers-rg --name time-travelers-backend
   ```

2. **Restart for demos**:
   ```bash
   az container start --resource-group time-travelers-rg --name time-travelers-backend
   ```

3. **Delete resources after demo**:
   ```bash
   az group delete --name time-travelers-rg --yes
   ```

### Cost Monitoring
- Set up Azure budget alerts
- Monitor usage in Azure Cost Management

## 🔄 Updates & Maintenance

### Code Updates
1. **Frontend**: Push to main branch → automatic deployment
2. **Backend**: Push changes → triggers new container build/deploy
3. **Shared**: Changes trigger both frontend and backend deployments

### Scaling (if needed)
- **Frontend**: Azure Static Web Apps scales automatically
- **Backend**: Increase container resources in workflow or Azure portal

---

This setup provides a production-ready, cost-effective deployment suitable for demos and small-scale applications.
