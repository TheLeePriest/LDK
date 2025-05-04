import { IChainable, QueryLanguage } from 'aws-cdk-lib/aws-stepfunctions';
import { z as zod } from 'zod';

export const ExpressStepFunctionPropsSchema = zod.object({
  serviceName: zod.string(),
  stage: zod.string(),
  timeout: zod.number().optional(),
  customOverrides: zod.object({}).optional(),
});

export interface ExpressStepFunctionProps
  extends zod.infer<typeof ExpressStepFunctionPropsSchema> {
  definition: IChainable;
  queryLanguage?: QueryLanguage;
}
