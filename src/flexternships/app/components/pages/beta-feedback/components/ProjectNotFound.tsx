import SecondaryButton from '../../../core/buttons/SecondaryButton';
import routes from '@/flexternships/routes';
import { useNavigate } from 'react-router-dom';

const ProjectNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Project Not Found</h2>
        <p className="text-gray-600 max-w-md">The project you're looking for doesn't exist or has been removed.</p>
        <div className="flex gap-4 justify-center mt-6">
          <SecondaryButton onClick={() => navigate(routes.projects.path)}>Back to Projects</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProjectNotFound;
