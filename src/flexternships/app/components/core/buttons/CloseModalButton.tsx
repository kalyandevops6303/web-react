import React from 'react'
import { X } from 'react-feather';

function CloseModalButton({onClick}: CloseModalButtonProps) {
  return (
    <button onClick={onClick} className="absolute top-[-0.31rem] right-[-0.31rem] w-8.5 h-8.5 rounded-[0.375rem] bg-white hover:bg-gray-200 flex items-center justify-center shadow-lg">
      <X className="w-4 h-4 text-grey-500" />
    </button>
  )
}

export default CloseModalButton

type CloseModalButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // onClick handler with event type
}