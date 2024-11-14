import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import { registerFeedbackComponent } from ".";

registerFeedbackComponent();

export function SurveyCreatorWidget () {
  const creator = new SurveyCreator();
  return <SurveyCreatorComponent creator={creator} />;
}
