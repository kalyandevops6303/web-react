import React from 'react';
import { ItemValue, QuestionRatingModel, Serializer } from 'survey-core';
import { ReactQuestionFactory, SurveyQuestionElementBase } from 'survey-react-ui';

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
    return 'smileyRating';
  }

  get rateValues() {
    return this.getPropertyValue('rateValues', []);
  }

  set rateValues(newValues) {
    this.setPropertyValue('rateValues', newValues);
  }

  get minDecriptionValue() {
    return this.getPropertyValue('minDecriptionValue', '');
  }

  set minDecriptionValue(value) {
    this.setPropertyValue('minDecriptionValue', value);
  }

  get maxDecriptionValue() {
    return this.getPropertyValue('maxDecriptionValue', '');
  }

  set maxDecriptionValue(value) {
    this.setPropertyValue('maxDecriptionValue', value);
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
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M24 12C24 18.6273 18.6273 24 12 24C5.37267 24 0 18.6273 0 12C0 5.37267 5.37267 0 12 0C18.6273 0 24 5.37267 24 12Z"
              fill="#FFCC4D"
            />
            <path
              d="M19.3323 6.66452C15.6296 6.66452 14.1309 3.75319 14.0689 3.62919C13.9043 3.29985 14.0376 2.89919 14.367 2.73452C14.6956 2.57052 15.095 2.70252 15.2603 3.02985C15.3103 3.12719 16.4743 5.33119 19.3323 5.33119C19.701 5.33119 19.9989 5.62985 19.9989 5.99785C19.9989 6.36585 19.701 6.66452 19.3323 6.66452ZM4.66562 6.66452C4.29762 6.66452 3.99895 6.36585 3.99895 5.99785C3.99895 5.62985 4.29762 5.33119 4.66562 5.33119C8.05428 5.33119 8.66295 3.25119 8.68762 3.16252C8.78428 2.81052 9.14895 2.59719 9.50028 2.68985C9.85362 2.78252 10.0676 3.13852 9.97895 3.49319C9.94628 3.62252 9.13495 6.66452 4.66562 6.66452ZM3.99962 15.3312C3.79695 15.3312 3.59695 15.2392 3.46562 15.0645C3.24428 14.7705 3.30428 14.3525 3.59895 14.1319C3.69428 14.0605 5.56628 12.6765 8.16962 12.1765C6.51962 11.3492 4.68828 11.3312 4.66495 11.3312C4.29695 11.3305 3.99895 11.0312 3.99962 10.6632C3.99962 10.2959 4.29762 9.99785 4.66562 9.99785C4.81295 9.99785 8.30028 10.0232 10.4703 12.1932C10.661 12.3839 10.7183 12.6705 10.615 12.9199C10.5116 13.1692 10.2683 13.3312 9.99895 13.3312C6.92362 13.3312 4.42362 15.1792 4.39895 15.1979C4.27895 15.2879 4.13828 15.3312 3.99962 15.3312ZM19.9983 15.3305C19.8596 15.3305 19.7196 15.2879 19.5996 15.1985C19.5743 15.1792 17.059 13.3312 13.999 13.3312C13.7296 13.3312 13.4856 13.1692 13.383 12.9199C13.2796 12.6705 13.337 12.3839 13.5276 12.1932C15.6983 10.0232 19.1849 9.99785 19.3323 9.99785C19.7003 9.99785 19.9976 10.2959 19.9983 10.6632C19.999 11.0312 19.701 11.3299 19.3336 11.3312C19.3096 11.3312 17.4783 11.3492 15.8283 12.1765C18.4316 12.6765 20.3036 14.0599 20.3983 14.1319C20.6923 14.3525 20.7523 14.7692 20.5323 15.0639C20.4016 15.2379 20.2016 15.3305 19.9983 15.3305ZM16.9683 20.5252C16.8896 20.3539 15.0096 16.3312 12.1616 16.3312C9.32895 16.3312 7.13095 20.3359 7.03895 20.5059C6.96362 20.6452 6.99695 20.8185 7.11828 20.9199C7.18028 20.9719 7.25628 20.9979 7.33228 20.9979C7.40562 20.9979 7.47895 20.9739 7.53962 20.9252C7.56028 20.9092 9.64828 19.2725 12.1616 19.2725C14.6569 19.2725 16.4203 20.8925 16.4376 20.9085C16.5543 21.0165 16.7323 21.0285 16.8603 20.9352C16.9896 20.8419 17.035 20.6705 16.9683 20.5252Z"
              fill="#664500"
            />
          </svg>
        );
      case 2:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path
              d="M12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24Z"
              fill="#FFCC4D"
            />
            <path
              d="M17.4901 18.2514C17.4601 18.132 16.7115 15.332 12.5001 15.332C8.28812 15.332 7.54012 18.132 7.51012 18.2514C7.47345 18.396 7.53878 18.546 7.66812 18.6207C7.79812 18.6947 7.96078 18.6727 8.06812 18.5694C8.08078 18.5567 9.37078 17.332 12.5001 17.332C15.6295 17.332 16.9201 18.5567 16.9321 18.5687C16.9961 18.632 17.0815 18.6654 17.1668 18.6654C17.2228 18.6654 17.2795 18.6514 17.3308 18.6227C17.4615 18.548 17.5268 18.3967 17.4901 18.2514Z"
              fill="#664500"
            />
            <path
              d="M8.4987 11.3346C9.41917 11.3346 10.1654 10.29 10.1654 9.0013C10.1654 7.71264 9.41917 6.66797 8.4987 6.66797C7.57822 6.66797 6.83203 7.71264 6.83203 9.0013C6.83203 10.29 7.57822 11.3346 8.4987 11.3346Z"
              fill="#664500"
            />
            <path
              d="M16.4987 11.3346C17.4192 11.3346 18.1654 10.29 18.1654 9.0013C18.1654 7.71264 17.4192 6.66797 16.4987 6.66797C15.5782 6.66797 14.832 7.71264 14.832 9.0013C14.832 10.29 15.5782 11.3346 16.4987 11.3346Z"
              fill="#664500"
            />
          </svg>
        );
      case 3:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M24 12C24 18.6273 18.6273 24 12 24C5.37333 24 0 18.6273 0 12C0 5.37333 5.37333 0 12 0C18.6273 0 24 5.37333 24 12Z"
              fill="#FFCC4D"
            />
            <path
              d="M7.66667 13.3346C8.58714 13.3346 9.33333 12.29 9.33333 11.0013C9.33333 9.71264 8.58714 8.66797 7.66667 8.66797C6.74619 8.66797 6 9.71264 6 11.0013C6 12.29 6.74619 13.3346 7.66667 13.3346Z"
              fill="#664500"
            />
            <path
              d="M16.3346 13.3346C17.2551 13.3346 18.0013 12.29 18.0013 11.0013C18.0013 9.71264 17.2551 8.66797 16.3346 8.66797C15.4142 8.66797 14.668 9.71264 14.668 11.0013C14.668 12.29 15.4142 13.3346 16.3346 13.3346Z"
              fill="#664500"
            />
            <path
              d="M16.668 17.3333H7.33464C6.96664 17.3333 6.66797 17.0353 6.66797 16.6667C6.66797 16.298 6.96664 16 7.33464 16H16.668C17.0366 16 17.3346 16.298 17.3346 16.6667C17.3346 17.0353 17.0366 17.3333 16.668 17.3333Z"
              fill="#664500"
            />
          </svg>
        );
      case 4:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path
              d="M12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24Z"
              fill="#FFCC4D"
            />
            <path
              d="M7.51011 15.746C7.54011 15.8654 8.28878 18.6654 12.5001 18.6654C16.7121 18.6654 17.4601 15.8654 17.4901 15.746C17.5268 15.6014 17.4614 15.4514 17.3321 15.3767C17.2021 15.3027 17.0394 15.3247 16.9321 15.428C16.9194 15.4407 15.6294 16.6654 12.5001 16.6654C9.37078 16.6654 8.08011 15.4407 8.06811 15.4287C8.00411 15.3654 7.91878 15.332 7.83344 15.332C7.77744 15.332 7.72078 15.346 7.66944 15.3747C7.53878 15.4494 7.47344 15.6007 7.51011 15.746Z"
              fill="#664500"
            />
            <path
              d="M8.4987 11.3346C9.41917 11.3346 10.1654 10.29 10.1654 9.0013C10.1654 7.71264 9.41917 6.66797 8.4987 6.66797C7.57822 6.66797 6.83203 7.71264 6.83203 9.0013C6.83203 10.29 7.57822 11.3346 8.4987 11.3346Z"
              fill="#664500"
            />
            <path
              d="M16.4987 11.3346C17.4192 11.3346 18.1654 10.29 18.1654 9.0013C18.1654 7.71264 17.4192 6.66797 16.4987 6.66797C15.5782 6.66797 14.832 7.71264 14.832 9.0013C14.832 10.29 15.5782 11.3346 16.4987 11.3346Z"
              fill="#664500"
            />
          </svg>
        );
      case 5:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M24 12C24 18.6273 18.6273 24 12 24C5.37333 24 0 18.6273 0 12C0 5.37333 5.37333 0 12 0C18.6273 0 24 5.37333 24 12Z"
              fill="#FFCC4D"
            />
            <path
              d="M18.9726 11.866C18.9326 11.776 17.9733 9.66797 16.0013 9.66797C14.03 9.66797 13.07 11.776 13.03 11.866C12.9686 12.004 13.0086 12.1653 13.1266 12.26C13.2433 12.3546 13.4106 12.358 13.5333 12.2693C13.5413 12.2633 14.3746 11.668 16.0013 11.668C17.6186 11.668 18.4506 12.2553 18.4693 12.2686C18.528 12.3126 18.5986 12.3346 18.668 12.3346C18.7413 12.3346 18.8153 12.31 18.876 12.262C18.994 12.1673 19.0346 12.0046 18.9726 11.866ZM10.9726 11.866C10.9326 11.776 9.9733 9.66797 8.0013 9.66797C6.02997 9.66797 5.06997 11.776 5.02997 11.866C4.96864 12.004 5.00864 12.1653 5.12597 12.26C5.2433 12.3546 5.41064 12.358 5.53264 12.2693C5.5413 12.2633 6.37397 11.668 8.0013 11.668C9.61864 11.668 10.4506 12.2553 10.4693 12.2686C10.528 12.3126 10.5986 12.3346 10.668 12.3346C10.7413 12.3346 10.8153 12.31 10.876 12.262C10.9946 12.1673 11.034 12.0046 10.9726 11.866ZM12.0013 14.668C9.58597 14.668 7.9833 14.3866 6.0013 14.0013C5.54864 13.914 4.66797 14.0013 4.66797 15.3346C4.66797 18.0013 7.7313 21.3346 12.0013 21.3346C16.2706 21.3346 19.3346 18.0013 19.3346 15.3346C19.3346 14.0013 18.454 13.9133 18.0013 14.0013C16.0193 14.3866 14.4166 14.668 12.0013 14.668Z"
              fill="#664500"
            />
            <path
              d="M6 15.332C6 15.332 8 15.9987 12 15.9987C16 15.9987 18 15.332 18 15.332C18 15.332 16.6667 17.9987 12 17.9987C7.33333 17.9987 6 15.332 6 15.332Z"
              fill="white"
            />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M24 12C24 18.6273 18.6273 24 12 24C5.37333 24 0 18.6273 0 12C0 5.37333 5.37333 0 12 0C18.6273 0 24 5.37333 24 12Z"
              fill="#FFCC4D"
            />
            <path
              d="M7.66667 13.3346C8.58714 13.3346 9.33333 12.29 9.33333 11.0013C9.33333 9.71264 8.58714 8.66797 7.66667 8.66797C6.74619 8.66797 6 9.71264 6 11.0013C6 12.29 6.74619 13.3346 7.66667 13.3346Z"
              fill="#664500"
            />
            <path
              d="M16.3346 13.3346C17.2551 13.3346 18.0013 12.29 18.0013 11.0013C18.0013 9.71264 17.2551 8.66797 16.3346 8.66797C15.4142 8.66797 14.668 9.71264 14.668 11.0013C14.668 12.29 15.4142 13.3346 16.3346 13.3346Z"
              fill="#664500"
            />
            <path
              d="M16.668 17.3333H7.33464C6.96664 17.3333 6.66797 17.0353 6.66797 16.6667C6.66797 16.298 6.96664 16 7.33464 16H16.668C17.0366 16 17.3346 16.298 17.3346 16.6667C17.3346 17.0353 17.0366 17.3333 16.668 17.3333Z"
              fill="#664500"
            />
          </svg>
        );
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

    // TODO: move svg icons to separate components

    return (
      <div className="text-grey-600 w-full">
        <div className="rating-choices text-black flex gap-4 w-full flex justify-between mt-2">
          {rateValues.length > 0 ? (
            rateValues.map((choice: Choice) => (
              <button
                key={choice.value}
                onClick={() => this.handleChoiceSelect(choice.value)}
                className={`border rounded-lg pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-center flex flex-col items-center gap-2 font-sans
  ${
    selectedValue === choice.value
      ? 'border-yellow-secondary-500 bg-yellow bg-opacity-20 text-grey-600'
      : 'border-yellow-300 hover:border-yellow-400 bg-gray-100 bg-opacity-5 text-yellow-500'
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
        <div className="flex justify-between text-[14px] mt-2" style={{ color: '#00000073' }}>
          <span>{this.question.minDecriptionValue}</span>
          <span>{this.question.maxDecriptionValue}</span>
        </div>
      </div>
    );
  }
}

Serializer.addClass(
  'smileyRating',
  [
    { name: 'title', type: 'string' },
    { name: 'rateValues', type: 'itemvalues', default: [1, 2, 3, 4, 5] },
    { name: 'minDecriptionValue', type: 'string', default: 'Unhappy' },
    { name: 'maxDecriptionValue', type: 'string', default: 'Delighted' },
    { name: 'rateMax', type: 'number', default: 5 },
  ],
  function () {
    return new SmileyRatingModel('');
  },
  'rating',
);

ReactQuestionFactory.Instance.registerQuestion('smileyRating', (props) => {
  return React.createElement(SmileyRating, props);
});
