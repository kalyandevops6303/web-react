import { useState } from 'react';
import { BadgeType } from '@/flexternships/constraints/types/project-details-types';
import classNames from 'classnames';

const BadgeGroup = ({ className, tags }: { className?: string; tags: BadgeType[] }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex flex-row items-center gap-2 flex-wrap">
      {(tags?.length > 4 ? (showMore ? tags : tags?.slice(0, 3)) : tags).map((tag) => (
        <h1
          key={tag.id}
          className={classNames(
            className,
            'flex p-[1px_9px] items-center gap-[3px] rounded-xs bg-blue-soft text-blue text-center font-semibold text-xs leading-[18px] font-montserrat',
          )}
        >
          {tag.name}
        </h1>
      ))}
      {tags?.length > 4 && (
        <h1
          onClick={() => setShowMore(!showMore)}
          className={classNames('text-xs px-2 py-1 bg-white border-0 font-semibold rounded-md', className)}
        >
          {showMore ? 'Show Less' : `+${tags?.length - 3}`}
        </h1>
      )}
    </div>
  );
};

export default BadgeGroup;
