import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton'
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton'
import TextInput from '@/flexternships/app/components/core/form/TextInput'
import UploadProfileAvatar from '@/flexternships/app/components/core/form/UploadProfileAvatar'

export default function CompanyDetails() {
    return (
        <div>
            <div className="py-6 flex flex-col gap-6 bg-white rounded-md">
                <div className='px-6 pb-3 border-b-1 border-grey-border'>
                    About
                </div>
                <div className='px-6 pb-1'>
                    <UploadProfileAvatar />
                </div>
                <div className='pl-6 flex flex-wrap gap-x-6 gap-y-5'>
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Department Name"
                        placeholder="Enter your department name"
                        required
                    />
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Title"
                        placeholder="Enter your title"
                        required
                    />
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Company Tagline"
                        placeholder="Enter your company tagline in 60 character."
                        tooltip="This field can't exceed 60 characters"
                        required
                    />
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Company Industry"
                        placeholder="Select your company industry"
                        required
                    />
                </div>
                <div className='px-6'>
                    Total Strength field
                </div>
                <div className='pl-6'>
                    <div>Office Address</div>
                    <div className='flex flex-wrap gap-x-6 gap-y-5'>
                        <TextInput
                            value={''}
                            onChange={() => { }}
                            className='w-[393px]'
                            label="Street Adress"
                            placeholder="Enter street address"
                        />
                        <TextInput
                            value={''}
                            onChange={() => { }}
                            className='w-[181px]'
                            label="House Number"
                            placeholder="Enter house number"
                        />
                        <TextInput
                            value={''}
                            onChange={() => { }}
                            className='w-[181px]'
                            label="Zip Code"
                            placeholder="Enter zip code"
                        />
                        <TextInput
                            value={''}
                            onChange={() => { }}
                            className='w-[393px]'
                            label="City"
                            placeholder="Select your city"
                            required
                        />
                        <TextInput
                            value={''}
                            onChange={() => { }}
                            className='w-[393px]'
                            label="State"
                            placeholder="Select your state"
                            required
                        />
                        <TextInput
                            value={''}
                            onChange={() => { }}
                            className='w-[393px]'
                            label="Country"
                            placeholder="Select your country"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-5'>
                <SecondaryButton text='Change Password' onClick={() => { }} />
                <PrimaryButton onClick={() => { }}>
                    Save & Continue
                </PrimaryButton>
            </div>

        </div>
    )
}
