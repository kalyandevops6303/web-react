import React, { useRef } from "react";
import { Upload } from 'react-feather';
import { useFieldArray } from "react-hook-form";
import { getFileDownloadUrl, getFileUploadUrl } from "@flexternships/services/project-management-v2";
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { dateToEpoch, formatEpochToHumanReadable } from "@flexternships/utils/date-utils";
import { formatFileSize } from "@flexternships/utils/file-utils";
import HorizontalFileCard from "../files/HorizontalFileCard";
import { uploadFileToUrl } from "@/flexternships/services/core-service";

export default function FileUpload(props: InputProps) {
    const { name, control, label, required, placeholder, className } = props;

    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });

    const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const uploadRequirements = await getFileUploadUrl(file.name);
        await uploadFileToUrl(uploadRequirements.data.upload_url, file);

        append({
            fileName: file.name,
            fileKey: uploadRequirements.data.file_key,
            downloadUrl: '',
            size: file.size,
            createdAt: dateToEpoch(new Date())
        });

        // Clear the file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemove = (index: number) => {
        remove(index);

        // Clear the file input value on removal if desired
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={`${Styles.formFieldContainer} ${className ?? ''} grow`}>
            <div className={Styles.formInputLabelContainer}>
                <span className={Styles.formInputLabel}>{label}</span>
                {required && <span className={Styles.requiredAsterisk}>*</span>}
            </div>
            {
                    fields.length > 0 && (
                        <div className={`flex flex-col w-full ${fields.length !== 0 ? 'mt-1' : ''}`}>
                            {
                                fields.map((item: any, index: number) => (
                                    <HorizontalFileCard
                                        key={index}
                                        fileName={item.fileName}
                                        fileSize={formatFileSize(item.size)}
                                        createdAt={formatEpochToHumanReadable(item.createdAt)}
                                        generateDownloadLink={async () => (await getFileDownloadUrl(item.fileKey))}
                                        removable
                                        remove={() => handleRemove(index)} // Call handleRemove to remove file and clear input
                                    />
                                ))
                            }
                        </div>
                    )
            }
            <label htmlFor={name} className={`${Styles.formFileInput} self-start`}>
                <span className={Styles.formFileInputIconContainer}>
                    <Upload className={Styles.formFileInputIcon} size={18} />
                </span>
                <span className={Styles.formFileInputText}>
                    {placeholder}
                </span>
                <input
                    id={name}
                    type="file"
                    ref={fileInputRef} // Assign ref to the input
                    className={`hidden`}
                    onChange={handleFileInputChange}
                />
            </label>
        </div>
    );
}

type InputProps = {
    name: string;
    control: any;
    label: string;             // Required field
    placeholder: string;       // Required field
    required?: boolean;        // Optional field
    className?: string;        // Optional field
};
