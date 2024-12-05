import React, { useRef, useState } from 'react';
import { Trash2, Upload, UserPlus } from 'react-feather';
import Tooltip from '../Tooltip';
import PrimaryButton from '../buttons/PrimaryButton';
import { getImageUploadUrl } from '@/flexternships/services/user-management';
import { uploadFileToUrl } from '@/flexternships/services/core-service';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import Toast from '@/flexternships/app/components/core/Toasts/Toast';

export default function UploadProfileAvatar(props: UploadProfileAvatarProps) {
  const { value, onChange, className } = props;
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const uploadData = await getImageUploadUrl(file.name);
      await uploadFileToUrl(uploadData.data.upload_url, file);

      // Call onChange with the new value (assuming it's the URL of the uploaded image)
      onChange(uploadData.data.file_key);
    } catch (error) {
      showToastMessage(ToastType.ERROR, <Toast type={ToastType.ERROR} description="Error uploading file" />);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(''); // Clear the image value
  };

  return (
    <div className={`flex gap-4 ${className || ''}`}>
      <div className="h-[100px] w-[100px] rounded-full bg-white-fa">
        {value ? (
          <img
            src={
              value.startsWith('https')
                ? value
                : fileInputRef.current?.files?.[0]
                ? URL.createObjectURL(fileInputRef.current.files[0])
                : undefined
            }
            alt="Avatar"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full rounded-full text-grey-muted">
            <UserPlus size={32} />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          multiple={false}
        />
        {value ? (
          <Popover>
            <PopoverTrigger>
              <PrimaryButton onClick={() => {}} loading={isLoading}>
                Edit Picture
              </PrimaryButton>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none" align="start" sideOffset={-2}>
              <div className="flex flex-col rounded-md bg-white border-1 border-solid border-grey-border">
                <button
                  onClick={handleUploadClick}
                  className="flex items-center gap-x-2 py-3 px-4 text-grey hover:bg-trublue-light hover:text-trublue-secondary-500"
                >
                  <Upload size={18} />
                  <span className="text-sm leading-5.5">Upload from device</span>
                </button>
                <button
                  onClick={handleRemoveClick}
                  className="flex items-center gap-x-2 py-3 px-4 text-grey hover:bg-trublue-light hover:text-trublue-secondary-500"
                >
                  <Trash2 size={18} />
                  <span className="text-sm">Remove current picture</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <PrimaryButton onClick={handleUploadClick} loading={isLoading}>
            Upload Picture
          </PrimaryButton>
        )}
        <Tooltip content="Allowed file types: png, jpg, jpeg" />
      </div>
    </div>
  );
}

type UploadProfileAvatarProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
};
