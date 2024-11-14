import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { mockSelfFeedbackSurveyJson } from '@/flexternships/mocks/survey-data';

/**
 * TODO:
 * - Complete the function of handleSurveyComplete
 * - Get surveyJson from the backend
 */

export default function SelfFeedback() {
  const handleSurveyComplete = (survey: SurveyModel) => {
    console.log(survey.data);
  };

  return (
    <div>
      <MilestoneFeedbackSurvey surveyJson={mockSelfFeedbackSurveyJson} onComplete={handleSurveyComplete} />
    </div>
  );
}
