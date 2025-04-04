import TerminateProjectModal from '../modals/TerminateProjectModal';

export default function ProjectTerminateFlow({
  project,
  // withRelist = false,
  onClose,
}: // initiateRelist,
ProjectTerminateFlowProps) {
  return (
    <TerminateProjectModal
      isOpen
      onClose={onClose}
      // withRelist={withRelist}
      project={project}
      // initiateRelist={initiateRelist} // Hiding relist button temporarily as per product discussion
    />
  );
}

interface ProjectTerminateFlowProps {
  project: {
    id: string;
    name: string;
  };
  // withRelist?: boolean;
  onClose: () => void;
  // initiateRelist: () => void; // Hiding relist button temporarily as per product discussion
}
