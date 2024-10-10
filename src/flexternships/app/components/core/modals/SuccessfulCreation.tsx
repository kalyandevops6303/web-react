"use client"
import React, { useEffect, useState } from "react"
import { useProjectCreationStore } from "@flexternships/stores/project-creation-store"
import { ModalType } from "@flexternships/types/project-creation-types"
import CloseModalButton from "../buttons/CloseModalButton"
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"

export default function SuccessfulCreation(props: Props) {
  const { onRecall, onConfirm, recallTimeLeft } = props;
  const isOpen = useProjectCreationStore((state) => state.isModalOpen);
  const curModal = useProjectCreationStore((state) => state.curModal);
  const closeModal = useProjectCreationStore((state) => state.closeModal);

  const handleClose = () => {
    closeModal();
    // redirect
    window.location.href = "/dashboard";
  }

  return (isOpen && curModal === ModalType.PROJECT_CREATED) ? (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-6  shadow-lg">
          <CloseModalButton onClick={handleClose} />
          <div className="flex">
            <div className="height-full mr-[0.87rem] flex w-48 min-w-48 items-center justify-center">
              {/* Icon can be replaced with an actual icon */}
              <img
                src={"/assets/images/checklist.gif"}
                className=" w-full"
                width={100}
                height={100}
                alt="Drafts available icon"
              />
            </div>
            <div>
              <h2 className=" text-2xl font-medium text-grey-heading">Project Created Successfully</h2>
              <p className="my-4 text-lg text-grey">
                Your project listing will go live on your selected start date. Build your talent pool next.
              </p>
              <div className="mt-11 flex justify-end">
                {
                  recallTimeLeft>0 && (
                    <button onClick={onRecall} className="text-error mr-6" >
                      Oops Recall ({recallTimeLeft})
                    </button>
                  )
                }
                <PrimaryButton onClick={onConfirm}>
                  Invite Talent
                  </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  )
}

type Props = { 
  onRecall: () => void
  recallTimeLeft: number
  onConfirm: () => void
}