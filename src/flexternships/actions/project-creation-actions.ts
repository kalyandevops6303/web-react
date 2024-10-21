import { createFlexternProjectDraft } from "@flexternships/services/project-management-v2"
import { Milestone, ModalType, ProjectCreationState, ProjectDetails, ProjectRole } from "@flexternships/types/project-creation-types"
import { showToastMessage } from "@flexternships/utils/toast-utils"
import { ToastType } from "@flexternships/enums/core-enums"

export const nextTab = (set: any) => {
  // This is called after validation
  // do not overshoot on the max tabs
  set((state: ProjectCreationState) => ({ currentTabIndex: state.currentTabIndex + 1 }))
}

export const previousTab = (set: any) => {
  set((state: ProjectCreationState) => ({ currentTabIndex: (state.currentTabIndex > 0 ? (state.currentTabIndex - 1) : 0) }))
}

export const jumpToTab = (tabIndex: number, set: any) => {
  set({ currentTabIndex: tabIndex })
}

export const saveDraft = async (get: any, set: any) => {
  const draftData = get().data;
  set({ isSaveDraftLoading: true })
  let projectId = undefined;
  try {
    projectId = await createFlexternProjectDraft(draftData);
    openModal(ModalType.DRAFT_SAVED, set);
  } catch (error) {
    showToastMessage(ToastType.ERROR, "An unexpected error occurred while saving the draft");
  }
  set({ isSaveDraftLoading: false });
  return projectId;
}

export const updateEstimatedDuration = (duration: number, set: any) => {
  set((state: ProjectCreationState) => ({
    ...state,
    data: {
      ...state.data,
      requirements: {
        ...state.data.requirements,
        estimatedDuration: duration,
        totalProjectHoursEach: duration * state.data.requirements.estimatedWeeklyHours,
      },
    },
  }));
}

export const updateEstimatedStartDate = (date: number, set: any) => {
  set((state: ProjectCreationState) => ({
    ...state,
    data: {
      ...state.data,
      requirements: {
        ...state.data.requirements,
        estimatedStartDate: date,
      },
    },
  }));
}

export const updateRequirementsData = (data: ProjectDetails, set: any) => {
  set((state: ProjectCreationState) => ({
    ...state,
    data: {
      ...state.data,
      requirements: data,
    },
  }));
}
export const updateRolesData = (data: ProjectRole[], set: any) => {
  set((state: ProjectCreationState) => ({
    ...state,
    data: {
      ...state.data,
      roles: data,
    },
  }));
}
export const updateMilestonesData = (data: Milestone[], set: any) => {
  set((state: ProjectCreationState) => ({
    ...state,
    data: {
      ...state.data,
      milestones: data,
    },
  }));
}
export const updateListingData = (set: any, listingStartDate?: number, listingEndDate?: number) => {

  set((state: ProjectCreationState) => ({
    ...state,
    data: {
      ...state.data,
      listingDetails: {
        listingStartDate: listingStartDate ?? state.data.listingDetails.listingStartDate,
        listingEndDate: listingEndDate ?? state.data.listingDetails.listingEndDate
      },
    },
  }));
}

export const openModal = (modalType: ModalType, set: any) => {
  set((state: ProjectCreationState) => ({
    ...state,
    isModalOpen: true,
    curModal: modalType,
  }))
}

export const closeModal = (set: any) => {
  set((state: ProjectCreationState) => ({
    ...state,
    isModalOpen: false,
    curModal: null,
  }));
}