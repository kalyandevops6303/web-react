// TODO: To add types for

import { Metadata } from '..';

export interface FormDocuments {}

export interface FormImage {}

export interface DelegateProfile {
  id: string;
  name: string;
}

export interface DelegateInvitationStatus {
  id: string;
  status: string;
}

export interface TeamPayload {
  _id: string;
}

export interface DraftTeamPayload {}

export interface GlobalSearchResultPayload {
  metadata: Metadata;
  data: any[];
}

export interface UserProfilePayload {
  is_favourite?: boolean;
  is_team_member?: boolean;
  team_members?: any[];
  first_name?: string;
  last_name?: string;
  name?: string;
}

export interface PublicTeamMemberPayload {
  metadata: {
    current_page: number;
    total_records: number;
    has_next_page: boolean;
  };
  data: any[];
}
