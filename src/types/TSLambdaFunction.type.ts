import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { z as zod } from 'zod';

export const LambdaFunctionPropsSchema = zod.object({
  serviceName: zod.string(),
  stage: zod.string(),
  entryPath: zod.string(),
  handlerName: zod.string().optional(),
  tsConfigPath: zod.string(),
  functionName: zod.string().optional(),
  customOptions: zod.object({}).optional(),
});

export interface LambdaFunctionProps
  extends zod.infer<typeof LambdaFunctionPropsSchema> {
  customOptions?: NodejsFunctionProps;
}
