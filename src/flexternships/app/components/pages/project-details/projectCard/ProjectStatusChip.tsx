import { ProjectStatusChipClassnames } from "@/flexternships/constraints/enums/project-enums";

const ProjectStatusChip = ({
  status,
}: {
  status: string;
}) => {
  return (
    <h1
      className={`w-fit text-center text-xs px-2 py-1  font-semibold border  rounded-md` + ProjectStatusChipClassnames[status as keyof typeof ProjectStatusChipClassnames]}
    >
      {status}
    </h1>
  );
};

export default ProjectStatusChip;
