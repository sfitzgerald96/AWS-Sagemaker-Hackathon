# AWS Sagemaker Hackathon
This is a CDK repository to help you get started with AWS Sagemaker.
The boilerplate code is inspired by this AWS workshop: https://sagemaker-workshop.com/introduction/notebook.html

## Deploying Jupyter Notebooks
- In `bin/aws-sagemaker-hackathon.ts` edit the JupyterNotebooksStack to what you'd like.
  - **Note:** The secretArn in the GitConfig expects the AWS Secrets Manager secret with username and password where the password is the personal access token for that user.
- After you've edited the Jupyter Notebook Stack run
  - `yarn install`
  - `./scripts/cdk-deploy-to.sh <aws-acount-number> <aws-region>`
- Once the cdk stack finishes, you'll have the following recources in your account:
  - S3 bucket to store SageMaker artifacts and/or source data
  - Jupyter notebooks that were declared in the Jupyter Notebook Stack
  - Links a git repository to the git repo defined in the git config

## Deploying Model and Endpoints

## Cleaning Up Resources
- When you're ready to cleanup these resources, run:
  - `yarn cdk destroy`

## Resources
- Jupyter Notebook Samples: https://github.com/ibm-et/jupyter-samples
- How to use git in Jupyter: https://docs.aws.amazon.com/sagemaker/latest/dg/git-nbi-use.html

## CDK
The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands
 * `yarn build`           compile typescript to js
 * `yarn watch`           watch for changes and compile
 * `yarn cdk deploy`      deploy this stack to your default AWS account/region
 * `yarn cdk diff`        compare deployed stack with current state
 * `yarn cdk synth`       emits the synthesized CloudFormation template
