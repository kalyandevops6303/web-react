import SecondaryButton from '../../../core/buttons/SecondaryButton';
import routes from '@/flexternships/routes';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const FeedbackAlreadySubmitted = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Feedback Already Submitted</h2>
        <p className="text-gray-600 max-w-md">
          You have already submitted feedback for this milestone. You cannot submit feedback multiple times.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <SecondaryButton onClick={() => navigate(routes.projectDetails.generate(projectId!))}>
            Back to Project
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAlreadySubmitted;
