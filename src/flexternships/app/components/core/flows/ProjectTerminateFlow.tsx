import TerminateProjectModal from '../modals/project-left-panel/TerminateProjectModal';

export default function ProjectTerminateFlow({ project, withRelist = false, onClose }: ProjectTerminateFlowProps) {
  console.log('projectId', project.id);

  const handleConfirm = async () => {
    console.log('handleConfirm');
  };

  const handleCancel = async () => {
    console.log('handleCancel');
    onClose();
  };

  return (
    <TerminateProjectModal
      isOpen
      onClose={onClose}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      withRelist={withRelist}
      project={project}
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
}
