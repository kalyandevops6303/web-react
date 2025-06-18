import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

export default function FileStats() {
  const { projectId, userId } = useParams();

  const data = useAnalyticsStore((state) => state.conversationAttachmentStats);
  const getData = useAnalyticsStore((state) => state.getConversationAttachmentStats);
  const isLoading = useAnalyticsStore((state) => state.isConversationAttachmentStatsLoading);

  useEffect(() => {
    getData(projectId, userId);
  }, [projectId, userId]);

  const styles = useMemo(() => {
    if (!data) return { documentsCard: '', linksCard: '', documentsWidth: 50, linksWidth: 50 };

    const totalCount = (data?.documents?.count || 0) + (data?.links?.count || 0);
    const documentsWidth = totalCount > 0 ? Math.round(((data?.documents?.count || 0) / totalCount) * 100) : 50;
    const linksWidth = totalCount > 0 ? Math.round(((data?.links?.count || 0) / totalCount) * 100) : 50;

    return {
      documentsCard: `border-l-4 border-[#7367F0] border-b-[10px] border-[#7367F0] px-3`,
      linksCard: `border-l-4 border-[#00CFE8] border-b-[10px] border-[#00CFE8] px-3`,
      documentsWidth,
      linksWidth,
    };
  }, [data]);

  if (isLoading) return <BoxSkeleton className="w-full h-[120px]" />;

  return (
    <SimpleElevatedCard className="bg-white p-5 flex flex-col gap-y-5 shadow-card ">
      <div className="font-montserrat font-medium leading-6.5 text-grey-700">
        Total files shared: <span className="text-grey-900 font-semibold">{data?.totalFilesShared}</span>
      </div>
      <div className="flex gap-5 w-full">
        {/* <div className="grow"> */}
        <div className={`${styles.documentsCard}`} style={{ width: `${styles.documentsWidth}%` }}>
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
        {/* </div> */}
        {/* <div className="grow"> */}
        <div className={`${styles.linksCard}`} style={{ width: `${styles.linksWidth}%` }}>
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
        {/* </div> */}
      </div>
    </SimpleElevatedCard>
  );
}
