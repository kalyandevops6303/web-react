import ProjectsBlockedModal from './ProjectsBlockedModal';
import UnsavedWorkModal from './UnsavedWorkModal';
import TermsAndConditionsModal from './TermsAndConditionsModal';

// Add all the global modals here
export default function GlobalModal() {
  return (
    <>
      <UnsavedWorkModal />
      <ProjectsBlockedModal />
      <TermsAndConditionsModal />
    </>
  );
}
