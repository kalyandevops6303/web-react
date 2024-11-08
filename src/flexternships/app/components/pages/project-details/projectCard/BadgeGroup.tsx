import { BadgeType } from "@/flexternships/constraints/types/project-details-types";


const BadgeGroup = ({ className, tags }: { className?: string; tags: BadgeType[] }) => {
  return (
    <div className="flex flex-row items-center gap-2 flex-wrap">
      {(tags?.length > 4 ? tags?.slice(0, 3) : tags).map((tag) => (
        <h1 key={tag.id} className={`text-sm px-2 py-1 ${className} font-semibold border rounded-md`}>
          {tag.name}
        </h1>
      ))}
      {tags?.length > 4 && (
        <h1 className={`text-sm px-2 py-1 ${className} bg-white border-0 font-semibold rounded-md`}>+{tags?.length - 3}</h1>
      )}
    </div>
  );
};

export default BadgeGroup;
