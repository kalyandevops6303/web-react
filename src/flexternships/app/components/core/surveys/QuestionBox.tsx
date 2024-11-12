import { useEffect, useState } from 'react';
import { Star } from 'react-feather';
import TimelineStepper from './TimeLineStepper';
import TextBox from './TextBox';
import CheckboxOptions from './MultipleCheckBox';
import RadioGroup from './RadioButton';

const AnswerSection = ({
  type,
  options,
  maxRateDescription,
  minRateDescription,
}: {
  type: string;
  options: any;
  maxRateDescription: string;
  minRateDescription: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const emojiOptions = [
    { emoji: '😞', value: 1 },
    { emoji: '😕', value: 2 },
    { emoji: '😐', value: 3 },
    { emoji: '😊', value: 4 },
    { emoji: '😁', value: 5 },
  ];
  return (
    <div className="flex flex-col items-center justify-between w-full">
      {type === 'stars' && (
        <div className="flex flex-col gap-2 items-center justify-between w-full">
          <div className="flex flex-row items-center gap-10 w-full justify-center">
            {options.map((option: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center gap-2"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <input type="radio" className="hidden" name="rating" value={option.value} />
                  <label>
                    <Star
                      size={32}
                      className={`cursor-pointer ${
                        index <= hoveredIndex ? 'text-[#FF9F43] fill-[#FF9F43]' : 'text-gray-400'
                      }`}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-grey">{minRateDescription}</h1>
            <h1 className="text-grey">{maxRateDescription}</h1>
          </div>
        </div>
      )}
      {type === 'smileys' && (
        <div className="flex flex-col gap-2 items-center justify-between w-full">
          <div className="flex flex-row items-center gap-7">
            {emojiOptions.map((option, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer text-3xl ${
                  index <= hoveredIndex || index <= selectedIndex ? 'text-[#FF9F43]' : 'text-gray-400'
                }`}
              >
                {option.emoji}
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between px-3 w-full">
            <h1 className="text-grey">{minRateDescription}</h1>
            <h1 className="text-grey">{maxRateDescription}</h1>
          </div>
        </div>
      )}

      {type === 'numeric' && (
        <div className="flex flex-col gap-2 text-sm items-center justify-between w-full">
          <div className="grid grid-cols-5 justify-center items-center mx-auto w-full gap-3">
            {options.map((option: { value: number; text: string }, index: number) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer text-lg border  border-grey rounded-lg  w-fit px-4 py-1 font-semibold  ${
                  index === selectedIndex ? 'bg-trublue text-white' : ''
                } `}
              >
                {option.text}
              </div>
            ))}
          </div>
          <div className="flex flex-row  items-center justify-between px-3 w-full">
            <h1 className="text-grey">{minRateDescription}</h1>
            <h1 className="text-grey">{maxRateDescription}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

const QuestionBox = ({ data }: { data: any }) => {
  const [multiLineText, setMultiLineText] = useState('');
  const [minDescription, setMinDescription] = useState('');
  const [maxDescription, setMaxDescription] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (data?.elements?.[0]?.type === 'rating') {
      if (data?.elements?.[0]?.rateType === 'stars') {
        setMinDescription(data?.elements?.[0]?.minRateDescription);
        setMaxDescription(data?.elements?.[0]?.maxRateDescription);
      }
      if (data?.elements?.[0]?.rateType === 'smileys') {
        setMinDescription(data?.elements?.[0]?.minDecriptionValue);
        setMaxDescription(data?.elements?.[0]?.maxDecriptionValue);
      } else {
        setMinDescription(data?.elements?.[0]?.minRateDescription);
        setMaxDescription(data?.elements?.[0]?.maxRateDescription);
      }
    }
  }, [data]);
  return (
    <div className="flex flex-col mt-10 items-start gap-4 w-full">
      <h1 className="font-medium text-sm">1. {data?.elements?.[0]?.title}</h1>

      <div className="w-full flex flex-col gap-4">
        {data?.elements?.[0]?.type === 'rating' && (
          <AnswerSection
            type={data?.elements?.[0]?.rateType ?? 'numeric'}
            options={data?.elements?.[0]?.rateValues}
            maxRateDescription={minDescription}
            minRateDescription={maxDescription}
          />
        )}
        {data?.elements?.[0]?.type === 'checkbox' && <CheckboxOptions options={data?.elements?.[0]?.choices} />}
        {data?.elements?.[0]?.type === 'radiogroup' && (
          <RadioGroup options={data?.elements?.[0]?.choices} value={selected} onChange={setSelected} />
        )}
        {data?.elements?.[1]?.type === 'comment' && (
          <TextBox
            label={data?.elements?.[1]?.title}
            required={data?.elements?.[1]?.isRequired}
            multiline
            rows={4}
            value={multiLineText}
            onChange={(newValue) => setMultiLineText(newValue)}
            placeholder={data?.elements?.[1]?.placeholder}
            minWidth="100%"
            maxWidth="100%"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionBox;
