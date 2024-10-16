import { z as zod } from 'zod';

export const ApiGatewayPropsSchema = zod.object({
  serviceName: zod.string(),
  stage: zod.string(),
  rateLimit: zod.number().optional(),
  burstLimit: zod.number().optional(),
});

export type ApiGatewayProps = zod.infer<typeof ApiGatewayPropsSchema>;
