import { getFeedbackSkeletonsService } from '../services/beta-service';
import { MilestoneFeedbackState, MilestoneFeedbackStore } from '../constraints/types/beta-feedback-types';
import { isEmpty } from 'lodash';
import { showToastMessage } from '../utils/core-utils';
import { ToastType } from '../constraints/enums/core-enums';

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
