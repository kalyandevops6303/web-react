import React, { useState } from 'react';
import { Check } from 'lucide-react';
import QuestionBox from './QuestionBox';
import PrimaryButton from '../buttons/PrimaryButton';

interface TimelineStepperProps {
  data: {
    pages: Array<any>;
  };
}

const TimelineStepper: React.FC<TimelineStepperProps> = ({ data }) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = data.pages.map((_: any, index: number) => ({
    id: index + 1,
    completed: index + 1 < activeStep,
  }));
  const isLastStep = activeStep === steps.length;
  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log('Submitting feedback...');
    }
  };

  const getStepStyle = (step: { id: number; completed: boolean }) => {
    if (step.id === activeStep) return 'border-green-500 bg-sky-400';
    return step.completed ? 'border-green-500 bg-green-500' : 'border-green-500 bg-white';
  };

  const renderStepContent = () => {
    const stepData = data.pages[activeStep - 1];
    return <QuestionBox data={stepData} />;
  };

  return (
    <div className="w-full flex flex-col max-w-4xl mx-auto p-6">
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
          <div
            key={step.id}
            className="relative z-10"
            onClick={() => setActiveStep(step.id)}
            role="button"
            tabIndex={0}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow ${getStepStyle(
                step,
              )}`}
            >
              {step.completed && step.id !== activeStep && <Check className="w-6 h-6 text-white" />}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">{renderStepContent()}</div>

      <div>
        <PrimaryButton
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={handleNext}
        >
          {isLastStep ? 'Submit Feedback' : 'Next'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TimelineStepper;
