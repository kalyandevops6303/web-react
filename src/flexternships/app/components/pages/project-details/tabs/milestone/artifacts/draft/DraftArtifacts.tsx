import { MilestoneDraftArtifact } from '@/flexternships/constraints/types/project-milestones-types';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MilestoneArtifactSchema } from '@/flexternships/schemas/project-milestones-schemas';
import { useFieldArray } from 'react-hook-form';
import DraftArtifactItem from './DraftArtifactItem';
import { Plus } from 'react-feather';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import { useMilestoneArtifactsStore, useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import {
  MilestoneArtifactErrorType,
  MilestoneArtifactStatus,
  MilestoneArtifactType,
  ToastType,
} from '@/flexternships/constraints/enums/core-enums';
import { dateToEpoch } from '@/flexternships/utils/date-utils';
import { useParams, useNavigate } from 'react-router-dom';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { isEmpty } from 'lodash';
import UploadArtifactDocument from './UploadArtifactDocument';
import { getFileUploadUrl } from '@/flexternships/services/project-management-v2';
import { uploadFileToUrl } from '@/flexternships/services/core-service';
import { MilestoneDetailsModalType } from '@/flexternships/constraints/enums/miscellaneous-enums';
import ConfirmArtifactsSubmissionModal from '@/flexternships/app/components/core/modals/milestone/ConfirmArtifactsSubmissionModal';
import SuccessfulArtifactsSubmissionModal from '@/flexternships/app/components/core/modals/milestone/SuccessfulArtifactsSubmissionModal';
import {
  draftSavedModalHighlightText,
  draftSavedModalNote,
  getMilestoneDetailsModalTitle,
} from '@/flexternships/static/milestones-content';
import { getMilestoneDetailsModalDescription } from '@/flexternships/static/milestones-content';
import DraftSavedModal from '@/flexternships/app/components/core/modals/milestone/DraftSavedModal';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { saveForLaterModalContent } from '@/flexternships/static/core-content';

export default function DraftArtifacts({ isDisabled = false }: { isDisabled?: boolean }) {
  const draftArtifacts = useMilestoneArtifactsStore((state) => state.draftArtifacts);
  const removedArtifactIds = useMilestoneArtifactsStore((state) => state.removedArtifactIds);
  const updateDraftArtifacts = useMilestoneArtifactsStore((state) => state.updateDraftArtifacts);
  const saveDraftArtifacts = useMilestoneArtifactsStore((state) => state.saveDraftArtifacts);
  const submitDraftArtifacts = useMilestoneArtifactsStore((state) => state.submitDraftArtifacts);
  const populateMilestoneDetails = useProjectMilestonesStore((state) => state.populateMilestoneDetails);
  const activeModal = useProjectMilestonesStore((state) => state.activeModal);
  const closeModal = useProjectMilestonesStore((state) => state.closeModal);
  const openModal = useProjectMilestonesStore((state) => state.openModal);

  const modalContent = useAppStore((state) => state.modalContent);
  const setWip = useAppStore((state) => state.setWip);
  const unsetWip = useAppStore((state) => state.unsetWip);
  const closeGlobalModal = useAppStore((state) => state.closeModal);

  const [saveDraftLoading, setSaveDraftLoading] = useState(false);
  const [submitDraftLoading, setSubmitDraftLoading] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    trigger,
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

  useEffect(() => {
    // Set Work in progress alert when unmount - accordingly navigation is stopped on the clicked component
    return () => {
      const fieldsLength = watch('draftArtifacts').length;
      if (fieldsLength === 0) return unsetWip();

      const onDiscard = () => {
        if (modalContent?.metadata?.nextPath) {
          navigate(modalContent.metadata.nextPath);
        }
        unsetWip();
      };
      setWip(saveForLaterModalContent, {
        onConfirm: async () => {
          await saveAsDraft();
          closeGlobalModal();
        },
        onCancel: onDiscard,
        onClose: closeGlobalModal,
      });
    };
  }, [milestoneId, watch('draftArtifacts'), modalContent?.metadata?.nextPath]);

  const openRemoveArtifactModal = () => {
    openModal(MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT);
  };

  const openArtifactRemovedModal = () => {
    openModal(MilestoneDetailsModalType.ARTIFCAT_REMOVED);
  };

  const openConfirmArtifactsSubmissionModal = () => {
    openModal(MilestoneDetailsModalType.CONFIRM_ARTIFACTS_SUBMISSION);
  };

  const addNewLink = () => {
    append({
      description: '',
      type: MilestoneArtifactType.LINKS,
      status: MilestoneArtifactStatus.DRAFT,
      uploadedAt: dateToEpoch(new Date()),
      metadata: { url: '' },
    });
  };

  const getValidArtifacts = (data: MilestoneDraftArtifact[]) => {
    return data.filter((artifact) => {
      if (artifact.type === MilestoneArtifactType.DOCUMENTS && isEmpty(artifact.metadata?.fileKey)) {
        return false;
      }
      return true;
    });
  };

  const closeModalWithMilestoneDetailsRefresh = () => {
    if (!milestoneId) return;
    closeModal();
    populateMilestoneDetails(milestoneId);
  };

  const saveAsDraft = async () => {
    setSaveDraftLoading(true);
    const data = watch('draftArtifacts');
    const filteredData = getValidArtifacts(data);
    updateDraftArtifacts(filteredData);

    if (milestoneId && projectId) {
      try {
        await saveDraftArtifacts(milestoneId);
        openModal(MilestoneDetailsModalType.ARTIFACTS_DRAFT_SAVED);
        await populateMilestoneDetails(milestoneId);
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
        openModal(MilestoneDetailsModalType.ARTIFCATS_SUBMITTED);
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
    if (index < watch('draftArtifacts').length) {
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
    }
  };

  const handleFileUpload = async (index: number, file: File) => {
    if (
      errors.draftArtifacts?.[index]?.type &&
      errors.draftArtifacts?.[index]?.type !== MilestoneArtifactErrorType.UPLOAD_FAILED
    ) {
      return;
    }

    if (
      errors.draftArtifacts?.[index]?.metadata &&
      !(
        Object.keys(errors.draftArtifacts[index].metadata).length === 1 &&
        errors.draftArtifacts[index].metadata.fileKey?.type === 'required'
      )
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
      if (watch(`draftArtifacts`).length > index) {
        update(index, {
          ...currentField,
          metadata: {
            ...currentField.metadata,
            fileKey: fileKey,
          },
        });
      }

      clearErrors(`draftArtifacts.${index}`);
    } catch (error: unknown) {
      setError(`draftArtifacts.${index}`, {
        type: MilestoneArtifactErrorType.UPLOAD_FAILED,
        message: 'Upload failed. Please check your connection.',
      });
    } finally {
      if (watch(`draftArtifacts`).length > index) {
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
    }
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    await trigger('draftArtifacts');
    const appendedIndex = watch('draftArtifacts').length - 1;
    handleFileUpload(appendedIndex, file);
  };

  return (
    <div className="flex flex-col gap-y-4 border-t-[1px] border-solid border-grey-border pt-7">
      <h2 className="text-lg font-normal not-italic text-grey-heading">Saved Drafts</h2>

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
                errors={errors.draftArtifacts?.[index] as FieldError}
                handleFileUpload={handleFileUpload}
                activeModal={activeModal}
                openRemoveArtifactModal={openRemoveArtifactModal}
                openArtifactRemovedModal={openArtifactRemovedModal}
                closeModal={closeModal}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-7 text-trublue-secondary-500">
        <UploadArtifactDocument handleFileInputChange={handleFileInputChange} disabled={isDisabled} />
        <PrimaryIconText
          className="self-start"
          icon={<Plus size={12} />}
          text="Add Link"
          onClick={addNewLink}
          disabled={isDisabled}
        />
      </div>
      <div className={`flex flex-row justify-end gap-x-4 mt-3`}>
        <SecondaryButton
          onClick={saveAsDraft}
          loading={saveDraftLoading}
          disabled={isDisabled || (isEmpty(fields) && isEmpty(removedArtifactIds))}
        >
          Save as Draft
        </SecondaryButton>
        <PrimaryButton
          onClick={openConfirmArtifactsSubmissionModal}
          loading={submitDraftLoading}
          disabled={isDisabled || !isValid || (isEmpty(fields) && isEmpty(removedArtifactIds))}
        >
          Submit
        </PrimaryButton>
      </div>
      {activeModal && (
        <SuccessfulArtifactsSubmissionModal
          isOpen={activeModal === MilestoneDetailsModalType.ARTIFCATS_SUBMITTED}
          onClose={closeModalWithMilestoneDetailsRefresh}
          title={getMilestoneDetailsModalTitle(MilestoneDetailsModalType.ARTIFCATS_SUBMITTED)}
          description={getMilestoneDetailsModalDescription(MilestoneDetailsModalType.ARTIFCATS_SUBMITTED)}
          artifacts={watch('draftArtifacts')}
        />
      )}

      {activeModal && (
        <ConfirmArtifactsSubmissionModal
          isOpen={activeModal === MilestoneDetailsModalType.CONFIRM_ARTIFACTS_SUBMISSION}
          onClose={closeModal}
          title={getMilestoneDetailsModalTitle(MilestoneDetailsModalType.CONFIRM_ARTIFACTS_SUBMISSION)}
          description={getMilestoneDetailsModalDescription(MilestoneDetailsModalType.CONFIRM_ARTIFACTS_SUBMISSION)}
          artifacts={watch('draftArtifacts')}
          onConfirm={handleSubmit(submitDraft)}
          isConfirmLoading={submitDraftLoading}
        />
      )}

      {activeModal && (
        <DraftSavedModal
          isOpen={activeModal === MilestoneDetailsModalType.ARTIFACTS_DRAFT_SAVED}
          onClose={closeModal}
          title={getMilestoneDetailsModalTitle(MilestoneDetailsModalType.ARTIFACTS_DRAFT_SAVED)}
          description={getMilestoneDetailsModalDescription(MilestoneDetailsModalType.ARTIFACTS_DRAFT_SAVED)}
          note={draftSavedModalNote}
          highlightText={draftSavedModalHighlightText}
        />
      )}
    </div>
  );
}
