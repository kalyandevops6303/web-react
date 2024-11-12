import React from 'react';
import { ChevronRight } from 'react-feather';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { MilestoneStatus } from '@flexternships/enums/core-enums';
import { useNavigate, useLocation } from 'react-router-dom';
import { MilestoneDetails } from '@/flexternships/constraints/types/project-milestones-types';
import MilestoneStatusTag from '@/flexternships/app/components/core/tags/MilestoneStatusTag';

interface MilestoneTileProps {
  data: MilestoneDetails;
}

const MilestoneTile: React.FC<MilestoneTileProps> = ({ data }) => {
  const { id, name, status, startDate, endDate } = data;
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = () => {
    navigate(`${location.pathname}/${id}`);
  };

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
              {status === MilestoneStatus.COMPLETED && endDate ? 'Completed' : '-'}
            </div>
            <div className="text-base text-grey-heading not-italic font-medium leading-6">
              {status === MilestoneStatus.COMPLETED && endDate ? formatEpochToHumanReadable(endDate, true) : '-'}
            </div>
          </div>
        </div>
        <div className="text-grey-muted">
          <ChevronRight size={24} />
        </div>
      </div>
      <div>{/* Info */}</div>
    </div>
  );
};

export default MilestoneTile;
