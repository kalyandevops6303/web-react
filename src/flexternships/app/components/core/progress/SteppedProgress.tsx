export default function SteppedProgress(props: SteppedProgressProps) {
  const { value } = props;

  const steps = 5;
  const stepsToFill = Math.floor(value);

  return (
    <div className="h-2 flex">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`w-[30px] h-[7px] gap-[4px] ${
            index > stepsToFill ? 'bg-transparent' : 'bg-[#0185E4]'
          } mx-2 rounded-[6px] border border-[#0185E4]`}
        ></div>
      ))}
    </div>
  );
}

type SteppedProgressProps = {
  value: number;
};
