import { z as zod } from 'zod';
import { Authorizer, RestApiProps } from 'aws-cdk-lib/aws-apigateway';
import { ApiGatewayProps as CdkApiGatewayProps } from 'aws-cdk-lib/aws-events-targets';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

export const ExtendedApiGatewayPropsSchema = zod.object({
  serviceName: zod.string(),
  env: zod.string(),
  customDomainName: zod.string().optional(),
  version: zod.string().optional(),
  rateLimit: zod.number().optional(),
  burstLimit: zod.number().optional(),
  apiKeyRequired: zod.boolean().optional(),
  restApiProps: zod
    .object({
      deployOptions: zod.any().optional(),
      defaultMethodOptions: zod.any().optional(),
    })
    .passthrough()
    .optional(),
  domainNameAliasTarget: zod.string().optional(),
  domainNameAliasHostedZoneId: zod.string().optional(),
  corsOptions: zod
    .object({
      allowOrigins: zod.array(zod.string()),
      allowMethods: zod.array(zod.string()).optional(),
      allowHeaders: zod.array(zod.string()).optional(),
    })
    .optional(),
  enableTracing: zod.boolean().optional(),
  loggingLevel: zod.string().optional(),
  dataTraceEnabled: zod.boolean().optional(),
  authorizer: zod.instanceof(Authorizer).optional(),
  customDomainCertificate: zod.instanceof(Certificate).optional(),
});

export interface ApiGatewayProps
  extends CdkApiGatewayProps,
    Partial<RestApiProps>,
    zod.infer<typeof ExtendedApiGatewayPropsSchema> {}
