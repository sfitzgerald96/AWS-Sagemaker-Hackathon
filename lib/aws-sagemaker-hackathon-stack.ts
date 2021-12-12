import * as cdk from '@aws-cdk/core';
import * as sagemaker from '@aws-cdk/aws-sagemaker';
import * as s3 from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam'

export class AwsSagemakerHackathonStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'SagemakerArtifacts', {
      bucketName: 'sagemaker-hackathon-sf96' //TODO: Edit Bucket Name
    });

    const role = new iam.Role(this, 'JupyterNotebookRole', {
      assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com'),
      description: 'Used by Jupyter Notebooks'
    })

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'))
    role.addToPolicy(new iam.PolicyStatement({
      actions: [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      resources: [bucket.bucketArn],
    }))

    const gitRepo = new sagemaker.CfnCodeRepository(this, 'SageMakerCodeRepository', {
      gitConfig: {
        repositoryUrl: 'https://github.com/sfitzgerald96/AWS-Sagemaker-Hackathon.git',
        branch: 'main',
      },
    });

    const notebooks = this.node.tryGetContext('notebooks')
    // EC2 ML instance pricing: https://aws.amazon.com/sagemaker/pricing/
    for (let notebook of notebooks) {
      new sagemaker.CfnNotebookInstance(this, `Notebook-${notebook.instanceName}`, {
        notebookInstanceName: notebook.instanceName,
        instanceType: notebook.instanceType || 'ml.t3.medium', // EC2 ML instance pricing: https://aws.amazon.com/sagemaker/pricing/
        roleArn: role.roleArn,
        defaultCodeRepository: gitRepo.attrCodeRepositoryName
      })
    }
  }
}
