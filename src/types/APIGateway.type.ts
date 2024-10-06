export type ApiGatewayProps = {
  serviceName: string;
  stage: string;
  rateLimit?: number;
  burstLimit?: number;
};
