import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { mockSelfFeedbackSurveyJson } from '@/flexternships/mocks/survey-data';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/KudosRecognition';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';
export { AreaCheckbox } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/AreaCheckBox';
export { Wow } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/WowRecognition';

/*
To be verified with the api or the JSON first
export { LeaderCheckbox } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/LeaderCheckBox';
*/

/**
/**
 * TODO:
 * - Complete the function of handleSurveyComplete
 * - Get surveyJson from the backend
 * - Remove the hardcoded amd commented code from the component
 */

// const persons = [
//   {
//     image:
//       'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
//     name: 'Bob',
//     role: 'Frontend Developer',
//     completed: true,
//     lastMessageTime: '3 min',
//     isActive: false,
//   },
//   {
//     image:
//       'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
//     name: 'Bob',
//     role: 'Frontend Developer',
//     completed: true,
//     lastMessageTime: '3 min',
//     isActive: false,
//   },
//   {
//     image:
//       'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
//     name: 'Bob',

//     role: 'Frontend Developer',
//     completed: true,
//     lastMessageTime: '3 min',
//     isActive: false,
//   },
//   {
//     image:
//       'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
//     name: 'Bob',
//     role: 'Frontend Developer',
//     completed: false,
//     lastMessageTime: '3 min',
//     isActive: false,
//   },
//   {
//     image:
//       'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
//     name: 'Bob',
//     role: 'Frontend Developer',
//     completed: false,
//     lastMessageTime: '3 min',
//     isActive: true,
//   },
// ];

export default function SelfFeedback() {
  const handleSurveyComplete = (survey: SurveyModel) => {
    console.log(survey.data);
  };
  return (
    <div>
      {/* <div className="flex flex-row items-start"> */}
      {/* <Sidebar data={persons} /> */}
      {/* <TimelineStepper data={mockSelfFeedbackSurveyJson} /> */}
      {/* </div> */}
      <MilestoneFeedbackSurvey surveyJson={mockSelfFeedbackSurveyJson} onComplete={handleSurveyComplete} />
    </div>
  );
}
