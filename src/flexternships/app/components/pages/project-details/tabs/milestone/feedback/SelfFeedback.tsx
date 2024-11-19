import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/Kudos';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';

export default function SelfFeedback() {
  const params = useParams();

  const currentUserDetails = useFlexternUserStore((state) => state.userDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const getSelfFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const selfFeedbackForm = useFeedbackStore((state) => state.feedbackForm);

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

  return (
    <div>
      {/* <div className="flex flex-row items-start"> */}
      {/* <Sidebar data={persons} /> */}
      {/* <TimelineStepper data={mockSelfFeedbackSurveyJson} /> */}
      {/* </div> */}
      {selfFeedbackForm && (
        <MilestoneFeedbackSurvey surveyJson={selfFeedbackForm?.feedback} onComplete={handleSurveyComplete} />
      )}
    </div>
  );
}
