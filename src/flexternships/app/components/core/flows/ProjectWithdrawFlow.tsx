import WithdrawProjectModal from '../modals/WithdrawProjectModal';

export default function ProjectWithdrawFlow({ project, onClose, initiateRelist }: ProjectWithdrawFlowProps) {
  return <WithdrawProjectModal isOpen onClose={onClose} project={project} initiateRelist={initiateRelist} />;
}

interface ProjectWithdrawFlowProps {
  project: {
    id: string;
    name: string;
  };
  onClose: () => void;
  initiateRelist: () => void;
}
