import { create } from 'zustand';
import { getMilestoneFeedbackInfo } from '../actions/feedback-actions';

const defaultInitState: any = {
    feedbackForm: null, 
    isFeedbackFormLoading: false
};

export const useFeedbackStore = create<any>((set, get) => ({
    ...defaultInitState,
    getMilestoneFeedbackForm: (projectId: string, feedbackType: string) => getMilestoneFeedbackInfo(projectId, feedbackType, set),
    resetStore: () => set({ ...defaultInitState }),
  }));