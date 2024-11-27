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
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { User } from 'react-feather';

import '@flexternships/styles/pages/survey/survey.css';
import SurveyProgress from './SurveyProgress';
interface SurveyFormProps {
  surveyJson: SurveyJson;
  onComplete: (survey: SurveyModel) => void;
  userDetails?: any;
}

export default function MilestoneFeedbackSurvey(props: SurveyFormProps) {
  const { surveyJson, userDetails, onComplete } = props;
  const survey = new Model(surveyJson);
  survey.onComplete.add(onComplete);

  const setSurveyProgress = useFeedbackStore((state) => state.setSurveyProgress);

  survey.applyTheme({
    themeName: 'default',
    colorPalette: 'light',
    isPanelless: true,
    backgroundImage: '',
    backgroundOpacity: 1,
    backgroundImageAttachment: 'scroll',
    backgroundImageFit: 'cover',
    cssVariables: {
      '--sjs-corner-radius': '2px',
      '--sjs-base-unit': '8px',
      '--sjs-shadow-small': '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
      '--sjs-shadow-inner': 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
      '--sjs-border-default': '#FF9F43',
      '--sjs-border-light': 'rgba(0, 0, 0, 0.09)',
      '--sjs-general-backcolor': 'rgba(255, 255, 255, 1)',
      '--sjs-general-backcolor-dark': 'rgba(248, 248, 248, 1)',
      '--sjs-general-backcolor-dim-light': 'rgba(249, 249, 249, 1)',
      '--sjs-general-backcolor-dim-dark': 'rgba(243, 243, 243, 1)',
      '--sjs-general-forecolor': 'rgba(0, 0, 0, 0.91)',
      '--sjs-general-forecolor-light': 'rgba(0, 0, 0, 0.45)',
      '--sjs-general-dim-forecolor': 'rgba(0, 0, 0, 0.91)',
      '--sjs-general-dim-forecolor-light': 'rgba(0, 0, 0, 0.45)',
      '--sjs-secondary-backcolor': 'rgba(255, 152, 20, 1)',
      '--sjs-secondary-backcolor-light': 'rgba(255, 152, 20, 0.1)',
      '--sjs-secondary-backcolor-semi-light': 'rgba(255, 152, 20, 0.25)',
      '--sjs-secondary-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-secondary-forecolor-light': 'rgba(255, 255, 255, 0.25)',
      '--sjs-shadow-small-reset': '0px 0px 0px 0px rgba(0, 0, 0, 0.15)',
      '--sjs-shadow-medium': '0px 2px 6px 0px rgba(0, 0, 0, 0.1)',
      '--sjs-shadow-large': '0px 8px 16px 0px rgba(0, 0, 0, 0.1)',
      '--sjs-shadow-inner-reset': 'inset 0px 0px 0px 0px rgba(0, 0, 0, 0.15)',
      '--sjs-border-inside': 'rgba(0, 0, 0, 0.16)',
      '--sjs-special-red-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-special-green': 'rgba(25, 179, 148, 1)',
      '--sjs-special-green-light': 'rgba(25, 179, 148, 0.1)',
      '--sjs-special-green-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-special-blue': 'rgba(67, 127, 217, 1)',
      '--sjs-special-blue-light': 'rgba(67, 127, 217, 0.1)',
      '--sjs-special-blue-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-special-yellow': 'rgba(255, 152, 20, 1)',
      '--sjs-special-yellow-light': 'rgba(255, 152, 20, 0.1)',
      '--sjs-special-yellow-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-article-font-xx-large-textDecoration': 'none',
      '--sjs-article-font-xx-large-fontWeight': '700',
      '--sjs-article-font-xx-large-fontStyle': 'normal',
      '--sjs-article-font-xx-large-fontStretch': 'normal',
      '--sjs-article-font-xx-large-letterSpacing': '0',
      '--sjs-article-font-xx-large-lineHeight': '64px',
      '--sjs-article-font-xx-large-paragraphIndent': '0px',
      '--sjs-article-font-xx-large-textCase': 'none',
      '--sjs-article-font-x-large-textDecoration': 'none',
      '--sjs-article-font-x-large-fontWeight': '700',
      '--sjs-article-font-x-large-fontStyle': 'normal',
      '--sjs-article-font-x-large-fontStretch': 'normal',
      '--sjs-article-font-x-large-letterSpacing': '0',
      '--sjs-article-font-x-large-lineHeight': '56px',
      '--sjs-article-font-x-large-paragraphIndent': '0px',
      '--sjs-article-font-x-large-textCase': 'none',
      '--sjs-article-font-large-textDecoration': 'none',
      '--sjs-article-font-large-fontWeight': '700',
      '--sjs-article-font-large-fontStyle': 'normal',
      '--sjs-article-font-large-fontStretch': 'normal',
      '--sjs-article-font-large-letterSpacing': '0',
      '--sjs-article-font-large-lineHeight': '40px',
      '--sjs-article-font-large-paragraphIndent': '0px',
      '--sjs-article-font-large-textCase': 'none',
      '--sjs-article-font-medium-textDecoration': 'none',
      '--sjs-article-font-medium-fontWeight': '700',
      '--sjs-article-font-medium-fontStyle': 'normal',
      '--sjs-article-font-medium-fontStretch': 'normal',
      '--sjs-article-font-medium-letterSpacing': '0',
      '--sjs-article-font-medium-lineHeight': '32px',
      '--sjs-article-font-medium-paragraphIndent': '0px',
      '--sjs-article-font-medium-textCase': 'none',
      '--sjs-article-font-default-textDecoration': 'none',
      '--sjs-article-font-default-fontWeight': '400',
      '--sjs-article-font-default-fontStyle': 'normal',
      '--sjs-article-font-default-fontStretch': 'normal',
      '--sjs-article-font-default-letterSpacing': '0',
      '--sjs-article-font-default-lineHeight': '28px',
      '--sjs-article-font-default-paragraphIndent': '0px',
      '--sjs-article-font-default-textCase': 'none',
      '--sjs-general-backcolor-dim': 'rgba(243, 243, 243, 1)',
      '--sjs-primary-backcolor': '#FF9F43',
      '--sjs-primary-backcolor-dark': 'rgba(240, 150, 63, 1)',
      '--sjs-primary-backcolor-light': 'rgba(255, 159, 67, 0.1)',
      '--sjs-primary-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-primary-forecolor-light': 'rgba(255, 255, 255, 0.25)',
      '--sjs-special-red': 'rgba(229, 10, 62, 1)',
      '--sjs-special-red-light': 'rgba(229, 10, 62, 0.1)',
    },
    headerView: 'basic',
  });
  const cssClasses = {
    rating: {
      label:
        ' justify-center inline-block text-center border border-[#ccc] rounded-md w-full cursor-pointer p-2.5 checked:bg-primary checked:text-white',
      itemControl: 'sv_q_radiogroup_control_item hidden',
      item: 'w-full pr-2.5 max-w-[6.875rem] mb-4 mt-2 inline-block text-[14px]',
      root: ' w-full text-center mt-2.5 text-[14px] mb-7',
      itemChecked: 'sd-item--checked sd-radio--checked checked',
    },
  };
  survey.onAfterRenderQuestion.add(function (_survey: any, options: any) {
    const fieldset = options.htmlElement.querySelector('fieldset');
    if (fieldset) {
      fieldset.classList.add('custom-fieldset-styling');
    }

    const question = options.question;
    const tag = document.createElement('div');
    tag.classList.add('tag-container');

    tag.innerHTML = `<span class="py-[1px] px-[9px] rounded-md border text-[#23DFEB] border-[#23DFEB] bg-[#23DFEB1F] font-montserrat text-sm font-medium leading-[22px] text-stroke-[1px]">${question.jsonObj.tag?.text}</span>`;
    options.htmlElement.insertBefore(tag, options.htmlElement.firstChild);

    document.querySelectorAll('.sd-comment').forEach((element) => {
      element.setAttribute('placeholder', 'Please type here');
      element.classList.add('sd-comment__content');
    });
  });

  survey.onValueChanged.add(function (_survey) {
    // Initialize an empty array to store the details of answered questions
    const answeredQuestions: {
      index: number; // Question's index
      name: string; // Question's name
      answer: any; // User's answer(s)
    }[] = [];

    // Loop through all questions in the survey
    _survey.getAllQuestions().forEach((question, index) => {
      // Check if the question is answered and valid
      if (question.isAnswered) {
        answeredQuestions.push({
          index: index, // Question's index
          name: question.name, // Question's name
          answer: question.value, // User's answer(s)
        });
      }
    });

    // console.log("Answered Questions:", answeredQuestions);
    setSurveyProgress(answeredQuestions);
  });

  // TODO: Had to add custom css to override progress bar, stars alignment and titles. Revisit them later
  const customStyles = `
    .custom-fieldset-styling {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        position: relative;
    }

    .custom-fieldset-styling label {
        margin: 0 8px;
    }

    .custom-fieldset-styling .sv-svg-icon {
        cursor: pointer;
        font-size: 1.5rem;
        color: #555;
        height: 32px;
    }

    .custom-fieldset-styling .sv-svg-icon:hover {
        color: #ffbf00;
    }

    .custom-fieldset-styling input[type="radio"]:checked + .sv-svg-icon {
        color: #ffc107;
    }

    .custom-fieldset-styling .sd-rating__min-text,
    .custom-fieldset-styling .sd-rating__max-text {
        position: absolute;
        bottom: -40px;
        font-size: 0.9rem;
        color: #555;
    }

    .custom-fieldset-styling .sd-rating__min-text {
        left: 0;
    }

    .custom-fieldset-styling .sd-rating__max-text {
        right: 0;
        text-align: right;
    }

    .tag-container {
      margin-bottom: 40px; /* Add space between tag and question */
      text-align: left;
    }

    .sv_q_title {
      margin-top: 10px; /* Ensure there's space between the tag and the question title */
    }

    .sd-root-modern, .sd-root-modern__wrapper, .sd-root-modern--full-container, .sd-container-modern, .sv-components-column {
      border-radius: 6px !important;
      padding: 0px !important;
      margin: 0px !important;
      width: 100% !important;
    }

    .sd-page, .sd-body, .sd-action-bar {
      padding: 7px !important;
      margin: 0px !important;
      margin-top: 20px;
      width: 100%;
    }

    .sd-action-bar {
      margin-bottom: 10px;
    }
`;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = customStyles;

  document.head.appendChild(styleSheet);

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
  survey.css = cssClasses;

  return (
    <div className="w-[650px] overflow-y-scroll !max-h-[500px] rounded-md">
      <div className="bg-white flex items-center justify-between px-5 pt-3">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={userDetails?.imageUri} />
            <AvatarFallback>
              <User color="#6E6B7B" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-montserrat text-sm font-semibold leading-[22px]">
              {userDetails?.firstName} {userDetails?.lastName}
            </div>
            <div className="text-[var(--1-theme-color-body-text, #6E6B7B)] font-montserrat text-sm font-normal leading-[22px]">
              {userDetails?.role?.name ?? userDetails?.role}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[#5E5873] text-right font-montserrat text-sm font-medium leading-[22px]">
            Estimated time to complete
          </div>
          <div className="text-[#5E5873] font-montserrat text-sm font-semibold leading-[22px]">
            3 mins | 7 Questions
          </div>
        </div>
      </div>
      <SurveyProgress />
      <Survey model={survey} />
    </div>
  );
}
