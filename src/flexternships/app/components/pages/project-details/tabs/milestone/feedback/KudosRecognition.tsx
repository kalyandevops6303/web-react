import React from 'react';
import { ThumbsUp } from 'react-feather';
import { ItemValue, Question, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

type Choice = {
  value: string;
  text: string;
};

export class KudosModel extends Question {
  constructor(name: string) {
    super(name);
    this.onSurveyLoad();
  }

  getType(): string {
    return 'kudosgroup';
  }

  get text(): string {
    return this.getPropertyValue('text', '');
  }

  set text(newValue: string) {
    this.setPropertyValue('text', newValue);
  }

  get choices(): Array<ItemValue> {
    return this.getPropertyValue('choices', []);
  }

  set choices(newChoices: Array<Choice | string>) {
    this.setPropertyValue(
      'choices',
      newChoices.map((choice) =>
        typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text),
      ),
    );
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

export class Kudos extends SurveyQuestionElementBase {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedValue: null,
    };
  }

  get question(): KudosModel {
    return this.props.question as KudosModel;
  }

  componentDidMount(): void {
    const currentValue = this.question.value as string | null;
    if (currentValue !== undefined && currentValue !== null) {
      this.setState({ selectedValue: currentValue });
    }

    this.question.valueChangedCallback = () => {
      const newValue = this.question.value as string | null;
      if (this.state.selectedValue !== newValue) {
        this.setState({ selectedValue: newValue });
      }
    };
  }

  handleChoiceSelect = (value: string): void => {
    this.question.value = value;
    this.setState({ selectedValue: value });
  };

  render(): JSX.Element | null {
    if (!this.question) return null;

    const cssClasses = this.question.cssClasses;
    const choices = this.question.choices || [];
    const { selectedValue } = this.state;

    return (
      <div className={cssClasses.root}>
        <div className="kudos-choices text-black flex gap-4">
          {choices.length > 0 ? (
            choices.map((choice: ItemValue, index: number) => (
              <button
                key={index}
                onClick={() => this.handleChoiceSelect(choice.value)}
                className={`py-[10px] px-[20px] gap-[8px] min-w-[64px] ${
                  choice.text === 'NA' ? 'w-[125px]' : ''
                } border rounded-lg justify-center flex items-center text-xs font-semibold ${
                  selectedValue === choice.value
                    ? 'border-skyblue bg-skyblue bg-opacity-5 text-grey-600'
                    : 'border-gray-300 bg-gray-100 bg-opacity-5 text-grey-500'
                }`}
                type="button"
              >
                {choice.text === 'NA' ? (
                  <div></div>
                ) : (
                  <ThumbsUp
                    className={`${selectedValue === choice.value ? 'text-skyblue' : 'text-gray-400'} text-xs`}
                  />
                )}
                <span className={`font-semibold text-sm ${selectedValue === choice.value ? 'text-skyblue' : ''}`}>
                  {choice.text}
                </span>
              </button>
            ))
          ) : (
            <span>No choices available</span>
          )}
        </div>
      </div>
    );
  }
}

Serializer.addClass(
  'kudosgroup',
  [
    { name: 'text', type: 'string' },
    { name: 'isRequired', type: 'boolean', default: false },
    {
      name: 'choices',
      type: 'itemvalues',
      default: [new ItemValue('kudos', 'KUDOS'), new ItemValue('na', 'NA')],
    },
  ],
  function () {
    return new KudosModel('');
  },
  'question',
);

ReactQuestionFactory.Instance.registerQuestion('kudosgroup', (props) => {
  return React.createElement(Kudos, props);
});
