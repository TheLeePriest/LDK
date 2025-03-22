import { Construct } from 'constructs';
import {
  ApiKey,
  BasePathMapping,
  DomainName,
  Resource,
  RestApi,
  UsagePlan,
  AuthorizationType,
} from 'aws-cdk-lib/aws-apigateway';
import { ApiGatewayProps } from '../../types/APIGateway.type';

export class APIGateway extends Construct {
  public readonly restAPI: RestApi;
  public readonly apiKey: ApiKey;
  public readonly usagePlan: UsagePlan;
  public readonly versionPath: Resource | undefined;

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);

    const {
      serviceName,
      rateLimit = 100000,
      burstLimit = 1000,
      restApiProps,
      apiKeyRequired = true,
      version,
      customDomainName,
      domainNameAliasTarget,
      domainNameAliasHostedZoneId,
      corsOptions,
      customDomainCertificate,
      enableTracing = false,
      loggingLevel = 'INFO',
      dataTraceEnabled = false,
      authorizer,
      env,
    } = props;

    const defaultDeployOptions = {
      stageName: env,
      tracingEnabled: enableTracing,
      loggingLevel: loggingLevel.toUpperCase() as any,
      dataTraceEnabled: dataTraceEnabled,
    };

    const defaultMethodOptions = {
      apiKeyRequired,
      authorizer: authorizer,
      authorizationType: authorizer ? AuthorizationType.CUSTOM : undefined,
    };

    this.restAPI = new RestApi(this, `${serviceName}-restAPI-${env}`, {
      ...restApiProps,
      deployOptions: {
        ...defaultDeployOptions,
        ...(restApiProps && restApiProps.deployOptions),
      },
      defaultMethodOptions: {
        ...defaultMethodOptions,
        ...(restApiProps && restApiProps.defaultMethodOptions),
      },
    });

    this.apiKey = new ApiKey(this, `${serviceName}-apiKey-${env}`, {
      apiKeyName: `${serviceName}-apiKey-${env}`,
      generateDistinctId: true,
      stages: [this.restAPI.deploymentStage],
    });

    this.usagePlan = new UsagePlan(this, `${serviceName}-usagePlan-${env}`, {
      name: `${serviceName}-${env}`,
      throttle: {
        rateLimit,
        burstLimit,
      },
      apiStages: [
        {
          stage: this.restAPI.deploymentStage,
        },
      ],
    });

    this.usagePlan.addApiKey(this.apiKey);

    if (customDomainName) {
      if (!domainNameAliasTarget || !domainNameAliasHostedZoneId) {
        throw new Error(
          'domainNameAliasTarget and domainNameAliasHostedZoneId must be provided when customDomainName is provided'
        );
      }

      const domainProps: any = {
        domainName: customDomainName,
        domainNameAliasTarget,
        domainNameAliasHostedZoneId,
      };

      if (customDomainCertificate) {
        domainProps.certificate = customDomainCertificate;
      }

      const customDomain = DomainName.fromDomainNameAttributes(
        this,
        `${serviceName}-customDomain-${env}`,
        domainProps
      );

      new BasePathMapping(this, `${serviceName}-basePathMapping-${env}`, {
        domainName: customDomain,
        restApi: this.restAPI,
        stage: this.restAPI.deploymentStage,
      });
    }

    if (corsOptions) {
      this.restAPI.root.addCorsPreflight({
        allowOrigins: corsOptions.allowOrigins,
        allowMethods: corsOptions.allowMethods ?? [
          'GET',
          'POST',
          'PUT',
          'DELETE',
          'OPTIONS',
        ],
        allowHeaders: corsOptions.allowHeaders ?? [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
      });
    }

    if (version) {
      this.versionPath = new Resource(this.restAPI, `${version}Resource`, {
        parent: this.restAPI.root,
        pathPart: version,
      });
    }
  }
}
