import { z as zod } from 'zod';

export const LambdaFunctionProps = zod.object({
  serviceName: zod.string(),
  stage: zod.string(),
  entryPath: zod.string(),
  handlerName: zod.string().optional(),
  tsConfigPath: zod.string(),
  functionName: zod.string().optional(),
});
