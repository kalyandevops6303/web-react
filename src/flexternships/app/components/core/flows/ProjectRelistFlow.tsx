import RelistModal from '../modals/RelistModal';

export default function ProjectRelistFlow({ projectId }: ProjectRelistFlowProps) {
  return (
    <>
      {/* TODO: Implement RelistFlow with relevant modals */}
      <RelistModal isOpen onClose={() => {}} projectId={projectId} />
    </>
  );
}

interface ProjectRelistFlowProps {
  projectId: string;
}
