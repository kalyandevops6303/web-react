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

export enum FeedbackSkeletonItemType {
  NUMBER_RATING = 'numberRating',
  WOW_GROUP = 'wowgroup',
  KUDOS_GROUP = 'kudosgroup',
  GRID_CHECKBOX = 'gridcheckbox',
  AREA_CHECKBOX = 'areacheckbox',
  COMMENT = 'comment',
}

export enum RecognitionType {
  KUDOS = 'KUDOS',
  WOW = 'WOW',
}

export enum RecognitionSubHeading {
  KUDOS = 'Impressed with your teammate and want to acknowledge him/her for their performance. Then give them a Kudos in recognition of their fantastic work. This is a good way to acknowledge & motivate them. ',
  WOW = 'Impressed with a talent and want to acknowledge him/her for their performance. Then give them a WoW in recognition of their fantastic work. This is a good way to acknowledge & motivate them. ',
}
