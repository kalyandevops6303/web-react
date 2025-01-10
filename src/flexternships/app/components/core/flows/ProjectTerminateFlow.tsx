export default function ProjectTerminateFlow({ projectId, onClose }: ProjectTerminateFlowProps) {
  console.log('projectId', projectId, onClose);
  return <div>ProjectTerminateFlow</div>;
}

interface ProjectTerminateFlowProps {
  projectId: string;
  onClose: () => void;
}
