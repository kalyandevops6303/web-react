import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/flexternships/app/components/ui/accordion';
import { MilestoneDetails } from '@/flexternships/constraints/types/project-milestones-types';
import { ProjectSecondaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

type RestrictedMilestonesViewProps = {
  projectDetails: {
    projectId: string;
    nextStep: ProjectSecondaryStatus;
    startDate: number;
    role: string;
    estimatedDuration: number;
    hoursPerWeek: number;
  };
  milestones: MilestoneDetails[];
};

export default function RestrictedMilestonesView(props: RestrictedMilestonesViewProps) {
  const { projectDetails, milestones } = props;

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (projectDetails.nextStep === ProjectSecondaryStatus.SIGN_CONTRACT) {
      navigate(`/project-details/${projectDetails.projectId}/doc/contract`);
    } else {
      navigate(`/project-details/${projectDetails.projectId}/doc/nda`);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <SimpleElevatedCard className="flex flex-row p-6 gap-x-20 text-grey-heading bg-white rounded-md">
        <div className="flex flex-col gap-y-1">
          <div className="text-lg font-medium leading-6">{formatEpochToHumanReadable(projectDetails.startDate)}</div>
          <div className="text-sm font-normal leading-5.5">Start Date</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-lg font-medium leading-6">{projectDetails.role}</div>
          <div className="text-sm font-normal leading-5.5">Role</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-lg font-medium leading-6">{projectDetails.estimatedDuration}w</div>
          <div className="text-sm font-normal leading-5.5">Estimated Duration</div>
        </div>
      </SimpleElevatedCard>
      <Accordion type="single" collapsible className="flex flex-col gap-y-4">
        {milestones.map((milestone) => (
          <SimpleElevatedCard className="overflow-hidden bg-white" key={milestone.seq}>
            <AccordionItem
              value={`milestone-${milestone.seq}`}
              className="flex flex-col border-none rounded-md py-4 px-5 gap-y-6"
            >
              <AccordionTrigger className="hover:no-underline p-0 flex flex-row gap-x-7">
                <div className="flex flex-row justify-between items-center grow">
                  <div className="flex flex-row gap-x-16">
                    <div className="text-base font-semibold leading-6 text-grey-heading">
                      Milestone #{milestone.seq}
                    </div>
                    <div className="text-base font-medium leading-6 text-grey">{milestone.name}</div>
                  </div>
                  <div className="flex flex-row gap-x-10">
                    <div className="text-right">
                      <div className="text-sm font-normal leading-5.5 text-grey">Duration</div>
                      <div className="text-base font-medium text-grey-heading">
                        {milestone.estimatedDuration.duration}w
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-normal leading-5.5 text-grey">Total Hours</div>
                      <div className="text-base font-medium text-grey-heading">
                        {projectDetails.hoursPerWeek * milestone.estimatedDuration.duration}hr
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-y-5">
                  <div className="flex flex-col gap-y-1">
                    <div className="text-xs font-semibold leading-5 uppercase text-grey-300">Description</div>
                    <div className="text-sm font-normal leading-5.5 text-grey">
                      <ExpandableText charLimit={300}>{milestone.description}</ExpandableText>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-xs font-semibold leading-5 uppercase text-grey-300">Deliverables</div>
                    <div className="text-sm font-normal leading-5.5 text-grey">{milestone.deliverables.join(', ')}</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </SimpleElevatedCard>
        ))}
      </Accordion>
      <div className="flex flex-row justify-end">
        <PrimaryButton className="m-0" onClick={handleNextStep}>
          {projectDetails.nextStep === ProjectSecondaryStatus.SIGN_CONTRACT ? 'Sign Contract' : 'Sign NDA'}
        </PrimaryButton>
      </div>
    </div>
  );
}
