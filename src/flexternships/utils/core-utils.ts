import { toast, ToastOptions } from 'react-hot-toast';
import { ToastType } from '@flexternships/enums/core-enums';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { useFlexternUserStore } from '@flexternships/stores/core-stores';
import { useFlexternUserProfileStore } from '@flexternships/stores/user-profile-store';
// Import other Zustand stores as needed

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
