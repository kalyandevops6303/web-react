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
import { FlexternUserCheckpoint, ToastType } from '@/flexternships/constraints/enums/core-enums';
import SingleSelectInput from '@/flexternships/app/components/core/form/SingleSelectInput';
import { fetchTimezonesPaginated } from '@/flexternships/services/user-management';
import { useNavigate } from 'react-router-dom';
import ClientOnboardingSuccessModal from '@/flexternships/app/components/core/modals/ClientOnboardingSuccessModal';

export default function AccountDetails() {
  const profileDetails = useFlexternUserProfileStore((state) => state.profileDetails);
  const isProfileDetailsLoading = useFlexternUserProfileStore((state) => state.isProfileDetailsLoading);
  const upsertClientAccountInfo = useFlexternUserProfileStore((state) => state.upsertClientAccountInfo);
  const populateClientInfoDetails = useFlexternUserProfileStore((state) => state.populateClientInfoDetails);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FlexternClientAccountDetails>({
    mode: 'onChange',
    resolver: yupResolver(FlexternClientAccountDetailsSchema),
    defaultValues: {},
  });

  useEffect(() => {
    populateClientInfoDetails();
  }, [populateClientInfoDetails]);

  useEffect(() => {
    if (!isEmpty(profileDetails)) {
      reset({
        firstname: profileDetails.firstname,
        lastname: profileDetails.lastname,
        timezone: profileDetails.timezone,
        imageUri: profileDetails.imageUri,
        linkedin: profileDetails.linkedin,
        title: profileDetails.title,
        department: profileDetails.department,
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

  const showSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleNext = () => {
    if (userDetails.checkpoint !== FlexternUserCheckpoint.COMPLETE) {
      showSuccessModal();
    } else {
      navigate('/dashboard');
    }
  };

  const onContinue = async (data: FlexternClientAccountDetails) => {
    setIsSaveLoading(true);
    try {
      await upsertClientAccountInfo(data);
      handleNext();
    } catch (error: unknown) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'Failed to save account details. Please try again.',
      );
    }
    setIsSaveLoading(false);
  };

  return (
    <div>
      <div className="py-6 flex flex-col gap-6 bg-white rounded-md">
        <div className="px-6 pb-3 text-grey-heading text-lg font-medium leading-[26px] border-b-1 border-grey-border">
          Account Details
        </div>
        {/* Profile Avatar Input */}
        <div className="px-6 pb-1">
          <Controller
            name="imageUri"
            control={control}
            render={({ field: { value, onChange } }) => <UploadProfileAvatar value={value} onChange={onChange} />}
          ></Controller>
        </div>
        {/* Contains all the core inputs */}
        <div className="pl-6 flex flex-wrap gap-x-6 gap-y-8">
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

          <SingleSelectInput
            name={`timezone`}
            control={control}
            pageSize={10}
            loadOptions={fetchTimezonesPaginated}
            className="w-[393px]"
            label="Preferred Time Zone"
            placeholder="Select preferred time zone"
            error={errors?.timezone?.message}
            maxMenuHeight={220}
            required
          />

          <Controller
            name="linkedin"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value ?? ''}
                onChange={onChange}
                className="w-[393px]"
                label="Linkedin"
                placeholder="Enter your profile URL"
                error={errors.linkedin?.message}
              />
            )}
          ></Controller>

          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[393px]"
                label="Designation"
                placeholder="Enter your designation"
                error={errors.title?.message}
                required
              />
            )}
          ></Controller>

          <Controller
            name="department"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[393px]"
                label="Department Name"
                placeholder="Enter your department"
                error={errors.department?.message}
                required
              />
            )}
          ></Controller>

          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-grey-500 leading-5 not-italic font-normal">Mobile Number</div>
            <div className="flex gap-x-3">
              <div className="px-3 rounded-md min-w-[100px] flex items-center gap-x-2 border-1 border-solid border-trublue bg-gradient-to-t from-[rgba(153,193,230,0.10)] to-[rgba(153,193,230,0.10)]">
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
      {/* Actions */}
      <div className="flex justify-end gap-5">
        <SecondaryButton onClick={() => setIsChangePasswordModalOpen(true)}>Change Password</SecondaryButton>
        <PrimaryButton onClick={handleSubmit(onContinue)} loading={isSaveLoading} disabled={!isValid || isSaveLoading}>
          Save & Continue
        </PrimaryButton>
      </div>
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} />
      <ClientOnboardingSuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
    </div>
  );
}
