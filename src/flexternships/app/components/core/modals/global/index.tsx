import ProjectsBlockedModal from './ProjectsBlockedModal';
import UnsavedWorkModal from './UnsavedWorkModal';

// Add all the global modals here
export default function GlobalModal() {
  return (
    <>
      <UnsavedWorkModal />
      <ProjectsBlockedModal />
    </>
  );
}
