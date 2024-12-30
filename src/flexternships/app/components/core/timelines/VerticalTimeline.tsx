import { Check } from 'react-feather';

export default function VerticalTimeline(props: VerticalTimelineProps) {
  const { timelineItems, checked, hideLine } = props;

  return (
    <div className="w-full">
      <ol className={`relative`}>
        {timelineItems?.map((timelineItem, index) => (
          <li
            className={`${!hideLine ? 'pb-10 ps-5' : ''}  ${
              index != timelineItems?.length - 1 && 'border-s border-l'
            } ${checked ? 'border-[#28C76F]' : 'border-gray-200'}`}
            key={index}
          >
            {!hideLine && (
              <div className={`absolute rounded-full -left-[0.60rem] ${!checked ? 'bg-gray-200' : 'bg-[#28C76F]'}`}>
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
            )}

            <div className="mt-0 w-full">{timelineItem?.component}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

type VerticalTimelineProps = {
  timelineItems?: Array<{
    component: React.ReactNode;
    color: string;
  }>;
  checked?: boolean;
  hideLine?: boolean;
};
