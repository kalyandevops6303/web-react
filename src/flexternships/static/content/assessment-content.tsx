import { AlertTriangle, Video, Bookmark } from 'react-feather';
import { AssessmentType } from '@/flexternships/constraints/enums/assessment-enums';
import FactCheck from '@flexternships/assets/icons/core/fact-check-trublue.svg';
import HelpCenter from '@flexternships/assets/icons/core/help-center-trublue.svg';
import IPAddress from '@flexternships/assets/icons/core/ip-address-trublue.png';
import LaptopMac from '@flexternships/assets/icons/core/laptop-mac-trublue.svg';
import UnfoldMore from '@flexternships/assets/icons/core/unfold-more-trublue.svg';

export const getReadableAssessmentType = (type: AssessmentType) => {
  if (type === AssessmentType.BENCHMARKING) return 'Benchmarking Assessment';
  if (type === AssessmentType.END_OF_PROJECT) return 'End of Project Assessment';
  return 'Unknown Assessment';
};

export const instructions = [
  {
    icon: <img src={LaptopMac} alt="Laptop Mac" className="size-6" />,
    description: 'Use a PC with a webcam for the assessment.',
  },
  {
    icon: <Video size={24} className="text-trublue-secondary-500" />,
    description: 'Ensure good lighting and no background noise.',
  },
  {
    icon: <img src={FactCheck} alt="Fact Check" className="size-6" />,
    description: 'Complete the assessment in one continuous browser session.',
  },
  {
    icon: <img src={HelpCenter} alt="Help Center" className="size-6" />,
    description: 'Unattempted questions have no negative marking.',
  },
  {
    icon: <img src={UnfoldMore} alt="Unfold More" className="size-6" />,
    description: 'Navigate using Next/Previous buttons or question numbers.',
  },
  {
    icon: <Bookmark size={24} className="text-trublue-secondary-500" />,
    description: 'Mark questions to revisit later.',
  },
  {
    icon: <AlertTriangle size={24} className="text-trublue-secondary-500" />,
    description: 'Do not pause, restart, or navigate away from the test. These actions may lead to disqualification.',
  },
  {
    icon: <img src={IPAddress} alt="IP Address" className="size-6" />,
    description: 'Your IP address will be tracked while taking assessments, so please ensure to use the same device.',
  },
];
