/**
 * Survey component using SurveyJS library
 *
 * References:
 * - Adding custom icons to registry: https://surveyjs.io/form-library/examples/custom-icons/reactjs#content-code
 * - Adding custom css: https://surveyjs.io/form-library/examples/customize-survey-with-css/reactjs#content-code
 * - SurveyJS React Documentation: https://surveyjs.io/form-library/documentation/get-started-react
 */

import 'survey-core/defaultV2.min.css';
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

  // Add completion handler
  survey.onComplete.add(onComplete);

  // survey.questionsOnPageMode = "singlePage";
  survey.applyTheme({
    "themeName": "default",
    "colorPalette": "light",
    "isPanelless": true,
    "backgroundImage": "",
    "backgroundOpacity": 1,
    "backgroundImageAttachment": "scroll",
    "backgroundImageFit": "cover",
    "cssVariables": {
        "--sjs-corner-radius": "4px",
        "--sjs-base-unit": "8px",
        "--sjs-shadow-small": "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        "--sjs-shadow-inner": "inset 0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        "--sjs-border-default": "#FF9F43",
        "--sjs-border-light": "rgba(0, 0, 0, 0.09)",
        "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dark": "rgba(248, 248, 248, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(249, 249, 249, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(243, 243, 243, 1)",
        "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
        "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
        "--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(0, 0, 0, 0.15)",
        "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
        "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.1)",
        "--sjs-shadow-inner-reset": "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.15)",
        "--sjs-border-inside": "rgba(0, 0, 0, 0.16)",
        "--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-green": "rgba(25, 179, 148, 1)",
        "--sjs-special-green-light": "rgba(25, 179, 148, 0.1)",
        "--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-blue": "rgba(67, 127, 217, 1)",
        "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
        "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
        "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-article-font-xx-large-textDecoration": "none",
        "--sjs-article-font-xx-large-fontWeight": "700",
        "--sjs-article-font-xx-large-fontStyle": "normal",
        "--sjs-article-font-xx-large-fontStretch": "normal",
        "--sjs-article-font-xx-large-letterSpacing": "0",
        "--sjs-article-font-xx-large-lineHeight": "64px",
        "--sjs-article-font-xx-large-paragraphIndent": "0px",
        "--sjs-article-font-xx-large-textCase": "none",
        "--sjs-article-font-x-large-textDecoration": "none",
        "--sjs-article-font-x-large-fontWeight": "700",
        "--sjs-article-font-x-large-fontStyle": "normal",
        "--sjs-article-font-x-large-fontStretch": "normal",
        "--sjs-article-font-x-large-letterSpacing": "0",
        "--sjs-article-font-x-large-lineHeight": "56px",
        "--sjs-article-font-x-large-paragraphIndent": "0px",
        "--sjs-article-font-x-large-textCase": "none",
        "--sjs-article-font-large-textDecoration": "none",
        "--sjs-article-font-large-fontWeight": "700",
        "--sjs-article-font-large-fontStyle": "normal",
        "--sjs-article-font-large-fontStretch": "normal",
        "--sjs-article-font-large-letterSpacing": "0",
        "--sjs-article-font-large-lineHeight": "40px",
        "--sjs-article-font-large-paragraphIndent": "0px",
        "--sjs-article-font-large-textCase": "none",
        "--sjs-article-font-medium-textDecoration": "none",
        "--sjs-article-font-medium-fontWeight": "700",
        "--sjs-article-font-medium-fontStyle": "normal",
        "--sjs-article-font-medium-fontStretch": "normal",
        "--sjs-article-font-medium-letterSpacing": "0",
        "--sjs-article-font-medium-lineHeight": "32px",
        "--sjs-article-font-medium-paragraphIndent": "0px",
        "--sjs-article-font-medium-textCase": "none",
        "--sjs-article-font-default-textDecoration": "none",
        "--sjs-article-font-default-fontWeight": "400",
        "--sjs-article-font-default-fontStyle": "normal",
        "--sjs-article-font-default-fontStretch": "normal",
        "--sjs-article-font-default-letterSpacing": "0",
        "--sjs-article-font-default-lineHeight": "28px",
        "--sjs-article-font-default-paragraphIndent": "0px",
        "--sjs-article-font-default-textCase": "none",
        "--sjs-general-backcolor-dim": "rgba(243, 243, 243, 1)",
        "--sjs-primary-backcolor": "#FF9F43",
        "--sjs-primary-backcolor-dark": "rgba(240, 150, 63, 1)",
        "--sjs-primary-backcolor-light": "rgba(255, 159, 67, 0.1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-special-red": "rgba(229, 10, 62, 1)",
        "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)"
    },
    "headerView": "basic"
})

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
    rating: {
      SurveyRatingStyles,
    },
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

  return (
    <div>
      <Survey model={survey} />
    </div>
  );
}
