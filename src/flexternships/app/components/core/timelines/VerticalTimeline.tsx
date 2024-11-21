import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Check } from 'react-feather';

export default function VerticalTimeline(props: VerticalTimelineProps) {
  const { timelineItems, checked } = props;

  return (
    <div className="w-full">
      <ol className={`relative border-s border-gray-200 border-l ${checked && 'border-[#28C76F]'}`}>
        {timelineItems?.map((timelineItem, index) => (
          <li className="mb-10 ms-4 bg-r" key={index}>
            <div className={`absolute rounded-full -left-[0.65rem] ${!checked ? 'bg-gray-200' : 'bg-[#28C76F]'}`}>
              {checked ? (
                <Check size="20" color="white" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill={timelineItem?.color} fillOpacity="0.12" />
                  <circle cx="10" cy="10" r="6" fill={timelineItem?.color} />
                </svg>
              )}
            </div>
            <div className="mt-3 w-full">{timelineItem?.component}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

type VerticalTimelineProps = {
  timelineItems?: Array<{
    component: EmotionJSX.Element;
    color: string;
  }>;
  checked?: boolean;
};
