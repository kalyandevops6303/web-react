import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { mockSelfFeedbackSurveyJson } from '@/flexternships/mocks/survey-data';
import TimelineStepper from '@/flexternships/app/components/core/surveys/TimeLineStepper';
import Sidebar from '@/flexternships/app/components/core/surveys/Sidebar';
/**
 * TODO:
 * - Complete the function of handleSurveyComplete
 * - Get surveyJson from the backend
 */

const persons = [
  {
    image:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
    name: 'Bob',
    role: 'Frontend Developer',
    completed: true,
    lastMessageTime: '3 min',
    isActive: false,
  },
  {
    image:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
    name: 'Bob',
    role: 'Frontend Developer',
    completed: true,
    lastMessageTime: '3 min',
    isActive: false,
  },
  {
    image:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
    name: 'Bob',

    role: 'Frontend Developer',
    completed: true,
    lastMessageTime: '3 min',
    isActive: false,
  },
  {
    image:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
    name: 'Bob',
    role: 'Frontend Developer',
    completed: false,
    lastMessageTime: '3 min',
    isActive: false,
  },
  {
    image:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
    name: 'Bob',
    role: 'Frontend Developer',
    completed: false,
    lastMessageTime: '3 min',
    isActive: true,
  },
];

export default function SelfFeedback() {
  const handleSurveyComplete = (survey: SurveyModel) => {
    console.log(survey.data);
  };
  return (
    <div>
      <div className="flex flex-row items-start">
        <Sidebar data={persons} />
        <TimelineStepper data={mockSelfFeedbackSurveyJson} />
      </div>

      <MilestoneFeedbackSurvey surveyJson={mockSelfFeedbackSurveyJson} onComplete={handleSurveyComplete} />
    </div>
  );
}
