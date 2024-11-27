import { create } from 'zustand';
import {
  getFeedbackResponseInfo,
  getMilestoneFeedbackInfo,
  setSurveyProgressData,
  submitFeedbackInfo,
} from '../actions/feedback-actions';

const defaultInitState: any = {
  feedbackForm: null,
  feedbackResponse: null,
  feedbackFormSubmission: null,
  isFeedbackFormLoading: false,
  isSumitFeedbackLoading: false,
  isFeedbackResponseLoading: false,
  surveyProgress: null,
};

export const useFeedbackStore = create<any>((set) => ({
  ...defaultInitState,
  getMilestoneFeedbackForm: (projectId: string, feedbackType: string) =>
    getMilestoneFeedbackInfo(projectId, feedbackType, set),
  submitFeedbackForm: (formData: any, onSuccess: () => void) => submitFeedbackInfo(formData, onSuccess, set),
  getFeedbackResponse: (receiverId: string, milestoneId: string, feedbackType: string) =>
    getFeedbackResponseInfo(receiverId, milestoneId, feedbackType, set),
  setSurveyProgress: (data: any) => setSurveyProgressData(data, set),
  resetStore: () => set({ ...defaultInitState }),
}));
