import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  StateMachine,
  DefinitionBody,
  StateMachineType,
  LogLevel,
} from 'aws-cdk-lib/aws-stepfunctions';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { ExpressStepFunctionProps } from '../../types/ExpressStepFunction.type';

export class ExpressStepFunction extends Construct {
  public readonly stateMachine: StateMachine;

  constructor(scope: Construct, id: string, props: ExpressStepFunctionProps) {
    super(scope, id);

    const { serviceName, stage, definition, timeout = 5 } = props;

    const logGroup = new LogGroup(
      this,
      `${serviceName}-express-stepfn-logs-${stage}`
    );

    this.stateMachine = new StateMachine(
      this,
      `${serviceName}-express-stepfn-${stage}`,
      {
        definitionBody: DefinitionBody.fromChainable(definition),
        timeout: Duration.minutes(timeout),
        stateMachineType: StateMachineType.EXPRESS,
        stateMachineName: `${serviceName}-express-stepfn-${stage}`,
        logs: {
          destination: logGroup,
          level: LogLevel.ALL,
          includeExecutionData: true,
        },
      }
    );
  }
}
