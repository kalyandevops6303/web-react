import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import Spinner from '@/flexternships/app/components/core/Spinner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/flexternships/app/components/ui/accordion';
import { GlobalModalType, MilestoneStatus, ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { useAppStore, useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useMilestoneArtifactsStore, useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import { getMilestoneStatusTextByUserType, getUserTimezone, showToastMessage } from '@/flexternships/utils/core-utils';
import { addDaysToEpoch, formatEpochToHumanReadable, getDaysLeft } from '@/flexternships/utils/date-utils';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import DraftArtifacts from './artifacts/draft/DraftArtifacts';
import SubmittedArtifacts from './artifacts/submitted/SubmittedArtifacts';
import MilestoneStatusTag from '@/flexternships/app/components/core/tags/MilestoneStatusTag';
import { isEmpty } from 'lodash';
import noSubmissionsFoundGif from '@flexternships/assets/gifs/no-submissions-found.gif';
import RecognitionCard from './feedback/cards/RecognitionCard';
import FeedbackStatusCard from './feedback/cards/FeedbackStatusCard';
import StartsInTimer from '@/flexternships/app/components/core/timers/StartsInTimer';
import {
  allowFeedbackCardsIfMilestoneStatus,
  disableArtifactsIfMilestoneStatus,
  getMilestoneDetailsModalConfirmCtaText,
  getMilestoneDetailsModalDescription,
  getMilestoneDetailsModalTitle,
} from '@/flexternships/static/milestones-content';
import { markMilestoneArtifactAsRead } from '@/flexternships/services/project-management-v2';
import ConfirmActionModal from '@/flexternships/app/components/core/modals/milestone/ConfirmActionModal';
import { MilestoneDetailsModalType } from '@/flexternships/constraints/enums/miscellaneous-enums';
import CelebrationModal from '@/flexternships/app/components/core/modals/milestone/CelebrationModal';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';

export default function MilestoneDetails() {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const submittedArtifacts = useMilestoneArtifactsStore((state) => state.submittedArtifacts);
  const milestoneDetails = useProjectMilestonesStore((state) => state.milestoneDetails);
  const isMilestoneDetailsLoading = useProjectMilestonesStore((state) => state.isMilestoneDetailsLoading);
  const activeModal = useProjectMilestonesStore((state) => state.activeModal);
  const populateMilestoneDetails = useProjectMilestonesStore((state) => state.populateMilestoneDetails);
  const markMilestoneAsCompleted = useProjectMilestonesStore((state) => state.markMilestoneAsCompleted);
  const acceptMilestone = useProjectMilestonesStore((state) => state.acceptMilestone);
  const closeModal = useProjectMilestonesStore((state) => state.closeModal);
  const openModal = useProjectMilestonesStore((state) => state.openModal);

  const projectName = useProjectsStore((state) => state.projectDetails?.details?.name);

  const isWorkInProgress = useAppStore((state) => state.isWip);
  const openGlobalModal = useAppStore((state) => state.openModal);

  const [primaryActionLoading, setPrimaryActionLoading] = useState(false);

  const navigate = useNavigate();
  const { milestoneId } = useParams();

  useEffect(() => {
    const fetchMilestoneDetails = async () => {
      if (!milestoneId) return;
      try {
        await populateMilestoneDetails(milestoneId);
      } catch (error: unknown) {
        showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Error fetching milestone details');
      }
    };
    fetchMilestoneDetails();
  }, [milestoneId, populateMilestoneDetails]);

  useEffect(() => {
    if (!milestoneId || userDetails.userType === UserType.TALENT) return;
    const markAsRead = async () => {
      try {
        await markMilestoneArtifactAsRead(milestoneId);
      } catch (error) {
        console.error('Failed to mark milestone artifact as read:', error);
      }
    };

    markAsRead();
  }, [milestoneId, markMilestoneArtifactAsRead, userDetails.userType]);

  const goBackToAllMilestones = () => {
    const nextPath = `/project-details/${milestoneDetails.projectDetails.projectId}/milestone`;
    if (isWorkInProgress) {
      openGlobalModal(GlobalModalType.UNSAVED_WORK, { nextPath });
      return;
    }
    navigate(nextPath);
  };

  const openConfirmActionModal = () => {
    if (userDetails.userType === UserType.CLIENT) {
      openModal(MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE);
    } else {
      openModal(MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE);
    }
  };

  const openCelebrationModal = () => {
    if (userDetails.userType === UserType.CLIENT) {
      openModal(MilestoneDetailsModalType.MILESTONE_ACCEPTED);
    } else {
      openModal(MilestoneDetailsModalType.MILESTONE_SUBMITTED);
    }
  };

  const handleMilestonePrimaryAction = async () => {
    if (!milestoneId) return;

    setPrimaryActionLoading(true);

    try {
      if (userDetails.userType === UserType.CLIENT) {
        await acceptMilestone(milestoneId);
      } else {
        await markMilestoneAsCompleted(milestoneId);
      }
      openCelebrationModal();
      await populateMilestoneDetails(milestoneId);
    } catch (error: unknown) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error
          ? error.message
          : `Unexpected error while ${
              userDetails.userType === UserType.CLIENT
                ? 'accepting the milestone'
                : 'marking the milestone as completed'
            }`,
      );
    } finally {
      setPrimaryActionLoading(false);
    }
  };

  if (isMilestoneDetailsLoading && activeModal === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  const referenceDateForFeedback =
    userDetails.userType === UserType.CLIENT ? milestoneDetails.acceptedAt : milestoneDetails.submittedAt;

  const isNextUpcomingMilestone =
    typeof milestoneDetails.lastWorkingMilestoneSeq === 'number'
      ? milestoneDetails.seq - milestoneDetails.lastWorkingMilestoneSeq === 1
      : undefined;

  // Artifacts are enabled if the milestone is next upcoming irrespective of the milestone status
  // Artifacts are disabled based on the milestone status and if the milestone is not next upcoming or if no info on next upcoming milestone
  const areArtifactsDisabledForTalent =
    disableArtifactsIfMilestoneStatus.includes(milestoneDetails.status) &&
    (isNextUpcomingMilestone === undefined || !isNextUpcomingMilestone);

  return (
    <div className="flex flex-col gap-y-6 max-w-[1040px]">
      <div className="flex flex-row justify-between">
        <PrimaryIconText
          icon={<ArrowLeft className="text-white" />}
          text="All Milestones"
          onClick={goBackToAllMilestones}
          bgDark
        />
        <PrimaryButton
          onClick={openConfirmActionModal}
          disabled={
            milestoneDetails.status === MilestoneStatus.COMPLETED ||
            milestoneDetails.status === MilestoneStatus.CREATED ||
            (milestoneDetails.status === MilestoneStatus.IN_REVIEW && userDetails.userType === UserType.TALENT) ||
            (milestoneDetails.status === MilestoneStatus.IN_PROGRESS && userDetails.userType === UserType.CLIENT)
          }
        >
          {userDetails.userType === UserType.CLIENT ? 'Accept' : 'Mark as Completed'}
        </PrimaryButton>
      </div>
      <SimpleElevatedCard className="flex flex-col px-8 pt-6 pb-10 gap-y-10 bg-white-fa overflow-hidden">
        <div className="flex flex-row gap-x-4 items-center">
          <h1 className="text-lg font-medium not-italic text-grey-heading">Milestone {milestoneDetails.seq}</h1>
          <MilestoneStatusTag status={milestoneDetails.status} />
          <StartsInTimer epoch={milestoneDetails.startDate} hideSeconds />
        </div>
        <div className="flex flex-row gap-x-20">
          <div className="flex flex-col gap-y-1.5">
            <div className="text-sm font-normal not-italic leading-5.5 text-grey">Start</div>
            <div className="text-lg font-semibold not-italic text-grey-heading">
              {formatEpochToHumanReadable(milestoneDetails?.startDate ?? 0, true, false, getUserTimezone())}
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <div className="text-sm font-normal not-italic leading-5.5 text-grey">Duration</div>
            <div className="text-lg font-semibold not-italic text-grey-heading">
              {milestoneDetails?.estimatedDuration?.duration}w
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <div className="text-sm font-normal not-italic leading-5.5 text-grey">Hours/week</div>
            <div className="text-lg font-semibold not-italic text-grey-heading">
              {milestoneDetails?.projectDetails?.hoursPerWeek} hr
            </div>
          </div>
          {milestoneDetails.status !== MilestoneStatus.CREATED && (
            <div className="flex flex-col gap-y-1.5">
              <div className="text-sm font-normal not-italic leading-5.5 text-grey">Status</div>
              <div className="text-lg font-semibold not-italic text-grey-heading">
                {getMilestoneStatusTextByUserType(milestoneDetails.status, userDetails.userType)}
              </div>
            </div>
          )}
        </div>
        <SimpleElevatedCard className="flex flex-col p-6 gap-y-6 overflow-hidden bg-white">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-medium not-italic text-grey-heading">Milestone Name</h2>
            <p className="text-sm font-normal not-italic leading-5.5 text-grey">{milestoneDetails?.name}</p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-medium not-italic text-grey-heading">Description</h2>
            <p className="text-sm font-normal not-italic leading-5.5 text-grey">
              <ExpandableText charLimit={300}>{milestoneDetails?.description}</ExpandableText>
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-medium not-italic text-grey-heading">Deliverables</h2>
            <ul className="list-none">
              {milestoneDetails?.deliverables?.map((deliverable, index) => (
                <li
                  key={index}
                  className='relative pl-6 text-sm font-normal not-italic leading-5.5 text-grey before:content-["."] before:text-xl before:absolute before:left-2 before:bottom-0.5'
                >
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </SimpleElevatedCard>
        {userDetails.userType === UserType.TALENT && <DraftArtifacts isDisabled={areArtifactsDisabledForTalent} />}
      </SimpleElevatedCard>
      {!(userDetails.userType === UserType.TALENT && areArtifactsDisabledForTalent) && (
        <SimpleElevatedCard className="overflow-hidden">
          <Accordion type="single" collapsible defaultValue="submission-history" className="w-full">
            <AccordionItem value="submission-history" className="border-none bg-white-fa py-6 px-8">
              <AccordionTrigger className="hover:no-underline p-0">
                <div className="text-lg font-medium not-italic text-grey-heading">Submission History</div>
              </AccordionTrigger>
              <AccordionContent className="">
                {isEmpty(submittedArtifacts) ? (
                  <div className="bg-white mt-5 flex flex-col items-center justify-center px-6 pb-7">
                    <img
                      src={noSubmissionsFoundGif}
                      alt="no-submissions-found"
                      className="w-[169px] h-[172px] overflow-hidden"
                    />
                    <div className="text-lg not-italic font-medium leading-5.5 text-trublue -mt-2">
                      No submissions found
                    </div>
                  </div>
                ) : (
                  <SubmittedArtifacts />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SimpleElevatedCard>
      )}
      {
        <RecognitionCard
          isDisabled={!allowFeedbackCardsIfMilestoneStatus.includes(milestoneDetails.status)}
          projectId={milestoneDetails.projectDetails.projectId}
          milestoneId={milestoneDetails.id}
        />
      }
      {!isEmpty(milestoneDetails) &&
        allowFeedbackCardsIfMilestoneStatus.includes(milestoneDetails.status) &&
        milestoneDetails.milestoneFeedbackDetails.map((feedback, index) => (
          <FeedbackStatusCard
            key={index}
            feedbackType={feedback.feedbackType}
            feedbackStatus={feedback.feedbackStatus}
            numberOfQuestions={feedback.numberOfQuestions}
            timeToComplete={feedback.timeToComplete}
            projectId={milestoneDetails.projectDetails.projectId}
            milestoneId={milestoneDetails.id}
            daysLeft={
              referenceDateForFeedback
                ? getDaysLeft(Date.now(), addDaysToEpoch(referenceDateForFeedback, milestoneDetails.maxFeedbackDueDays))
                : undefined
            }
          />
        ))}
      {activeModal && (
        <ConfirmActionModal
          isOpen={[
            MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE,
            MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE,
          ].includes(activeModal)}
          onClose={closeModal}
          onConfirm={handleMilestonePrimaryAction}
          isConfirmLoading={primaryActionLoading}
          title={getMilestoneDetailsModalTitle(activeModal)}
          confirmCtaText={getMilestoneDetailsModalConfirmCtaText(activeModal)}
          milestoneName={milestoneDetails.name}
          milestoneSeq={milestoneDetails.seq}
        />
      )}
      {activeModal && (
        <CelebrationModal
          isOpen={[
            MilestoneDetailsModalType.MILESTONE_ACCEPTED,
            MilestoneDetailsModalType.MILESTONE_SUBMITTED,
          ].includes(activeModal)}
          onClose={closeModal}
          title={getMilestoneDetailsModalTitle(activeModal)}
          milestoneSeq={milestoneDetails.seq}
          description={getMilestoneDetailsModalDescription(activeModal)}
          projectName={projectName}
        />
      )}
    </div>
  );
}
