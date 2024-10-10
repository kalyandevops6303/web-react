"use client"
import React, { useState } from "react"
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"
import CloseModalButton from "../buttons/CloseModalButton"
import { ModalType } from "@flexternships/types/project-creation-types"
import { useProjectCreationStore } from "@flexternships/stores/project-creation-store"
import TickGif from "@flexternships/assets/images/tick.gif"

export default function DurationUpdated() {
  const isOpen = useProjectCreationStore((state) => state.isModalOpen);
  const curModal = useProjectCreationStore((state) => state.curModal);
  const closeModal = useProjectCreationStore((state) => state.closeModal);

  return (isOpen && curModal === ModalType.DURATION_UPDATED) ? (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="relative w-full min-w-[41.7rem] max-w-sm rounded-lg  bg-white pt-13 pr-8 pb-8 pl-10  shadow-lg">
          <CloseModalButton onClick={closeModal} />
          <div className="flex">
            <div className="height-full mr-10 flex min-w-30 w-30 items-center justify-center">
              {/* Icon can be replaced with an actual icon */}
              <img
                src={TickGif}
                className=" w-full"
                width={100}
                height={100}
                alt="Draft Saved icon"
              />
            </div>
            <div>
              <h2 className=" text-2xl font-medium text-grey-heading">Estimated Duration Updated</h2>
              <p className=" mb-6 mt-2 text-lg text-grey">
                We’ve updated estimated duration to match sum of milestone durations.
              </p>
              <p className=" text-xl font-medium text-grey-600">
                8 wk {/*update this to dynamic value*/}
              </p>
              <p className=" text-xs text-grey">
                Revised Estimated Duration (in weeks)
              </p>
              <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={closeModal} text="Close" />
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
