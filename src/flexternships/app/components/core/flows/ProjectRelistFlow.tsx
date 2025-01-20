import RelistModal from '../modals/project-left-panel/RelistModal';

export default function ProjectRelistFlow({ project, onClose }: ProjectRelistFlowProps) {
  return (
    <>
      {/* TODO: Implement RelistFlow with relevant modals */}
      <RelistModal isOpen onClose={onClose} projectId={project.id} />
    </>
  );
}

interface ProjectRelistFlowProps {
  project: {
    id: string;
    name: string;
  };
  onClose: () => void;
}
