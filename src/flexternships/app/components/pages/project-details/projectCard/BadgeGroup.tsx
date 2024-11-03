type BadgeType = {
  _id: string;
  name: string;
  created_at: number;
  updated_at: number;
  is_deleted: boolean;
};

const BadgeGroup = ({ className, tags }: { className?: string; tags: BadgeType[] }) => {
  return (
    <div className="flex flex-row items-center gap-2 flex-wrap">
      {(tags?.length > 4 ? tags?.slice(0, 3) : tags).map((tag) => (
        <h1 key={tag._id} className={`text-xs px-2 py-1 ${className} font-semibold border rounded-2xl`}>
          {tag.name}
        </h1>
      ))}
      {tags?.length > 4 && (
        <h1 className={`text-xs px-2 py-1 ${className} bg-white border-0 font-semibold rounded-md`}>+{tags?.length - 3}</h1>
      )}
    </div>
  );
};

export default BadgeGroup;
