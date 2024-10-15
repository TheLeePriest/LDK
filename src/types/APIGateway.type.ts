import { z as zod } from 'zod';

export const ApiGatewayProps = zod.object({
  serviceName: zod.string(),
  stage: zod.string(),
  rateLimit: zod.number().optional(),
  burstLimit: zod.number().optional(),
});
