import { create } from 'zustand';
import { MilestoneFeedbackState, MilestoneFeedbackActions } from '../constraints/types/milestone-feedback-types';
import { populateFeedbackSkeletonsAction } from '../actions/feedback-actions';

const defaultInitialState: MilestoneFeedbackState = {
  isFeedbackSkeletonsLoading: false,
  feedbackSkeletons: [],
};

export const useMilestoneFeedbackStore = create<MilestoneFeedbackState & MilestoneFeedbackActions>((set, get) => ({
  ...defaultInitialState,
  populateFeedbackSkeletons: (options?: { force?: boolean }) => populateFeedbackSkeletonsAction(set, get, options),
}));
