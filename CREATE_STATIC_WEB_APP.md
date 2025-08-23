# 🚀 Create New Azure Static Web App

Since we need to create a fresh Static Web App for the new monorepo structure, here's how to do it:

## Option 1: Azure Portal (Recommended)

1. **Go to Azure Portal**: https://portal.azure.com
2. **Create Static Web App**:
   - Click "Create a resource" → "Static Web App"
   - **Resource Group**: `rg-timetravellers-empordium-demo` (your existing one)
   - **Name**: `time-travelers-emporium-new`
   - **Region**: East US 2
   - **SKU**: Free

3. **GitHub Integration**:
   - **Source**: GitHub
   - **Organization**: davearlin
   - **Repository**: time-travelers-emporium
   - **Branch**: main
   - **Build Presets**: Custom
   - **App location**: `/frontend`
   - **Api location**: (leave empty)
   - **Output location**: `dist`

4. **After Creation**:
   - Azure will automatically create a GitHub secret
   - Copy the secret name (something like `AZURE_STATIC_WEB_APPS_API_TOKEN_[RANDOM]`)
   - Update the workflow file to use this new secret

## Option 2: Azure CLI (If you have permissions)

```bash
az login
az staticwebapp create \
  --name "time-travelers-emporium-new" \
  --resource-group "rg-timetravellers-empordium-demo" \
  --source "https://github.com/davearlin/time-travelers-emporium" \
  --location "East US 2" \
  --branch "main" \
  --app-location "/frontend" \
  --output-location "dist" \
  --sku "Free"
```

## 🔧 After Setup

1. **Update Workflow**: Edit `.github/workflows/azure-static-web-apps-new.yml` to use the correct secret name
2. **Test Deploy**: Make any change to trigger deployment
3. **Disable Old Workflows**: Once working, disable the old workflow files

## 💰 Cost

- **Free tier**: 100GB bandwidth, custom domains, SSL certificates
- **Perfect for demo**: No ongoing costs!

The new Static Web App will be optimized for your monorepo structure and should deploy successfully!
