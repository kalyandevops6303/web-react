import {
  getFeedbackResponseService,
  getMilestoneFeedbackInfoService,
  submitFeedbackService,
} from '../services/feedback-service';
import { FeedbackTypesAPI } from '../constraints/enums/feedback-enums';

export const getMilestoneFeedbackInfo = async (projectId: string, feedbackType: string, set: any) => {
  set({ isFeedbackFormLoading: true });
  const data: any = await getMilestoneFeedbackInfoService(projectId, feedbackType);
  set((state: any) => ({
    ...state,
    feedbackForm: data,
  }));
  set({ isFeedbackFormLoading: false });
};

export const submitFeedbackInfo = async (formData: any, onSuccess: () => void, set: any) => {
  set({ isSubmitFeedbackLoading: true });
  const data: any = await submitFeedbackService(formData);
  set((state: any) => ({
    ...state,
    feedbackFormSubmission: data,
  }));
  set({ isSubmitFeedbackLoading: false });
  onSuccess && onSuccess();
};

export const getFeedbackResponseInfo = async (
  receiverId: string,
  milestoneId: string,
  feedbackType: string,
  onSuccess: () => void,
  set: any,
) => {
  set({ isFeedbackResponseLoading: true });
  const data: any = await getFeedbackResponseService(receiverId, milestoneId, feedbackType);
  if (feedbackType === FeedbackTypesAPI.INDIVIDUAL || feedbackType === FeedbackTypesAPI.PEER) {
    set((state: any) => ({
      ...state,
      feedbackResponse: {
        ...state.feedbackResponse,
        [receiverId]: data,
      },
    }));
  } else {
    set((state: any) => ({
      ...state,
      feedbackResponse: {
        ...state.feedbackResponse,
        [milestoneId]: data,
      },
    }));
  }

  set({ isFeedbackResponseLoading: false });
  onSuccess();
};

export const setSurveyProgressData = async (data: any, set: any) => {
  set({ surveyProgress: data });
};
