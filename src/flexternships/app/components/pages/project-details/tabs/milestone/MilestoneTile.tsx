import React from 'react';
import { ChevronRight } from 'react-feather';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { MilestoneFeedbackStatus, MilestoneFeedbackType, MilestoneStatus } from '@flexternships/enums/core-enums';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { toTitleCase } from '@/flexternships/utils/text-utils';
import { useNavigate, useLocation } from 'react-router-dom';

interface MilestoneData {
    _id: string;
    title: string;
    status: MilestoneStatus;
    startDate: number; // epoch
    endDate?: number; // epoch
    feedback: {
        type: MilestoneFeedbackType;
        status: MilestoneFeedbackStatus;
    }
}

interface MilestoneTileProps {
    data: MilestoneData;
}

const MilestoneTile: React.FC<MilestoneTileProps> = ({ data }) => {
    const { _id, title, status, startDate, endDate, feedback } = data;
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = () => {
        navigate(`${location.pathname}/${_id}`);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-x-6 bg-white rounded-md py-3 px-6 items-center cursor-pointer" onClick={clickHandler}>
                <div className="text-base font-medium text-grey-heading leading-6 grow">
                    {title}
                </div>
                <div className="flex flex-row gap-x-8 items-center">
                    <div className=''>
                        {toTitleCase(status)}
                    </div>
                    <div className="flex flex-col">
                        <div className='text-sm text-grey not-italic font-normal leading-5.5'>Start Date</div>
                        <div className='text-base text-grey-heading not-italic font-medium leading-6'>{formatEpochToHumanReadable(startDate, true)}</div>
                    </div>
                    <div className="flex flex-col min-w-20">
                        <div className='text-sm text-grey not-italic font-normal leading-5.5'>
                            {status === MilestoneStatus.COMPLETED && endDate
                                ? 'Completed'
                                : '-'}
                        </div>
                        <div className='text-base text-grey-heading not-italic font-medium leading-6'>
                            {status === MilestoneStatus.COMPLETED && endDate
                                ? formatEpochToHumanReadable(endDate)
                                : '-'}
                        </div>
                    </div>
                </div>
                <div className='text-grey-muted'>
                    <ChevronRight size={24} />
                </div>
            </div>
            <div>{/* Info */}</div>
        </div>
    );
};

export default MilestoneTile;