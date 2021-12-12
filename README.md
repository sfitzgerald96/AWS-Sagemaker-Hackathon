# AWS Sagemaker Hackathon
This is a CDK repository to help you get started with AWS Sagemaker.
The boilerplate code is inspired by this AWS workshop: https://sagemaker-workshop.com/introduction/notebook.html
## Getting Started
- Edit the `notebooks`, `s3BucketName`, and `gitConfig` attributes in the `cdk.json` file. The schema for these is as follows:
```typescript
interface CdkJsonFile {
  notebooks: Array<Notebook>;
  s3BucketName: string;
  gitConfig: GitConfig;
}]

interface Notebook {
  instanceName: string;
  instanceType?: string; // Defaults to 'ml.t3.medium' Pricing Details: https://aws.amazon.com/sagemaker/pricing/
}

interface GitConfig {
  repositoryUrl: string;
  branch: string;
}
```
- After you've added your config to the `cdk.json`, run
  - `yarn install`
  - `./scripts/cdk-deploy-to.sh <aws-acount-number> <aws-region>`
- Once Cloudformation finishes, you'll have the following recources in your account:
  - S3 bucket to store SageMaker artifacts and/or source data
  - Jupyter notebooks that were declared in `cdk.json`
  - Links a git repository to the git repo defined in `cdk.json` (only public git repos are supported at this time)
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
