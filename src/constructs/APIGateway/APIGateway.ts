import { Construct } from 'constructs';
import {
  ApiKey,
  BasePathMapping,
  DomainName,
  Resource,
  RestApi,
  UsagePlan,
} from 'aws-cdk-lib/aws-apigateway';
import { ApiGatewayProps } from '../../types/APIGateway.type';

export class APIGateway extends Construct {
  public readonly restAPI: RestApi;
  public readonly apiKey: ApiKey;
  public readonly usagePlan: UsagePlan;
  public readonly versionPath?: Resource;

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);

    const {
      serviceName,
      stage,
      rateLimit = 100000,
      burstLimit = 1000,
      restApiProps,
      apiKeyRequired = true,
      version,
      customDomainName,
      domainNameAliasTarget,
      domainNameAliasHostedZoneId,
    } = props;

    this.restAPI = new RestApi(this, `${serviceName}-restAPI-${stage}`, {
      deployOptions: {
        stageName: stage,
      },
      defaultMethodOptions: {
        apiKeyRequired,
      },
      ...restApiProps,
    });

    this.apiKey = new ApiKey(this, `${serviceName}-apiKey-${stage}`, {
      apiKeyName: `${serviceName}-apiKey-${stage}`,
      generateDistinctId: true,
      stages: [this.restAPI.deploymentStage],
    });

    this.usagePlan = new UsagePlan(this, `${serviceName}-usagePlan-${stage}`, {
      name: `${serviceName}-${stage}`,
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

      const customDomain = DomainName.fromDomainNameAttributes(
        this,
        `${serviceName}-customDomain-${stage}`,
        {
          domainName: customDomainName,
          domainNameAliasTarget,
          domainNameAliasHostedZoneId,
        }
      );

      new BasePathMapping(this, `${serviceName}-basePathMapping-${stage}`, {
        domainName: customDomain,
        restApi: this.restAPI,
        stage: this.restAPI.deploymentStage,
      });
    }

    if (version) {
      this.versionPath = this.restAPI.root.addResource(version);
    }
  }
}
