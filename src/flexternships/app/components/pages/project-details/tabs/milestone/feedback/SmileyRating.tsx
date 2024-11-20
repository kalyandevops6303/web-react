import React from "react";
import { ItemValue, QuestionRatingModel, Serializer } from "survey-core";
import { ReactQuestionFactory, SurveyQuestionElementBase } from "survey-react-ui";

type Choice = {
    value: number;
    text: string;
};

export class SmileyRatingModel extends QuestionRatingModel {
    constructor(name: string) {
        super(name);
        this.onSurveyLoad();
    }

    getType() {
        return "smileyRating";
    }

    get rateValues() {
        return this.getPropertyValue("rateValues", []);
    }

    set rateValues(newValues) {
        this.setPropertyValue("rateValues", newValues);
    }

    get minDecriptionValue() {
        return this.getPropertyValue("minDecriptionValue", "");
    }

    set minDecriptionValue(value) {
        this.setPropertyValue("minDecriptionValue", value);
    }

    get maxDecriptionValue() {
        return this.getPropertyValue("maxDecriptionValue", "");
    }

    set maxDecriptionValue(value) {
        this.setPropertyValue("maxDecriptionValue", value);
    }

    onSurveyLoad() {
        if (this.jsonObj && this.jsonObj.rateValues) {
            this.rateValues = this.jsonObj.rateValues.map((value: any) => new ItemValue(value));
        }
    }

    protected onPropertyValueChanged(property: string, oldValue: any, newValue: any) {
        if (property === 'jsonObj' && newValue && newValue.rateValues) {
          this.rateValues = newValue.rateValues.map((value: any) => new ItemValue(value));
        }
        super.onPropertyValueChanged(property, oldValue, newValue);
    }
}

export class SmileyRating extends SurveyQuestionElementBase {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedValue: props.question.value || null,
        };
    }

    get question() {
        return this.props.question;
    }

    getEmoji = (condition: number) => {
        switch (condition) {
            case 1:
                return "😢";
            case 2:
                return "😕";
            case 3:
                return "😐";
            case 4:
                return "🙂";
            case 5:
                return "😄";
            default:
                return "😐";
        }
    };

    handleChoiceSelect = (value: any) => {
        this.setState({ selectedValue: value });
        this.question.value = value;
    };

    componentDidMount() {
        this.question.valueChangedCallback = () => {
            this.setState({ selectedValue: this.question.value });
        };
    }

    componentWillUnmount() {
        if (this.question) {
            this.question.valueChangedCallback = null;
        }
    }

    renderElement() {
        if (!this.question) return null;

        const rateValues = this.question.rateValues || [];
        const { selectedValue } = this.state;

        return (
            <div className="text-grey-600 w-[calc(100vw-15%)]">
                <div className="rating-choices text-black flex gap-4 w-full flex justify-between mt-2">
                    {rateValues.length > 0 ? (
                        rateValues.map((choice: Choice) => (
                            <button
                                key={choice.value}
                                onClick={() => this.handleChoiceSelect(choice.value)}
                                className={`border rounded-lg p-2 justify-center flex flex-col items-center gap-2 font-sans  ${selectedValue === choice.value
                                        ? "border-yellow bg-yellow bg-opacity-20 text-grey-600"
                                        : "border-yellow-300 hover:border-yellow-400 bg-gray-100 bg-opacity-5 text-yellow-500"
                                    }`}
                            >
                                <span className="text-xl" role="img" aria-label={`Rating ${choice.value}`}>
                                    {this.getEmoji(choice.value)}
                                </span>
                            </button>
                        ))
                    ) : (
                        <span>No choices available</span>
                    )}
                </div>
                <div className="flex justify-between text-[14px] mt-2 text-gray-400">
                    <span>{this.question.minDecriptionValue}</span>
                    <span>{this.question.maxDecriptionValue}</span>
                </div>
            </div>
        );
    }
}

Serializer.addClass(
    "smileyRating",
    [
        { name: "title", type: "string" },
        { name: "rateValues", type: "itemvalues", default: [1, 2, 3, 4, 5] },
        { name: "minDecriptionValue", type: "string", default: "Unhappy" },
        { name: "maxDecriptionValue", type: "string", default: "Delighted" },
        { name: "rateMax", type: "number", default: 5 },
    ],
    function () {
        return new SmileyRatingModel("");
    },
    "rating"
);

ReactQuestionFactory.Instance.registerQuestion("smileyRating", (props) => {
    return React.createElement(SmileyRating, props);
});