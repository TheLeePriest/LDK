import { Stack, StackProps, App } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ExampleAPIGatewayStack } from './stacks/APIGatewayStack';
import { ExampleExpressStepFunctionStack } from './stacks/ExpressStepFunctionStack';
import { ExampleLambdaFunctionStack } from './stacks/LambdaFunctionStack';

const app = new App();

export class ExampleAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ExampleAPIGatewayStack(this, 'ExampleAppAPIGatewayStack');

    new ExampleExpressStepFunctionStack(this, 'ExampleAppStepFunctionStack');

    new ExampleLambdaFunctionStack(this, 'ExampleAppLambdaFunctionStack');
  }
}

new ExampleAppStack(app, 'ExampleAppStack');
