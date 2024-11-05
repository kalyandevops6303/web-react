// Enums
export enum ModalType {
  SAVE_FOR_LATER = "save_for_later",
  DRAFT_SAVED = "draft_saved",
  SAVED_DRAFTS_AVAILABLE = "saved_drafts_available",
  PROJECT_CREATED = "project_created",
  DURATION_UNDERSHOT = "duration_undershot",
  DURATION_OVERSHOT = "duration_overshot",
  DURATION_UPDATED = "duration_updated",
}

export enum MilestoneInfoType {
  UNDERSHOT = "undershot",
  OVERSHOT = "overshot",
  BALANCED = "balanced",
  UPDATED = "updated"
}

export enum ListingChoice {
  IMMEDIATE = "immediate",
  LATER = "later"
}


// Form Data Types
type Skill = {
  _id: string
  name: string
}

type Tool = {
  _id: string
  name: string
}

type Role = {
  _id: string
  name: string
}

type Document = {
  fileName: string
  fileKey: string,
  downloadUrl?: string
  size: number
  createdAt: number
}

export type ProjectDetails = {
  projectName: string
  estimatedStartDate: number
  estimatedDuration: number
  estimatedWeeklyHours: number
  totalProjectHoursEach: number
  projectDescription: string
  documents: Document[]
}

export type ProjectRole = {
  role: Role
  count: number
  skills: Skill[]
  tools: Tool[]
}

export type ProjectRolesForm = {
  projectRoles: ProjectRole[]
};

export type Milestone = {
  _id?: string
  title: string
  duration: number
  description: string
  deliverables: string[]
}

export type MilestonesForm = {
  milestones: Milestone[]
}

export type ListingDetails = {
  listingStartDate: number
  listingEndDate: number
}

export type ProjectCreationFormData = {
  requirements: ProjectDetails
  roles: ProjectRole[]
  milestones: Milestone[]
  listingDetails: ListingDetails
  removedMilestoneIds?: string[]
}

// Form State Types
export type ProjectCreationState = {
  currentTabIndex: number
  isModalOpen: boolean
  curModal: ModalType | null
  isSaveDraftLoading: false
  data: ProjectCreationFormData
};

export type ProjectCreationActions = {
  nextTab: () => void
  previousTab: () => void
  jumpToTab: (tabIndex: number) => void
  saveDraft: (draftProjectId?: string) => Promise<string | undefined>
  populateDraftProject: (projectId: string) => Promise<void>
  updateEstimatedDuration: (duration: number) => void
  updateEstimatedStartDate: (date: number) => void
  updateRequirementsData: (data: ProjectDetails) => void
  updateRolesData: (data: ProjectRole[]) => void
  updateMilestonesData: (data: Milestone[]) => void
  updateListingData: (listingStartDate?: number, listingEndDate?: number) => void
  appendRemovedMilestoneId: (milestoneId: string) => void
  openModal: (modalType:ModalType) => void
  closeModal: () => void
  resetStore: () => void
};

export type ProjectCreationStore = ProjectCreationState & ProjectCreationActions
