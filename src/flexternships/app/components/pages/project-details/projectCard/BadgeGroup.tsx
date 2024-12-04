import { useState } from 'react';
import { BadgeType } from '@/flexternships/constraints/types/project-details-types';

const BadgeGroup = ({ className, tags }: { className?: string; tags: BadgeType[] }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex flex-row items-center gap-2 flex-wrap">
      {(tags?.length > 4 ? (showMore ? tags : tags?.slice(0, 3)) : tags).map((tag) => (
        <h1
          key={tag.id}
          className={`${className} flex p-[1px_9px] items-center gap-[3px] rounded-[12px] bg-[#E3F2FD] text-[#2196F3] text-center font-semibold text-[12px] leading-[18px] font-montserrat`}
        >
          {tag.name}
        </h1>
      ))}
      {tags?.length > 4 && (
        <h1 onClick={()=>setShowMore(!showMore)} className={`text-xs px-2 py-1 ${className} bg-white border-0 font-semibold rounded-md`}>
          {showMore ? "Show Less" : `+${tags?.length - 3}`}
        </h1>
      )}
    </div>
  );
};

export default BadgeGroup;
