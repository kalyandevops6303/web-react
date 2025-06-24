import {
  getFeedbackResponseService,
  getMilestoneFeedbackInfoService,
  submitFeedbackService,
  getFeedbackSkeletonsService,
} from '../services/feedback-service';
import { FeedbackTypesAPI } from '../constraints/enums/feedback-enums';
import { MilestoneFeedbackState, MilestoneFeedbackStore } from '../constraints/types/milestone-feedback-types';
import { isEmpty } from 'lodash';
import { showToastMessage } from '../utils/core-utils';
import { ToastType } from '../constraints/enums/core-enums';
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

export const populateFeedbackSkeletonsAction = async (
  set: (state: Partial<MilestoneFeedbackState>) => void,
  get: () => MilestoneFeedbackStore,
  options?: { force?: boolean },
): Promise<void> => {
  const currentFeedbackSkeletons = get().feedbackSkeletons;
  if (!isEmpty(currentFeedbackSkeletons) && !options?.force) return;

  set({ isFeedbackSkeletonsLoading: true });
  try {
    const feedbackSkeletons = await getFeedbackSkeletonsService();
    set({ isFeedbackSkeletonsLoading: false, feedbackSkeletons });
  } catch (error: unknown) {
    set({ isFeedbackSkeletonsLoading: false });
    showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Failed to fetch feedback skeletons');
  }
};
