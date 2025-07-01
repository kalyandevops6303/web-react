import SecondaryButton from '../../../core/buttons/SecondaryButton';
import routes from '@/flexternships/routes';
import { useNavigate, useParams } from 'react-router-dom';

const SomethingWentWrong = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Something Went Wrong</h2>
        <p className="text-gray-600 max-w-md">We encountered an unexpected error. Please try again later.</p>
        <div className="flex gap-4 justify-center mt-6">
          <SecondaryButton onClick={() => navigate(routes.projectDetails.generate(projectId!))}>
            Back to Project
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
