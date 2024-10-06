export type LambdaFunctionProps = {
  serviceName: string;
  stage: string;
  entryPath: string;
  handlerName?: string;
  tsConfigPath: string;
  functionName?: string;
};
