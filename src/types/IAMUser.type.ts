import { IUser, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { z as zod } from 'zod';

export const IAMUserSchema = zod.object({
  stage: zod.string(),
  userName: zod.string().optional(),
  generateAccessKeys: zod.boolean().optional(),
});

export interface IAMUserProps extends zod.infer<typeof IAMUserSchema> {
  customUserOptions?: IUser;
  policyStatement?: PolicyStatement;
}
