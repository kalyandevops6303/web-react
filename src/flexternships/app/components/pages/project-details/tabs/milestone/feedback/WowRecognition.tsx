import SelectCompetencyCard from '@/flexternships/app/components/core/cards/SelectCompetencyCard';
import React from 'react';
import { Award } from 'react-feather';
import { ItemValue, Question, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

type Choice = {
  value: string;
  text: string;
};

export class WowModel extends Question {
  constructor(name: string) {
    super(name);
    this.onSurveyLoad();
  }

  getType() {
    return 'wowgroup';
  }

  get text() {
    return this.getPropertyValue('text', '');
  }

  set text(newValue) {
    this.setPropertyValue('text', newValue);
  }

  get choices() {
    return this.getPropertyValue('choices', []);
  }

  set choices(newChoices) {
    this.setPropertyValue('choices', newChoices);
  }

  onSurveyLoad(): void {
    if (this.jsonObj && this.jsonObj.choices) {
      this.choices = this.jsonObj.choices.map((choice: Choice | string) =>
        typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text),
      );
    }
  }

  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void {
    if (name === 'jsonObj' && newValue && newValue.choices) {
      this.choices = newValue.choices.map((choice: Choice | string) =>
        typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text),
      );
    }
    super.onPropertyValueChanged(name, oldValue, newValue);
  }
}

export class Wow extends SurveyQuestionElementBase {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedValue: null,
    };
  }

  get question() {
    return this.props.question;
  }

  componentDidMount() {
    const currentValue = this.question.value;
    if (currentValue !== undefined && currentValue !== null) {
      this.setState({ selectedValue: currentValue });
    }

    this.question.valueChangedCallback = () => {
      const newValue = this.question.value;
      if (this.state.selectedValue !== newValue) {
        this.setState({ selectedValue: newValue });
      }
    };
  }

  componentWillUnmount() {
    if (this.question) {
      this.question.valueChangedCallback = undefined;
    }
  }

  handleChoiceSelect = (value: string) => {
    this.question.value = value;
    this.setState({ selectedValue: value });
  };

  render() {
    if (!this.question) return null;

    const cssClasses = this.question.cssClasses;
    const choices = this.question.choices || [];
    const { selectedValue } = this.state;

    return (
      <div className={`${cssClasses.root} flex flex-col gap-y-4`}>
        <div className="wow-choices text-black flex gap-4">
          {choices.length > 0 ? (
            choices.map((choice: any, index: number) => (
              <button
                key={index}
                onClick={() => this.handleChoiceSelect(choice.value)}
                className={`py-[10px] px-[20px] gap-[8px] min-w-[64px] !font-[Montserrat] text-center text-[14px] font-semibold ${
                  choice.text === 'NA' ? 'min-w-[125px]' : ''
                } border rounded-md justify-center flex items-center text-xs font-semibold transition-all duration-200 ease-in-out ${
                  selectedValue === choice.value
                    ? 'border-trublue-secondary-500 bg-trublue-secondary-500 bg-opacity-5 text-grey-600'
                    : 'border-gray-300 bg-gray-100 bg-opacity-5 text-[#838889]'
                }`}
                type="button"
              >
                {choice.text === 'NA' && choice.text !== 'wow' ? (
                  <div></div>
                ) : (
                  <Award
                    className={`${
                      selectedValue === choice.value ? 'text-trublue-secondary-500' : 'text-gray-400'
                    } text-xs`}
                  />
                )}
                <span
                  className={`font-semibold text-sm ${
                    selectedValue === choice.value ? 'text-trublue-secondary-500' : ''
                  }`}
                >
                  {choice.text === 'NA' ? 'Not Applicable' : choice.text}
                </span>
              </button>
            ))
          ) : (
            <span>No choices available</span>
          )}
        </div>
        {/* TODO: Make this dynamic and update the data model */}
        <div className="flex flex-col gap-y-2">
          <div className="text-sm font-medium leading-5.5 text-grey-600">
            Select applicable competencies <span className="text-error">*</span>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            <SelectCompetencyCard text="Collaboration & Teamwork" value="1" selected={true} onClick={() => {}} />
            <SelectCompetencyCard text="Innovation" value="2" selected={false} onClick={() => {}} />
          </div>
        </div>
      </div>
    );
  }
}

Serializer.addClass(
  'wowgroup',
  [
    { name: 'text', type: 'string' },
    {
      name: 'choices',
      type: 'itemvalues',
      default: [new ItemValue('wow', 'WOW'), new ItemValue('na', 'NA')],
    },
  ],
  function () {
    return new WowModel('');
  },
  'checkboxbase',
);

ReactQuestionFactory.Instance.registerQuestion('wowgroup', (props) => {
  return React.createElement(Wow, props);
});
