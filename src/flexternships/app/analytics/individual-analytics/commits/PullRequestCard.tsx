import { GitHubPullRequest } from '@/flexternships/constraints/types/analytics-types';
import { CustomAccordion } from '@/flexternships/app/components/tds/custom-accordion/CustomAccordion';
import { StatusBadge } from '@/flexternships/app/components/tds/status-badge/StatusBadge';
import { PullRequestStatusStyleType } from '@/flexternships/constraints/enums/analytics-enums';
import { Grade } from '@/flexternships/app/components/tds/grade/Grade';
import CommitHistoryItem from './CommitHistoryItem';

export default function PullRequestCard({ data }: { data: GitHubPullRequest }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const Overview = () => {
    return (
      <div className="flex items-center justify-between gap-5 w-11/12">
        <div className="flex flex-col items-start gap-2 w-1/4">
          <StatusBadge
            label={data?.prStatus}
            type={PullRequestStatusStyleType[data?.prStatus as keyof typeof PullRequestStatusStyleType]}
            className="mb-2"
          />
          <div className="text-gray-600 font-medium text-sm leading-5 text-left">{data?.prTitle}</div>
          <div className="text-gray-500 font-normal text-xs leading-4">
            Created on: {data?.prCreatedAt ? formatDate(data.prCreatedAt) : ''}
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div>
            <div className="text-gray-700 font-semibold text-base leading-5">{data?.commitsCount}</div>
            <div className="text-grey font-normal text-sm leading-5">Commits</div>
          </div>
          <div>
            <div className="text-gray-700 font-semibold text-base leading-5">{data?.commitsCount}</div>
            <div className="text-grey font-normal text-sm leading-5">Bugs</div>
          </div>
          <div>
            <div className="text-gray-700 font-semibold text-base leading-5">{data?.commitsCount}</div>
            <div className="text-grey font-normal text-sm leading-5">Code Smells</div>
          </div>
          <div>
            <div className="text-gray-700 font-semibold text-base leading-5">{data?.commitsCount}</div>
            <div className="text-grey font-normal text-sm leading-5">Vulnerabilities</div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="min-w-[100px] flex flex-col items-start gap-1">
            <div className="text-gray-700 font-semibold text-base leading-5">
              <Grade value={data?.securityRatingGrade} size={20} textSize={12} />
            </div>
            <div className="text-grey font-normal text-sm leading-5">Security</div>
          </div>
          <div className="min-w-[100px] flex flex-col items-start gap-1">
            <div className="text-gray-700 font-semibold text-base leading-5">
              <Grade value={data?.reliabilityRatingGrade} size={20} textSize={12} />
            </div>
            <div className="text-grey font-normal text-sm leading-5">Reliability</div>
          </div>
          <div className="min-w-[100px] flex flex-col items-start gap-1">
            <div className="text-gray-700 font-semibold text-base leading-5">
              <Grade value={data?.maintainabilityRatingGrade} size={20} textSize={12} />
            </div>
            <div className="text-grey font-normal text-sm leading-5">Maintainability</div>
          </div>
        </div>
      </div>
    );
  };

  const Commits = () => {
    return (
      <div className="flex flex-col my-3 p-0">
        {data?.commits.map((commit) => (
          <CommitHistoryItem commits={commit} />
        ))}
      </div>
    );
  };

  return (
    <CustomAccordion
      triggerClassName="p-0 hover:no-underline"
      contentClassName="p-0"
      sections={[
        {
          value: '1',
          trigger: <Overview />,
          content: <Commits />,
        },
      ]}
    />
  );
}
