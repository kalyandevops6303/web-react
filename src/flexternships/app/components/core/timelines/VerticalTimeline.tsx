import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Check } from 'react-feather';

export default function VerticalTimeline(props: VerticalTimelineProps) {
  const { timelineItems, checked } = props;

  return (
    <div className="w-full">
      <ol className={`relative ${checked && 'border-[#28C76F]'}`}>
        <div className="absolute border-1 border-gray-200 h-[27rem] lg:h-[25rem] xl:h-[24rem]"></div>
        {timelineItems?.map((timelineItem, index) => (
          <li className="mb-10 ms-2 bg-r" key={index}>
            <div className={`absolute rounded-full -left-[0.55rem] ${!checked ? 'bg-gray-200' : 'bg-[#28C76F]'}`}>
              {checked ? (
                <div className="p-1">
                  <Check size="13" color="white" />
                </div>
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
