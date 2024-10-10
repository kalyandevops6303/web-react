import React from 'react'

function CloseModalButton({onClick}: CloseModalButtonProps) {
  return (
    <button onClick={onClick} className="absolute top-[-0.31rem] right-[-0.31rem] w-8.5 h-8.5 rounded-[0.375rem] bg-white hover:bg-gray-200 flex items-center justify-center shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 8.586L15.293 3.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd" />
      </svg>
    </button>
  )
}

export default CloseModalButton

type CloseModalButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // onClick handler with event type
}