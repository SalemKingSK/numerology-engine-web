#!/bin/bash

# Azure Functions Deployment Setup Script for Mystique Compass
# This script automates the Azure resource creation and GitHub Actions configuration

set -e

echo "🔧 Mystique Compass - Azure Functions Setup"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
RESOURCE_GROUP="mystique-compass-rg"
FUNCTION_APP_NAME="mystique-compass"
LOCATION="eastus"
SUBSCRIPTION_NAME=""

echo ""
echo -e "${YELLOW}Step 1: Azure Authentication${NC}"
echo "Logging into Azure..."
az login

echo ""
echo -e "${YELLOW}Step 2: Set Default Subscription${NC}"
echo "Available subscriptions:"
az account list --query "[].{Name:name, ID:id}" --output table

read -p "Enter your Subscription ID: " SUBSCRIPTION_ID
az account set --subscription "$SUBSCRIPTION_ID"

echo ""
echo -e "${YELLOW}Step 3: Create Resource Group${NC}"
echo "Creating resource group: $RESOURCE_GROUP in $LOCATION"
az group create --name "$RESOURCE_GROUP" --location "$LOCATION"

echo ""
echo -e "${YELLOW}Step 4: Create Storage Account${NC}"
STORAGE_ACCOUNT="${FUNCTION_APP_NAME}storage"
az storage account create \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku Standard_LRS

echo ""
echo -e "${YELLOW}Step 5: Create Azure Function App${NC}"
echo "Creating function app: $FUNCTION_APP_NAME"
az functionapp create \
  --resource-group "$RESOURCE_GROUP" \
  --consumption-plan-location "$LOCATION" \
  --runtime python \
  --runtime-version 3.11 \
  --functions-version 4 \
  --name "$FUNCTION_APP_NAME" \
  --storage-account "$STORAGE_ACCOUNT"

echo ""
echo -e "${YELLOW}Step 6: Create Service Principal${NC}"
echo "Creating Service Principal for GitHub Actions CI/CD..."
SP_NAME="mystique-compass-sp"
RESOURCE_GROUP_ID="/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP"

SP_JSON=$(az ad sp create-for-rbac \
  --name "$SP_NAME" \
  --role contributor \
  --scopes "$RESOURCE_GROUP_ID" \
  --json-auth)

CLIENT_ID=$(echo "$SP_JSON" | jq -r '.clientId')
TENANT_ID=$(echo "$SP_JSON" | jq -r '.tenantId')
CLIENT_SECRET=$(echo "$SP_JSON" | jq -r '.clientSecret')

echo ""
echo -e "${GREEN}✅ Service Principal Created${NC}"
echo -e "${YELLOW}Save these values in GitHub Secrets:${NC}"
echo ""
echo "AZURE_CLIENT_ID: $CLIENT_ID"
echo "AZURE_TENANT_ID: $TENANT_ID"
echo "AZURE_SUBSCRIPTION_ID: $SUBSCRIPTION_ID"
echo ""

echo -e "${YELLOW}Step 7: GitHub Actions Setup${NC}"
echo ""
echo "To complete the GitHub Actions setup, add these secrets to your repository:"
echo "1. Go to: https://github.com/SalemKingSK/numerology-engine-web/settings/secrets/actions"
echo "2. Create the following secrets:"
echo ""
echo "   Name: AZURE_CLIENT_ID"
echo "   Value: $CLIENT_ID"
echo ""
echo "   Name: AZURE_TENANT_ID"
echo "   Value: $TENANT_ID"
echo ""
echo "   Name: AZURE_SUBSCRIPTION_ID"
echo "   Value: $SUBSCRIPTION_ID"
echo ""

echo ""
echo -e "${YELLOW}Step 8: Function App Configuration${NC}"
echo "Adding application settings..."
az functionapp config appsettings set \
  --name "$FUNCTION_APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --settings \
    FUNCTIONS_WORKER_RUNTIME=python \
    FUNCTIONS_EXTENSION_VERSION="~4"

echo ""
echo -e "${GREEN}✅ Azure Setup Complete!${NC}"
echo ""
echo "🚀 Next Steps:"
echo "1. Add the GitHub secrets shown above"
echo "2. Push changes to master branch: git push origin master"
echo "3. Check GitHub Actions to see your deployment: https://github.com/SalemKingSK/numerology-engine-web/actions"
echo ""
echo "📊 View your function app:"
echo "   https://portal.azure.com/#resource$RESOURCE_GROUP_ID/providers/Microsoft.Web/sites/$FUNCTION_APP_NAME"
echo ""
