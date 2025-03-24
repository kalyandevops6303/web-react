'use client';
import { formatFileSize } from '@/flexternships/utils/file-utils';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import GenericModal from './GenericModal';
import HorizontalFileCard from '../files/HorizontalFileCard';
import { getFileDownloadUrl } from '@/flexternships/services/project-management-v2';

export default function DocumentsModal(props: DocumentsModalProps) {
  const { isOpen, onClose, data } = props;

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <GenericModal isOpen={isOpen} onClose={handleClose}>
      <div className="relative rounded-lg bg-white pt-13 pr-8 pb-8 pl-6 shadow-lg">
        <h1 className="text-[20px]">Project Requirements Documents</h1>
        <div className="flex flex-col w-full items-center justify-center gap-1 py-6">
          {data.map((doc: Document, index: number) => (
            <HorizontalFileCard
              key={index}
              className="m-0 w-full"
              fileName={doc.fileName}
              fileSize={formatFileSize(doc.size)}
              createdAt={formatEpochToHumanReadable(doc.createdAt)}
              generateDownloadLink={async () => await getFileDownloadUrl(doc.fileKey)}
            />
          ))}
        </div>
      </div>
    </GenericModal>
  );
}

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Document[];
}

type Document = {
  fileName: string;
  createdAt: number;
  fileKey: string;
  size: number;
};
