import { z as zod } from 'zod';
import { EventPattern } from 'aws-cdk-lib/aws-events';

export const LDKEventBusPropsSchema = zod.object({
  eventBusName: zod.string(),
  description: zod.string().optional(),
  stage: zod.string(),
});

export interface LDKEventBusProps
  extends zod.infer<typeof LDKEventBusPropsSchema> {
  archive?: {
    retentionDays: number;
    archiveDescription?: string;
    eventPattern: EventPattern;
  };
}
