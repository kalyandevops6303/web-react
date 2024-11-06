import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import TextInput from '@/flexternships/app/components/core/form/TextInput';
import UploadProfileAvatar from '@/flexternships/app/components/core/form/UploadProfileAvatar';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { CompanyStrength, FlexternClientCompanyDetails } from '@/flexternships/constraints/types/user-profile-types';
import { FlexternClientCompanyDetailsSchema } from '@/flexternships/schemas/user-profile-schemas';
import { useFlexternUserProfileStore } from '@/flexternships/stores/user-profile-store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';

import selectedRadio from '@/flexternships/assets/icons/radios/selectedRadio.svg';
import defaultRadio from '@/flexternships/assets/icons/radios/defaultRadio.svg';
import SingleSelectInput from '@/flexternships/app/components/core/form/SingleSelectInput';
import { isEmpty } from 'lodash';
import {
  fetchCitiesPaginatedByState,
  fetchCompanyIndustriesPaginated,
  fetchCountriesPaginated,
  fetchStatesPaginatedByCountry,
} from '@/flexternships/services/user-management';
import { City, State } from '@/flexternships/constraints/types/core-types';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

export default function CompanyDetails() {
  const populateClientOrgDetails = useFlexternUserProfileStore((state) => state.populateClientOrgDetails);
  const profileDetails = useFlexternUserProfileStore((state) => state.profileDetails);
  const isProfileDetailsLoading = useFlexternUserProfileStore((state) => state.isProfileDetailsLoading);
  const nextTab = useFlexternUserProfileStore((state) => state.nextTab);
  const previousTab = useFlexternUserProfileStore((state) => state.previousTab);
  const updateClientCompanyInfo = useFlexternUserProfileStore((state) => state.updateClientCompanyInfo);

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<FlexternClientCompanyDetails>({
    mode: 'onChange',
    resolver: yupResolver(FlexternClientCompanyDetailsSchema),
    defaultValues: {
      department: '',
      companyLogo: '',
      title: '',
      companyTagline: '',
      companyIndustry: undefined,
      companyStrength: undefined,
      officeAddress: {
        streetAddress: '',
        buildingNumber: '',
        zipCode: '',
        country: undefined,
        state: undefined,
        city: undefined,
      },
    },
  });

  useEffect(() => {
    populateClientOrgDetails();
  }, [populateClientOrgDetails]);

  useEffect(() => {
    if (!isEmpty(profileDetails)) {
      reset({
        department: profileDetails.department,
        companyLogo: profileDetails.companyLogo,
        title: profileDetails.title,
        companyTagline: profileDetails.companyTagline,
        companyIndustry: profileDetails.companyIndustry,
        companyStrength: profileDetails.companyStrength,
        officeAddress: profileDetails.officeAddress,
      });
    }
  }, [profileDetails, reset]);

  useEffect(() => {
    const resetGeoState = () => {
      setValue('officeAddress.state', {} as State);
    };
    // checking if the useEffect is not triggered by preloaded profileDetails
    if (watch('officeAddress.country')?._id !== profileDetails?.officeAddress?.country?._id) resetGeoState();
    // checking if the geostate is something else than preloaded profileDetails
    else if (watch('officeAddress.state')?._id !== profileDetails?.officeAddress?.state?._id) resetGeoState();
  }, [watch('officeAddress.country'), profileDetails]);

  useEffect(() => {
    const resetGeoCity = () => {
      setValue('officeAddress.city', {} as City);
    };
    // checking if the useEffect is not triggered by preloaded profileDetails
    if (watch('officeAddress.state')?._id !== profileDetails?.officeAddress?.state?._id) resetGeoCity();
    // checking if the geostate is something else than preloaded profileDetails
    else if (watch('officeAddress.city')?._id !== profileDetails?.officeAddress?.city?._id) resetGeoCity();
  }, [watch('officeAddress.state'), profileDetails]);

  const onContinue = async (data: FlexternClientCompanyDetails) => {
    setIsSaveLoading(true);
    try {
      await updateClientCompanyInfo(data);
      nextTab();
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to save draft. Please try again.');
    }
    setIsSaveLoading(false);
  };

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
      <div className="py-6 flex flex-col gap-6 bg-white rounded-md">
        <div className="px-6 pb-3 border-b-1 border-grey-border">About</div>
        <div className="px-6 pb-1">
          <Controller
            name="companyLogo"
            control={control}
            render={({ field: { value, onChange } }) => <UploadProfileAvatar value={value} onChange={onChange} />}
          ></Controller>
        </div>
        <div className="pl-6 flex flex-wrap gap-x-6 gap-y-5">
          <Controller
            name="department"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[393px]"
                label="Department Name"
                placeholder="Enter your department name"
                error={errors?.department?.message}
                required
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
                label="Title"
                placeholder="Enter your title"
                error={errors?.title?.message}
                required
              />
            )}
          ></Controller>

          <Controller
            name="companyTagline"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[393px]"
                label="Company Tagline"
                placeholder="Enter your company tagline in 60 characters"
                tooltip="This field can't exceed 60 characters"
                required
                error={errors?.companyTagline?.message}
              />
            )}
          ></Controller>

          <SingleSelectInput
            name={`companyIndustry`}
            control={control}
            pageSize={10}
            loadOptions={fetchCompanyIndustriesPaginated}
            className="w-[393px]"
            label="Company Industry"
            placeholder="Select your company industry"
            error={errors?.companyIndustry?.message}
            maxMenuHeight={220}
            required
          />
        </div>
        <div className="px-6">
          <div className="text-base font-medium text-grey-heading mb-4">
            What is the total strength of your company?
          </div>
          <Controller
            name="companyStrength"
            control={control}
            render={({ field: { value: currentValue, onChange } }) => (
              <div className="flex gap-x-8">
                {Object.entries(CompanyStrength)
                  .filter(([, value]) => !isNaN(Number(value)))
                  .map(([key, value]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value={value}
                        checked={value === currentValue}
                        onChange={() => onChange(value)}
                        className="hidden"
                      />
                      <span className="size-5 mr-2">
                        {value === currentValue ? (
                          <img src={selectedRadio} alt="selectedRadio" />
                        ) : (
                          <img src={defaultRadio} alt="defaultRadio" />
                        )}
                      </span>
                      <span className="text-sm text-grey font-normal not-italic leading-5.5">{key}</span>
                    </label>
                  ))}
              </div>
            )}
          />
        </div>
        <div className="pl-6 mt-4">
          <div className="text-base font-medium text-grey-heading mb-4">
            Office Address <span className="text-error">*</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-5">
            <Controller
              name="officeAddress.streetAddress"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  className="w-[393px]"
                  label="Street Address"
                  placeholder="Enter street address"
                  error={errors?.officeAddress?.streetAddress?.message}
                />
              )}
            ></Controller>

            <Controller
              name="officeAddress.buildingNumber"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  className="w-[181px]"
                  label="House Number"
                  placeholder="Enter house number"
                  error={errors?.officeAddress?.buildingNumber?.message}
                />
              )}
            ></Controller>

            <Controller
              name="officeAddress.zipCode"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  className="w-[181px]"
                  label="Zip Code"
                  placeholder="Enter zip code"
                  error={errors?.officeAddress?.zipCode?.message}
                />
              )}
            ></Controller>

            <SingleSelectInput
              name={`officeAddress.country`}
              control={control}
              pageSize={10}
              loadOptions={fetchCountriesPaginated}
              className="w-[393px]"
              label="Country"
              placeholder="Select your country"
              error={errors?.officeAddress?.country?.message}
              maxMenuHeight={220}
              required
            />

            <SingleSelectInput
              name={`officeAddress.state`}
              control={control}
              pageSize={10}
              loadOptions={async (page, pageSize, search) =>
                fetchStatesPaginatedByCountry(watch('officeAddress.country')._id, page, pageSize, search)
              }
              className="w-[393px]"
              label="State"
              placeholder="Select your state"
              error={errors?.officeAddress?.state?.message}
              maxMenuHeight={220}
              disabled={isEmpty(watch('officeAddress.country'))}
              key={watch('officeAddress.country')?._id}
              required
            />

            <SingleSelectInput
              name={`officeAddress.city`}
              control={control}
              pageSize={10}
              loadOptions={async (page, pageSize, search) =>
                fetchCitiesPaginatedByState(watch('officeAddress.state')._id, page, pageSize, search)
              }
              className="w-[393px]"
              label="City"
              placeholder="Select your city"
              error={errors?.officeAddress?.city?.message}
              maxMenuHeight={220}
              disabled={isEmpty(watch('officeAddress.state'))}
              key={watch('officeAddress.state')?._id}
              required
            />
          </div>
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
          <SecondaryButton onClick={nextTab} disabled={isDirty || isSaveLoading}>
            Skip
            <ChevronRight size={18} />
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit(onContinue)} disabled={!isValid} loading={isSaveLoading}>
            Save & Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
