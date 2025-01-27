import SelectOptionCard from '@/flexternships/app/components/core/form/SelectOptionCard';
import React from 'react';
import { ThumbsUp } from 'react-feather';
import { ItemValue, Question, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

type Choice = {
  value: string;
  text: string;
};

type CompetencyChoice = {
  id: string;
  name: string;
  abbreviation: string;
  colorCode: string;
  selected?: boolean;
};

type Competency = {
  choices: Array<CompetencyChoice>;
  title: string;
  isRequired: boolean;
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

  get hasComment(): boolean {
    return this.getPropertyValue('hasComment', false);
  }

  set hasComment(newValue: boolean) {
    this.setPropertyValue('hasComment', newValue);
  }

  get commentText(): string {
    return this.getPropertyValue('commentText', '');
  }

  set commentText(newValue: string) {
    this.setPropertyValue('commentText', newValue);
  }

  // TODO: Make this dynamic and update the data model
  get competency(): Competency {
    return this.getPropertyValue('competency', undefined);
  }

  set competency(newValue: Competency) {
    this.setPropertyValue('competency', newValue);
  }

  onSurveyLoad(): void {
    if (!this.jsonObj) return;

    if (this.jsonObj.choices) {
      this.choices = this.jsonObj.choices.map((choice: Choice | string) =>
        typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text),
      );
    }
    if (this.jsonObj.hasComment !== undefined) {
      this.hasComment = this.jsonObj.hasComment;
    }

    // If competency data exists in the JSON object
    if (this.jsonObj.competency) {
      this.competency = {
        ...this.jsonObj.competency,
        choices: this.jsonObj.competency.choices.map((choice: CompetencyChoice) => ({
          ...choice,
          selected: false, // Initialize selection state as false
        })),
      };
    }
  }

  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void {
    if (name === 'jsonObj' && newValue && newValue.choices) {
      this.choices = newValue.choices.map((choice: Choice | string) =>
        typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text),
      );
    }
    if (name === 'jsonObj' && newValue && newValue.hasComment !== undefined) {
      this.hasComment = newValue.hasComment;
    }
    if (name === 'jsonObj' && newValue && newValue.competency) {
      this.competency = newValue.competency;
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

  handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = event.target.value;
    this.question.commentText = newComment; // Update the model's commentText property directly
  };

  handleCompetencySelect = (value: string): void => {
    const updatedCompetency = {
      ...this.question.competency,
      choices: this.question.competency.choices.map((choice: CompetencyChoice) => {
        const isPreviouslySelected = choice.selected;
        const isClicked = choice.id === value;

        return {
          ...choice,
          selected: isClicked ? !isPreviouslySelected : isPreviouslySelected,
        };
      }),
    };

    this.question.competency = updatedCompetency;
  };

  render(): JSX.Element | null {
    if (!this.question) return null;

    const cssClasses = this.question.cssClasses;
    const choices = this.question.choices || [];
    const competency = this.question.competency;
    const { selectedValue } = this.state;

    return (
      <div className={`${cssClasses.root} flex flex-col gap-y-4`}>
        <div className="kudos-choices text-black flex gap-4">
          {choices.length > 0 ? (
            choices.map((choice: ItemValue, index: number) => (
              <button
                key={index}
                onClick={() => this.handleChoiceSelect(choice.value)}
                className={`py-[10px] px-[20px] gap-[8px] min-w-[64px] border rounded-lg justify-center flex items-center text-xs font-semibold ${
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
                  {choice.text === 'NA' ? 'Not Applicable' : choice.text}
                </span>
              </button>
            ))
          ) : (
            <span>No choices available</span>
          )}
        </div>

        {competency && (
          <div className="flex flex-col gap-y-2">
            <div className="text-sm font-medium leading-5.5 text-grey-600">
              {competency.title} {competency.isRequired && <span className="text-error">*</span>}
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {competency.choices.map((choice: CompetencyChoice) => (
                <SelectOptionCard
                  key={choice.id}
                  text={choice.name}
                  value={choice.id}
                  selected={!!choice.selected}
                  onClick={() => this.handleCompetencySelect(choice.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Render the comment box if hasComment is true */}
        {/* {this.question.hasComment && (
          <div className="mt-4">
            <textarea
              value={this.question.commentText} // Bind the model's commentText directly to the textarea
              onChange={this.handleCommentChange}
              placeholder="Add a comment"
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )} */}
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
    { name: 'hasComment', type: 'boolean', default: false }, // Add hasComment to schema
    { name: 'commentText', type: 'string', default: '' }, // Add commentText to schema
    { name: 'competency', type: 'object', default: undefined },
  ],
  function () {
    return new KudosModel('');
  },
  'question',
);

ReactQuestionFactory.Instance.registerQuestion('kudosgroup', (props) => {
  return React.createElement(Kudos, props);
});
