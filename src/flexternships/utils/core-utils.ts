import { toast, ToastOptions } from 'react-hot-toast';
import { MilestoneStatus, ToastType, UserType } from '@flexternships/enums/core-enums';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { useFlexternUserStore } from '@flexternships/stores/core-stores';
import { useFlexternUserProfileStore } from '@flexternships/stores/user-profile-store';

/**
 * Displays a toast message with appropriate styling based on the message type.
 * @param type - The type of toast message (ERROR, SUCCESS, or default).
 * @param message - The content of the toast message.
 */
export const showToastMessage = (type: ToastType, message: string) => {
  const options = {
    position: 'top-center',
    duration: 6000,
    className: 'flex gap-x-2 p-2 text-xs',
    icon: '👍',
  } as ToastOptions;
  switch (type) {
    case ToastType.ERROR:
      toast.error(message, { ...options, icon: '❌' });
      break;
    case ToastType.SUCCESS:
      toast.success(message, { ...options, icon: '✅' });
      break;
    default:
      toast(message, { ...options, icon: 'ℹ️' });
      break;
  }
};

export const getUserTimezone = () => {
  return useFlexternUserStore.getState().userDetails?.timezone?.name || 'Asia/Kolkata';
};

/**
 * Logs out the user by resetting all Zustand stores.
 */
export const logout = () => {
  // Reset ProjectCreationStore
  useFlexternUserStore.getState().resetStore();
  useFlexternUserProfileStore.getState().resetStore();
  useProjectCreationStore.getState().resetStore();
};

/**
 * Resets the project creation store to its initial state.
 */
export const resetProjectCreationStore = () => {
  useProjectCreationStore.getState().resetStore();
};

export const getMilestoneStatusTextByUserType = (status: MilestoneStatus, _userType: UserType) => {
  switch (status) {
    case MilestoneStatus.CREATED:
      return '';
    case MilestoneStatus.IN_PROGRESS:
      return 'In Progress';
    case MilestoneStatus.IN_REVIEW:
      return 'In Review';
    case MilestoneStatus.COMPLETED:
      return 'Completed';
    default:
      return '';
  }
};

export const keysToCamelCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => keysToCamelCase(item)); // Handle arrays
  }

  if (data !== null && typeof data === 'object') {
    const newObject: any = {};

    Object.keys(data).forEach((key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      newObject[camelCaseKey] = keysToCamelCase(data[key]); // Recursively process nested objects
    });

    return newObject;
  }

  return data; // Return the value as is if it's not an object or array
};
