import { useState } from 'react';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import { X } from 'react-feather';

import TextInput from '../form/TextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '@/flexternships/schemas/core-schemas';
import SecondaryButton from '../buttons/SecondaryButton';
import { changePasswordWithCurrentPassword } from '@/flexternships/services/user-management';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import ShowToastMessage from '@/flexternships/utils/toast-utils';

interface ClientOnboardingSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResetPasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordModal({ isOpen, onClose }: ClientOnboardingSuccessProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    mode: 'onChange',
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    try {
      await changePasswordWithCurrentPassword(data.oldPassword, data.newPassword);
      ShowToastMessage(ToastType.SUCCESS, "Password changed successfully!");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        ShowToastMessage(ToastType.ERROR, error.message);
      } else {
        ShowToastMessage(ToastType.ERROR, "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const temp = () => {
    ShowToastMessage(ToastType.SUCCESS, "Password changed successfully!");
  }


  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg py-6 px-10 max-w-2xl relative">
        <div className='absolute -top-2 -right-2 bg-white rounded-md p-2 shadow-table cursor-pointer' onClick={onClose}>
          <X size={16} />
        </div>
        <div className='pt-10 flex flex-col items-center grow gap-y-5'>
          <h1 className='text-[28px] font-normal text-grey-heading'>
            Reset Password
          </h1>
          <div className='flex flex-col gap-y-5'>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  className='w-[393px]'
                  label="Old Password"
                  placeholder="Enter your old password"
                  error={errors.oldPassword?.message}
                  isPassword
                  required
                />
              )}>
            </Controller>
            <Controller
              name="newPassword"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  className='w-[393px]'
                  label="New Password"
                  placeholder="Enter your new password"
                  error={errors.newPassword?.message}
                  tooltip='Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                  isPassword
                  required
                />
              )}>
            </Controller>
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  className='w-[393px]'
                  label="Old Password"
                  placeholder="Enter your old password"
                  error={errors.confirmNewPassword?.message}
                  isPassword
                  required
                />
              )}>
            </Controller>
          </div>
          <div className='self-stretch flex items-end justify-end grow gap-5'>
            <SecondaryButton onClick={onClose}>
              Close
            </SecondaryButton>
            <PrimaryButton onClick={temp} loading={isLoading}>
              Save
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}