# LDK Project

Welcome to the LDK! This repository contains various AWS CDK constructs for building and managing AWS resources. The purpose of the LDK is to house custom constructs to make life easier when working with the AWS CDK.

LDK stands for Lee Development Kit - so the defaults set within the custom constructs are ones that I find myself using frequently on projects.

Housing them in a package like this feels nicer than having to copy and paste across projects. Plus, I get to share them with the community!

More constructs will be added over time.

## Table of Contents

- [APIGateway](#apigateway)
- [LDKEventBus](#ldkeventbus)
- [TSLambdaFunction](#tslambdafunction)
- [ExpressStepFunction](#expressstepfunction)
- [IAMUser](#iamuser)

## APIGateway

This is a custom API Gateway construct, which sets up an API Gateway with an API key and usage plan.

### Key Parts:

- **RestApi**: Creates a REST API.
- **ApiKey**: Generates an API key and associates it with the created REST API.
- **UsagePlan**: Defines a usage plan with rate and burst limits and assigns it to the deployment stage of the newly created REST API.

### Key Properties:

- `serviceName`: Name of the service.
- `stage`: Deployment stage.
- `rateLimit`: Optional rate limit for the usage plan.
- `burstLimit`: Optional burst limit for the usage plan.

## LDKEventBus

This is a custom Eventbridge Eventbus construct, which sets up an EventBridge event bus with optional archiving.

### Key Parts:

- **EventBus**: Creates an EventBridge event bus.
- **Archive**: Optionally archives events with a specified retention period.

### Key Properties:

- `eventBusName`: Name of the event bus.
- `description`: Optional description of the event bus.
- `stage`: Deployment stage.
- `archive`: Optional archiving configuration.

## TSLambdaFunction

This is a custom TSLambdaFunction construct, which sets up a Node.js Lambda function with TypeScript support.

### Key Parts:

- **NodejsFunction**: Creates a Lambda function with Node.js runtime.

### Key Properties:

- `serviceName`: Name of the service.
- `stage`: Deployment stage.
- `entryPath`: Path to the entry file.
- `handlerName`: Optional handler name.
- `tsConfigPath`: Path to the TypeScript configuration file.
- `functionName`: Optional function name.
- `customOptions`: Optional object that allows any props that are passable vai the NodejsFunction construct

## ExpressStepFunction

This is a custom AWS Step Function construct, which sets up an AWS Step Functions state machine of type EXPRESS.

### Key Parts:

- **StateMachine**: Creates a state machine.
- **LogGroup**: Creates a log group for the state machine.

### Key Properties:

- `serviceName`: Name of the service.
- `stage`: Deployment stage.
- `timeout`: Optional timeout for the state machine.
- `definition`: Definition of the state machine.

## IAMUser

This is a custom IAM User construct, which sets up an IAM user with optional access keys and policy statements.

### Key Parts:

- **User**: Creates an IAM user.
- **CfnAccessKey**: Optionally generates access keys for the IAM user.

### Key Properties:

- `stage`: Deployment stage.
- `userName`: Optional name of the IAM user.
- `generateAccessKeys`: Optional flag to generate access keys for the IAM user.
- `customUserOptions`: Optional object for additional user configuration.
- `policyStatement`: Optional policy statement to attach to the IAM user.
