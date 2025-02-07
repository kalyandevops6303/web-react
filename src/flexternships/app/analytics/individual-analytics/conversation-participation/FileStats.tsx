import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
  documentsCard: 'border-l-4 border-[#7367F0] border-b-[10px] border-[#7367F0] px-3',
  linksCard: 'border-l-4 border-[#00CFE8] border-b-[10px] border-[#00CFE8] px-3',
};

export default function FileStats() {
  const { projectId, userId } = useParams();

  const data = useAnalyticsStore((state) => state.conversationParticipationFiles);
  const getData = useAnalyticsStore((state) => state.getConversationParticipationFiles);
  const isLoading = useAnalyticsStore((state) => state.isConversationParticipationFilesLoading);

  useEffect(() => {
    getData(projectId, userId);
  }, [projectId, userId]);

  if (isLoading) return <BoxSkeleton className="w-full h-[120px]" />;

  return (
    <SimpleElevatedCard className="bg-white p-5 flex flex-col gap-y-5 shadow-card">
      <div className="font-montserrat font-medium leading-6.5 text-grey-700">
        Total files shared: <span className="text-grey-900 font-semibold">{data?.totalFilesShared}</span>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="grow">
          <div className={`w-full ${styles.documentsCard}`}>
            <div className="font-montserrat text-sm font-medium leading-5.5 text-grey-700">Documents</div>
            <div className="flex items-center gap-2 pb-3">
              <div className="font-montserrat text-xl font-semibold leading-7 text-grey-900 text-center">
                {data?.documents?.count}
              </div>
              <div className="h-5 w-[1px] bg-grey-50 rounded-[10px]" />
              <div className="font-montserrat text-xl font-semibold leading-7 text-grey-900 text-center">
                {data?.documents?.percentage}%
              </div>
            </div>
          </div>
        </div>
        <div className="grow">
          <div className={`w-full  ${styles.linksCard}`}>
            <div className="font-montserrat text-sm font-medium leading-5.5 text-grey-700">Links</div>
            <div className="flex items-center gap-2 pb-3">
              <div className="font-montserrat text-xl font-semibold leading-7 text-grey-900 text-center">
                {data?.links?.count}
              </div>
              <div className="h-5 w-[1px] bg-grey-50 rounded-[10px]" />
              <div className="font-montserrat text-xl font-semibold leading-7 text-grey-900 text-center">
                {data?.links?.percentage}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleElevatedCard>
  );
}
