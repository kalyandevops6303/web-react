import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/Kudos';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';

export default function TeamFeedback() {
  const params = useParams();

  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);
  const teamDetails = useProjectsStore((state) => state.teamDetails);

  const getTeamFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const teamFeedbackForm = useFeedbackStore((state) => state.feedbackForm);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);

  useEffect(() => {
    getTeamFeedbackForm(params?.projectId, FeedbackTypesAPI.TEAM);
    populateTeamDetails(params?.projectId);
  }, []);

  const handleSurveyComplete = (survey: SurveyModel) => {
    const submitFeedbackData: any = {
      feedback_id: teamFeedbackForm?._id,
      milestone_id: params?.milestoneId,
      receiver: {
        user_type: UserType.TALENT,
        team_id: teamDetails && teamDetails[0].id,
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
      {teamFeedbackForm && (
        <MilestoneFeedbackSurvey surveyJson={teamFeedbackForm?.feedback} onComplete={handleSurveyComplete} />
      )}
    </div>
  );
}
