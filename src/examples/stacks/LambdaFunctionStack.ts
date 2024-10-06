import * as path from 'path';
import { Construct } from 'constructs';
import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { TSLambdaFunction } from '../../constructs/LambdaFunction/TSLambdaFunction';

export class ExampleLambdaFunctionStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    new TSLambdaFunction(this, 'ExampleLambdaFunction', {
      serviceName: 'ldk-example',
      stage: 'dev',
      handlerName: 'handler',
      entryPath: path.join(__dirname, '../functions/exampleFunction.ts'),
      tsConfigPath: path.join(__dirname, '../../../tsconfig.json'),
      functionName: 'ldk-example-ExampleLambdaFunction-dev',
    });
  }
}
