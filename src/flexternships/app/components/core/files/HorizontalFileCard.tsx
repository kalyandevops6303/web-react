import Styles from '@flexternships/styles/components/core/files.module.css';
import SimpleElevatedCard from '../cards/SimpleElevatedCard';
import { getFileIcon } from '@/flexternships/utils/file-utils';
import { Progress } from '../../ui/progress';
import { X } from 'react-feather';

export default function HorizontalFileCard(props: Props) {
  const {
    fileName,
    fileSize,
    error,
    createdAt,
    className,
    removable = false,
    remove,
    generateDownloadLink,
    loading,
    uploadProgress,
    uploadSuccess,
    uploadError,
    tryAgain,
  } = props;
  const handleClick = async () => {
    const downloadResponse = await generateDownloadLink();
    window.open(downloadResponse.data, '_blank');
  };
  return (
    <SimpleElevatedCard
      className={`${Styles.horizontalFileCard} ${className ?? ''} ${
        error ? 'border border-error border-solid' : ''
      } h-[3.875rem]`}
    >
      <div className={`${Styles.fileContainer} cursor-pointer`} onClick={handleClick}>
        <div className={Styles.fileIconContainer}>
          <img className="h-6 w-5" src={getFileIcon(fileName)} />
        </div>
        <div className={Styles.fileName}>{fileName}</div>
      </div>
      <div className="flex items-center">
        {loading ? (
          <>
            {error ? (
              <div className="p-2 text-error text-sm font-medium tracking-wide not-italic self-center mr-8">
                {error}
              </div>
            ) : (
              <span className={`${Styles.loading} mr-8`}>Uploading document, this will only take a few seconds.</span>
            )}
            <Progress value={uploadProgress} className={`h-3 bg-grey-50 mr-8 ${uploadError ? 'w-32' : 'w-65'}`} />
          </>
        ) : (
          <div className={Styles.fileInfoContainer}>
            <span className={Styles.fileSize}>{fileSize}</span>
            <span className={Styles.fileUploadDate}>{createdAt}</span>
          </div>
        )}
        {removable && (
          <>
            {uploadSuccess !== false ? (
              <div
                className="p-2 text-error text-sm font-semibold tracking-wide not-italic self-center cursor-pointer"
                onClick={remove}
              >
                Remove
              </div>
            ) : (
              <>
                {uploadError && (
                  <div
                    className="p-2 text-trublue-secondary-500 text-sm font-semibold tracking-wide not-italic self-center cursor-pointer mr-8"
                    onClick={tryAgain}
                  >
                    Try Again
                  </div>
                )}
                <div className=" cursor-pointer" onClick={remove}>
                  <X className="w-5 h-5" />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </SimpleElevatedCard>
  );
}

type Props = {
  fileName: string;
  fileSize: string;
  error?: string;
  createdAt: string;
  removable?: boolean;
  className?: string;
  remove?: () => void;
  tryAgain?: () => void;
  generateDownloadLink: () => Promise<any>;
  loading?: boolean;
  uploadProgress?: number;
  uploadSuccess?: boolean;
  uploadError?: boolean;
};
