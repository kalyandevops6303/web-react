import React from 'react'
import SecondaryButton from '../buttons/SecondaryButton'
import { UserPlus } from 'react-feather'
import Tooltip from '../Tooltip'
import PrimaryButton from '../buttons/PrimaryButton'

export default function UploadProfileAvatar() {
    return (
        <div className='flex gap-4'>
            <div className='h-[100px] w-[100px] rounded-full bg-white-fa'>
                <div className='flex items-center justify-center h-full w-full rounded-full text-grey-muted'>
                    <UserPlus size={32} />
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <PrimaryButton onClick={() => { }}>
                    Upload Picture
                </PrimaryButton>
                <Tooltip content='Allowed file types: png, jpg, jpeg' />
            </div>
        </div>
    )
}