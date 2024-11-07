// import 'survey-core/defaultV2.min.css';
import { Model, Survey, SurveyModel } from 'survey-react-ui';
import { SurveyJson } from '@/flexternships/constraints/types/survey-types';
import SurveyStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey.module.css';
import SurveyNavigationStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-navigation.module.css';
import SurveyPanelStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-panel.module.css';
import SurveyPanelDynamicStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-panel-dynamic.module.css';
import SurveyPanelDynamicTabsStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-panel-dynamic-tabs.module.css';
import SurveyPageStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-page.module.css';
import SurveyQuestionStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-question.module.css';
import SurveyImageStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-image.module.css';
import SurveyHtmlStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-html.module.css';
import SurveyErrorStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-error.module.css';
import SurveyCheckboxStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-checkbox.module.css';
import SurveyRadioGroupStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-radio-group.module.css';
import SurveyBooleanStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-boolean.module.css';
import SurveyTextStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-text.module.css';
import SurveyMultipleTextStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-multiple-text.module.css';
import SurveyDropdownStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-dropdown.module.css';
import SurveyImagePickerStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-image-picker.module.css';
import SurveyMatrixStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-matrix.module.css';
import SurveyMatrixDropdownStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-matrix-dropdown.module.css';
import SurveyMatrixDynamicStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-matrix-dynamic.module.css';
import SurveyRatingStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-rating.module.css';
import SurveyCommentStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-comment.module.css';
import SurveyFileStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-file.module.css';
import SurveySignaturePadStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-signature-pad.module.css';
import SurveySaveDataStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-save-data.module.css';
import SurveyWindowStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-window.module.css';
import SurveyWindowHeaderStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-window-header.module.css';
import SurveyRankingStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-ranking.module.css';
import SurveyButtonGroupStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-button-group.module.css';
import SurveyListStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-list.module.css';
import SurveyActionBarStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-action-bar.module.css';
import SurveyVariablesStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-variables.module.css';
import SurveyTagboxStyles from '@/flexternships/styles/components/core/surveys/milestone-feedback-survey/survey-tag-box.module.css';

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
    ...SurveyStyles,
    navigation: SurveyNavigationStyles,
    panel: SurveyPanelStyles,
    paneldynamic: {
      ...SurveyPanelDynamicStyles,
      tabs: SurveyPanelDynamicTabsStyles,
    },
    page: SurveyPageStyles,
    question: SurveyQuestionStyles,
    image: SurveyImageStyles,
    html: SurveyHtmlStyles,
    error: SurveyErrorStyles,
    checkbox: SurveyCheckboxStyles,
    radiogroup: SurveyRadioGroupStyles,
    boolean: SurveyBooleanStyles,
    text: SurveyTextStyles,
    multipletext: SurveyMultipleTextStyles,
    dropdown: SurveyDropdownStyles,
    imagepicker: SurveyImagePickerStyles,
    matrix: SurveyMatrixStyles,
    matrixdropdown: SurveyMatrixDropdownStyles,
    matrixdynamic: SurveyMatrixDynamicStyles,
    rating: SurveyRatingStyles,
    comment: SurveyCommentStyles,
    file: SurveyFileStyles,
    signaturepad: SurveySignaturePadStyles,
    saveData: SurveySaveDataStyles,
    window: {
      ...SurveyWindowStyles,
      header: SurveyWindowHeaderStyles,
    },
    ranking: SurveyRankingStyles,
    buttongroup: SurveyButtonGroupStyles,
    list: SurveyListStyles,
    actionBar: SurveyActionBarStyles,
    variables: SurveyVariablesStyles,
    tagbox: SurveyTagboxStyles,
  };

  return <Survey model={survey} />;
}
