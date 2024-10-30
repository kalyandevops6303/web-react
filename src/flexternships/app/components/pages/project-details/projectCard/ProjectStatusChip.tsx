import { ProjectStatus, ProjectStatusChipClassnames } from "@/flexternships/constraints/enums/project-enums";

const ProjectStatusChip = ({
  status,
}: {
  status: keyof typeof ProjectStatusChipClassnames;
}) => {
  enum ProjectStatusChipClassnames {
    OPEN = 'bg-skyblue-light text-skyblue border border-skyblue',
    IN_REVIEW = 'bg-yellow-100 text-yellow-600 border border-yellow-400',
    ACTIVE = 'bg-green-200 text-green-600 border border-green-400',
    ONGOING = 'bg-green-200 text-green-600 border border-green-400',
    UPCOMING = 'bg-orange-200 text-orange-600 border border-orange-400',
    CLOSED = 'bg-gray-300 text-gray-600 border border-gray-500',
    TERMINATED = 'bg-red-100 text-red-600 border border-red-400',
    COMPLETED = 'bg-orange-200 text-orange-600 border border-orange-400',
  }
  const statusClass = ProjectStatusChipClassnames[status];
  return (
    <h1
      className={`w-fit text-center text-xs px-2 py-1 font-semibold border rounded-md ${statusClass} `}
    >
      {ProjectStatus[status]}
    </h1>
  );
};

export default ProjectStatusChip;
