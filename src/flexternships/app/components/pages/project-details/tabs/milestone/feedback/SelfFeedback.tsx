import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { ArrowLeft } from 'react-feather';
import Spinner from '@/flexternships/app/components/core/Spinner';
import FunFacts from './FunFacts';
import SucessModal from './modals/SucessModal';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';

export default function SelfFeedback({ goBack }: { goBack: () => void }) {
  const params = useParams();

  const currentUserDetails = useFlexternUserStore((state) => state.userDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);

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
    populateUserDetails(true);
    getProjectDetails(params?.projectId as string);
    setShowSuccessModal(false);
    goBack();
    showToastMessage(ToastType.SUCCESS, 'Feedback has been submitted successfully');
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
    <div className="px-5">
      <PrimaryIconText
        className="mb-5"
        bgDark
        icon={<ArrowLeft className="text-white" size="20px" />}
        text="Self Feedback"
        onClick={goBack}
      />

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
