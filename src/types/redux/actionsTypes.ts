import { Metadata } from '..';
import { ITalentDataType } from './stateTypes';

export interface IDataTypes {
  metadata: {
    project_id: string;
    team_id: string;
    request_id: string;
  };
  type: string;
}

export interface AccountDetails {
  image_uri: string;
  company_logo: string;
  first_name?: string;
  last_name?: string;
}

export interface SocialProfileDetails {}

export interface UpdateDraftClubParams {
  id: string;
  data: any;
  onSuccess: () => void;
  onError: () => void;
  redirection?: () => void;
  isOpenSaveForLater?: boolean;
}

export interface GetClubsParams {
  filterData: any;
  metaData: Metadata;
  onSuccess: () => void;
  onError: () => void;
}

export interface GetClubCardInfoParams {
  onSuccess: () => void;
  onError: () => void;
}

export interface RegisterClubEmailParams {
  email: string;
  onSuccess?: () => void;
}

export interface CreateClubParams {
  data: any;
  onSuccess: (data: any) => void;
  onError: () => void;
}

export interface CreateDraftClubParams {
  data: any;
  onSuccess: () => void;
  onError: () => void;
  redirection?: () => void;
  isOpenSaveForLater?: boolean;
}

export interface CheckDraftClubParams {
  team_type: string;
  setSavedDraftsAvailableModal: (value: boolean) => void;
  onSuccess: () => void;
  onError: () => void;
}

export interface DeleteDraftClubParams {
  id: string;
  onSuccess: () => void;
  onError: () => void;
}

export interface GetDraftClubByIdParams {
  id: string;
  onSuccess: () => void;
  onError: () => void;
  onGetDraftClubDetails: (data: any) => void;
}

export interface ChangeMemberTypeParams {
  data: any;
  onSuccess: () => void;
}

export interface UpdateClubParams {
  data: any;
  onSuccess: () => void;
}

export interface SetClubCreateDataAction {
  data: any;
}

export interface ProjectsParams {
  project_id: string;
  switch_team_id: string;
  postData?: any;
  id?: string;
  user_type?: string;
  onFailure?: (error?: any) => void;
  onSuccess?: (data?: any) => void;
  onError?: () => void; //TODO
  isSelfRemove?: boolean;
  metadata?: Metadata;
  data: IDataTypes;
  type: string;
  fileKey: string;
  fileName: string;
}

export interface DelegateParams {
  email: string;
  newPassword: string;
  invitationToken: string;
  onSuccess?: () => void;
}

interface Dispute {
  _id: string;
  dispute_number: number;
  project: {
    details: {
      name: string;
    };
  };
  status: string;
  created_at: number;
  resolved_on: number;
  dispute_against: string[];
  documents: any;
}

export interface DataTypes {
  documents?: any;
  project_id?: string;
  dispute_type?: string;
  description?: string;
  data: Dispute[];
  metadata: {
    current_page: number;
    has_next_page: boolean;
  };
}
export interface GlobalSearchParams {
  query: string;
  onSuccess: (data?: any) => void;
  onError: (error?: any) => void;
  metaData: Metadata;
  scope: string;
  isFetchMore: boolean;
}

export interface TalentsParams {
  projectId: string;
  searchText: string;
  page: number;
  pageSize: number;
  oldData: ITalentDataType[];
  data: ITalentDataType;
  onSuccess?: (data?: ITalentDataType) => void;
}

export interface GetUsersParams {
  isRecommended: boolean;
  metaData: Metadata;
  primaryFilter: 'talents' | 'clients' | 'teams';
  onSuccess: () => void;
  onError: () => void;
  postData: any;
  searchText: string;
  isFavorite: boolean;
  userType: any;
}

export interface MakeFavParams {
  user_id?: string;
  user_type?: string;
  project_id?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export interface GetListProjectsParams {
  isMyListing: boolean;
  isRecommended: boolean;
  isMyBids?: boolean;
  metaData: Metadata;
  onSuccess: () => void;
  onError: () => void;
  postData: any;
  userType: string;
  searchText: string;
  isFavorite: boolean;
  show_expired: boolean;
  show_to_be_listed: boolean;
}

export interface RemoveFavParams {
  user_id?: string;
  project_id?: string;
  team_id?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export interface TeamListingParams {
  searchText?: string;
  metaData?: Metadata;
  onSuccess: () => void;
  onError: () => void;
  filterData?: any;
  userType?: string;
}

export interface ProjectListingParams {
  data?: {
    project_filter: string;
    project_type?: string;
  };
  metaData?: Metadata;
  onSuccess: () => void;
  onError: () => void;
  userType: string;
}

export interface TeamMembersParams {
  project_id: string;
  metadata: Metadata;
  search_text: string;
  bid_status: string;
  bid_id?: string;
  isNDA: boolean;
  isBidView: boolean;
  onSuccess: (data?: any) => {};
  onSError: (error?: any) => {};
}
