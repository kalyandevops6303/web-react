import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton'
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText'
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton'
import TextInput from '@/flexternships/app/components/core/form/TextInput'
import { ChevronLeft, Plus } from 'react-feather'

export default function SocialDetails() {
    return (
        <div>
            <div className="py-6 flex flex-col bg-white rounded-md">
                <div className='px-6 pb-3 border-b-1 border-grey-border'>
                    Social Links
                </div>
                <div className='pl-6 flex flex-wrap gap-x-6 gap-y-5'>
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Linkedin"
                        placeholder="Enter your linkedin page link"
                    />
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Twitter"
                        placeholder="Enter Twitter link"
                    />
                    <TextInput
                        value={''}
                        onChange={() => { }}
                        className='w-[393px]'
                        label="Github"
                        placeholder="Enter Github link"
                    />
                </div>
                <div className='px-6'>
                    <PrimaryIconText text='Add Social Link' icon={<Plus size={12} />} onClick={() => { }} />
                </div>
            </div>
            <div className='flex justify-between'>
                <PrimaryIconText text='Back' icon={<ChevronLeft size={16} />} onClick={() => { }} />
                <div className='flex gap-5'>
                    <SecondaryButton text='Skip' onClick={() => { }} />
                    <PrimaryButton onClick={() => { }}>
                        Save & Continue
                    </PrimaryButton>
                </div>
            </div>

        </div>
    )
}
