import * as cdk from '@aws-cdk/core';
import * as sagemaker from '@aws-cdk/aws-sagemaker';
import * as s3 from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam'

interface JupyterNotebookProps extends cdk.StackProps {
  /**
   * Creates a new bucket that will store the ML artifacts
   */
  s3BucketName: string
  /**
   * Config needed to connect jupyter notebooks to a git repo
   * The secretArn parameter expects password to be the personal access token
   * @link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-coderepository-gitconfig.html
   */
  gitConfig: sagemaker.CfnCodeRepository.GitConfigProperty
  /**
   * List of Jupyter Notebooks to create
   */
  notebooks: Array<Notebook>
}

interface Notebook {
  /**
   * Name of Jupyter Notebook
   */
  instanceName: string
  /**
   * Type of EC2 Instance to use with Jupyter Notebook
   * @link https://aws.amazon.com/sagemaker/pricing/
   * @default 'ml.t3.medium'
   */
  instanceType?: string
}

export class JupyterNotebooksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: JupyterNotebookProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'SagemakerArtifacts', {
      bucketName: props.s3BucketName
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
      gitConfig: props.gitConfig
    })

    const notebooks = props.notebooks
    // EC2 ML instance pricing: https://aws.amazon.com/sagemaker/pricing/
    for (let notebook of notebooks) {
      new sagemaker.CfnNotebookInstance(this, `Notebook-${notebook.instanceName}`, {
        notebookInstanceName: notebook.instanceName,
        instanceType: notebook.instanceType || 'ml.t3.medium',
        roleArn: role.roleArn,
        defaultCodeRepository: gitRepo.attrCodeRepositoryName
      })
    }
  }
}
