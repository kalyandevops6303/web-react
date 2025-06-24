export const enum FeedbackTypes {
  SELF = 'self',
  PEER = 'peer',
  TEAM = 'team',
  INDIVIDUAL = 'individual',
}

export const enum FeedbackTypesAPI {
  SELF = 'SELF',
  PEER = 'PEER_TO_PEER',
  TEAM = 'MANAGER_TO_TEAM',
  INDIVIDUAL = 'MANAGER_TO_PEER',
}

export const enum FeedbackConfig {
  FEEDBACK_TOTAL = '10',
}

export enum MilestoneFeedbackErrorType {
  FEEDBACK_ALREADY_SUBMITTED = 'FEEDBACK_ALREADY_SUBMITTED',
  MILESTONE_NOT_FOUND = 'MILESTONE_NOT_FOUND',
  PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND',
}

export enum MilestoneFeedbackInputCellType {
  STRING = 'string',
  NUMBER = 'number',
  DROPDOWN = 'dropdown',
}
