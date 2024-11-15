export enum UserType {
  CLIENT = 'CLIENT',
  TALENT = 'TALENT',
}

// Subject to changer as per BE
export enum MilestoneStatus {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
}

export enum MilestoneArtifactStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
}

export enum MilestoneArtifactType {
  DOCUMENTS = 'DOCUMENTS',
  LINKS = 'LINKS',
}

export enum MilestoneArtifactErrorType {
  INVALID_FILE_FORMAT = 'INVALID_FILE_FORMAT',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
}

// Subject to changer as per BE
export enum MilestoneFeedbackType {
  TEAM_FEEDBACK = 'MANAGER_TO_TEAM',
  INDIVIDUAL_FEEDBACK = 'MANAGER_TO_PEER',
  SELF_FEEDBACK = 'SELF',
  PEER_FEEDBACK = 'PEER_TO_PEER',
}
// Subject to changer as per BE
export enum MilestoneFeedbackStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum FlexternUserAppRole {
  FLEXTERN_CLIENT = 'FLEXTERN_CLIENT',
  FLEXTERN_TALENT = 'FLEXTERN_TALENT',
}

export enum FlexternUserCheckpoint {
  ACCOUNT_DETAILS = 'ACCOUNT_DETAILS',
  PROFILE_DETAILS = 'PROFILE_DETAILS',
  COMPLETE = 'COMPLETE',
}

export enum ToastType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum ServerResponseStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
