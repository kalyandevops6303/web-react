import TerminateProjectModal from '../modals/project-left-panel/TerminateProjectModal';

export default function ProjectTerminateFlow({
  project,
  withRelist = false,
  onClose,
  initiateRelist,
}: ProjectTerminateFlowProps) {
  return (
    <TerminateProjectModal
      isOpen
      onClose={onClose}
      withRelist={withRelist}
      project={project}
      initiateRelist={initiateRelist}
    />
  );
}

interface ProjectTerminateFlowProps {
  project: {
    id: string;
    name: string;
  };
  withRelist?: boolean;
  onClose: () => void;
  initiateRelist: () => void;
}
