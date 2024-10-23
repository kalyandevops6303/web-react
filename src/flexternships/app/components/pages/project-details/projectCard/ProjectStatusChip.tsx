const ProjectStatusChip = ({
  backgroundColor,
  textColor,
  borderColor,
  status,
}: {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  status: string;
}) => {
  return (
    <h1
      className={`w-fit text-center text-sm px-2 py-1 text-[${textColor}] bg-[${backgroundColor}] font-semibold border border-[${borderColor}] rounded-md`}
    >
      {status}
    </h1>
  );
};

export default ProjectStatusChip;
