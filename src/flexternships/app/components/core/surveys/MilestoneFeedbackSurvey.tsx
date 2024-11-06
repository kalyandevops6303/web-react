// import 'survey-core/defaultV2.min.css';
import { Model, Survey, SurveyModel } from 'survey-react-ui';
import { SurveyJson } from '@/flexternships/constraints/types/survey-types';
import Styles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey.module.css';

interface SurveyFormProps {
  surveyJson: SurveyJson;
  onComplete: (survey: SurveyModel) => void;
}

export default function MilestoneFeedbackSurvey(props: SurveyFormProps) {
  const { surveyJson, onComplete } = props;

  // create a survey
  const survey = new Model(surveyJson);

  // Adding event listeners
  survey.onComplete.add(onComplete);

  // Add custom styles
  survey.css = {
    ...Styles,
    navigation: {
      complete: Styles.navigationComplete,
    },
  };
  return <Survey model={survey} />;
}
