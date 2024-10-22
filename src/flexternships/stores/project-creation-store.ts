import { create } from "zustand"
import { closeModal, jumpToTab, nextTab, openModal, previousTab, saveDraft, updateEstimatedDuration, updateEstimatedStartDate, updateListingData, updateMilestonesData, updateRequirementsData, updateRolesData } from "@flexternships/actions/project-creation-actions"
import { Milestone, ModalType, ProjectCreationState, ProjectCreationStore, ProjectDetails, ProjectRole } from "@flexternships/types/project-creation-types"
import { addDaysToEpoch, dateToEpoch } from "@flexternships/utils/date-utils";

const defaultInitState: ProjectCreationState = {
  currentTabIndex: 0,
  isModalOpen: false,
  curModal: null,
  isSaveDraftLoading: false,
  data: {
    requirements: {
      projectName: "",
      estimatedStartDate: dateToEpoch(new Date()),
      estimatedDuration: 1,
      estimatedWeeklyHours: 10,
      totalProjectHoursEach: 10,
      projectDescription: "",
      documents: [],
    },
    roles: [
      {
        role: { _id: '', name: '' },
        count: 2,
        skills: [],
        tools: []
      }
    ],
    milestones: [{
      title: 'Plan and Design',
      duration: 0.25, // percentage of the total duration
      description: '',
      deliverables: ['Plan', 'Design'],
    }, {
      title: 'Execute/Implement',
      duration: 0.5, // percentage of the total duration
      description: '',
      deliverables: ['Execute', 'Implement'],
    }, {
      title: 'Publish/Deploy',
      duration: 0.25, // percentage of the total duration
      description: '',
      deliverables: ['Publish', 'Deploy'],
    }],
    listingDetails: {
      listingStartDate: dateToEpoch(new Date()),
      listingEndDate: addDaysToEpoch(dateToEpoch(new Date()), 14),
    },
  },
}

export const useProjectCreationStore = create<ProjectCreationStore>((set, get) => ({
  ...defaultInitState,
  nextTab: () => nextTab(set),
  previousTab: () => previousTab(set),
  jumpToTab: (tabIndex: number) => jumpToTab(tabIndex, set),
  saveDraft: async () => saveDraft(get, set),
  updateEstimatedDuration: (duration: number) => updateEstimatedDuration(duration, set),
  updateEstimatedStartDate: (date: number) => updateEstimatedStartDate(date, set),
  updateRequirementsData: (data: ProjectDetails) => updateRequirementsData(data, set),
  updateRolesData: (data: ProjectRole[]) => updateRolesData(data, set),
  updateMilestonesData: (data: Milestone[]) => updateMilestonesData(data, set),
  updateListingData: (listingStartDate?: number, listingEndDate?: number) => updateListingData(set, listingStartDate, listingEndDate),
  openModal: (modalType: ModalType) => openModal(modalType, set),
  closeModal: () => closeModal(set),
  resetStore: () => set({...defaultInitState}),
}));
