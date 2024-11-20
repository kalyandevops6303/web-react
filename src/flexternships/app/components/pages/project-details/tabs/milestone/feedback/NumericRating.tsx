import React from 'react';
import { ItemValue, QuestionRatingModel, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

type Choice = {
  value: string;
  text: string;
};

export class NumericRatingModel extends QuestionRatingModel {
  constructor(name: string) {
    super(name);
    this.onSurveyLoad();
  }

  getType() {
    return 'numberRating';
  }

  get rateValues() {
    return this.getPropertyValue('rateValues', []);
  }

  set rateValues(newValues) {
    this.setPropertyValue('rateValues', newValues);
  }

  get minRateDescription() {
    return this.getPropertyValue('minRateDescription', '');
  }

  set minRateDescription(value) {
    this.setPropertyValue('minRateDescription', value);
  }

  get maxRateDescription() {
    return this.getPropertyValue('maxRateDescription', '');
  }

  set maxRateDescription(value) {
    this.setPropertyValue('maxRateDescription', value);
  }

  onSurveyLoad() {
    if (this.jsonObj && this.jsonObj.rateValues) {
      this.rateValues = this.jsonObj.rateValues.map((value: Choice) => new ItemValue(value.value, value.text));
    }
  }

  protected onPropertyValueChanged(property: string, oldValue: any, newValue: any) {
    if (property === 'jsonObj' && newValue && newValue.rateValues) {
      this.rateValues = newValue.rateValues.map((value: Choice) => new ItemValue(value.value, value.text));
    }
    super.onPropertyValueChanged(property, oldValue, newValue);
  }
}

export class numberRating extends SurveyQuestionElementBase {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedValue: null,
    };
  }

  get question() {
    return this.props.question;
  }

  handleChoiceSelect = (value: string) => {
    this.setState({ selectedValue: value });
    this.question.value = value;
  };

  renderElement() {
    if (!this.question) return null;

    const rateValues = this.question.rateValues || [];
    const { selectedValue } = this.state;

    return (
      <div className="text-grey-600 w-full">
        <div className="rating-choices text-black flex gap-4 w-full flex justify-between mt-2">
          {rateValues.length > 0 ? (
            rateValues.map((choice: Choice, index: number) => (
              <button
                key={index}
                onClick={() => this.handleChoiceSelect(choice.value)}
                className={`border rounded-lg px-4 justify-center flex items-center text-lg gap-2 font-sans ${
                  selectedValue === choice.value
                    ? 'border-skyblue bg-skyblue  text-white'
                    : 'border-gray-300 bg-gray-100 bg-opacity-5 text-grey-500'
                }`}
              >
                {choice.text}
              </button>
            ))
          ) : (
            <span>No choices available</span>
          )}
        </div>
        <div className="flex justify-between text-[14px] mt-2 text-gray-400">
          <span>{this.question.minRateDescription}</span>
          <span>{this.question.maxRateDescription}</span>
        </div>
      </div>
    );
  }
}

Serializer.addClass(
  'numberRating',
  [
    { name: 'title', default: '', type: 'string' },
    { name: 'rateValues', type: 'itemvalues', default: [] },
    { name: 'minRateDescription', type: 'string', default: '' },
    { name: 'maxRateDescription', type: 'string', default: '' },
  ],
  function () {
    return new NumericRatingModel('');
  },
  'rating',
);

ReactQuestionFactory.Instance.registerQuestion('numberRating', (props) => {
  return React.createElement(numberRating, props);
});
