import { Construct } from 'constructs';
import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { StateMachine, Pass } from 'aws-cdk-lib/aws-stepfunctions';
import { ExpressStepFunction } from '../../constructs/StepFunctions/ExpressStepFunction';

export class ExampleExpressStepFunctionStack extends NestedStack {
  public readonly stepFunction: StateMachine;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    const stepFunctionDefinition = new Pass(this, 'StartState');

    const exampleExpressStepFunction = new ExpressStepFunction(
      this,
      'ExampleExpressStepFunction',
      {
        serviceName: 'ldk-example',
        stage: 'dev',
        definition: stepFunctionDefinition,
      }
    );

    this.stepFunction = exampleExpressStepFunction.stateMachine;
  }
}
