#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { JupyterNotebooksStack } from '../lib/jupyter-notebook-stack';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'AwsSagemakerHackathonStack', {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION
  }
});

const jupyterNotbebooks = new JupyterNotebooksStack(stack, 'AwsSagemakerHackathonStack', {
  notebooks: [
    { instanceName: "snhackathon-sfitzgerald" }
  ],
  s3BucketName: "sagemaker-hackathon-sfitzgerald96",
  gitConfig: {
    repositoryUrl: "https://github.com/sfitzgerald96/AWS-Sagemaker-Hackathon.git",
    branch: "main"
  }
});
