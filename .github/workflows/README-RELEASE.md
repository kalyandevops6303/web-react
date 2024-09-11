
# GitHub Action for Tag Release, CI and CD
Contains GitHub-action workflows to manage Tag releases, Continous integration and Continuous deployment.

***
### *_Quick flow snippet_*:

#### Dispatch & Release

1. 🏷️ **Navigate to the "Actions" tab in your GitHub repository.**
2. 🖱️ **Select the "Tag Dispatch & Release" workflow.**
3. 📝 **Provide the required inputs (target branch and version type).**
4. ✅ **Click "Run workflow" to start the tag dispatch & release process.**

#### CI and CD 

5.  🚀 **These workflows are automatically triggered based on the tag release and completion of previous workflows.**

***


## Workflow description

### 1.Tag Dispatch & Release Workflow

This workflow is responsible for fetching the latest tag, incrementing the tag based on the selected branch env ( uat, prod) and version type (major, minor, patch), and then pushing the new tag to the repository. This workflow is manually triggered.

**File:** `.github/workflows/dispatch.yml`

**Trigger:** `Manual (workflow_dispatch)`

#### Inputs:

- **Branch:** The target branch to push the tag (`uat`, `prod`).
- **Version_type:** The type of version increment (`major`, `minor`, `patch`).

#### Steps:

```mermaid
graph TD
    subgraph Tag_Dispatch_Release
        A1[Checkout Repository]
        A2[Fetch Tags]
        A3[Get Latest Tag]
        A4[Increment Tag]
        A5[Push New Tag]
        A6[Create GitHub Release]
        A1 --> A2 --> A3 --> A4 --> A5 --> A6
    end

```

### 2. CI Workflow 
This workflow is triggered when a new release is published with the tag pattern `uat_v*`, `v*`. It performs the following tasks:

**File:** `.github/workflows/user-ci-[Env].yml`

**Trigger:** `Release published (release.published)`

#### Steps:

```mermaid
flowchart TD
    subgraph CI_Workflow
        B1[Checkout Repository]
        B2[Get Previous Tag]
        B3[Set Up Docker Build Environment]
        B4[Docker Login]
        B5[Extract Docker Metadata]
        B6[Build and Push Docker Image]
        B7[Trivy Scan]
        B8[Install Azure CLI]
        B9[Upload Trivy Scan Results]
        B10[Update Deployment YAML]
        B1 --> B2 --> B3 --> B4 --> B5 --> B6 --> B7 --> B8 --> B9 --> B10
    end
```

### 3. CD Workflow 
This workflow is triggered after the successful completion of the CI workflow. It deploys the new image to the Azure Kubernetes Service (AKS) cluster.

**File:** `.github/workflows/user-cd-[Env].yml`

**Trigger:** `Workflow run completed - user-ci-[Env]`

#### Steps:

```mermaid
flowchart TD
    subgraph CD_Workflow
        C1[Checkout Repository]
        C2[Set AKS Context]
        C3[Install kubectl]
        C4[Create Kubernetes Secret]
        C5[Deploy to AKS]
        C6[Docker Logout]
        C1 --> C2 --> C3 --> C4 --> C5 --> C6
    end
```





