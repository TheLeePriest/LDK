import { CfnAccessKey, IUser, User } from 'aws-cdk-lib/aws-iam';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IAMUserProps } from '../../types/IAMUser.type';

export class IAMUser extends Construct {
  public readonly iamUser: IUser;
  public readonly iamUserAccessKey: CfnAccessKey | undefined;

  constructor(scope: Stack, id: string, props: IAMUserProps) {
    super(scope, id);

    const {
      stage,
      userName = `ldkUser-${stage}`,
      policyStatement,
      generateAccessKeys = true,
      customUserOptions = {},
    } = props;

    const ldkUser = new User(this, `iam-user-${id}-${stage}`, {
      userName,
      ...customUserOptions,
    });

    if (policyStatement) {
      ldkUser.addToPolicy(policyStatement);
    }

    if (generateAccessKeys) {
      const calendarUserAccessKey = new CfnAccessKey(
        this,
        `${ldkUser.userName}-access-key-${id}-${stage}`,
        {
          userName: ldkUser.userName,
        }
      );

      this.iamUserAccessKey = calendarUserAccessKey;
    }

    this.iamUser = ldkUser;
  }
}
