import { isEmpty } from 'lodash';
import { getUserDetails } from '@flexternships/services/user-management';
import { showToastMessage } from '../utils/core-utils';
import { ToastType } from '../constraints/enums/core-enums';

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
        firstName: data.client_info?.first_name,
        lastName: data.client_info?.last_name,
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
      },
    });
  } catch (error) {
    showToastMessage(ToastType.ERROR, 'An unexpected error occurred while fetching user details');
  }
  set({ isUserDetailsLoading: false });
};
