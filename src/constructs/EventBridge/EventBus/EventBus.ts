import { Stack, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IEventBus, EventBus } from 'aws-cdk-lib/aws-events';
import { LDKEventBusProps } from '../../../types/LDKEventBus.type';

export class LDKEventBus extends Construct {
  public readonly eventBus: IEventBus;

  constructor(scope: Stack, id: string, props: LDKEventBusProps) {
    super(scope, id);

    const {
      stage,
      eventBusName = `ldkEventBus-${id}-${stage}`,
      description = `ldkEventBus-${id}-${stage} EventBridge event bus`,
      archive,
    } = props;

    const ldkEventBus = new EventBus(this, id, {
      eventBusName,
      description,
    });

    if (archive) {
      const {
        archiveDescription = `${eventBusName} EventBridge archive`,
        retentionDays = 7,
        eventPattern,
      } = archive;

      ldkEventBus.archive(`${eventBusName}-archive`, {
        description: archiveDescription,
        eventPattern,
        retention: Duration.days(retentionDays),
      });
    }

    this.eventBus = ldkEventBus;
  }
}
