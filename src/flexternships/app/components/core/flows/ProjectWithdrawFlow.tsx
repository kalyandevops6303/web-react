import WithdrawProjectModal from '../modals/project-left-panel/WithdrawProjectModal';

export default function ProjectWithdrawFlow({ project, onClose }: ProjectWithdrawFlowProps) {
  console.log('projectId', project.id);
  return <WithdrawProjectModal isOpen onClose={onClose} onConfirm={() => Promise.resolve()} project={project} />;
}

interface ProjectWithdrawFlowProps {
  project: {
    id: string;
    name: string;
  };
  onClose: () => void;
}
