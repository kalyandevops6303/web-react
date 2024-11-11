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
import { useEffect } from 'react';
import { useMilestoneArtifactsStore } from '@/flexternships/stores/project-milestones-store';
import {
  MilestoneArtifactStatus,
  MilestoneArtifactType,
  ToastType,
} from '@/flexternships/constraints/enums/core-enums';
import { dateToEpoch } from '@/flexternships/utils/date-utils';
import { useParams } from 'react-router-dom';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { isEmpty } from 'lodash';

export default function DraftArtifacts() {
  const draftArtifacts = useMilestoneArtifactsStore((state) => state.draftArtifacts);
  const updateDraftArtifacts = useMilestoneArtifactsStore((state) => state.updateDraftArtifacts);
  const saveDraftArtifacts = useMilestoneArtifactsStore((state) => state.saveDraftArtifacts);
  const submitDraftArtifacts = useMilestoneArtifactsStore((state) => state.submitDraftArtifacts);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<{ draftArtifacts: MilestoneDraftArtifact[] }>({
    mode: 'onChange',
    resolver: yupResolver(MilestoneArtifactSchema),
    defaultValues: {
      draftArtifacts: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'draftArtifacts' });

  const { projectId, milestoneId } = useParams();

  useEffect(() => {
    reset({ draftArtifacts: draftArtifacts });
    console.log('draftArtifacts', draftArtifacts);
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
    const data = watch('draftArtifacts');
    updateDraftArtifacts(data);

    if (milestoneId && projectId) {
      try {
        await saveDraftArtifacts(milestoneId, projectId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          showToastMessage(ToastType.ERROR, error.message);
        } else {
          showToastMessage(ToastType.ERROR, 'An unexpected error occurred');
        }
      }
    }
  };

  const submitDraft = async (data: { draftArtifacts: MilestoneDraftArtifact[] }) => {
    updateDraftArtifacts(data.draftArtifacts);

    if (milestoneId && projectId) {
      try {
        await submitDraftArtifacts(milestoneId, projectId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          showToastMessage(ToastType.ERROR, error.message);
        } else {
          showToastMessage(ToastType.ERROR, 'An unexpected error occurred');
        }
      }
    }
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
                errors={errors.draftArtifacts?.[index]}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-7 text-trublue-secondary-500">
        <PrimaryIconText icon={<Plus size={12} />} text="Add Document" onClick={() => console.log('add document')} />
        <PrimaryIconText icon={<Plus size={12} />} text="Add Link" onClick={addNewLink} />
      </div>
      <div className={`flex flex-row justify-end gap-x-4 mt-3`}>
        <SecondaryButton onClick={saveAsDraft} disabled={isEmpty(fields)}>
          Save as Draft
        </SecondaryButton>
        <PrimaryButton onClick={handleSubmit(submitDraft)} disabled={!isValid || isEmpty(fields)}>
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}
