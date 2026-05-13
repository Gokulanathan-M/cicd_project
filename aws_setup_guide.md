# AWS CodePipeline & CodeBuild Setup Guide (GitHub Integration)

This guide provides step-by-step instructions on how to set up the automated compliance scan pipeline using AWS CodeBuild and AWS CodePipeline, connected directly to your GitHub repository.

## Prerequisites
1. An AWS Account with Administrator access.
2. A GitHub account with the application code (`Dockerfile`, `buildspec-build.yml`, `buildspec-scan.yml`, and `client/` directory).
3. A GitHub Personal Access Token (PAT) with `repo` and `admin:repo_hook` permissions to allow AWS to access your repository.

---

## Step 1: Push Your Code to GitHub
Before configuring AWS, ensure all project files are in your GitHub repository.
1. Initialize git in your local project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with compliance pipeline setup"
   ```
2. Create a new repository on GitHub.
3. Push your code to the new repository:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

---

## Step 2: Create an Amazon ECR Repository
We need a place to store the Docker images after they are built.
1. Go to the **Amazon ECR** console.
2. Click **Create repository**.
3. Under Visibility settings, choose **Private**.
4. Repository name: `my-container-app` (must match the name in `pipeline.yml` and buildspecs).
5. Enable **Scan on push**.
6. Click **Create repository**.

---

## Step 3: Store GitHub Token in AWS Secrets Manager
For AWS CodePipeline to securely access your GitHub repository, we store the PAT in Secrets Manager.
1. Go to the **AWS Secrets Manager** console.
2. Click **Store a new secret**.
3. Select **Other type of secret**.
4. In the Key/value pairs, enter:
   - Key: `token`
   - Value: `<your-github-personal-access-token>`
5. Click Next.
6. Secret name: `github/token`
7. Click Next, then **Store**.

---

## Step 4: Deploy the Pipeline using CloudFormation
You can easily deploy the entire pipeline, IAM roles, and CodeBuild projects using the provided CloudFormation template.

### Using AWS CLI:
Run the following command from the root of your project directory:
```bash
aws cloudformation create-stack \
  --stack-name container-compliance-pipeline \
  --template-body file://infrastructure/pipeline.yml \
  --parameters ParameterKey=GitHubOwner,ParameterValue=your-github-username \
               ParameterKey=GitHubRepo,ParameterValue=your-repo-name \
               ParameterKey=GitHubBranch,ParameterValue=main \
  --capabilities CAPABILITY_NAMED_IAM
```
*(Replace `your-github-username` and `your-repo-name` with your actual GitHub details).*

### Using the AWS Console:
1. Go to the **AWS CloudFormation** console.
2. Click **Create stack** > **With new resources (standard)**.
3. Select **Upload a template file** and choose `infrastructure/pipeline.yml`.
4. Click Next.
5. Stack name: `container-compliance-pipeline`
6. Fill in the Parameters:
   - **GitHubOwner**: Your GitHub username.
   - **GitHubRepo**: Your repository name.
   - **GitHubBranch**: `main` (or your preferred branch).
7. Click Next through the options.
8. On the review page, check the box: **"I acknowledge that AWS CloudFormation might create IAM resources with custom names."**
9. Click **Submit**.

---

## Step 5: Monitor the Pipeline
Once CloudFormation completes the deployment:
1. Go to the **AWS CodePipeline** console.
2. Click on `ContainerCompliancePipeline`.
3. You will see three stages:
   - **Source**: Pulls code from your GitHub branch on every push.
   - **Build**: Uses `buildspec-build.yml` to build the Docker image and push it to ECR.
   - **ComplianceScan**: Uses `buildspec-scan.yml` to pull the image and run Trivy. If any CRITICAL or HIGH vulnerabilities are found, the pipeline will **fail** here, blocking deployment.

## Troubleshooting
- **Build Stage Fails**: Check the CodeBuild logs. Ensure Docker is running in privileged mode (this is enabled by default in the provided CloudFormation template).
- **Scan Stage Fails**: This is expected if your image has vulnerabilities! Review the CodeBuild logs to see the Trivy output and remediate the vulnerabilities in your `Dockerfile` or dependencies before pushing again.
