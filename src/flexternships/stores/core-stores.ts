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
import {
  closeModal,
  fetchNotificationsCount,
  openModal,
  populateUserDetails,
  setWip,
  unsetWip,
} from '@flexternships/actions/core-actions';
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
  isWip: false,
  modal: undefined,
  modalContent: undefined,
  modalActions: undefined,
  unreadNotificationsCount: 0,
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...defaultAppState,
  openModal: (
    modalType: GlobalModalType,
    modalActions?: GlobalModalActions,
    modalContent?: Partial<GlobalModalContent>,
    metadata?: { nextPath?: string } & Record<string, string>,
  ) => openModal(modalType, set, modalActions, modalContent, metadata),
  closeModal: () => closeModal(set),
  setWip: (modalContent: GlobalModalContent, modalActions: GlobalModalActions) =>
    setWip(modalContent, modalActions, set),
  unsetWip: () => unsetWip(set),
  getCurrentNextPath: () => get().modalContent?.metadata?.nextPath,
  fetchNotificationsCount: () => fetchNotificationsCount(set),
  resetStore: () => set({ ...defaultAppState }),
}));
