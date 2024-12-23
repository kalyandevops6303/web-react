import React, { useRef } from 'react';
import { Upload } from 'react-feather';
import { useFieldArray, UseFormTrigger } from 'react-hook-form';
import { getFileDownloadUrl, getFileUploadUrl } from '@flexternships/services/project-management-v2';
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { dateToEpoch, formatEpochToHumanReadable } from '@flexternships/utils/date-utils';
import { formatFileSize } from '@flexternships/utils/file-utils';
import HorizontalFileCard from '../files/HorizontalFileCard';
import { uploadFileToUrl } from '@/flexternships/services/core-service';
import Tooltip from '../Tooltip';
import { MAX_FILE_SIZE_ERROR, MAX_FILE_SIZE_LIMIT } from '@/flexternships/lib/constants';

export default function FileUpload(props: InputProps) {
  const {
    name,
    control,
    tooltip,
    trigger,
    watch,
    label,
    required,
    placeholder,
    className,
    acceptedFormats,
    maxFileCount,
  } = props;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name,
  });

  // Track files being uploaded to allow cancellation
  const uploadingFiles = useRef<{ [key: number]: boolean }>({});

  const getUploadProgress = (progress: number, index: number) => {
    // Only update progress if file hasn't been removed
    if (uploadingFiles.current[index]) {
      const fieldState = watch(name);
      update(index, { ...fieldState[index], uploadProgress: progress });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

  const handleFileUpload = async (index: number, file: File) => {
    try {
      const fieldState = watch(name); // Get the current field state
      if (!fieldState[index].error) {
        uploadingFiles.current[index] = true;
        const uploadRequirements = await getFileUploadUrl(file.name);
        await uploadFileToUrl(uploadRequirements.data.upload_url, file, getUploadProgress, index);
        // Check if file was removed during upload
        if (uploadingFiles.current[index]) {
          const fileKey = uploadRequirements.data.file_key;
          update(index, { ...fieldState[index], fileKey: fileKey, loading: false, uploadSuccess: true });
        }
      }
    } catch (error: any) {
      // Only update error state if file hasn't been removed
      if (uploadingFiles.current[index]) {
        const fieldState = watch(name);
        update(index, {
          ...fieldState[index],
          error: 'Upload failed. Please check your connection.',
          uploadProgress: 0,
          uploadError: true,
        });
      }
    } finally {
      delete uploadingFiles.current[index];
    }
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    let newField = {
      fileName: file.name,
      file: file,
      fileKey: 'temp',
      downloadUrl: '',
      size: file.size,
      uploadSuccess: false,
      uploadError: false,
      loading: true,
      createdAt: dateToEpoch(new Date()),
    };

    if (!acceptedFormats?.includes(file.type)) {
      Object.assign(newField, { error: 'Invalid file format.' });
    }
    if (file.size > MAX_FILE_SIZE_LIMIT) {
      Object.assign(newField, { error: MAX_FILE_SIZE_ERROR });
    }

    append(newField);
    await trigger(name); // Trigger validation on new field
    const fieldState = watch(name); // Get the current field state
    handleFileUpload(fieldState.length - 1, file);

    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    // Mark file as removed to stop upload
    delete uploadingFiles.current[index];
    remove(index);

    // Clear the file input value on removal if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTryAgain = async (index: number) => {
    const fieldState = watch(name); // Get the current field state
    update(index, {
      ...fieldState[index],
      loading: true,
      uploadError: false,
      uploadSuccess: false,
      uploadProgress: 0,
      error: null,
    });
    handleFileUpload(index, fieldState[index].file);
  };

  return (
    <div className={`${Styles.formFieldContainer} ${className ?? ''} grow`}>
      <div className={`${Styles.formInputLabelContainer} items-center`}>
        <span className={Styles.formInputLabel}>{label}</span>
        {required && <span className={Styles.requiredAsterisk}>*</span>}
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      {fields.length > 0 && (
        <div className={`flex flex-col w-full ${fields.length !== 0 ? 'mt-1' : ''}`}>
          {fields.map((item: any, index: number) => (
            <HorizontalFileCard
              key={item.id}
              fileName={item.fileName}
              error={item.error}
              loading={item.loading}
              uploadProgress={item.uploadProgress}
              uploadSuccess={item.uploadSuccess}
              uploadError={item.uploadError}
              fileSize={formatFileSize(item.size)}
              createdAt={formatEpochToHumanReadable(item.createdAt)}
              generateDownloadLink={async () => await getFileDownloadUrl(item.fileKey)}
              removable
              tryAgain={() => handleTryAgain(index)}
              remove={() => handleRemove(index)} // Call handleRemove to remove file and clear input
            />
          ))}
        </div>
      )}
      {(maxFileCount === undefined || fields.length < maxFileCount) && (
        <label htmlFor={name} className={`${Styles.formFileInput} self-start`}>
          <span className={Styles.formFileInputIconContainer}>
            <Upload className={Styles.formFileInputIcon} size={18} />
          </span>
          <span className={Styles.formFileInputText}>{placeholder}</span>
          <input
            id={name}
            type="file"
            accept={acceptedFormats?.join(', ')}
            ref={fileInputRef} // Assign ref to the input
            className="hidden"
            onChange={handleFileInputChange}
          />
        </label>
      )}
    </div>
  );
}

type InputProps = {
  name: string;
  control: any;
  trigger: UseFormTrigger<any>;
  error: any;
  watch: (name: string) => any;
  label: string; // Required field
  placeholder: string; // Required field
  required?: boolean; // Optional field
  tooltip?: string | string[];
  className?: string; // Optional field
  acceptedFormats?: string[]; // Optional field
  maxFileCount?: number; // Optional field
};
