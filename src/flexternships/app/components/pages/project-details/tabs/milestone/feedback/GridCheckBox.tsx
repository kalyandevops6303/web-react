import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import React from 'react';
import { User } from 'react-feather';
import { ItemValue, QuestionCheckboxModel, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

type Choice = {
  first_name: string;
  last_name: string;
  image_uri?: string;
  role_name?: string;
  appreciation_score?: number | null;
  averageRating?: number | null;
  team_id: string;
  _id: string;
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
      this.choices = this.jsonObj.choices.map((choice: Choice) => {
        const text = `${choice.first_name} ${choice.last_name}` || '';

        return new ItemValue(choice, text); // Store the entire object as the value
      });
    }
  }

  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void {
    if (name === 'jsonObj' && newValue && newValue.choices) {
      this.choices = newValue.choices.map((choice: Choice) => {
        const text = choice.first_name || '';
        return new ItemValue(choice, text); // Store the entire object as the value
      });
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

  handleChoiceSelect = (choiceValue: any) => {
    const newSelectedValues = new Set(this.state.selectedValues);

    if (newSelectedValues.has(choiceValue)) {
      newSelectedValues.delete(choiceValue);
    } else {
      newSelectedValues.add(choiceValue);
    }

    this.setState({ selectedValues: newSelectedValues }, () => {
      if (this.question) {
        this.question.value = Array.from(newSelectedValues); // Save the array of objects
      }
    });
  };

  renderElement() {
    if (!this.question) return null;

    const choices = this.question.choices || [];

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-1 mt-2">
          {choices.length > 0 ? (
            choices.map((choice: any) => {
              const value = typeof choice === 'string' ? choice : choice.value;
              const text = typeof choice === 'string' ? choice : choice.text || choice.value;
              const imageUri = choice.id.image_uri || '';
              const role = choice.id.role_name || '';
              const isSelected = this.state.selectedValues.has(value);

              return (
                <button
                  key={value._id}
                  type="button"
                  onClick={() => this.handleChoiceSelect(value)}
                  className={`
                    relative flex items-start p-2 rounded-lg transition-none shadow-[0px_8px_12px_0px_rgba(0,0,0,0.08)]
                    ${
                      isSelected
                        ? 'shadow-[2px_2px_12px_0px_rgba(33,150,243,0.5)] border border-[#2196F3]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }
                  `}
                  aria-checked={isSelected}
                  role="checkbox"
                >
                  <div
                    className={`
                      absolute top-2 right-2 w-5 h-5 flex-shrink-0 rounded-full border-2 
                      ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-none'}
                      flex items-center justify-center
                    `}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-left text-[14px] font-semibold leading-[22px] font-montserrat text-[#6E6B7B]">
                    <div>
                      <div className="flex gap-1 items-center mt-1">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={imageUri} className="w-full h-full rounded-full" />
                          <AvatarFallback className="w-full h-full">
                            <User color="#6E6B7B" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <div className="flex flex-nowrap w-[120px] whitespace-nowrap overflow-hidden text-ellipsis font-montserrat">
                            {text}
                          </div>
                          <div className="text-[12px] font-normal leading-[20px] font-montserrat text-[#6E6B7B] font-montserrat">
                            {role}
                          </div>
                        </div>
                      </div>
                    </div>
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
  'gridcheckbox',
  [
    { name: 'title', type: 'string' },
    { name: 'choices', type: 'itemvalues' },
    { name: 'isRequired', type: 'boolean', default: false },
    { name: 'tag', type: 'object' },
  ],
  function () {
    return new GridCheckboxModel('');
  },
  'checkbox',
);

ReactQuestionFactory.Instance.registerQuestion('gridcheckbox', (props) => {
  return React.createElement(GridCheckbox, props);
});
