import { create } from 'zustand';
import { getMilestoneFeedbackInfo } from '../actions/feedback-actions';

const defaultInitState: any = {
    feedback: null, 
    isFeedbackLoading: false
};

export const useFeedbackStore = create<any>((set, get) => ({
    ...defaultInitState,
    // populateUserDetails: (force: boolean = false) => populateUserDetails(force, get, set),
    getMilestoneFeedbackForm: (projectId: string, feedbackType: string) => getMilestoneFeedbackInfo(projectId, feedbackType, set),
    resetStore: () => set({ ...defaultInitState }),
  }));