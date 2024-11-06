import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { mockSelfFeedbackSurveyJson } from '@/flexternships/mocks/survey-data';

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
