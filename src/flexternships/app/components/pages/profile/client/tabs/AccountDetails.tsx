import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import TextInput from '@/flexternships/app/components/core/form/TextInput';
import UploadProfileAvatar from '@/flexternships/app/components/core/form/UploadProfileAvatar';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { FlexternClientAccountDetails } from '@/flexternships/constraints/types/user-profile-types';
import { FlexternClientAccountDetailsSchema } from '@/flexternships/schemas/user-profile-schemas';
import { useFlexternUserProfileStore } from '@/flexternships/stores/user-profile-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { isEmpty } from 'lodash';
import ChangePasswordModal from '@/flexternships/app/components/core/modals/ChangePasswordModal';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

export default function AccountDetails() {
  const populateClientInfoDetails = useFlexternUserProfileStore((state) => state.populateClientInfoDetails);
  const profileDetails = useFlexternUserProfileStore((state) => state.profileDetails);
  const isProfileDetailsLoading = useFlexternUserProfileStore((state) => state.isProfileDetailsLoading);
  const nextTab = useFlexternUserProfileStore((state) => state.nextTab);
  const upsertClientAccountInfo = useFlexternUserProfileStore((state) => state.upsertClientAccountInfo);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FlexternClientAccountDetails>({
    mode: 'onChange',
    resolver: yupResolver(FlexternClientAccountDetailsSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      imageUri: '',
    },
  });

  useEffect(() => {
    populateClientInfoDetails();
  }, [populateClientInfoDetails]);

  useEffect(() => {
    if (!isEmpty(profileDetails)) {
      reset({
        firstname: profileDetails.firstname,
        lastname: profileDetails.lastname,
        imageUri: profileDetails.imageUri,
      });
    }
  }, [profileDetails, reset]);

  if (isProfileDetailsLoading) {
    return (
      <div className="flex justify-center items-center min-h-32 w-full">
        <div className="size-10">
          <Spinner />
        </div>
      </div>
    );
  }

  const onContinue = async (data: FlexternClientAccountDetails) => {
    setIsSaveLoading(true);
    try {
      await upsertClientAccountInfo(data);
      nextTab();
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to save draft. Please try again.');
    }
    setIsSaveLoading(false);
  };

  return (
    <div>
      <div className="py-6 flex flex-col gap-6 bg-white rounded-md">
        <div className="px-6 pb-3 border-b-1 border-grey-border">Account Details</div>
        <div className="px-6 pt-6 pb-1">
          <Controller
            name="imageUri"
            control={control}
            render={({ field: { value, onChange } }) => <UploadProfileAvatar value={value} onChange={onChange} />}
          ></Controller>
        </div>
        <div className="pl-6 flex flex-wrap gap-x-6 gap-y-5">
          <Controller
            name="firstname"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[393px]"
                label="First Name"
                placeholder="Enter your first name"
                error={errors.firstname?.message}
                required
              />
            )}
          ></Controller>

          <Controller
            name="lastname"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[393px]"
                label="Last Name"
                placeholder="Enter your last name"
                error={errors.lastname?.message}
                required
              />
            )}
          ></Controller>
          <div className="flex flex-col">
            <div className="text-xs text-grey-500 leading-5 not-italic font-normal flex flex-row gap-0.5">
              Mobile Number
            </div>
            <div className="flex gap-x-3">
              <div className="px-3 mt-1 rounded-md min-w-[100px] flex items-center gap-x-2 border-1 border-solid border-trublue bg-gradient-to-t from-[rgba(153,193,230,0.10)] to-[rgba(153,193,230,0.10)]">
                <ReactCountryFlag className="rounded-md min-h-4" countryCode={userDetails.phoneCountry.code} svg />
                <span className="text-sm leading-5.5 font-normal text-grey-600 not-italic">
                  {userDetails.countryCode}
                </span>
              </div>
              <TextInput value={userDetails.phone} onChange={() => {}} className="w-[281px]" label="" readOnly />
            </div>
          </div>
          <TextInput
            value={userDetails.email}
            onChange={() => {}}
            className="w-[393px]"
            label="Email address"
            readOnly
          />
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <SecondaryButton onClick={() => setIsChangePasswordModalOpen(true)}>Change Password</SecondaryButton>
        <PrimaryButton onClick={handleSubmit(onContinue)} loading={isSaveLoading} disabled={!isValid}>
          Save & Continue
        </PrimaryButton>
      </div>
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} />
    </div>
  );
}
