import { create } from 'zustand';
import {
  AppState,
  AppStore,
  FlexternClientDetails,
  FlexternTalentDetails,
  FlexternUser,
  FlexternUserStore,
  GlobalModalActions,
  GlobalModalContent,
} from '@flexternships/types/core-types';
import { populateUserDetails, setWipModal, unsetWipModal } from '@flexternships/actions/core-actions';
import { GlobalModalType } from '../constraints/enums/core-enums';


const defaultInitState: FlexternUser = {
  isUserDetailsLoading: false,
  userDetails: {} as FlexternClientDetails | FlexternTalentDetails,
};

export const useFlexternUserStore = create<FlexternUserStore>((set, get) => ({
  ...defaultInitState,
  populateUserDetails: (force: boolean = false) => populateUserDetails(force, get, set),
  resetStore: () => set({ ...defaultInitState }),
}));

const defaultAppState: AppState = {
  wipModal: undefined,
  modalContent: {} as GlobalModalContent,
  modalActions: {} as GlobalModalActions,
};

export const useAppStore = create<AppStore>((set, _get) => ({
  ...defaultAppState,
  setWipModal: (modalContent: GlobalModalContent, modalActions: GlobalModalActions) => setWipModal(modalContent, modalActions, set),
  unsetWipModal: () => unsetWipModal(set),
}));
