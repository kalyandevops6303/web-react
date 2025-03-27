import ProjectsBlockedModal from './ProjectsBlockedModal';
import UnsavedWorkModal from './UnsavedWorkModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';

// Add all the global modals here
export default function GlobalModal() {
  return (
    <>
      <UnsavedWorkModal />
      <ProjectsBlockedModal />
      <PrivacyPolicyModal />
    </>
  );
}
