export enum UserType {
  CLIENT = 'CLIENT',
  TALENT = 'TALENT',
}

export enum UserInvitationType {
  FLEXTERN_PROJECT = 'FLEXTERN_PROJECT',
}

export enum UserStatus {
  REGISTERED = 'REGISTERED',
  UNREGISTERED = 'UNREGISTERED',
}

export enum ProjectPrimaryStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ON_GOING = 'ON_GOING',
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED',
  WITHDRAWN = 'WITHDRAWN',
  TERMINATED = 'TERMINATED',
  BLOCKED = 'BLOCKED',

  // Specific to talent
  CLOSED = 'CLOSED',
}

export enum DurationType {
  WEEK = 'WEEK',
}

export enum ProjectSecondaryStatus {
  SIGN_CONTRACT = 'SIGN_CONTRACT',
  SIGN_NDA = 'SIGN_NDA',
  COMPLETED = 'COMPLETED',
  SIGN_REQUESTED = 'SIGN_REQUESTED',
  SIGN_DOCUMENTS = 'SIGN_DOCUMENTS',
  MILESTONE = 'MILESTONE',
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

export enum MilestoneFeedbackType {
  TEAM_FEEDBACK = 'MANAGER_TO_TEAM',
  INDIVIDUAL_FEEDBACK = 'MANAGER_TO_PEER',
  SELF_FEEDBACK = 'SELF',
  PEER_FEEDBACK = 'PEER_TO_PEER',
}

export enum MilestoneFeedbackStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum RecognitionSource {
  QUICK_ACTION = 'QUICK_ACTION',
  FEEDBACK = 'FEEDBACK',
  QUICK_NOTE = 'QUICK_NOTE',
}

export enum FlexternUserAppRole {
  FLEXTERN_CLIENT = 'FLEXTERN_CLIENT',
  FLEXTERN_CLIENT_DELEGATE = 'FLEXTERN_CLIENT_DELEGATE',
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

export enum GlobalModalType {
  UNSAVED_WORK = 'UNSAVED_WORK',
  PROJECTS_BLOCKED = 'PROJECTS_BLOCKED',
}

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export enum MessageType {
  INITIAL = 'initial',
  CLARIFICATION = 'clarification',
  NUMBER_REQUEST = 'number_request',
  ERROR = 'error',
  PROJECTS = 'projects',
}

export enum FlexternDelegateInvitationStatus {
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
}

export enum FlexternDelegateInvitationType {
  FULL_ACCESS = 'FULL_ACCESS',
}
