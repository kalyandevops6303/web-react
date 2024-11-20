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
                typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text)
            );
        }
    }

    protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void {
        if (name === 'jsonObj' && newValue && newValue.choices) {
            this.choices = newValue.choices.map(
                (choice: Choice | string) =>
                    typeof choice === 'string' ? new ItemValue(choice) : new ItemValue(choice.value, choice.text)
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
            <div className={cssClasses.root}>
                <div className='wow-choices text-black flex gap-4'>
                    {choices.length > 0 ? (
                        choices.map((choice: any, index: number) => (
                            <button
                                key={index}
                                onClick={() => this.handleChoiceSelect(choice.value)}
                                className={`p-2 border rounded-lg w-24 justify-center flex items-center text-xs gap-2 font-semibold ${selectedValue === choice.value
                                        ? 'border-skyblue bg-skyblue bg-opacity-5 border-2 text-grey-600'
                                        : 'border-gray-300 bg-gray-100 bg-opacity-5 text-grey-500'
                                    }`}
                            >
                                {choice.text === 'NA' && choice.text !== 'wow' ? (
                                    <div></div>
                                ) : (
                                    <Award className={`${selectedValue === choice.value ? 'text-skyblue' : 'text-gray-400'
                                        } text-xs`} />
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
    'checkboxbase'
);

ReactQuestionFactory.Instance.registerQuestion('wowgroup', (props) => {
    return React.createElement(Wow, props);
});