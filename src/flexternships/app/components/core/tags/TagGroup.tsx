import { BadgeType } from '@/flexternships/constraints/types/project-details-types';
import PrimaryTag from './PrimaryTag';

export default function TagGroup({ tags, truncateAfter }: Readonly<{ tags: BadgeType[]; truncateAfter?: number }>) {
  return (
    <div className="flex items-center flex-row gap-[8px] flex-wrap">
      {!truncateAfter
        ? tags?.map((tag) => (
            <PrimaryTag
              key={tag?.id}
              content={tag?.name}
              className="flex h-[18px] px-[9px] py-[1px] items-center gap-[3px] rounded-xl"
            />
          ))
        : tags
            ?.slice(0, truncateAfter)
            .map((tag) => (
              <PrimaryTag
                key={tag?.id}
                content={tag?.name}
                className="flex h-[18px] px-[9px] py-[1px] items-center gap-[3px] rounded-xl"
              />
            ))}

      {truncateAfter && tags?.length > truncateAfter && (
        <PrimaryTag
          key={tags?.[truncateAfter]?.id}
          content={`+${tags?.length - truncateAfter}`}
          className="flex h-[18px] px-[9px] py-[1px] items-center gap-[3px] rounded-xl"
        />
      )}
    </div>
  );
}
