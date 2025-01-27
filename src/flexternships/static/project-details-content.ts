import { UserType } from '../constraints/enums/core-enums';

import { ProjectPrimaryStatus } from '../constraints/enums/core-enums';
import { ProjectLeftPanelAction } from '../constraints/enums/project-enums';

export const getPrimaryAction = (params: { status: ProjectPrimaryStatus; userType: UserType }) => {
  const { status, userType } = params;
  switch (status) {
    case ProjectPrimaryStatus.OPEN:
      return userType === UserType.CLIENT ? undefined : ProjectLeftPanelAction.MESSAGE;
    case ProjectPrimaryStatus.ACTIVE:
    case ProjectPrimaryStatus.ON_GOING:
    case ProjectPrimaryStatus.CLOSED:
    case ProjectPrimaryStatus.BLOCKED:
      return ProjectLeftPanelAction.MESSAGE;
    case ProjectPrimaryStatus.WITHDRAWN:
      return userType === UserType.CLIENT ? ProjectLeftPanelAction.RELIST : undefined;
    default:
      return undefined;
  }
};

export const getSecondaryAction = (params: { status: ProjectPrimaryStatus; userType: UserType }) => {
  const { status, userType } = params;
  if (userType === UserType.TALENT) return undefined;
  switch (status) {
    // TODO: Uncomment this when terminate is implemented
    // case ProjectPrimaryStatus.ACTIVE:
    // case ProjectPrimaryStatus.ON_GOING:
    // case ProjectPrimaryStatus.BLOCKED:
    //   return ProjectLeftPanelAction.TERMINATE;
    case ProjectPrimaryStatus.OPEN:
      return ProjectLeftPanelAction.WITHDRAW;
    default:
      return undefined;
  }
};

export const getTextByAction = (action?: ProjectLeftPanelAction) => {
  if (!action) return undefined;
  switch (action) {
    case ProjectLeftPanelAction.MESSAGE:
      return 'Message';
    // TODO: Uncomment this when terminate is implemented
    // case ProjectLeftPanelAction.TERMINATE:
    //   return 'Terminate';
    case ProjectLeftPanelAction.WITHDRAW:
      return 'Withdraw';
    case ProjectLeftPanelAction.RELIST:
      return 'Re-List';
    default:
      return undefined;
  }
};
