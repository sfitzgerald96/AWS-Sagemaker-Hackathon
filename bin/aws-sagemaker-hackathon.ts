#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsSagemakerHackathonStack } from '../lib/aws-sagemaker-hackathon-stack';

const app = new cdk.App();
const stack = new AwsSagemakerHackathonStack(app, 'AwsSagemakerHackathonStack', {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION
  },
});
