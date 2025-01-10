import RelistModal from '../modals/RelistModal';

export default function ProjectRelistFlow({ projectId, onClose }: ProjectRelistFlowProps) {
  return (
    <>
      {/* TODO: Implement RelistFlow with relevant modals */}
      <RelistModal isOpen onClose={onClose} projectId={projectId} />
    </>
  );
}

interface ProjectRelistFlowProps {
  projectId: string;
  onClose: () => void;
}
