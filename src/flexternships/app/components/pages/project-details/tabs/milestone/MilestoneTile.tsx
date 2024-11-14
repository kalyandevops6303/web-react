import React from 'react';
import { ChevronRight, Info } from 'react-feather';
import { addDaysToEpoch, formatEpochToHumanReadable, getDaysLeft } from '@/flexternships/utils/date-utils';
import { MilestoneStatus, UserType } from '@flexternships/enums/core-enums';
import { useNavigate, useLocation } from 'react-router-dom';
import { MilestoneDetails } from '@/flexternships/constraints/types/project-milestones-types';
import MilestoneStatusTag from '@/flexternships/app/components/core/tags/MilestoneStatusTag';
import { mockMilestoneTalentFeedbackData } from '@/flexternships/mocks/milestone-data';
import FeedbackStatusCard from './feedback/cards/FeedbackStatusCard';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

interface MilestoneTileProps {
  data: MilestoneDetails;
}

const MilestoneTile: React.FC<MilestoneTileProps> = ({ data }) => {
  const { id, name, status, startDate, acceptedAt, submittedAt, maxFeedbackDueDays, isBlocked } = data;

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = () => {
    navigate(`${location.pathname}/${id}`);
  };

  const referenceDateForFeedback = userDetails.userType === UserType.CLIENT ? acceptedAt : submittedAt;
  const allowedMilestoneStatusesForFeedbackCards = [
    MilestoneStatus.IN_PROGRESS,
    MilestoneStatus.COMPLETED,
    MilestoneStatus.IN_REVIEW,
  ];

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row gap-x-6 bg-white rounded-md py-3 px-6 items-center cursor-pointer"
        onClick={clickHandler}
      >
        <div className="text-base font-medium text-grey-heading leading-6 grow">{name}</div>
        <div className="flex flex-row gap-x-8 items-center">
          <MilestoneStatusTag status={status} />
          <div className="flex flex-col">
            <div className="text-sm text-grey not-italic font-normal leading-5.5">Start Date</div>
            <div className="text-base text-grey-heading not-italic font-medium leading-6">
              {formatEpochToHumanReadable(startDate, true)}
            </div>
          </div>
          <div className="flex flex-col min-w-20">
            <div className="text-sm text-grey not-italic font-normal leading-5.5">
              {status === MilestoneStatus.COMPLETED && acceptedAt ? 'Completed' : '-'}
            </div>
            <div className="text-base text-grey-heading not-italic font-medium leading-6">
              {status === MilestoneStatus.COMPLETED && acceptedAt ? formatEpochToHumanReadable(acceptedAt, true) : '-'}
            </div>
          </div>
        </div>
        <div className="text-grey-muted">
          <ChevronRight size={24} />
        </div>
      </div>
      <div className="flex flex-row">
        {allowedMilestoneStatusesForFeedbackCards.includes(status) &&
          mockMilestoneTalentFeedbackData.map((feedback, index) => (
            <FeedbackStatusCard
              key={index}
              feedbackId={feedback.feedbackId}
              feedbackType={feedback.feedbackType}
              feedbackStatus={feedback.feedbackStatus}
              numberOfQuestions={feedback.numberOfQuestions}
              timeToComplete={feedback.timeToComplete}
              daysLeft={
                referenceDateForFeedback
                  ? getDaysLeft(Date.now(), addDaysToEpoch(referenceDateForFeedback, maxFeedbackDueDays))
                  : undefined
              }
              tiny
            />
          ))}
      </div>
      {isBlocked && (
        <div className="text-[#EA5455] text-sm font-normal leading-[22px] mt-3 flex items-center gap-2">
          <Info size={'18'} />
          <span className="font-semibold">Temporarily Blocked:</span>
          Request you to completed the feedback forms in order to resume back to the project viewing
        </div>
      )}
      <div>{/* Info */}</div>
    </div>
  );
};

export default MilestoneTile;
