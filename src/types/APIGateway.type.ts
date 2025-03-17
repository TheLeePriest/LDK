import { z as zod } from 'zod';
import { IDomainName, RestApiProps } from 'aws-cdk-lib/aws-apigateway';
import { ApiGatewayProps as CdkApiGatewayProps } from 'aws-cdk-lib/aws-events-targets';

export const ExtendedApiGatewayPropsSchema = zod.object({
  serviceName: zod.string(),
  env: zod.string(),
  customDomainName: zod.string().optional(),
  version: zod.string().optional(),
  rateLimit: zod.number().optional(),
  burstLimit: zod.number().optional(),
  apiKeyRequired: zod.boolean().optional(),
  restApiProps: zod.object({}).optional(),
  domainNameAliasTarget: zod.string().optional(),
  domainNameAliasHostedZoneId: zod.string().optional(),
});

export interface ApiGatewayProps
  extends CdkApiGatewayProps,
    Partial<RestApiProps>,
    zod.infer<typeof ExtendedApiGatewayPropsSchema> {}
