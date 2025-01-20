import { ColumnDef } from '@tanstack/react-table';
import TanstackTable from '@/flexternships/app/components/core/tables/TanstackTable';
import {
  SelectHeader,
  RankHeader,
  MemberHeader,
  TopCompetenciesHeader,
  AttractivenessScoreHeader,
  ManagerFeedbackHeader,
  WowsHeader,
} from '@flexternships/app/analytics/team-analytics/tables/headers';
import {
  ActionsCell,
  AttractivenessScoreCell,
  ManagerFeedbackCell,
  MemberCell,
  TopCompetenciesCell,
  WowsCell,
  SelectCell,
  RankCell,
} from '@flexternships/app/analytics/team-analytics/tables/cells';
import { isEmpty } from 'lodash';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';

type TableRecordType = {
  userId: string;
  rank: number;
  member: {
    firstName: string;
    lastName: string;
    role: string;
    imageUri: string;
  };
  topCompetencies: {
    name: string;
    color: string;
    backgroundColor: string;
  }[];
  attractivenessScore: {
    score: number;
    total: number;
  };
  managerFeedback: {
    score: number;
    total: number;
  };
  wows: number;
  actions: string[];
};

export default function TeamMembersTable({ data }: { data: TableRecordType[] }) {
  const isTeamMembersDetailsLoading = useAnalyticsStore(
    (state) => state.team.isTeamMembersAttractivenessDetailsLoading,
  );
  const columns: ColumnDef<TableRecordType>[] = [
    {
      id: 'select',
      header: SelectHeader,
      cell: SelectCell,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'rank',
      header: RankHeader,
      sortingFn: (rowA, rowB) => {
        return rowA.original.rank - rowB.original.rank;
      },
      cell: RankCell,
    },
    {
      accessorKey: 'member',
      header: MemberHeader,
      sortingFn: (rowA, rowB) => {
        const nameA = `${rowA.original.member.firstName} ${rowA.original.member.lastName}`.toLowerCase();
        const nameB = `${rowB.original.member.firstName} ${rowB.original.member.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      },
      cell: MemberCell,
    },
    {
      accessorKey: 'topCompetencies',
      header: TopCompetenciesHeader,
      cell: TopCompetenciesCell,
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
    {
      id: 'actions',
      header: 'ACTION',
      cell: ActionsCell,
    },
  ];

  return (
    <>
      {isTeamMembersDetailsLoading ? (
        <BoxSkeleton className="w-full h-[200px]" />
      ) : (
        <div className="bg-white rounded-lg shadow-card">
          <div className="py-4 px-5 border-b border-grey-50 text-dark-700 font-montserrat text-lg font-medium leading-xxl-custom">
            Team Members
          </div>
          {!isEmpty(data) && (
            <div className="px-5 rounded-lg py-4 bg-white">
              <TanstackTable<TableRecordType>
                data={data}
                columns={columns}
                allowPagination={false}
                allowColumnFilters={false}
                allowSelection={false}
                className="max-h-[378px] overflow-y-auto"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
