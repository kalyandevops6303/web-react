// TODO:To add type definitions for all "any" types

import { Metadata } from '..';
import * as PayloadTypes from './payloadTypes';

export interface TeamAssessmentsType {
  //TODO
  assessment_id: string | null;
  assessment_grade: string | null;
  assessment_name: string;
  user_id: string;
  Mastery?: TeamAssessmentsType[];
  Proficient?: TeamAssessmentsType[];
  Intermediate?: TeamAssessmentsType[];
  Novice?: TeamAssessmentsType[];
}
export interface AssessmentState {
  userAssessments: any[];
  teamAssessments: TeamAssessmentsType[];
  notUserAssessments: any[];
  deleteNonAssessmentLoading: boolean;
  userAssessmentsCount: number;
  userAssessmentsLoading: boolean;
  teamAssessmentsLoading: boolean;
  allAssessments: any[];
  allAssessmentsLoading: boolean;
  deleteAssessment: any[];
  deleteAssessmentLoading: boolean;
  toggleAssessmentHiddenLoading: boolean;
  addAssessmentLoading: boolean;
  assessmentLink: string | undefined;
  assessmentLinkLoading: boolean;
  prepopulateLoading: boolean;
  error: any;
}

interface ITeamMembers {
  user_id: string;
  member_type: string;
}
export interface UserDataType {
  id: string;
  role: string;
  _id: string;
  club_status?: string;
  availability?: {
    weekdays_avl: any;
    weekends_avl: any;
    timezone: {
      abbreviation: string;
    };
  };
  checkpoint: string;
  user_type: 'CLIENT' | 'TALENT' | 'TEAM' | 'CLUB';
  team_type: string;
  userType: string;
  email: string;
  team_members: Array<ITeamMembers>;
  talent_info?: {
    educational_institute: any;
  };
}

export interface CountryTypes {
  label: string;
  dial_code: string;
  code: string;
  value?: string;
  _id: string;
}
export interface PhoneTypes {
  mobile: string | null;
  selectedCountry: CountryTypes;
}

export interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
  isCometChatLoggedIn: boolean;
  userData: UserDataType | null;
  savedUserData: any;
  userDataLoading: boolean;
  authData: any;
  isEmailVerified: boolean;
  phone: PhoneTypes | null;
  isPhoneVerified: boolean;
  isPasswordSet: boolean;
  password: string | null;
  loading: boolean;
  error: any;
  userType: string;
  fcmToken: string;
  cometChatToken: string;
  checkAdmin: any;
  checkAdminLoading: boolean;
  isResendLoading: boolean;
  googleAuthLoading: boolean;
  isTeamLoggedIn: boolean;
}

export interface ChatState {
  unreadMsgCount: number;
  unreadMsgCountLoading: boolean;
  error: any;
}

export interface ClientOnboardingState {
  accountDetailsLoading: boolean;
  profileDetailsLoading: boolean;
  error: any;
}

export interface ClubState {
  cardData: any;
  currentPreview: any[];
  metaData: Metadata;
  listData: any[];
  users: any[];
  loading: boolean;
  cardInfoLoading: boolean;
  email: string | null;
  isEmailVerified: boolean;
  clubCreateData: any;
  clubCreated: Record<string, any>;
  clubs: any[];
  error: any;
  updateClubLoading: boolean;
  draftClub: any;
  clubLocalData: any;
  saveDraftClubLoading: boolean;
  deleteDraftClubLoading: boolean;
  getDraftClubLoading: boolean;
}

export interface CreateBidState {
  checkBidLoading: boolean;
  createBidLoading: boolean;
  projectDetails: any;
  projectDetailsLoading: boolean;
  bidDetails: any;
  bidDetailsLoading: boolean;
  recommendedRoles: any;
  allTeamMembers: any;
  rolesLoading: boolean;
  setWorkersLoading: boolean;
  draftSetWorkersLoading: boolean;
  setMilestonesLoading: boolean;
  draftSetMilestonesLoading: boolean;
  getDraftMilestoneLoading: boolean;
  submitBidLoading: boolean;
  changeBidTypeLoading: boolean;
  deleteDraftBidLoading: boolean;
  error: any;
}

export interface CreateProjectState {
  createProject: any;
  createProjectUsingAI: any;
  createProjectLoading: boolean;
  createProjectAILoading: boolean;
  bestTalents: any;
  bestTalentsLoading: boolean;
  favoriteTalents: any;
  favoriteTalentsLoading: boolean;
  favoriteTeams: any;
  favoriteTeamsLoading: boolean;
  almaMaterTalents: any;
  almaMaterTalentsLoading: boolean;
  inviteTalentsLoading: boolean;
  saveDraftProjectLoading: boolean;
  saveDraftProjectId: string | null;
  draftProjectsCheckLoading: boolean;
  deleteDraftProjectLoading: boolean;
  draftProjectDetailsLoading: boolean;
  draftProjectDetails: any;
  error: any;
}

export interface ProfilePercentage {
  values_missing: string[];
  profile_completed: number;
}

export interface DashboardState {
  userDataLoading: boolean;
  projectModalId: string | null;
  removeMemberLoading: boolean;
  recommendedProjects: any;
  recommendedProjectsLoading: boolean;
  getTeamMember: any[];
  getTeamMemberLoading: boolean;
  getInvitedMember: any;
  getInvitedMemberLoading: boolean;
  joinRequestMember: any;
  joinRequestMemberLoading: boolean;
  recommendedTalent: any;
  recommendedTalentLoading: boolean;
  recommendedTeams: any;
  recommendedTeamsLoading: boolean;
  teamInvitation: any;
  teamInvitationLoading: boolean;
  projectInvitation: any;
  projectInvitationLoading: boolean;
  getMyTeam: any;
  getMyTeamLoading: boolean;
  profilePercentage: ProfilePercentage | null;
  memberCurrentPreview: any | null;
  profilePercentageLoading: boolean;
  projectInvites: any[];
  activeProjectsForClient: any;
  activeProjectsForClientLoading: boolean;
  upcomingProjectsForClient: any;
  upcomingProjectsForClientLoading: boolean;
  projectsBidsForClient: any;
  projectsBidsForClientLoading: boolean;
  recommendedTeamsForClient: any;
  recommendedTeamsForClientLoading: boolean;
  checkBidsAccepted: any;
  checkBidsAcceptedLoading: boolean;
  activeProjectsForTalent: any;
  activeProjectsForTalentLoading: boolean;
  upcomingProjectsForTalent: any;
  upcomingProjectsForTalentLoading: boolean;
  activeProjectsForTeam: any;
  activeProjectsForTeamLoading: boolean;
  upcomingProjectsForTeam: any;
  upcomingProjectsForTeamLoading: boolean;
  totalReferralAmount: {
    total_referral_amount: number;
  };
  totalReferralAmountLoading: boolean;
  alerts: any[];
  projectModalData: any;
  projectModalDataLoading: boolean;
  upcomingPaymentsData: any;
  upcomingPaymentsDataLoading: boolean;
  downloadUrl: string | null;
  downloadUrlLoading: boolean;
  error: any;
  getMemberMetaData: any | null;
}

export interface MemberTypes {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  role: { name: string };
  member_type: string;
  created_at: number;
  is_creator: boolean;
  image_uri?: string;
}

export interface DelegateState {
  delegateProfile: PayloadTypes.DelegateProfile | null;
  isLoading: boolean;
  error: any;
  isDelegate: boolean;
  delegateInvitationStatusData: PayloadTypes.DelegateInvitationStatus[];
  isInviteDelegateModalVisible: boolean;
  isDelegateModeModalVisible: boolean;
}

export interface DisputeState {
  raiseDisputeLoading: boolean;
  allDisputesLoading: boolean;
  allDisputes: any;
  acceptDisputeLoading: boolean;
  replyOnDisputeLoading: boolean;
  disputeRepliesLoading: boolean;
  disputeReplies: any;
  resolveDisputeLoading: boolean;
  disputesCount: any;
  disputesCountLoading: boolean;
  error: any;
}

export interface FormDataTypes {
  code: string;
  email?: string;
  password?: string;
  newPassword?: string;
  cnfPassword?: string;
  mobile?: string;
  selectCountry?: {
    label: 'United States';
    dial_code: '+1';
    code: '';
    _id: '6479c2071183add75cda4e37';
    value: '';
  };
  oldPassword?: string;
  resetPasswordModal?: any;
  selectedImage?: File | null;
  selectedImagePreview?: any;
  currentStep?: any;
}

export interface FormDataState {
  // allData: FormData | null;
  formData: FormDataTypes | null;
  additionalDescription?: string;
  formDocuments: any;
  formImage?: PayloadTypes.FormImage | null;
  parseResume?: boolean;
  isFormImageRemoved?: boolean | null;
  confirmSaveForLater?: boolean;
  navigatingRoute?: string;
  fileKey?: string;
  resumeDataUploadedForPersonal?: boolean;
  resumeDataUploadedForEducation?: boolean;
  resumeDataUploadedForSocial?: boolean;
  newPassword?: string;
  cnfPassword?: string;
}

export interface GlobalSearchState {
  query: string;
  resultQuery: string;
  searchData: any[];
  isNavbarSearchBarOpen: boolean;
  currentFilterData: any[];
  currentFilterType: string;
  currentFilterMetadata: PayloadTypes.GlobalSearchResultPayload['metadata'] | null;
  currentFilterPreview: any[] | null;
  loading: boolean;
}

export interface ISelectedTalents {
  _id: string;
  user_id: string;
  image_uri: string;
  first_name: string;
  last_name: string;
  rating: number;
  projects_worked_on_count: number;
  user_details: UserDataType;
}

export interface ITalentDetailsType {
  documents: ITalentDocumentType[];
}

export interface ITalentDataType {
  id?: string;
  name: string;
  image_uri: string;
  user_id: string;
  first_name: string;
  clubRole: string;
  last_name: string;
  rating: number;
  exam_counter: number;
  projects_worked_on_count: number;
  user_details: number;
  total_matches: number;
  match_percentage: number;
  team_logo: string;
  details: ITalentDetailsType;
}
export interface IBestTalentState {
  metadata: Metadata;
  data: ITalentDataType[];
}

export interface InviteTalentState {
  bestTalents: IBestTalentState | null;
  bestTalentsLoading: boolean;
  favoriteTalents: IBestTalentState | null;
  favoriteTalentsLoading: boolean;
  almaMaterTalents: IBestTalentState | null;
  almaMaterTalentsLoading: boolean;
  inviteTalentsLoading: boolean;
  isClubAdmin: boolean;
  error: any;
  teamMemberForInvite: IBestTalentState | null;
  teamMemberForInviteLoading: boolean;
}

export interface MarketPlaceState {
  cardData: any | null;
  currentPreview: any[];
  metaData: Metadata | null;
  listData: any[];
  users: any[];
  loading: boolean;
  cardInfoLoading: boolean;
}

export interface MilestoneState {
  milestoneData: any | null;
  loading: boolean;
  submissionHistory: any[];
  submissionHistoryLoading: boolean;
  submissionHistoryCurrentPreview: any | null;
  submissionHistoryMetadata: any | null;
  isMilestoneSubmitting: boolean;
  isMilestoneAccepting: boolean;
  isMilestoneMarking: boolean;
  milestoneDisputeLoading: boolean;
  milestoneDispute: any[];
  milestoneDisputeCurrentPreview: any | null;
  milestoneDisputeMetadata: any | null;
  isMilestoneDisputeLoading: boolean;
  error: any;
  draftMilestonesData: any | null;
  draftMilestoneLoading: boolean;
  isDeleteDraftMilestoneLoading: boolean;
  draftArtifactsLoading: boolean;
}

export interface MilestonePaymentState {
  milestoneListDetails: any | null;
  checkoutDetails: any | null;
  milestoneTransactionDetails: any | null;
  upcomingPaymentsData: any | null;
  listLoading: boolean;
  checkoutLoading: boolean;
  transactionLoading: boolean;
  upcomingPaymentDataLoading: boolean;
  paymentFeeLoading: boolean;
  error: any;
  paymentStatusUpdating?: boolean;
}

export interface MyTeamsState {
  cardData: any | null;
  currentPreview: any[];
  metaData: Metadata | null;
  listData: any[];
  users: any[];
  loading: boolean;
  cardInfoLoading: boolean;
}

interface Notification {
  _id: string;
  path: string;
  status: 'UNREAD' | 'READ';
  priority: number;
  title: string;
  created_at: number;
  message: string;
}

export interface NotificationData {
  data: Notification[];
  metadata: Metadata;
}

export interface NotificationsState {
  notifications: NotificationData | null;
  notificationsLoading: boolean;
  notificationCount: number | false;
  error: any;
  notificationsPolling: any;
  notificationsPollingLoading: boolean;
  markNotificationAsReadLoading: boolean;
  markAllNotificationAsReadLoading: boolean;
}

export interface PaymentDetailsState {
  w9details: any | null;
  w8bendetails: any | null;
  tax_identification: any | null;
  loading: boolean;
  error: any;
  userDetails?: any;
}
export interface PaymentFullViewState {
  paymentMetrics: any | null;
  paymentMetricsLoading: boolean;
  paymentHistory: any | null;
  paymentHistoryLoading: boolean;
  error: any;
}

export interface ProfileState {
  userProfile: PayloadTypes.UserProfilePayload | null;
  userRecentProject: any[];
  userReview: any[];
  isLoading: boolean;
  error: any;
  reportLoading: boolean;
  publicTeamMembers: PayloadTypes.PublicTeamMemberPayload | null;
  publicTeamMembersLoading: boolean;
  favUnfavLoading: boolean;
  isRecentProjectLoading: boolean;
  isReviewLoading: boolean;
  userReviewMetaData: any;
  userReviewCurrentPreview: any;
}

export interface ProjectState {
  cardData: any | null;
  currentPreview: any[];
  metaData: Metadata | null;
  listData: any[];
  users: any[];
  loading: boolean;
  cardInfoLoading: boolean;
}

export interface Worker {
  is_signed: boolean;
  role: string;
  documents_validity_extended_by?: any;
  payment_validity_extended_by?: any;
}

export interface BidInfo {
  user_details: {
    is_favourite: boolean;
  };
  _id: string;
  projectId: string;
}

export interface ReceivedBidsMetaData {
  current_page: number;
  [key: string]: any;
}

export interface WorkerType {
  user_id: string;
  first_name: string;
  last_name: string;
  image_uri: string;
  role: string;
  number_of_weeks: number;
  amount: number;
}
export interface MilestoneType {
  _id: string;
  name: string;
  estimated_duration: {
    duration: number;
  };
  estimated_cost: number;
  workers: WorkerType[];
  description: string;
  deliverables: string[];
}

export interface ITalentDocumentType {
  file_key: string;
  file_name: string;
  size: number;
  created_at: number;
}
interface SnapshotDataType {
  bid: {
    total_estimated_duration?: {
      duration: number;
      duration_type: string;
    };
    total_estimated_cost: number;
    milestones: MilestoneType[];
    documents: ITalentDocumentType[];
  };
  status: string;
}

export interface IProjectDetails {
  _id: string;
  title: string;
  description: string;
  project_type: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: string;
  project_manager: {
    _id: string;
    name: string;
    avatar: string;
  };
  team_members: Array<{
    _id: string;
    name: string;
    avatar: string;
  }>;
  nda: {
    is_nda: boolean;
  };
  talent_ids: Array<string>;
  draft_milestone_ids: Array<string>;
  milestone_ids: Array<string>;
  bid_ids: Array<string>;
  draft_bid_ids: Array<string>;
  bid_winner_ids: Array<string>;
  contract_ids: Array<string>;
  contract_signed_ids: Array<string>;
  contract_rejected_ids: Array<string>;
  contract_withdrawn_ids: Array<string>;
}

export interface ProjectDetailsState {
  appConfig: any | null;
  terminateContractLoading: boolean;
  getAppConfigLoading: boolean;
  getDocumentLoading: boolean;
  updateContractLoading: boolean;
  rejectBidChangeLoading: boolean;
  projectDetails: IProjectDetails | null;
  unassignedRole: any[] | null;
  receivedBidsPreview: any[] | null;
  receivedBidsMetaData: ReceivedBidsMetaData | null;
  invitedMemberForProjectByClient: any[] | null;
  getUnassignedRoleLoading: boolean;
  projectDetailsLoading: boolean;
  invitedMemberCurrentPreview: any[] | null;
  invitedMemberMetaData: any;
  getTeamMember: any[];
  getTeamMemberLoading: boolean;
  extendValidityLoading: boolean;
  sendDocumentLoading: boolean;
  signContractByTalentLoading: boolean;
  receivedBids: any[];
  snapshotData: SnapshotDataType | null;
  ndaData: any;
  contractData: any;
  getReceivedBidsLoading: boolean;
  removeWorkerLoading: boolean;
  ndaTimeline: any;
  contractTimeline: any;
  relistProjectByDateLoading: boolean;
  terminateProjectLoading: boolean;
  relistProjectLoading: boolean;
  error: any;
  document: {
    workers: Worker[];
    is_terminated?: boolean;
  } | null;
  getInvitedMember: any[];
  bidInfo: BidInfo;
  withdrawProjectLoading: boolean;
  requestChangeLoading: boolean;
}

export interface RatingState {
  giveRatingLoading: boolean;
  yourSubmittedRatingLoading: boolean;
  yourSubmittedRating: any | null;
  yourRatingLoading: boolean;
  yourRating: any | null;
  error: any;
}

export interface StripeDetailsState {
  loading: boolean;
  error: any;
  stripeData: any;
}

export interface SupportState {
  supportList: any[];
  supportListLoading: boolean;
  deleteRequestLoading: boolean;
  getSupportCountLoading: boolean;
  supportCount: number | null;
  loading: boolean;
  error: any;
}

export interface TalentOnboardingState {
  userDetails: any;
  resumeParsedDetails: any;
  userDetailsLoading: boolean;
  resumeParsedDetailsLoading: boolean;
  accountDetailsLoading: boolean;
  profileDetailsLoading: boolean;
  checkpointCompleteLoading: boolean;
  deleteResumeLoading: boolean;
  error: any;
}

export interface TeamState {
  teams: PayloadTypes.TeamPayload[];
  teamCreated: PayloadTypes.TeamPayload | null;
  isTeamsLoading: boolean;
  updateTeamLoading: boolean;
  draftTeam: PayloadTypes.DraftTeamPayload | null;
  saveDraftTeamLoading: boolean;
  deleteDraftTeamLoading: boolean;
  getDraftTeamLoading: boolean;
  error: any;
}

export interface ReferralAndRewardState {
  createReferralLoading: boolean;
  validateReferralLoading: boolean;
  convertReferralLoading: boolean;
  allReferralsLoading: boolean;
  allReferrals: any | null;
  error: any;
}

export interface StaticDataState {
  talentRoles: any;
  talentRolesLoading: boolean;
  languages: any;
  languagesLoading: boolean;
  countries: any;
  countriesLoading: boolean;
  states: any;
  statesLoading: boolean;
  cities: any;
  citiesLoading: boolean;
  institutes: any;
  institutesLoading: boolean;
  educations: any;
  educationsLoading: boolean;
  tools: any;
  toolsFromAI: any;
  toolsLoading: boolean;
  toolsFromAILoading: boolean;
  skills: any;
  skillsFromAI: any;
  skillsLoading: boolean;
  skillsFromAILoading: boolean;
  certificates: any;
  certificatesLoading: boolean;
  timezones: any;
  timezonesLoading: boolean;
  currencies: any;
  currenciesLoading: boolean;
  companyIndustries: any;
  companyIndustriesLoading: boolean;
  projectAreas: any;
  projectAreasLoading: boolean;
  disputeTypes: any;
  disputeTypesLoading: boolean;
  ratingTags: any;
  ratingTagsLoading: boolean;
  error: any;
}
