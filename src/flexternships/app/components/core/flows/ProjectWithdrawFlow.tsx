export default function ProjectWithdrawFlow({ projectId, onClose }: ProjectWithdrawFlowProps) {
  console.log('projectId', projectId, onClose);
  return <div>ProjectWithdrawFlow</div>;
}

interface ProjectWithdrawFlowProps {
  projectId: string;
  onClose: () => void;
}
