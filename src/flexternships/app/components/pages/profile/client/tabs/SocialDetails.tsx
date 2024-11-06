import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import TextInput from '@/flexternships/app/components/core/form/TextInput';
import ClientOnboardingSuccessModal from '@/flexternships/app/components/core/modals/ClientOnboardingSuccessModal';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { FlexternUserCheckpoint, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { FlexternClientCompanySocialDetails } from '@/flexternships/constraints/types/user-profile-types';
import { FlexternClientCompanySocialDetailsSchema } from '@/flexternships/schemas/user-profile-schemas';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useFlexternUserProfileStore } from '@/flexternships/stores/user-profile-store';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'react-feather';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SocialDetails() {
  // user profile stores
  const previousTab = useFlexternUserProfileStore((state) => state.previousTab);
  const profileDetails = useFlexternUserProfileStore((state) => state.profileDetails);
  const isProfileDetailsLoading = useFlexternUserProfileStore((state) => state.isProfileDetailsLoading);
  const updateClientCompanyInfo = useFlexternUserProfileStore((state) => state.updateClientCompanyInfo);

  // user details stores
  const userDetails = useFlexternUserStore((state) => state.userDetails);

  // native react states
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // react router
  const navigate = useNavigate();

  const defaultPlatforms = ['linkedin', 'twitter', 'github'];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FlexternClientCompanySocialDetails>({
    mode: 'onChange',
    resolver: yupResolver(FlexternClientCompanySocialDetailsSchema),
    defaultValues: {
      socialLinks: defaultPlatforms.map((platform) => ({
        platform,
        url: '',
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const showSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const handleNext = () => {
    if (userDetails.checkpoint === FlexternUserCheckpoint.ACCOUNT_DETAILS) {
      showSuccessModal();
    } else {
      navigate('/dashboard');
    }
  };
  const onContinue = async (data: FlexternClientCompanySocialDetails) => {
    setIsSaveLoading(true);
    try {
      await updateClientCompanyInfo(data);
      handleNext();
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to save draft. Please try again.');
    }
    setIsSaveLoading(false);
  };

  const addSocialLink = () => {
    append({ platform: '', url: '' });
  };

  useEffect(() => {
    if (!isEmpty(profileDetails.socialLinks)) {
      reset({
        socialLinks: profileDetails.socialLinks,
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

  return (
    <div>
      <div className="py-6 flex flex-col bg-white rounded-md">
        <div className="px-6 pb-3 border-b-1 border-grey-border">Social Links</div>
        <div className="pl-6 flex flex-wrap py-5 gap-x-6 gap-y-5">
          {fields.map((field, index) => {
            if (defaultPlatforms.includes(field.platform)) {
              return (
                <Controller
                  key={field.id}
                  name={`socialLinks.${index}.url`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      value={value}
                      onChange={onChange}
                      className="w-[393px]"
                      label={field.platform.charAt(0).toUpperCase() + field.platform.slice(1)}
                      placeholder={`Enter ${field.platform} link`}
                      error={errors?.socialLinks?.[index]?.url?.message}
                    />
                  )}
                />
              );
            } else {
              return (
                <div className="flex flex-row flex-wrap gap-x-6">
                  <Controller
                    key={field.id}
                    name={`socialLinks.${index}.platform`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextInput
                        value={value}
                        onChange={onChange}
                        className="w-[350px]"
                        label={`Site-${index - defaultPlatforms.length + 1} Description`}
                        placeholder={`Enter site description`}
                        error={errors?.socialLinks?.[index]?.platform?.message}
                        required
                      />
                    )}
                  />
                  <Controller
                    key={field.id}
                    name={`socialLinks.${index}.url`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextInput
                        value={value}
                        onChange={onChange}
                        className="w-[350px]"
                        label={`Site-${index - defaultPlatforms.length + 1} Url`}
                        placeholder={`Enter site url`}
                        error={errors?.socialLinks?.[index]?.url?.message}
                      />
                    )}
                  />
                  <div className="flex items-center text-error cursor-pointer mt-4" onClick={() => remove(index)}>
                    <Trash2 size={18} />
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="px-6">
          <PrimaryIconText text="Add Social Link" icon={<Plus size={12} />} onClick={addSocialLink} />
        </div>
      </div>
      <div className="flex justify-between">
        <PrimaryIconText
          text="Back"
          icon={<ChevronLeft size={16} />}
          onClick={isDirty || isSaveLoading ? () => {} : previousTab}
          className={`${isDirty || isSaveLoading ? 'opacity-30 cursor-default' : ''}`}
        />
        <div className="flex gap-5">
          <SecondaryButton onClick={handleNext} disabled={isDirty || isSaveLoading}>
            Skip
            <ChevronRight size={18} />
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit(onContinue)} disabled={!isValid} loading={isSaveLoading}>
            Save & Continue
          </PrimaryButton>
        </div>
      </div>
      <ClientOnboardingSuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  );
}
