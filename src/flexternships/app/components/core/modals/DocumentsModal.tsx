'use client';
import CloseModalButton from '../buttons/CloseModalButton';
import { downloadFile, getFileIcon, getFileSize } from '@/flexternships/utils/file-utils';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';

export default function DocumentsModal(props: DocumentsModalProps) {
  const { isOpen, onClose, data } = props;

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-6 shadow-lg z-[100]">
        <CloseModalButton onClick={handleClose} />
        <div className="flex flex-col items-start gap-5 text-grey-heading  text-xl font-medium leading-[28px]">
          <h1>Project Requirements Documents</h1>
          <div className="flex flex-col w-full items-center justify-center gap-1 py-6 px-5">
            {data.map((doc: any, index: number) => (
              <div
                onClick={() =>
                  downloadFile({
                    data: {
                      download_url: doc.downloadUrl,
                      file_name: doc.fileName,
                    },
                    file_name: doc.fileName,
                  })
                }
                key={index}
                className="flex items-center w-full justify-between gap-1 "
              >
                <div className="flex flex-row items-center justify-center gap-3  text-sm font-medium leading-[22.652px]">
                  <img
                    className="rounded me-75 mb-25"
                    alt="pdf"
                    src={getFileIcon(doc.fileName)}
                    height="22"
                    width="22"
                  />
                  <h1 className="">{doc?.fileName}</h1>
                </div>
                <div className="flex flex-row items-center gap-[60px]">
                  <h1 className="text-sm font-normal leading-[22.652px] text-right">{getFileSize(doc.size)}</h1>
                  <h1 className="text-sm font-normal leading-[22.652px] text-right">
                    {formatEpochToHumanReadable(doc.createdAt)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}
