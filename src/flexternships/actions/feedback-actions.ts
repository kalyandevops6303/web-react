import { getMilestoneFeedbackInfoService } from '../services/feedback-service';


export const getMilestoneFeedbackInfo = async (projectId: string, feedbackType: string, set: any) => {
    set({ isFeedbackLoading: true });
    const data: any = await getMilestoneFeedbackInfoService(projectId, feedbackType);
    set((state: any) => ({
      ...state,
      feedback: data
    }));
    set({ isFeedbackLoading: false });
  };