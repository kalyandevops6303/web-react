import SubmittedArtifactItem from './SubmittedArtifactItem';
import { useMilestoneArtifactsStore } from '@/flexternships/stores/project-milestones-store';

export default function SubmittedArtifacts() {
  const submittedArtifacts = useMilestoneArtifactsStore((state) => state.submittedArtifacts);

  return (
    <div className="shadow-table mt-6 border-1 border-solid border-grey-border bg-white rounded-md w-[976px]">
      <div className="flex flex-row items-center border-b-1 border-solid border-grey-border bg-grey-background min-h-10 px-1.5">
        <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[212px]">
          File Name
        </div>
        <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[319px]">
          Description
        </div>
        <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[126px]">
          Submitted By
        </div>
        <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[194px]">
          Submitted On
        </div>
        <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[122px]">
          Action
        </div>
      </div>
      <div>
        {submittedArtifacts.map((submission, index) => (
          <SubmittedArtifactItem key={index} data={submission} last={index === submittedArtifacts.length - 1} />
        ))}
      </div>
    </div>
  );
}
