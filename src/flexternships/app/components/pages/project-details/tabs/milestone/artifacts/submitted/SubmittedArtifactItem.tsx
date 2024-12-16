import Spinner from '@/flexternships/app/components/core/Spinner';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneArtifact } from '@/flexternships/constraints/types/project-milestones-types';
import { getFileDownloadUrl } from '@/flexternships/services/project-management-v2';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { getFileIcon } from '@/flexternships/utils/file-utils';
import { useState } from 'react';
import { Download, ExternalLink, Link } from 'react-feather';
import defaultAvatar from '@flexternships/assets/icons/core/default-avatar.jpg';
import { convertToClickableUrl } from '@/flexternships/utils/miscellaneous-utils';

export default function SubmittedArtifactItem(props: Props) {
  const { last = false, data } = props;

  const [mainActionLoading, setMainActionLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const handleDownload = async () => {
    if (data.type !== 'DOCUMENTS' || !data.metadata.fileKey) {
      return;
    }

    setMainActionLoading(true);
    try {
      const downloadResponse = await getFileDownloadUrl(data.metadata.fileKey);
      window.open(downloadResponse.data, '_blank');
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to download file');
    } finally {
      setMainActionLoading(false);
    }
  };

  const handleLink = () => {
    if (data.type !== 'LINKS' || !data.metadata.url) {
      return;
    }
    window.open(convertToClickableUrl(data.metadata.url), '_blank');
  };

  const handleMainActionClick = () => {
    if (data.type === 'DOCUMENTS' && data.metadata.fileKey) {
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
          {data.type === 'DOCUMENTS' ? (
            <img className="h-6" src={getFileIcon(data.metadata?.fileName ?? '')} alt={data.metadata?.fileName ?? ''} />
          ) : (
            <Link className="text-grey" size={24} />
          )}
        </span>
        <div className="flex flex-row w-[175px]">
          <span className="truncate w-11/12">
            {data.type === 'DOCUMENTS' ? data.metadata?.fileName : data.metadata?.url}
          </span>
          {!data.isRead && <span className="w-[7px] h-[7px] bg-error rounded-full" />}
        </div>
      </div>
      <div className="py-4 px-2.5 w-[319px] break-all">
        <span>{data.description}</span>
      </div>
      <div className="py-4 px-2.5 w-[126px] flex items-center justify-center relative">
        <div className="relative" onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={data.userDetails?.imageUri || defaultAvatar}
            alt={data.userDetails?.name}
          />
          {showTooltip && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg whitespace-nowrap">
              {data.userDetails?.name?.trim() || 'Unknown User'}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-full h-2 w-2 bg-gray-800 rotate-45"></div>
            </div>
          )}
        </div>
      </div>
      <div className="py-4 px-2.5 w-[194px]">{formatEpochToHumanReadable(data.updatedAt ?? 0, false, true)}</div>
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
          ) : data.type === 'DOCUMENTS' ? (
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
  data: MilestoneArtifact;
};
