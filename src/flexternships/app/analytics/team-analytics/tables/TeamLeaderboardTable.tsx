import { ColumnDef } from '@tanstack/react-table';
import TanstackTable from '@/flexternships/app/components/core/tables/TanstackTable';
import {
  AttractivenessScoreCell,
  ManagerFeedbackCell,
  RankCell,
  WowsCell,
} from '@flexternships/app/analytics/team-analytics/tables/cells';
import {
  AttractivenessScoreHeader,
  ManagerFeedbackHeader,
  TeamNameHeader,
  WowsHeader,
} from '@flexternships/app/analytics/team-analytics/tables/headers';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';

type LeaderboardTableRecordType = {
  projectId: string;
  rank: number;
  name: string;
  attractivenessScore: {
    score: number;
    total: number;
  };
  managerFeedback: {
    score: number;
    total: number;
  };
  wows: number;
};

const columns: ColumnDef<LeaderboardTableRecordType>[] = [
  {
    accessorKey: 'rank',
    header: 'TEAM RANK',
    sortingFn: (rowA, rowB) => {
      return rowA.original.rank - rowB.original.rank;
    },
    cell: RankCell,
  },
  {
    accessorKey: 'name',
    header: TeamNameHeader,
    sortingFn: (rowA, rowB) => {
      return rowA.original.name.localeCompare(rowB.original.name);
    },
  },
  {
    accessorKey: 'attractivenessScore',
    header: AttractivenessScoreHeader,
    sortingFn: (rowA, rowB) => {
      return rowA.original.attractivenessScore.score - rowB.original.attractivenessScore.score;
    },
    cell: AttractivenessScoreCell,
  },
  {
    accessorKey: 'managerFeedback',
    header: ManagerFeedbackHeader,
    sortingFn: (rowA, rowB) => {
      return rowA.original.managerFeedback.score - rowB.original.managerFeedback.score;
    },
    cell: ManagerFeedbackCell,
  },
  {
    accessorKey: 'wows',
    header: WowsHeader,
    sortingFn: (rowA, rowB) => {
      return rowA.original.wows - rowB.original.wows;
    },
    cell: WowsCell,
  },
];

export default function TeamLeaderboardTable() {
  const params = useParams();
  const { projectId } = params;

  const leaderboardData = useAnalyticsStore((state) => state.team.teamLeaderboard);
  const getTeamLeaderboard = useAnalyticsStore((state) => state.getTeamLeaderboard);
  const isTeamLeaderboardLoading = useAnalyticsStore((state) => state.team.isTeamLeaderboardLoading);
  useEffect(() => {
    getTeamLeaderboard(projectId);
  }, [projectId]);

  if (isTeamLeaderboardLoading) {
    return <BoxSkeleton className="w-full h-[200px]" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-card">
      <div className="py-4 px-5 border-b border-grey-50 text-dark-700 font-montserrat text-lg font-medium leading-xxl-custom">
        Team Leaderboard
      </div>
      <div className="px-5 rounded-lg py-4 bg-white">
        {!isEmpty(leaderboardData) && (
          <TanstackTable<LeaderboardTableRecordType>
            data={leaderboardData}
            columns={columns}
            allowPagination={false}
            allowColumnFilters={false}
            allowSelection={false}
            className="max-h-[200px] overflow-y-auto"
            highlightByKey="projectId"
            highlightedValues={[projectId as string]}
            scrollHighlightedRowsIntoView
          />
        )}
      </div>
    </div>
  );
}
