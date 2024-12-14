import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { ArrowLeft } from 'react-feather';
import Spinner from '@/flexternships/app/components/core/Spinner';
import FunFacts from './FunFacts';
import SucessModal from './modals/SucessModal';

export default function SelfFeedback() {
  const params = useParams();
  const navigate = useNavigate();

  const currentUserDetails = useFlexternUserStore((state) => state.userDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const getSelfFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const selfFeedbackForm = useFeedbackStore((state) => state.feedbackForm);
  const isFeedbackFormLoading = useFeedbackStore((state) => state.isFeedbackFormLoading);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    populateUserDetails();
    getSelfFeedbackForm(params?.projectId, FeedbackTypesAPI.SELF);
  }, []);

  const handleSurveyComplete = (survey: SurveyModel) => {
    const submitFeedbackData: any = {
      feedback_id: selfFeedbackForm?._id,
      milestone_id: params?.milestoneId,
      receiver: {
        user_id: currentUserDetails?.id,
        user_type: UserType.TALENT,
      },
      feedback_result: survey.data,
    };

    submitFeedback(submitFeedbackData, () => {
      setShowSuccessModal(true);
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate(`/project-details/${params?.projectId}/milestone/${params?.milestoneId}`);
    populateUserDetails();
  };

  if (isFeedbackFormLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48 w-full">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center gap-1 cursor-pointer mb-5"
        onClick={() => navigate(`/project-details/${params?.projectId}/milestone/${params?.milestoneId}`)}
      >
        <div className="p-1 bg-[#0185E4] w-min text-white rounded-full">
          <ArrowLeft size="20px" />
        </div>
        <div className="text-[#0185E4] font-montserrat text-[16px] font-light leading-normal">Self Feedback</div>
      </div>

      <div className="flex gap-3">
        <div>
          {selfFeedbackForm && (
            <MilestoneFeedbackSurvey
              surveyJson={selfFeedbackForm?.feedback}
              userDetails={currentUserDetails}
              onComplete={handleSurveyComplete}
              estimatedTime={2}
            />
          )}
        </div>
        <FunFacts />
      </div>

      {showSuccessModal && <SucessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />}
    </div>
  );
}
