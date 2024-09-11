
# GitHub Action for Tag Release, CI and CD
Contains GitHub-action workflows to manage Tag releases, Build and Push.

***
### *_Quick flow snippet_*:

#### Dispatch & Release, Build & Deploy

1. 🏷️ **Navigate to the "Actions" tab in your GitHub repository.**
2. 🖱️ **Select the "Tag Dispatch & Release" workflow.**
3. 📝 **Provide the required inputs (target branch and version type).**
4. ✅ **Click "Run workflow" to start the tag dispatch & release, build & push process.**


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

### 2. Build & Push Workflow 
This workflow is triggered when a new release is published with the tag pattern `uat_v*`, `v*`. It performs the following tasks:

**File:** `.github/workflows/frontend-[Env].yaml`

**Trigger:** `Release published (release.published)`

#### Steps:

```mermaid
flowchart TD
    subgraph CI_Workflow
        B1[Checkout Repository]
        B2[Install Azure CLI]
        B3[Azure login]
        B4[Node.js Setup]
        B5[Dependencies installation]
        B6[Build and Push to Storage blob]
        B7[Delete old blob]
        B8[Purge CDN endpoint]
        B9[Azure logout]
        B1 --> B2 --> B3 --> B4 --> B5 --> B6 --> B7 --> B8 --> B9
    end
```







