import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { FlexternDelegateInvitationType, ToastType } from '@/flexternships/constraints/enums/core-enums';
import TextInput from '../../form/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inviteDelegate } from '@/flexternships/services/user-management';

const inviteDelegateSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
});

interface InviteDelegateForm {
  email: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteDelegateModal(props: Props) {
  const { isOpen, onClose } = props;

  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InviteDelegateForm>({
    mode: 'onChange',
    resolver: yupResolver(inviteDelegateSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: InviteDelegateForm) => {
    setIsConfirmLoading(true);
    try {
      await inviteDelegate(data.email, { invitationType: FlexternDelegateInvitationType.FULL_ACCESS });
      onClose();
      showToastMessage(ToastType.SUCCESS, 'Delegate invited successfully');
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Failed to invite delegate');
    } finally {
      setIsConfirmLoading(false);
    }
  };

  return (
    <GenericModal className="max-w-[670px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-12 px-12 pt-12 pb-7">
        <div className="flex flex-col grow gap-y-10">
          <div className="flex flex-col gap-y-6">
            <div className="text-2xl font-medium text-grey-heading not-italic">Add Delegate</div>
            <div className="flex flex-col gap-y-2">
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    value={value}
                    onChange={onChange}
                    label="Delegate Email"
                    placeholder="Enter email address"
                    error={errors.email?.message}
                    required
                  />
                )}
              />
              <div className="text-sm text-grey-muted not-italic">
                <span className="font-semibold">Note:</span> An invitation link will be sent to the above mentioned
                email address.
              </div>
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
              Send Invite
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
