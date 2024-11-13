import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import { allowedFormats } from '@/flexternships/schemas/project-milestones-schemas';
import { useRef } from 'react';
import { Plus } from 'react-feather';

export default function UploadArtifactDocument(props: Props) {
  const { handleFileInputChange, disabled = false } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateClick = () => {
    fileInputRef.current?.click();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileInputChange(event);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label htmlFor="draftArtifacts">
        <PrimaryIconText icon={<Plus size={12} />} text="Add Document" onClick={simulateClick} disabled={disabled} />
        <input
          id="draftArtifacts"
          type="file"
          accept={allowedFormats?.join(', ')}
          ref={fileInputRef} // Assign ref to the input
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

type Props = {
  disabled?: boolean;
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
