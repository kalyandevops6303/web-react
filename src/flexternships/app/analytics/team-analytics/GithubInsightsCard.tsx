import SimpleElevatedCard from '../../components/core/cards/SimpleElevatedCard';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'react-feather';

export default function GithubInsightsCard() {
  const params = useParams();

  return (
    <SimpleElevatedCard className="bg-white rounded-lg w-full">
      <div className="border-b border-grey-50">
        <div className="px-5 py-4 flex items-center justify-between">
          <h1 className="text-dark-100 font-montserrat text-lg font-medium leading-xxl-custom">Github Insights</h1>
          <Link to={`/analytics/project/${params?.projectId}/team/commits`}>
            <div className="flex items-center gap-1">
              <p className="text-trublue-secondary-500 text-center font-montserrat text-sm font-semibold leading-normal tracking-wider">
                View all
              </p>
              <ChevronRight size={16} color="#0185E4" />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap items-center p-5 gap-4"></div>
    </SimpleElevatedCard>
  );
}
