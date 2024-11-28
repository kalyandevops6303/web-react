import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import React from 'react';
import { User } from 'react-feather';
import { ItemValue, QuestionCheckboxModel, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

type Choice = {
  value: Record<string, any>;
};

export class GridCheckboxModel extends QuestionCheckboxModel {
  constructor(name: string) {
    super(name);
    this.onSurveyLoad();
  }

  getType() {
    return 'gridcheckbox';
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
        typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value),
      );
    }
  }

  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void {
    if (name === 'jsonObj' && newValue && newValue.choices) {
      this.choices = newValue.choices.map((choice: Choice) => new ItemValue(choice.value));
    }
    super.onPropertyValueChanged(name, oldValue, newValue);
  }
}

export class GridCheckbox extends SurveyQuestionElementBase {
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
    const choices = this.question.jsonObj.choices || [];

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
          {choices.length > 0 ? (
            choices.map((choice: any) => {
              const value = typeof choice === 'string' ? choice : choice;
              const text = typeof choice === 'string' ? choice : choice.text || choice.value;
              const isSelected = this.state.selectedValues.has(value);

              return (
                <button
                  key={choice._id}
                  type="button"
                  onClick={() => this.handleChoiceSelect(value)}
                  className={`
                            relative flex items-center gap-3 p-2 rounded-lg transition ease-in-out bg-white shadow-[0px_8px_12px_0px_rgba(0,0,0,0.08)]
                            ${
                              isSelected
                                ? 'border border-[#2196F3] bg-white shadow-[2px_2px_12px_0px_rgba(33,150,243,0.5)]'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }
                        `}
                  aria-checked={isSelected}
                  role="checkbox"
                >
                  <span className="text-left text-[14px] font-semibold leading-[22px] font-montserrat text-[#6E6B7B]">
                    <div>
                      <div className="flex gap-1 items-center mt-1">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={choice.image_uri} className="w-full h-full" />
                          <AvatarFallback className="w-full h-full">
                            <User color="#6E6B7B" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <div>
                            {choice.first_name} {choice.last_name}
                          </div>
                          <div className="text-[12px] font-normal leading-[20px] font-montserrat text-[#6E6B7B]">
                            {choice.role_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                  <div
                    className={`
                                absolute top-1 right-0.5 w-3.5 h-3.5 rounded-full
                                ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                                flex items-center justify-center
                            `}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
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
  'gridcheckbox',
  [
    { name: 'title', type: 'string' },
    { name: 'choices', type: 'itemvalues' },
    { name: 'isRequired', type: 'boolean', default: false },
  ],
  function () {
    return new GridCheckboxModel('');
  },
  'checkbox',
);

ReactQuestionFactory.Instance.registerQuestion('gridcheckbox', (props) => {
  return React.createElement(GridCheckbox, props);
});
