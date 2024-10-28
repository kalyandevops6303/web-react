const ProjectStatusChip = ({
  className,
  status,
}: {
  className: string;
  status: string;
}) => {
  return (
    <h1
      className={`w-fit text-center text-xs px-2 py-1 ${className} font-semibold border  rounded-md`}
    >
      {status}
    </h1>
  );
};

export default ProjectStatusChip;
