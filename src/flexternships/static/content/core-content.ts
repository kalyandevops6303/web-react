import { GlobalModalContent } from '../../constraints/types/core-types';

export const saveForLaterModalContent: GlobalModalContent = {
  title: 'Save For Later',
  description: 'You have unsaved work. Do you want to save it as a draft?',
  cancelButtonText: 'Discard',
  confirmButtonText: 'Save as Draft',
};

export const projectsBlockedModalContent: GlobalModalContent = {
  title: 'Feedback Pending',
  description: `Your project(s) are temporarily blocked. Request you to completed the feedback forms in order to resume back to the project viewing`,
  confirmButtonText: 'View Blocked Projects',
  cancelButtonText: '',
};
