import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton'
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton'
import TextInput from '@/flexternships/app/components/core/form/TextInput'
import UploadProfileAvatar from '@/flexternships/app/components/core/form/UploadProfileAvatar'

export default function AccountDetails() {
    return (
        <div>
            <div className="py-6 flex flex-col gap-6 bg-white rounded-md">
                <div className='px-6 pb-3 border-b-1 border-grey-border'>
                    Account Details
                </div>
                <div className='px-6 pt-6 pb-1'>
                    <UploadProfileAvatar />
                </div>
                <div className='pl-6 flex flex-wrap gap-x-6 gap-y-5'>
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="First Name"
                        placeholder="Enter your first name"
                        required
                    />
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Last Name"
                        placeholder="Enter your last name"
                        required
                    />
                    <div className='flex items-end gap-x-6 gap-y-5'>
                        <TextInput
                            value={'+91'}
                            onChange={() => { }}
                            className='w-[100px]'
                            label="Mobile number"
                            placeholder="Enter your first name"
                            readOnly
                        />
                        <TextInput
                            value={'3369855421'}
                            onChange={() => { }}
                            className='w-[281px]'
                            label=""
                            readOnly
                        />
                    </div>
                    <TextInput
                        value={'johndoe@gmail.com'}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Email address"
                        readOnly
                    />
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
