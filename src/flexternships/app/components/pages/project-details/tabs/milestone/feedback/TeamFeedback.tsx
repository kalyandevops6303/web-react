import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/Kudos';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';
/**
/**
 * TODO:
 * - Complete the function of handleSurveyComplete
 * - Get surveyJson from the backend
 * - Remove the hardcoded amd commented code from the component
 */

export default function TeamFeedback() {

  const params = useParams();

  const getTeamFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const teamFeedbackForm = useFeedbackStore((state) => state.feedbackForm);

  useEffect(() => {
    getTeamFeedbackForm(params?.projectId, FeedbackTypesAPI.TEAM);
  }, [])

  const handleSurveyComplete = (survey: SurveyModel) => {
    console.log(survey);
  };

  return (
    <div>
      {/* <div className="flex flex-row items-start"> */}
      {/* <Sidebar data={persons} /> */}
      {/* <TimelineStepper data={mockSelfFeedbackSurveyJson} /> */}
      {/* </div> */}
      {teamFeedbackForm && <MilestoneFeedbackSurvey surveyJson={teamFeedbackForm?.feedback} onComplete={handleSurveyComplete} />}
    </div>
  );
}
