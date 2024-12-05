import { isEmpty } from 'lodash';
import { getUserDetails } from '@flexternships/services/user-management';
import { showToastMessage } from '../utils/core-utils';
import { GlobalModalType, ToastType } from '../constraints/enums/core-enums';
import { AppState, GlobalModalActions, GlobalModalContent } from '../constraints/types/core-types';
import Toast from '@/flexternships/app/components/core/Toasts/Toast';

// Flextern User Actions
export const populateUserDetails = async (force: boolean, get: any, set: any) => {
  const userDetails = get().userDetails;
  if (!isEmpty(userDetails) && !force) return;

  set({ isUserDetailsLoading: true });
  try {
    const data = await getUserDetails();

    set({
      userDetails: {
        id: data._id,
        email: data.email,
        firstName: data.client_info?.first_name ?? data?.talent_info?.first_name,
        lastName: data.client_info?.last_name ?? data?.talent_info?.last_name,
        timezone: {
          _id: data.timezone?._id,
          name: data.timezone?.name,
          offset: data.timezone?.offset,
          offsetName: data.timezone?.offset_name,
          abbreviation: data.timezone?.abbreviation,
        },
        departmentName: data.client_info?.department,
        userType: data.user_type,
        phoneVerified: data.phone_verified,
        appRoles: data.app_roles,
        checkpoint: data.checkpoint,
        emailVerified: data.email_verified,
        countryCode: data.country_code,
        oauthType: data.oauth_type,
        accountStatus: data.account_status,
        phone: data.phone,
        phoneCountry: {
          code: data.phone_country?.code,
          dialCode: data.phone_country?.dial_code,
          name: data.phone_country?.name,
        },
        role: data.talent_info?.role,
        imageUri: data.client_info?.image_uri ?? data.talent_info?.image_uri,
        isBlocked: data.is_blocked,
      },
    });
  } catch (error) {
    showToastMessage(
      ToastType.ERROR,
      <Toast type={ToastType.ERROR} description="An unexpected error occurred while fetching user details" />,
    );
  }
  set({ isUserDetailsLoading: false });
};

// App Actions
export const openModal = (
  modalType: GlobalModalType,
  set: any,
  modalActions?: GlobalModalActions,
  modalContent?: Partial<GlobalModalContent>,
  metadata?: Record<string, string>,
) => {
  set((state: AppState) => ({
    ...state,
    modal: modalType,
    modalContent: { ...state.modalContent, metadata, ...modalContent },
    modalActions: { ...state.modalActions, ...modalActions },
  }));
};

export const closeModal = (set: any) => {
  set({ modal: undefined });
};

export const setWip = (modalContent: GlobalModalContent, modalActions: GlobalModalActions, set: any) => {
  set({ isWip: true, modalContent, modalActions });
};

export const unsetWip = (set: any) => {
  set({ isWip: false, modal: undefined, modalContent: undefined, modalActions: undefined });
};
