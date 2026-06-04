# Azure Functions Python Application Setup

This directory contains the configuration for deploying the Mystique Compass application to Azure Functions.

## Prerequisites

1. **Azure Account** - Create a free account at [azure.microsoft.com](https://azure.microsoft.com)
2. **Azure CLI** - Install from [Azure CLI docs](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
3. **Azure Functions Core Tools** - Install from [Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
4. **Python 3.11+** - Required runtime version

## Files Overview

- `requirements.txt` - Python package dependencies for Azure Functions
- `host.json` - Azure Functions host configuration
- `local.settings.json` - Local development settings (git-ignored in production)
- `.github/workflows/deploy-azure-functions.yml` - GitHub Actions CI/CD pipeline

## Setup Instructions

### 1. Create Azure Function App

```bash
az login
az group create --name mystique-compass-rg --location eastus
az functionapp create \
  --resource-group mystique-compass-rg \
  --consumption-plan-location eastus \
  --runtime python \
  --runtime-version 3.11 \
  --functions-version 4 \
  --name mystique-compass
```

### 2. Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and Variables > Actions):

- `AZURE_CLIENT_ID` - Your Azure Service Principal Client ID
- `AZURE_TENANT_ID` - Your Azure Tenant ID
- `AZURE_SUBSCRIPTION_ID` - Your Azure Subscription ID

### 3. Create Service Principal (for CI/CD)

```bash
az ad sp create-for-rbac \
  --name "mystique-compass-sp" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/mystique-compass-rg
```

### 4. Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Start local function runtime
func start
```

### 5. Deploy

Push to `master` branch to trigger automatic deployment via GitHub Actions.

## Environment Variables

Configure these in Azure Portal > Function App > Configuration:

- `FUNCTIONS_WORKER_RUNTIME`: python
- `FUNCTIONS_EXTENSION_VERSION`: ~4

## Troubleshooting

- Check deployment logs: Azure Portal > Function App > Deployment Center
- View runtime logs: `az functionapp log tail --name mystique-compass --resource-group mystique-compass-rg`
- Test locally first: `func start` before pushing to GitHub

## Documentation

- [Azure Functions Python Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-python)
- [GitHub Actions for Azure](https://github.com/Azure/actions)
