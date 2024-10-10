"use client"
import React, { useState } from "react"
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"
import CloseModalButton from "../buttons/CloseModalButton"

export default function SaveForLaterModal() {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    isOpen && (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-6  shadow-lg">
            <CloseModalButton onClick={() => setIsOpen(false)} />
            <div className="flex">
              <div className="height-full mr-[1.44rem] flex min-w-48 w-48 items-center justify-center">
                {/* Icon can be replaced with an actual icon */}
                <img
                  src={"/assets/images/saved.gif"}
                  className=" w-full"
                  width={100}
                  height={100}
                  alt="Save for later icon"
                />
              </div>
              <div>
                <h2 className=" text-2xl font-medium text-grey-heading">Save For Later</h2>
                <p className="mt-2 text-lg text-grey">You have unsaved work. Do you want to save it as a draft?</p>
                <div className="mt-17 flex justify-end">
                  <SecondaryButton onClick={() => setIsOpen(false)} cancel={true} className=" mr-6" text="Discard" />
                  <PrimaryButton onClick={() => setIsOpen(false)}>Save as Draft</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}
