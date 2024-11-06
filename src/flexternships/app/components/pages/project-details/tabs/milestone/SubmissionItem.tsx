import Spinner from '@/flexternships/app/components/core/Spinner';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneSubmission } from '@/flexternships/constraints/types/project-milestones-types';
import { getFileDownloadUrl } from '@/flexternships/services/project-management-v2';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { getFileIcon } from '@/flexternships/utils/file-utils';
import { useState } from 'react';
import { Download, ExternalLink, Link } from 'react-feather';

export default function SubmissionItem(props: Props) {
  const { last = false, data } = props;

  const [mainActionLoading, setMainActionLoading] = useState(false);

  const handleDownload = async () => {
    if (data.type !== 'FILE' || !data.fileKey) {
      return;
    }

    setMainActionLoading(true);
    try {
      const downloadResponse = await getFileDownloadUrl(data.fileKey);
      window.open(downloadResponse.data, '_blank');
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to download file');
    } finally {
      setMainActionLoading(false);
    }
  };

  const handleLink = () => {
    if (data.type !== 'URL') {
      return;
    }
    window.open(data.name, '_blank');
  };

  const handleMainActionClick = () => {
    if (data.type === 'FILE') {
      handleDownload();
    } else {
      handleLink();
    }
  };

  return (
    <div
      className={`flex flex-row min-h-[52px] items-center border-solid border-grey-c2 px-1.5 ${
        last ? '' : 'border-b-1'
      }`}
    >
      <div className="py-4 px-2.5 w-[212px] flex flex-row items-center gap-x-3">
        <span>
          {data.type === 'FILE' ? (
            <img className="h-6" src={getFileIcon(data.name)} alt={data.name} />
          ) : (
            <Link className="text-grey" size={24} />
          )}
        </span>
        <span className="truncate">{data.name}</span>
      </div>
      <div className="py-4 px-2.5 w-[319px] break-all">{data.description}</div>
      <div className="py-4 px-2.5 w-[126px] flex items-center justify-center">
        <img className="w-8 h-8 rounded-full object-cover" src={data.submittedBy.avatar} alt={data.submittedBy.name} />
      </div>
      <div className="py-4 px-2.5 w-[194px]">{formatEpochToHumanReadable(data.submittedAt, false, true)}</div>
      <div className="py-4 px-2.5 w-[122px] flex flex-row items-center gap-x-3">
        <span
          className="flex items-center justify-center bg-trublue-light rounded-full p-2 text-trublue-secondary-500 cursor-pointer"
          onClick={handleMainActionClick}
        >
          {mainActionLoading ? (
            <div className="flex items-center justify-center h-6 w-6">
              <div className="h-4 w-4">
                <Spinner />
              </div>
            </div>
          ) : data.type === 'FILE' ? (
            <Download size={24} />
          ) : (
            <ExternalLink size={24} />
          )}
        </span>
      </div>
    </div>
  );
}

type Props = {
  last?: boolean;
  data: MilestoneSubmission;
};
