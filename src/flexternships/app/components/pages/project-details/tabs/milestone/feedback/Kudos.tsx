import React from 'react';
import { ThumbsUp } from 'react-feather';
import { ItemValue, Question, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

export class KudosModel extends Question {
  constructor(name: string) {
    super(name);
    this.onSurveyLoad();
  }
  getType() {
    return 'kudosgroup';
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

  onSurveyLoad() {
    if (this.jsonObj && this.jsonObj.choices) {
      const parsedChoices = this.jsonObj.choices.map((choice) => new ItemValue(choice.value, choice.text));
      this.choices = parsedChoices;
    } else {
      this.choices = [new ItemValue('kudos', 'KUDOS'), new ItemValue('na', 'NA')];
    }
  }

  onPropertyChanged(property: string, newValue: any): void {
    if (property === 'jsonObj' && newValue && newValue.choices) {
      this.choices = newValue.choices.map((choice: any) => new ItemValue(choice.value, choice.text));
    }
    super.onPropertyChanged(property, newValue);
  }
}

export class Kudos extends SurveyQuestionElementBase {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedValue: null,
    };
  }

  get question() {
    return this.props.question;
  }

  handleChoiceSelect = (value: any) => {
    this.setState({ selectedValue: value });
  };

  render() {
    if (!this.question) return null;

    const cssClasses = this.question.cssClasses;
    const choices = this.question.choices || [];
    const { selectedValue } = this.state;

    return (
      <div className={cssClasses.root}>
        <div className="kudos-choices text-black flex gap-4">
          {choices.length > 0 ? (
            choices.map((choice: any, index: number) => (
              <button
                key={index}
                onClick={() => this.handleChoiceSelect(choice.value)}
                className={`p-2 border rounded-lg w-24 justify-center flex items-center text-xs gap-2 font-sans ${
                  selectedValue === choice.value
                    ? 'border-skyblue bg-skyblue bg-opacity-5 text-grey-600'
                    : 'border-gray-300 bg-gray-100 bg-opacity-5 text-grey-500'
                }`}
              >
                {choice.text === 'NA' && choice.text !== 'kudos' ? (
                  <div></div>
                ) : (
                  <ThumbsUp
                    className={`${selectedValue === choice.value ? 'text-skyblue' : 'text-gray-400'} text-xs`}
                  />
                )}
                {choice.text}
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
    {
      name: 'choices',
      type: 'itemvalues',
      default: [new ItemValue('kudos', 'KUDOS'), new ItemValue('na', 'NA')],
    },
  ],
  function () {
    return new KudosModel('');
  },
  'checkboxbase',
);

ReactQuestionFactory.Instance.registerQuestion('kudosgroup', (props) => {
  return React.createElement(Kudos, props);
});
