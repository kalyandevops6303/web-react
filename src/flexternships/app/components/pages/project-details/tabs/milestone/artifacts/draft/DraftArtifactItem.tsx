import TextInput from '@flexternships/components/core/form/TextInput';
import Spinner from '@flexternships/components/core/Spinner';
import { MilestoneArtifactErrorType, ToastType } from '@flexternships/enums/core-enums';
import { MilestoneDraftArtifact } from '@flexternships/types/project-milestones-types';
import { getFileDownloadUrl } from '@flexternships/services/project-management-v2';
import { showToastMessage } from '@flexternships/utils/core-utils';
import { formatEpochToHumanReadable } from '@flexternships/utils/date-utils';
import { getFileIcon } from '@flexternships/utils/file-utils';
import { useState } from 'react';
import { Download, ExternalLink, Link, Trash2 } from 'react-feather';
import { Control, Controller, UseFieldArrayRemove } from 'react-hook-form';
import { useMilestoneArtifactsStore } from '@flexternships/stores/project-milestones-store';
import { Progress } from '@/flexternships/app/components/ui/progress';
import { isEmpty } from 'lodash';

export default function DraftArtifactItem(props: Props) {
  const { last = false, data, index, control, errors, remove, handleFileUpload } = props;
  const appendToRemovedArtifactIds = useMilestoneArtifactsStore((state) => state.appendToRemovedArtifactIds);

  const [mainActionLoading, setMainActionLoading] = useState(false);

  const handleDownload = async () => {
    if (data.type !== 'DOCUMENTS' || !data.metadata?.fileKey) {
      return;
    }

    setMainActionLoading(true);
    try {
      const downloadResponse = await getFileDownloadUrl(data.metadata?.fileKey ?? '');
      window.open(downloadResponse.data, '_blank');
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to download file');
    } finally {
      setMainActionLoading(false);
    }
  };

  const handleLink = () => {
    if (data.type !== 'LINKS' || !data.metadata?.url) {
      return;
    }
    window.open(data.metadata?.url, '_blank');
  };

  const handleMainActionClick = () => {
    if (data.type === 'DOCUMENTS' && data.metadata?.fileKey) {
      handleDownload();
    } else {
      handleLink();
    }
  };

  const handleDeleteClick = () => {
    if (data.artifactId) {
      appendToRemovedArtifactIds(data.artifactId);
    }
    remove(index);
  };

  const handleTryAgain = () => {
    if (data.metadata?.uploadInfo?.file) {
      handleFileUpload(index, data.metadata?.uploadInfo?.file);
    }
  };

  return (
    <div
      className={`flex flex-row min-h-[52px] items-center border-solid border-grey-c2 px-1.5 ${
        last ? '' : 'border-b-1'
      }`}
    >
      <div className="py-4 px-2.5 w-[231px] flex flex-row items-center gap-x-3">
        <span>
          {data.type === 'DOCUMENTS' ? (
            <img className="h-6" src={getFileIcon(data.metadata?.fileName ?? '')} alt={data.metadata?.fileName ?? ''} />
          ) : (
            <Link className="text-grey" size={24} />
          )}
        </span>
        {data.type === 'DOCUMENTS' ? (
          <span className="truncate w-[175px]">{data.metadata?.fileName ?? 'Unknown File'}</span>
        ) : (
          <Controller
            control={control}
            name={`draftArtifacts.${index}.metadata.url`}
            render={({ field }) => (
              <TextInput
                label=""
                value={field.value ?? ''}
                onChange={field.onChange}
                placeholder="Enter name"
                className="w-[175px]"
              />
            )}
          />
        )}
      </div>
      <div className="py-4 px-2.5 w-[420px] break-all">
        {data.type === 'DOCUMENTS' && data.metadata?.uploadInfo?.loading ? (
          <div className="w-[400px] text-grey-loadingText text-sm font-normal italic leading-5.5 text-end">
            Uploading document, this will only take a few seconds
          </div>
        ) : data.type === 'DOCUMENTS' &&
          (errors?.metadata?.size ||
            errors?.metadata?.uploadInfo?.file ||
            errors?.type === MilestoneArtifactErrorType.UPLOAD_FAILED) ? (
          <div className="w-[400px] text-error text-sm font-medium leading-5.5 not-italic text-end">
            {errors?.metadata?.size?.message || errors?.metadata?.uploadInfo?.file?.message || errors?.message}
          </div>
        ) : (
          <Controller
            control={control}
            name={`draftArtifacts.${index}.description`}
            render={({ field }) => (
              <TextInput
                label=""
                value={field.value ?? ''}
                onChange={field.onChange}
                placeholder="Enter description"
                className="w-[400px]"
              />
            )}
          />
        )}
      </div>
      <div className="py-4 px-2.5 w-[194px]">
        {data.type === 'DOCUMENTS' &&
        (data.metadata?.uploadInfo?.loading || errors?.metadata?.size || errors?.metadata?.uploadInfo?.file) ? (
          <Progress value={data.metadata?.uploadInfo?.uploadProgress} className="h-3 bg-grey-50 mr-8 w-full" />
        ) : data.type === 'DOCUMENTS' && errors?.type === MilestoneArtifactErrorType.UPLOAD_FAILED ? (
          <div
            className="text-trublue-secondary-500 text-sm font-semibold tracking-wide cursor-pointer"
            onClick={handleTryAgain}
          >
            Try Again
          </div>
        ) : (
          formatEpochToHumanReadable(data.uploadedAt ?? 0, false, true)
        )}
      </div>
      <div className="py-4 px-2.5 w-[122px] flex flex-row items-center gap-x-3">
        <span
          className={`flex items-center justify-center bg-trublue-light rounded-full p-2 text-trublue-secondary-500 ${
            (data.type === 'DOCUMENTS' && (!isEmpty(errors) || data.metadata?.uploadInfo?.loading)) ||
            (data.type === 'LINKS' && (!isEmpty(errors?.metadata?.url?.message) || isEmpty(data.metadata?.url)))
              ? 'opacity-40'
              : 'cursor-pointer'
          }`}
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
        <span
          className="flex items-center justify-center bg-opacity-[0.12] bg-error rounded-full p-2 text-error cursor-pointer"
          onClick={handleDeleteClick}
        >
          <Trash2 size={24} />
        </span>
      </div>
    </div>
  );
}

type Props = {
  data: MilestoneDraftArtifact;
  index: number;
  last?: boolean;
  control: Control<{ draftArtifacts: MilestoneDraftArtifact[] }>;
  errors?: {
    type?: string;
    message?: string;
    metadata?: {
      url?: {
        message?: string;
      };
      size?: {
        message?: string;
      };
      uploadInfo?: {
        file?: {
          message?: string;
        };
      };
    };
  };
  remove: UseFieldArrayRemove;
  handleFileUpload: (index: number, file: File) => void;
};
