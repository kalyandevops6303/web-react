export enum MilestoneFeedbackErrorType {
  FEEDBACK_ALREADY_SUBMITTED = 'FEEDBACK_ALREADY_SUBMITTED',
  MILESTONE_NOT_FOUND = 'MILESTONE_NOT_FOUND',
  PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'SOMETHING_WENT_WRONG',
}

export enum MilestoneFeedbackInputCellType {
  STRING = 'string',
  NUMBER = 'number',
  DROPDOWN = 'dropdown',
  HEADER = 'header',
}

export enum FeedbackSkeletonItemType {
  NUMBER_RATING = 'numberRating',
  WOW_GROUP = 'wowgroup',
  KUDOS_GROUP = 'kudosgroup',
  GRID_CHECKBOX = 'gridcheckbox',
  AREA_CHECKBOX = 'areacheckbox',
  COMMENT = 'comment',
}

export enum MilestoneFeedbackStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}
