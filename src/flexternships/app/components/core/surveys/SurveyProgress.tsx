import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { Check } from 'react-feather';
import { useLocation } from 'react-router-dom';

export default function SurveyProgress() {
  const surveyProgressData = useFeedbackStore((state) => state.surveyProgress);
  const [steps, setSteps] = useState<any>([]);

  const location = useLocation();

  const isAnswered = (index: number): boolean => {
    return surveyProgressData?.answeredQuestions?.some((item: { index: number }) => item.index === index);
  };

  const getStepStyle = (step: { completed: boolean }) => {
    return step.completed ? 'border-green-500 bg-green-500' : 'border-green-500 bg-white';
  };

  useEffect(() => {
    setSteps(
      surveyProgressData?.allQuestions?.map((item: any, index: number) => ({
        completed: isAnswered(index),
        id: item.name,
      })),
    );
  }, [surveyProgressData]);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#' from the hash
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const handleStepClick = (stepId: string) => {
    // Update the hash in the URL without triggering a reload
    window.history.pushState(null, '', `#${stepId}`);

    // Scroll to the element
    const element = document.getElementById(stepId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col max-w-4xl mx-auto p-6 bg-white">
      {!isEmpty(steps) && (
        <div className="flex items-center justify-between relative">
          <div className="absolute top-[10px] left-0 right-0 flex -translate-y-1/2">
            {steps?.slice(0, -1).map((step: { completed: boolean }, index: number) => (
              <div
                key={`connector-${index}`}
                className={`h-0.5 flex-1 ${
                  step.completed && steps[index + 1].completed ? 'bg-green-500' : 'bg-green-500'
                }`}
              />
            ))}
          </div>

          {steps?.map((step: { completed: boolean; id: string }) => (
            <div
              key={step.id}
              className="relative z-10"
              onClick={() => handleStepClick(step.id)}
              role="button"
              tabIndex={0}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow ${getStepStyle(
                  step,
                )}`}
              >
                {step.completed && <Check size="15" className="text-white" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
