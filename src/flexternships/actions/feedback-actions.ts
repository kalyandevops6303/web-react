import { ToastType } from '../constraints/enums/core-enums';
import { getFeedbackResponseService, getMilestoneFeedbackInfoService, submitFeedbackService } from '../services/feedback-service';
import { showToastMessage } from '../utils/core-utils';

export const getMilestoneFeedbackInfo = async (projectId: string, feedbackType: string, set: any) => {
  set({ isFeedbackFormLoading: true });
  const data: any = await getMilestoneFeedbackInfoService(projectId, feedbackType);
  set((state: any) => ({
    ...state,
    feedbackForm: data,
  }));
  set({ isFeedbackFormLoading: false });
};

export const submitFeedbackInfo = async (formData: any, set: any) => {
  set({ isSubmitFeedbackLoading: true });
  const data: any = await submitFeedbackService(formData);
  set((state: any) => ({
    ...state,
    feedbackFormSubmission: data,
  }));
  set({ isSubmitFeedbackLoading: false });
  showToastMessage(ToastType.SUCCESS, `Feedback has been submitted successfully`);
};

export const getFeedbackResponseInfo = async (receiverId: string, milestoneId: string, feedbackType: string, set: any) => {
  set({ isFeedbackResponseLoading: true });
  const data: any = await getFeedbackResponseService(receiverId, milestoneId, feedbackType);
  set((state: any) => ({
    ...state,
    feedbackResponse: data,
  }));
  set({ isFeedbackResponseLoading: false });
};
