import WithdrawProjectModal from '../modals/WithdrawProjectModal';

export default function ProjectWithdrawFlow({ project, onClose }: ProjectWithdrawFlowProps) {
  return <WithdrawProjectModal isOpen onClose={onClose} project={project} />;
}

interface ProjectWithdrawFlowProps {
  project: {
    id: string;
    name: string;
  };
  onClose: () => void;
  // initiateRelist: () => void; // Hiding relist button temporarily as per product discussion
}
