import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { ArrowLeft } from 'react-feather';
import { mockSelfFeedbackSurveyJson } from '@/flexternships/mocks/survey-data';
import Spinner from '@/flexternships/app/components/core/Spinner';
import FunFacts from './FunFacts';

export default function SelfFeedback() {
  const params = useParams();
  const navigate = useNavigate();

  const currentUserDetails = useFlexternUserStore((state) => state.userDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const getSelfFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const selfFeedbackForm = useFeedbackStore((state) => state.feedbackForm);
  const isFeedbackFormLoading = useFeedbackStore((state) => state.isFeedbackFormLoading);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);

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

    submitFeedback(submitFeedbackData);
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
      {/* <div className="flex flex-row items-start"> */}
      {/* <Sidebar data={persons} /> */}
      {/* <TimelineStepper data={mockSelfFeedbackSurveyJson} /> */}
      {/* </div> */}
      <div
        className="flex items-center gap-1 cursor-pointer mb-5"
        onClick={() => navigate(`/project-details/${params?.projectId}/milestone/${params?.milestoneId}`)}
      >
        <div className="p-1 bg-[#0185E4] w-min text-white rounded-full">
          <ArrowLeft size="20px" />
        </div>
        <div className="text-[#0185E4] font-montserrat text-[16px] font-light leading-normal">
          {selfFeedbackForm?.feedback?.title}
        </div>
      </div>

      <div className="flex gap-3">
        <div>
          {selfFeedbackForm && (
            <MilestoneFeedbackSurvey
              surveyJson={mockSelfFeedbackSurveyJson}
              userDetails={currentUserDetails}
              onComplete={handleSurveyComplete}
            />
          )}
        </div>
        <FunFacts />
      </div>
    </div>
  );
}
