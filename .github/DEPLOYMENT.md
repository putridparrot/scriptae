# GitHub Actions Deployment

This project uses GitHub Actions to automatically build, test, and deploy to GitHub Pages.

## Workflow Overview

The deployment workflow (`.github/workflows/deploy.yml`) consists of two jobs:

### 1. Build and Test Job
Runs on every push and pull request to `main`:
- ✅ Checkout code
- ✅ Setup Node.js 20
- ✅ Install dependencies
- ✅ Install Playwright browsers
- ✅ Run linter (non-blocking)
- ✅ Build application
- ✅ Run Playwright tests
- ✅ Upload test reports (available for 30 days)
- ✅ Upload build artifacts

### 2. Deploy Job
Runs only on pushes to `main` branch (after successful tests):
- ✅ Download build artifacts
- ✅ Configure GitHub Pages
- ✅ Upload to Pages
- ✅ Deploy to GitHub Pages

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### 2. Repository Settings

The workflow requires these permissions (already configured in workflow file):
- `contents: read` - Read repository contents
- `pages: write` - Deploy to Pages
- `id-token: write` - Verify deployment

### 3. Base Path Configuration

The `vite.config.ts` is configured to use `/scriptae/` as the base path in production. 

**If your repository name is different**, update line 7 in `vite.config.ts`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

Replace `/your-repo-name/` with your actual repository name.

For custom domains or root deployments, change to:
```typescript
base: '/',
```

## Triggering Deployments

Deployments are triggered automatically when:
- Pushing to the `main` branch
- Merging a pull request to `main`

You can also trigger manually:
1. Go to **Actions** tab
2. Select **Build, Test, and Deploy**
3. Click **Run workflow**

## Viewing Results

### Test Reports
- Test reports are uploaded as artifacts
- Available in the Actions run summary for 30 days
- Download from the workflow run page

### Deployment Status
- Check the **Actions** tab for workflow status
- Green ✅ = successful deployment
- Red ❌ = failed (check logs)

### Live Site
After successful deployment, your site will be available at:
```
https://putridparrot.github.io/scriptae/
```

Or whatever your GitHub Pages URL is.

## Troubleshooting

### Tests Fail in CI
- Check the Playwright report artifact
- Tests may need adjustment for CI environment
- Ensure test timeouts are sufficient

### Deployment Fails
- Verify GitHub Pages is enabled
- Check repository permissions
- Ensure workflow permissions are correct

### 404 Errors After Deployment
- Verify `base` path in `vite.config.ts` matches your repo name
- Check that assets are loading from correct path

### Blank Page After Deployment
- Open browser console for errors
- Verify base path configuration
- Check that template files are being served correctly

## Local Testing

Test the production build locally before deploying:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

This will simulate the production environment with the base path.

## Workflow Configuration

The workflow uses:
- **Node.js 20** (LTS version)
- **Ubuntu latest** runner
- **npm ci** for faster, deterministic installs
- **Artifact retention**: 30 days for test reports, 1 day for builds
- **Concurrency control**: Prevents overlapping deployments

## Manual Deployment

To deploy manually without GitHub Actions:

```bash
# Build the application
npm run build

# The dist/ folder contains the deployable files
# Upload these to your hosting provider
```
