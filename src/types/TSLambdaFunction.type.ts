import { z as zod } from 'zod';

export const LambdaFunctionPropsSchema = zod.object({
  serviceName: zod.string(),
  stage: zod.string(),
  entryPath: zod.string(),
  handlerName: zod.string().optional(),
  tsConfigPath: zod.string(),
  functionName: zod.string().optional(),
});

export type LambdaFunctionProps = zod.infer<typeof LambdaFunctionPropsSchema>;
