import { Check } from 'react-feather';
import classNames from 'classnames';

export default function VerticalTimeline({
  timelineItems = [],
  checked,
  hideLine = false,
  spaceLeft = 20,
  spaceBottom = 40,
}: VerticalTimelineProps) {
  return (
    <div className="w-full">
      <ol className="relative">
        {timelineItems.map((timelineItem, index) => {
          const isLastItem = index === timelineItems.length - 1;

          return (
            <li
              className={classNames({
                'border-s border-l border-r-0 border-t-0 border-b-0': !isLastItem,
                'border-success': !isLastItem && checked,
                'border-grey-border': !isLastItem && !checked,
                'border-none': isLastItem,
              })}
              style={{
                paddingLeft: hideLine ? undefined : spaceLeft,
                paddingBottom: hideLine ? undefined : spaceBottom,
              }}
              key={index}
            >
              <div>
                {!hideLine && (
                  <div
                    className={classNames('absolute rounded-full -left-2.5', {
                      'bg-success': checked,
                      'bg-grey-border': !checked,
                    })}
                  >
                    {checked ? (
                      <div className="p-1">
                        <Check size={13} className="text-white" />
                      </div>
                    ) : (
                      <div className="p-1 rounded-full" style={{ backgroundColor: `${timelineItem.color}1F` }}>
                        <div className="size-3 rounded-full" style={{ backgroundColor: timelineItem.color }} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full">{timelineItem.component}</div>
            </li>
          );
        })}
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
  spaceLeft?: number;
  spaceBottom?: number;
};
