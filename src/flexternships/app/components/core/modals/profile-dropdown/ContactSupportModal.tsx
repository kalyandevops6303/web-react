import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import TextInput from '../../form/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { sendSupportRequest } from '@/flexternships/services/user-management';
import { DEFAULT_SUPPORT_TYPE, SUPPORT_EMAIL } from '@/flexternships/static/constants/core-constants';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

const contactSupportSchema = yup.object().shape({
  toEmail: yup.string().email('Please enter a valid email'),
  ccEmail: yup.string().email('Please enter a valid email'),
  description: yup
    .string()
    .required('Message is required')
    .min(50, 'Message must be at least 50 characters')
    .max(500, 'Message must be less than 500 characters'),
});

interface ContactSupportForm {
  toEmail: string;
  ccEmail: string;
  description: string;
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
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactSupportForm>({
    mode: 'onChange',
    resolver: yupResolver(contactSupportSchema),
    defaultValues: {
      toEmail: '',
      ccEmail: '',
      description: '',
    },
  });

  const onSubmit = async (data: ContactSupportForm) => {
    setIsConfirmLoading(true);
    try {
      await sendSupportRequest(SUPPORT_EMAIL, [userDetails.email], data.description, DEFAULT_SUPPORT_TYPE);
      onClose();
      onConfirmSuccess();
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsConfirmLoading(false);
    }
  };

  return (
    <GenericModal className="max-w-[670px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-12 px-12 pt-12 pb-7">
        <div className="flex flex-col grow gap-y-10">
          <div className="flex flex-col gap-y-6">
            <div className="text-2xl font-medium text-grey-heading text-center not-italic">Contact Support</div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-center gap-x-2">
                  <div className="uppercase text-base text-grey font-medium">To: </div>
                  <TextInput
                    className="w-96"
                    value={SUPPORT_EMAIL}
                    onChange={() => {}}
                    error={errors.toEmail?.message}
                    readOnly
                  />
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <div className="uppercase text-base text-grey font-medium">CC: </div>
                  <TextInput
                    className="w-96"
                    value={userDetails.email}
                    onChange={() => {}}
                    error={errors.ccEmail?.message}
                    readOnly
                  />
                </div>
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    value={value}
                    onChange={onChange}
                    label="Tell us in detail how can we help you?"
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
