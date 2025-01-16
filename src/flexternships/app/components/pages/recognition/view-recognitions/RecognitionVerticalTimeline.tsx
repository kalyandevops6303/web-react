interface TimelineItem {
  component: React.ReactNode;
  color: string;
}

interface RecognitionVerticalTimelineProps {
  timelineItems: TimelineItem[];
  spaceLeft?: number;
  spaceBottom?: number;
}

function RecognitionVerticalTimeline({
  timelineItems,
  spaceLeft = 8,
  spaceBottom = 6,
}: RecognitionVerticalTimelineProps) {
  return (
    <div className="flex flex-col">
      {timelineItems.map((item, index) => {
        const isLastItem = index === timelineItems.length - 1;

        return (
          <div
            key={index}
            style={{
              paddingLeft: `${spaceLeft}px`,
              paddingBottom: `${spaceBottom}px`,
            }}
            className={`relative flex flex-row items-start group
              ${
                !isLastItem
                  ? 'before:absolute before:left-2 before:h-full before:w-[1px] before:bg-grey-border before:self-start before:-translate-x-1/2 before:translate-y-[24px]'
                  : ''
              }`}
          >
            <div
              className="absolute left-2 -translate-x-1/2 mt-[13px] mr-4 p-1 rounded-full"
              style={{ backgroundColor: `${item.color}1F` }}
            >
              <div className={`size-3 bg-${item.color} rounded-full`} style={{ backgroundColor: item.color }} />
            </div>
            <div className="grow">{item.component}</div>
          </div>
        );
      })}
    </div>
  );
}

export default RecognitionVerticalTimeline;
