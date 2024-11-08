import TextInput from '@/flexternships/app/components/core/form/TextInput';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneArtifact } from '@/flexternships/constraints/types/project-milestones-types';
import { getFileDownloadUrl } from '@/flexternships/services/project-management-v2';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { getFileIcon } from '@/flexternships/utils/file-utils';
import { useState } from 'react';
import { Download, ExternalLink, Link, Trash2 } from 'react-feather';

export default function SubmissionItem(props: Props) {
  const { last = false, data, viewOnly = false } = props;

  const [mainActionLoading, setMainActionLoading] = useState(false);

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
    window.open(data.name, '_blank');
  };

  const handleMainActionClick = () => {
    if (data.type === 'DOCUMENTS' && data.metadata.fileKey) {
      handleDownload();
    } else {
      handleLink();
    }
  };

  const handleDeleteClick = () => {
    // TODO: Implement delete functionality
  }

  return (
    <div
      className={`flex flex-row min-h-[52px] items-center border-solid border-grey-c2 px-1.5 ${last ? '' : 'border-b-1'}`}
    >
      <div className={`py-4 px-2.5 ${viewOnly ? 'w-[212px]' : 'w-[231px]'} flex flex-row items-center gap-x-3`}>
        <span>
          {data.type === 'DOCUMENTS' ? (
            <img className="h-6" src={getFileIcon(data.name)} alt={data.name} />
          ) : (
            <Link className="text-grey" size={24} />
          )}
        </span>
        {
          (viewOnly || (data.type === 'DOCUMENTS')) ? (
            <span className="truncate w-[175px]">
              {data.name}
            </span>
          ) : (
            <TextInput
              label=''
              value={data.name}
              onChange={() => { }}
              placeholder="Enter name"
              className='w-[175px]'
            />
          )
        }
      </div>
      <div className={`py-4 px-2.5 ${viewOnly ? 'w-[319px]' : 'w-[420px]'} break-all`}>
        {
          viewOnly ? (
            <span>{data.description}</span>
          ) : (
            <TextInput
              label=''
              value={data.description}
              onChange={() => { }}
              placeholder="Enter description"
              className='w-[400px]'
            />
          )
        }
      </div>
      {
        viewOnly && (
          <div className="py-4 px-2.5 w-[126px] flex items-center justify-center">
            <img className="w-8 h-8 rounded-full object-cover" src={data.submittedBy.avatar} alt={data.submittedBy.name} />
          </div>
        )
      }

      <div className="py-4 px-2.5 w-[194px]">{formatEpochToHumanReadable(data.submittedAt, false, true)}</div>
      <div className={`py-4 px-2.5 w-[122px] flex flex-row items-center gap-x-3`}>
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
        {
          !viewOnly && (
            <span
              className="flex items-center justify-center bg-opacity-[0.12] bg-error rounded-full p-2 text-error cursor-pointer"
              onClick={handleDeleteClick}
            >
              <Trash2 size={24} />
            </span>
          )
        }
      </div>
    </div>
  );
}

type Props = {
  last?: boolean;
  data: MilestoneArtifact;
  viewOnly?: boolean;
};
