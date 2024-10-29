import React, { useEffect, useRef } from 'react';
import { Upload } from 'react-feather';
import { useFieldArray, UseFormTrigger } from 'react-hook-form';
import { getFileDownloadUrl, getFileUploadUrl } from '@flexternships/services/project-management-v2';
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { dateToEpoch, formatEpochToHumanReadable } from '@flexternships/utils/date-utils';
import { formatFileSize } from '@flexternships/utils/file-utils';
import HorizontalFileCard from '../files/HorizontalFileCard';
import { uploadFileToUrl } from '@/flexternships/services/core-service';
import { MAX_FILE_COUNT } from '@/flexternships/lib/constants';

export default function FileUpload(props: InputProps) {
  const { name, control, error, trigger, watch, label, required, placeholder, className, acceptedFormats } = props;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name,
  });

  // Update the error message in the field state
  useEffect(() => {
    if (error) {
      fields.forEach((field, index) => {
        if (error && error[index]) {
          let errorMessage = '';
          Object.values(error[index]).map((e: any) => (errorMessage += e.message + '. '));
          update(index, { ...field, error: errorMessage });
        }
      });
    }
  }, [error]);

  const getUploadProgress = (progress: number) => {
    const fieldState = watch(name); // Get the current field state
    update(fieldState.length - 1, { ...fieldState[fieldState.length - 1], uploadProgress: progress });
  };

  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      append({
        fileName: file.name,
        file: file,
        fileKey: 'temp',
        downloadUrl: '',
        size: file.size,
        loading: true,
        createdAt: dateToEpoch(new Date()),
      });
      await trigger(name); // Trigger validation on new field
      const fieldState = watch(name); // Get the current field state

      if (!fieldState[fieldState.length - 1].error) {
        // If no error, upload the file
        const uploadRequirements = await getFileUploadUrl(file.name);
        await uploadFileToUrl(uploadRequirements.data.upload_url, file, getUploadProgress);
        const fileKey = uploadRequirements.data.file_key;
        console.log(fields.length, fields);
        update(fieldState.length - 1, { ...fieldState[fieldState.length - 1], fileKey: fileKey, loading: false });
      }
    } catch (error: any) {
      const fieldState = watch(name); // Get the current field state
      update(fieldState.length - 1, { ...fieldState[fieldState.length - 1], error: error.message, uploadProgress: 0 });
    }

    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    remove(index);

    // Clear the file input value on removal if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`${Styles.formFieldContainer} ${className ?? ''} grow`}>
      <div className={Styles.formInputLabelContainer}>
        <span className={Styles.formInputLabel}>{label}</span>
        {required && <span className={Styles.requiredAsterisk}>*</span>}
      </div>
      {fields.length > 0 && (
        <div className={`flex flex-col w-full ${fields.length !== 0 ? 'mt-1' : ''}`}>
          {fields.map((item: any, index: number) => (
            <HorizontalFileCard
              key={index}
              fileName={item.fileName}
              error={item.error}
              loading={item.loading}
              uploadProgress={item.uploadProgress}
              fileSize={formatFileSize(item.size)}
              createdAt={formatEpochToHumanReadable(item.createdAt)}
              generateDownloadLink={async () => await getFileDownloadUrl(item.fileKey)}
              removable
              remove={() => handleRemove(index)} // Call handleRemove to remove file and clear input
            />
          ))}
        </div>
      )}
      {fields.length < MAX_FILE_COUNT && (
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
  className?: string; // Optional field
  acceptedFormats?: string[]; // Optional field
};
