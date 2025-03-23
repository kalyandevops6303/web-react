import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { CustomerSupportTypes, ToastType } from '@/flexternships/constraints/enums/core-enums';
import TextInput from '../../form/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loadSupportTypes, sendSupportRequest } from '@/flexternships/services/user-management';
import { DEFAULT_SUPPORT_TYPE, SUPPORT_EMAIL } from '@/flexternships/static/constants/core-constants';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import SingleSelectInput from '../../form/SingleSelectInput';

const contactSupportSchema = yup.object().shape({
  toEmail: yup.string().email('Please enter a valid email'),
  ccEmail: yup.string().email('Please enter a valid email'),
  description: yup
    .string()
    .required('Message is required')
    .min(50, 'Message must be at least 50 characters')
    .max(500, 'You have exceeded character limit of 500'),
  issueType: yup
    .object()
    .shape({
      name: yup.string().required('Issue Type label is required'),
      _id: yup.string().required('Issue Type value is required'),
    })
    .required('Issue Type is required')
    .nullable(),
  skill: yup.string().when('issueType.value', {
    is: (issueType: { name: string; _id: string }) => issueType?._id === CustomerSupportTypes.MISSING_SKILL,
    then: () =>
      yup
        .string()
        .min(1, 'Skill must be at least 1 character')
        .max(150, 'Skill must be 150 characters or less')
        .required('Skill is required'),
  }),
  tool: yup.string().when('issueType.value', {
    is: (issueType: { name: string; _id: string }) => issueType?._id === CustomerSupportTypes.MISSING_TOOL,
    then: () =>
      yup
        .string()
        .min(1, 'Tool must be at least 1 character')
        .max(150, 'Tool must be 150 characters or less')
        .required('Tool is required'),
  }),
});
interface ContactSupportForm {
  toEmail: string;
  ccEmail: string;
  issueType: { name: string; _id: string } | null;
  description: string;
  skill?: string;
  tool?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSuccess: () => void;
}

export default function ContactSupportModal(props: Props) {
  const { isOpen, onClose, onConfirmSuccess } = props;

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactSupportForm>({
    mode: 'onChange',
    resolver: yupResolver(contactSupportSchema),
    defaultValues: {
      toEmail: SUPPORT_EMAIL,
      ccEmail: userDetails.email,
      issueType: null,
      description: '',
    },
  });
  const values = useWatch({ control });

  useEffect(() => {
    console.log('values', values);
    console.log(isValid);
  }, [values]);
  const onSubmit = async (data: ContactSupportForm) => {
    setIsConfirmLoading(true);
    try {
      const missingName = (() => {
        switch (data.issueType?._id) {
          case CustomerSupportTypes.MISSING_SKILL:
            return data.skill;
          case CustomerSupportTypes.MISSING_TOOL:
            return data.tool;
          default:
            return '';
        }
      })();
      await sendSupportRequest(
        false,
        SUPPORT_EMAIL,
        [userDetails.email],
        data.description,
        data.issueType?._id || DEFAULT_SUPPORT_TYPE,
        missingName,
      );
      onClose();
      onConfirmSuccess();
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsConfirmLoading(false);
    }
  };
  const issueType = watch('issueType');
  console.log('issueType', issueType);
  return (
    <GenericModal className="max-w-[670px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-12 p-10">
        <div className="flex flex-col grow gap-y-10">
          <div className="flex flex-col gap-y-8">
            <div className="text-[28px] font-medium text-grey-600 text-center not-italic">Email Customer Support</div>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row items-center gap-x-2.5">
                  <div className="uppercase text-sm text-grey-500 font-semibold">To: </div>
                  <TextInput
                    className="w-80"
                    value={SUPPORT_EMAIL}
                    onChange={() => {}}
                    error={errors.toEmail?.message}
                    readOnly
                  />
                </div>
                <div className="flex flex-row items-center gap-x-2.5">
                  <div className="uppercase text-sm text-grey-500 font-semibold">CC: </div>
                  <TextInput
                    className="w-80"
                    value={userDetails.email}
                    onChange={() => {}}
                    error={errors.ccEmail?.message}
                    readOnly
                    isMasked
                  />
                </div>
                <div className="flex flex-row items-center gap-x-2.5">
                  <div className="flex flex-row items-center gap-x-2">
                    <SingleSelectInput
                      name="issueType"
                      control={control}
                      label="Issue Type"
                      required
                      placeholder="Select issue type"
                      loadOptions={loadSupportTypes}
                      error={errors?.issueType?.message}
                      isClearable
                      className="react-select"
                      maxMenuHeight={200}
                    />
                  </div>
                  {issueType?._id === CustomerSupportTypes.MISSING_SKILL && (
                    <div className="flex flex-col items-start gap-y-2">
                      <div className="uppercase text-sm text-grey-500 font-semibold">Missing Skill: </div>
                      <Controller
                        name="skill"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextInput
                            className="w-80"
                            value={value || ''}
                            onChange={onChange}
                            error={errors.skill?.message}
                            placeholder="Enter missing skill"
                          />
                        )}
                      />
                    </div>
                  )}

                  {issueType?._id === CustomerSupportTypes.MISSING_TOOL && (
                    <div className="flex flex-col items-start gap-y-2">
                      <div className="uppercase text-sm text-grey-500 font-semibold">Missing Tool: </div>
                      <Controller
                        name="tool"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextInput
                            className="w-80"
                            value={value || ''}
                            onChange={onChange}
                            error={errors.tool?.message}
                            placeholder="Enter missing tool"
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="w-[590px]"
                    value={value}
                    onChange={onChange}
                    label="Tell us in detail how we can help you?"
                    placeholder="Enter details"
                    error={errors.description?.message}
                    required
                    textarea
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0" onClick={onClose} disabled={isConfirmLoading}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              className="m-0"
              loading={isConfirmLoading}
              disabled={!isValid || isConfirmLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
