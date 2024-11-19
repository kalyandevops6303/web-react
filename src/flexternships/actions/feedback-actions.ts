import { getMilestoneFeedbackInfoService } from '../services/feedback-service';


export const getMilestoneFeedbackInfo = async (projectId: string, feedbackType: string, set: any) => {
    set({ isFeedbackFormLoading: true });
    const data: any = await getMilestoneFeedbackInfoService(projectId, feedbackType);
    set((state: any) => ({
      ...state,
      feedbackForm: data
    }));
    set({ isFeedbackFormLoading: false });
  };