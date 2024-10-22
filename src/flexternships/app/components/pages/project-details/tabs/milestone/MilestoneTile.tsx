import React from 'react';
import { ChevronRight } from 'react-feather';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { MilestoneStatus } from '@flexternships/enums/core-enums';

interface MilestoneData {
    title: string;
    status: MilestoneStatus;
    startDate: number; // epoch
    endDate?: number; // epoch
}

interface MilestoneTileProps {
    data: MilestoneData;
}

const MilestoneTile: React.FC<MilestoneTileProps> = ({ data }) => {
    const { status, startDate, endDate } = data;

    return (
        <div className="flex flex-col">
            <div className="p-[1px]">
                <div className="flex flex-row gap-x-6">
                    <div className="grow" />
                    <div className="flex flex-row gap-x-8">
                        <div>{status}</div>
                        <div className="flex flex-col">
                            <div>Start Date</div>
                            <div>{formatEpochToHumanReadable(startDate)}</div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                {status === MilestoneStatus.COMPLETED && endDate
                                    ? 'Completed'
                                    : '-'}
                            </div>
                            <div>
                                {status === MilestoneStatus.COMPLETED && endDate
                                    ? formatEpochToHumanReadable(endDate)
                                    : '-'}
                            </div>
                        </div>
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
            </div>
            <div>{/* Info */}</div>
        </div>
    );
};

export default MilestoneTile;