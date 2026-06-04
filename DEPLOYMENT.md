# Mystique Compass - Quick Start Guide

## 🚀 Deployment Checklist

- [ ] **Prerequisites Installed**
  - [ ] Azure CLI
  - [ ] Azure Functions Core Tools
  - [ ] Python 3.11+
  - [ ] Git

- [ ] **Azure Account Setup**
  - [ ] Azure account created and verified
  - [ ] Subscription active

- [ ] **Automated Setup (Recommended)**
  ```bash
  chmod +x setup-azure.sh
  ./setup-azure.sh
  ```

- [ ] **Manual Setup (Alternative)**
  - [ ] Run commands from `AZURE_SETUP.md`
  - [ ] Create Service Principal
  - [ ] Note the credentials

- [ ] **GitHub Secrets Configured**
  - [ ] `AZURE_CLIENT_ID` added
  - [ ] `AZURE_TENANT_ID` added
  - [ ] `AZURE_SUBSCRIPTION_ID` added

- [ ] **Test Locally**
  ```bash
  func start
  # Visit http://localhost:7071/api/health
  ```

- [ ] **Deploy to Azure**
  ```bash
  git add .
  git commit -m "Deploy Mystique Compass to Azure Functions"
  git push origin master
  ```

## 📋 Verification Steps

### 1. Check GitHub Actions Workflow
- Go to: https://github.com/SalemKingSK/numerology-engine-web/actions
- Look for the `Deploy to Azure Functions` workflow
- Check if build passed ✅

### 2. Verify Azure Function App
```bash
# Get function app details
az functionapp show --name mystique-compass --resource-group mystique-compass-rg

# View deployment logs
az functionapp log tail --name mystique-compass --resource-group mystique-compass-rg
```

### 3. Test the Endpoints
```bash
# Get your function URL from Azure Portal or:
az functionapp function show \
  --name mystique-compass \
  --resource-group mystique-compass-rg \
  --function-name HealthCheck \
  --query invokeUrlTemplate

# Test health endpoint
curl https://<your-function-url>/api/health

# Test welcome endpoint
curl https://<your-function-url>/api/welcome?name=YourName
```

## 🔍 Troubleshooting

### Issue: Deployment Failed in GitHub Actions
**Solution:**
1. Check GitHub Actions logs for error messages
2. Verify all secrets are correctly set (no extra spaces)
3. Ensure Service Principal has correct permissions
4. Re-run the workflow manually: Actions → Deploy to Azure Functions → Run workflow

### Issue: Function App Not Responding
**Solution:**
```bash
# Check function app status
az functionapp show --name mystique-compass --resource-group mystique-compass-rg --query state

# Restart function app if needed
az functionapp restart --name mystique-compass --resource-group mystique-compass-rg

# Check streaming logs
az functionapp log stream --name mystique-compass --resource-group mystique-compass-rg
```

### Issue: Local Testing Not Working
**Solution:**
```bash
# Ensure dependencies installed
pip install -r requirements.txt

# Clear any cached files
rm -rf .venv __pycache__ .pytest_cache

# Start functions locally with verbose logging
func start --verbose
```

## 📊 Monitoring & Logs

### Azure Portal Monitoring
1. Go to: https://portal.azure.com
2. Search for "mystique-compass"
3. Navigate to: Function App → Monitor → Application Insights
4. View real-time metrics and logs

### Command Line Logs
```bash
# Streaming logs
az functionapp log stream --name mystique-compass --resource-group mystique-compass-rg

# Download logs
az functionapp log download --name mystique-compass --resource-group mystique-compass-rg --output-zip logs.zip
```

## 💰 Cost Optimization

- **Consumption Plan** (Current): Pay only for execution time
- Estimated monthly cost: ~$0.20 (with free tier included)
- Monitor usage: Azure Portal → Function App → Monitor → Metrics

## 🔐 Security Best Practices

1. **Environment Variables**: Store sensitive data in Azure Key Vault
2. **CORS**: Configure CORS settings in Function App settings
3. **Authentication**: Consider adding Azure AD authentication
4. **Secrets**: Rotate Service Principal credentials periodically

## 📚 Useful Resources

- [Azure Functions Python Docs](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-python)
- [Azure CLI Reference](https://learn.microsoft.com/en-us/cli/azure/)
- [GitHub Actions Azure Integration](https://github.com/Azure/actions)
- [Azure Functions Pricing](https://azure.microsoft.com/en-us/pricing/details/functions/)

## 🎯 Next Steps After Deployment

1. **Integrate Your API**: Connect the deployed function endpoints
2. **Add More Functions**: Create additional Azure Functions as needed
3. **Configure Monitoring**: Set up alerts in Application Insights
4. **Enable Authentication**: Secure your endpoints with Azure AD
5. **Set Up CI/CD**: The workflow is ready for automated deployments!

---

**Need help?** Check the logs with: `az functionapp log tail --name mystique-compass --resource-group mystique-compass-rg`
