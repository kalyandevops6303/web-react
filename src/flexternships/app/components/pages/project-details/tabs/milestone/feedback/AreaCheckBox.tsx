import React from 'react';
import { ItemValue, QuestionCheckboxModel, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

type Choice = {
  value: string;
  text: string;
};

export class AreaCheckboxModel extends QuestionCheckboxModel {
  constructor(name: string) {
    super(name);
    this.onSurveyLoad();
  }

  getType() {
    return 'areacheckbox';
  }

  get choices() {
    return this.getPropertyValue('choices', []);
  }

  set choices(newValues) {
    this.setPropertyValue('choices', newValues);
  }

  onSurveyLoad() {
    if (this.jsonObj && this.jsonObj.choices) {
      this.choices = this.jsonObj.choices.map((choice: Choice) =>
        typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text),
      );
    }
  }

  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void {
    if (name === 'jsonObj' && newValue && newValue.choices) {
      this.choices = newValue.choices.map((choice: Choice) => new ItemValue(choice.value, choice.text));
    }
    super.onPropertyValueChanged(name, oldValue, newValue);
  }
}

export class AreaCheckbox extends SurveyQuestionElementBase {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedValues: new Set(this.props.question.value || []),
    };
  }

  get question() {
    return this.props.question;
  }

  componentDidMount() {
    if (this.question) {
      this.question.valueChangedCallback = () => {
        const questionValue = this.question.value || [];
        this.setState({
          selectedValues: new Set(Array.isArray(questionValue) ? questionValue : [questionValue]),
        });
      };
      const initialValue = this.question.value || [];
      this.setState({
        selectedValues: new Set(Array.isArray(initialValue) ? initialValue : [initialValue]),
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.question && prevProps.question.value !== this.question.value) {
      const questionValue = this.question.value || [];
      this.setState({
        selectedValues: new Set(Array.isArray(questionValue) ? questionValue : [questionValue]),
      });
    }
  }

  componentWillUnmount() {
    if (this.question) {
      this.question.valueChangedCallback = undefined;
    }
  }

  handleChoiceSelect = (value: any) => {
    const newSelectedValues = new Set(this.state.selectedValues);

    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value);
    } else {
      newSelectedValues.add(value);
    }
    this.setState({ selectedValues: newSelectedValues }, () => {
      if (this.question) {
        const valueArray = Array.from(newSelectedValues);
        this.question.value = valueArray;
      }
    });
  };

  renderElement() {
    if (!this.question) return null;

    const choices = this.question.choices || [];

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
          {choices.length > 0 ? (
            choices.map((choice: any) => {
              const value = typeof choice === 'string' ? choice : choice.value;
              const text = typeof choice === 'string' ? choice : choice.text || choice.value;
              const isSelected = this.state.selectedValues.has(value);

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => this.handleChoiceSelect(value)}
                  className={`
                                        flex items-center gap-3 p-3 rounded-lg border transition-all
                                        ${
                                          isSelected
                                            ? 'border-trublue-secondary-500 bg-trublue-secondary-500 text-blue-700 bg-opacity-5'
                                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                        }
                                    `}
                  aria-checked={isSelected}
                  role="checkbox"
                >
                  <div
                    className={`
                                        w-5 h-5 flex-shrink-0 rounded border-2 
                                        ${
                                          isSelected
                                            ? 'border-trublue-secondary-500  bg-trublue-secondary-500 shadow-custom-blue  '
                                            : 'border-gray-300'
                                        }
                                        flex items-center justify-center
                                    `}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-left text-[#515759] font-montserrat text-sm font-medium leading-[22px]">
                    {text}
                  </span>
                </button>
              );
            })
          ) : (
            <span>No choices available</span>
          )}
        </div>
      </div>
    );
  }
}

Serializer.addClass(
  'areacheckbox',
  [
    { name: 'title', type: 'string' },
    { name: 'choices', type: 'itemvalues' },
    { name: 'isRequired', type: 'boolean', default: false },
  ],
  function () {
    return new AreaCheckboxModel('');
  },
  'checkbox',
);

ReactQuestionFactory.Instance.registerQuestion('areacheckbox', (props) => {
  return React.createElement(AreaCheckbox, props);
});
