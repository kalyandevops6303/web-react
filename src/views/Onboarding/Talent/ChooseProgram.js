import React, { useState } from 'react'
import Header from '../Header'
import ProgramFlexternorProjectModal from '../../modals/ProgramFlexternOrProjectModal'

const ChooseProgram = () => {
  const [flexternOrProjectModal , setFlexternOrProjectModal] = useState(true);

  const toggleFlexternOrProjectModal = () => {
    setFlexternOrProjectModal(!flexternOrProjectModal);
  }
  return (
    <>
        <Header />
        <div className='px-5 py-3'>
            <div className='px-2'>

            </div>
        </div>
        <ProgramFlexternorProjectModal modal={flexternOrProjectModal} toggleModal={toggleFlexternOrProjectModal} />
    </>
  )
}

export default ChooseProgram