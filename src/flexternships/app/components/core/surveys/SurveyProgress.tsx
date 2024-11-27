import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useEffect } from 'react';
import { Check } from 'react-feather';

export default function SurveyProgress() {
  // const [activeStep, setActiveStep] = useState(1);
  const surveyProgressData = useFeedbackStore((state) => state.surveyProgress);

  useEffect(() => {
    console.log(surveyProgressData);
  }, [surveyProgressData]);

  const steps = [
    {
      id: 0,
      completed: true,
    },
    {
      id: 1,
      completed: true,
    },
    {
      id: 2,
      completed: false,
    },
    {
      id: 3,
      completed: true,
    },
  ];

  const getStepStyle = (step: { id: number; completed: boolean }) => {
    return step.completed ? 'border-green-500 bg-green-500' : 'border-green-500 bg-white';
  };

  return (
    <div className="w-full flex flex-col max-w-4xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-10 right-10 flex -translate-y-1/2">
          {steps.slice(0, -1).map((step: { id: number; completed: boolean }, index: number) => (
            <div
              key={`connector-${index}`}
              className={`h-0.5 flex-1 ${
                step.completed && steps[index + 1].completed ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {steps.map((step: { id: number; completed: boolean }) => (
          <div key={step.id} className="relative z-10" onClick={() => {}} role="button" tabIndex={0}>
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow ${getStepStyle(
                step,
              )}`}
            >
              {step.completed && <Check size="20" className="text-white" />}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="w-full">{renderStepContent()}</div> */}
    </div>
  );
}
