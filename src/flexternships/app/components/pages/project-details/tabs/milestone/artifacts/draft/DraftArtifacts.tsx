import { MilestoneDraftArtifact } from '@/flexternships/constraints/types/project-milestones-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MilestoneArtifactSchema } from '@/flexternships/schemas/project-milestones-schemas';
import { useFieldArray } from 'react-hook-form';
import DraftArtifactItem from './DraftArtifactItem';
import { Plus } from 'react-feather';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import { useMilestoneArtifactsStore } from '@/flexternships/stores/project-milestones-store';
import {
  MilestoneArtifactErrorType,
  MilestoneArtifactStatus,
  MilestoneArtifactType,
  ToastType,
} from '@/flexternships/constraints/enums/core-enums';
import { dateToEpoch } from '@/flexternships/utils/date-utils';
import { useParams } from 'react-router-dom';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { isEmpty } from 'lodash';
import UploadArtifactDocument from './UploadArtifactDocument';
import { getFileUploadUrl } from '@/flexternships/services/project-management-v2';
import { uploadFileToUrl } from '@/flexternships/services/core-service';

export default function DraftArtifacts() {
  const draftArtifacts = useMilestoneArtifactsStore((state) => state.draftArtifacts);
  const updateDraftArtifacts = useMilestoneArtifactsStore((state) => state.updateDraftArtifacts);
  const saveDraftArtifacts = useMilestoneArtifactsStore((state) => state.saveDraftArtifacts);
  const submitDraftArtifacts = useMilestoneArtifactsStore((state) => state.submitDraftArtifacts);

  const [saveDraftLoading, setSaveDraftLoading] = useState(false);
  const [submitDraftLoading, setSubmitDraftLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<{ draftArtifacts: MilestoneDraftArtifact[] }>({
    mode: 'onChange',
    resolver: yupResolver(MilestoneArtifactSchema),
    defaultValues: {
      draftArtifacts: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({ control, name: 'draftArtifacts' });

  const { projectId, milestoneId } = useParams();

  useEffect(() => {
    reset({ draftArtifacts: draftArtifacts });
  }, [draftArtifacts]);

  const addNewLink = () => {
    append({
      description: '',
      type: MilestoneArtifactType.LINKS,
      status: MilestoneArtifactStatus.DRAFT,
      uploadedAt: dateToEpoch(new Date()),
      metadata: { url: '' },
    });
  };

  const saveAsDraft = async () => {
    setSaveDraftLoading(true);
    const data = watch('draftArtifacts');
    updateDraftArtifacts(data);
    console.log(data);

    if (milestoneId && projectId) {
      try {
        await saveDraftArtifacts(milestoneId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          showToastMessage(ToastType.ERROR, error.message);
        } else {
          showToastMessage(ToastType.ERROR, 'An unexpected error occurred');
        }
      } finally {
        setSaveDraftLoading(false);
      }
    }
  };

  const submitDraft = async (data: { draftArtifacts: MilestoneDraftArtifact[] }) => {
    setSubmitDraftLoading(true);
    updateDraftArtifacts(data.draftArtifacts);

    if (milestoneId && projectId) {
      try {
        await submitDraftArtifacts(milestoneId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          showToastMessage(ToastType.ERROR, error.message);
        } else {
          showToastMessage(ToastType.ERROR, 'An unexpected error occurred');
        }
      } finally {
        setSubmitDraftLoading(false);
      }
    }
  };

  const getUploadProgress = (progress: number, index: number) => {
    const currentField = watch(`draftArtifacts.${index}`);
    update(index, {
      ...currentField,
      metadata: {
        ...currentField.metadata,
        uploadInfo: {
          ...currentField.metadata.uploadInfo,
          loading: currentField.metadata.uploadInfo?.loading || false,
          uploadProgress: progress,
        },
      },
    });
  };

  const handleFileUpload = async (index: number, file: File) => {
    if (
      errors.draftArtifacts?.[index] &&
      errors.draftArtifacts?.[index].type !== MilestoneArtifactErrorType.UPLOAD_FAILED
    ) {
      return;
    }
    const currentField = watch(`draftArtifacts.${index}`);
    update(index, {
      ...currentField,
      metadata: {
        ...currentField.metadata,
        uploadInfo: {
          ...currentField.metadata.uploadInfo,
          loading: true,
        },
      },
    });
    try {
      // If no error, upload the file
      const uploadRequirements = await getFileUploadUrl(file.name);
      await uploadFileToUrl(uploadRequirements.data.upload_url, file, getUploadProgress, index);
      const fileKey = uploadRequirements.data.file_key;
      update(index, {
        ...currentField,
        metadata: {
          ...currentField.metadata,
          fileKey: fileKey,
        },
      });
      clearErrors(`draftArtifacts.${index}`);
    } catch (error: unknown) {
      setError(`draftArtifacts.${index}`, {
        type: MilestoneArtifactErrorType.UPLOAD_FAILED,
        message: 'Upload failed. Please check your connection.',
      });
    } finally {
      const updatedField = watch(`draftArtifacts.${index}`);
      update(index, {
        ...updatedField,
        metadata: {
          ...updatedField.metadata,
          uploadInfo: {
            ...updatedField.metadata.uploadInfo,
            loading: false,
          },
        },
      });
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    let artifactDocument = {
      status: MilestoneArtifactStatus.DRAFT,
      description: '',
      type: MilestoneArtifactType.DOCUMENTS,
      uploadedAt: dateToEpoch(new Date()),
      metadata: {
        fileName: file.name,
        fileKey: '',
        size: file.size,
        uploadInfo: {
          loading: false,
          uploadProgress: 0,
          file: file,
        },
      },
    };

    append(artifactDocument);
    const appendedIndex = watch('draftArtifacts').length - 1;
    handleFileUpload(appendedIndex, file);
  };

  return (
    <div className="flex flex-col gap-y-4 border-t-[1px] border-solid border-grey-border pt-7">
      <h2 className="text-lg font-normal not-italic text-grey-heading">Submissions</h2>

      {!isEmpty(fields) && (
        <div className="shadow-table w-full border-1 border-solid border-grey-border bg-white rounded-md overflow-hidden">
          <div className="flex flex-row items-center border-b-1 border-solid border-grey-border bg-grey-background min-h-10 px-1.5">
            <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[231px]">
              File Name
            </div>
            <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[420px]">
              Description
            </div>
            <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[194px]">
              Uploaded On
            </div>
            <div className="px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[116px]">
              Action
            </div>
          </div>
          <div className="text-sm font-normal not-italic leading-5.5 text-grey">
            {fields.map((field, index) => (
              <DraftArtifactItem
                data={field}
                index={index}
                key={field.id}
                control={control}
                last={index === fields.length - 1}
                remove={remove}
                errors={errors.draftArtifacts?.[index] as { type?: string; message?: string }}
                handleFileUpload={handleFileUpload}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-7 text-trublue-secondary-500">
        <UploadArtifactDocument handleFileInputChange={handleFileInputChange} />
        <PrimaryIconText icon={<Plus size={12} />} text="Add Link" onClick={addNewLink} />
      </div>
      <div className={`flex flex-row justify-end gap-x-4 mt-3`}>
        <SecondaryButton onClick={saveAsDraft} loading={saveDraftLoading} disabled={isEmpty(fields)}>
          Save as Draft
        </SecondaryButton>
        <PrimaryButton
          onClick={handleSubmit(submitDraft)}
          loading={submitDraftLoading}
          disabled={!isValid || isEmpty(fields)}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}
