import React from 'react';
import { toast, ToastOptions } from 'react-hot-toast';
import {
  MilestoneStatus,
  ProjectPrimaryStatus,
  ProjectSecondaryStatus,
  ToastType,
  UserType,
} from '@flexternships/enums/core-enums';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { useAppStore, useFlexternUserStore } from '@flexternships/stores/core-stores';
import { useFlexternUserProfileStore } from '@flexternships/stores/user-profile-store';

/**
 * Displays a toast message with appropriate styling based on the message type.
 * @param type - The type of toast message (ERROR, SUCCESS, or default).
 * @param message - The content of the toast message.
 */
export const showToastMessage = (type: ToastType, message: React.ReactNode, toastId?: string) => {
  const options: ToastOptions = {
    position: 'top-left',
    duration: 6000,
    id: toastId,
    // className: 'flex w-[1393px] p-4 items-start gap-6 flex gap-x-2 p-2 text-xs',
  };

  switch (type) {
    case ToastType.ERROR:
      toast.error(<>{message}</>, { ...options, icon: null });
      break;
    case ToastType.SUCCESS:
      toast.success(<>{message}</>, { ...options, icon: null });
      break;
    default:
      toast(<>{message}</>, { ...options, icon: null });
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
  useAppStore.getState().resetStore();
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

export const getProjectPrimaryStatusText = (status: ProjectPrimaryStatus) => {
  switch (status) {
    case ProjectPrimaryStatus.DRAFT:
      return 'Draft';
    case ProjectPrimaryStatus.OPEN:
      return 'Open';
    case ProjectPrimaryStatus.ACTIVE:
      return 'Active';
    case ProjectPrimaryStatus.ON_GOING:
      return 'On Going';
    case ProjectPrimaryStatus.WITHDRAWN:
      return 'Withdrawn';
    case ProjectPrimaryStatus.TERMINATED:
      return 'Terminated';
    case ProjectPrimaryStatus.COMPLETED:
      return 'Completed';
    case ProjectPrimaryStatus.BLOCKED:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};
export const getProjectSecondaryStatusText = (status: ProjectSecondaryStatus, lastInProgressMilestone: number = 1) => {
  switch (status) {
    case ProjectSecondaryStatus.SIGN_CONTRACT:
      return 'Sign Contract';
    case ProjectSecondaryStatus.SIGN_NDA:
      return 'Sign NDA';
    case ProjectSecondaryStatus.COMPLETED:
      return 'Completed';
    case ProjectSecondaryStatus.SIGN_REQUESTED:
      return 'Sign Requested';
    case ProjectSecondaryStatus.SIGN_DOCUMENTS:
      return 'Sign Documents';
    case ProjectSecondaryStatus.MILESTONE:
      return `Milestone ${lastInProgressMilestone}`;
    default:
      return 'Unknown';
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
