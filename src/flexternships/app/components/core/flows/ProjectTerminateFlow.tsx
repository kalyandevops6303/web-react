export default function ProjectTerminateFlow({ projectId }: ProjectTerminateFlowProps) {
  console.log('projectId', projectId);
  return <div>ProjectTerminateFlow</div>;
}

interface ProjectTerminateFlowProps {
  projectId: string;
}
