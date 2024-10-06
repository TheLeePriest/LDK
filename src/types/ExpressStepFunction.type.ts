import { IChainable } from 'aws-cdk-lib/aws-stepfunctions';

export type ExpressStepFunctionProps = {
  serviceName: string;
  stage: string;
  definition: IChainable;
  timeout?: number;
};
