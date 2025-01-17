'use client';
import React, { useEffect, useState } from 'react';
import CloseModalButton from '../buttons/CloseModalButton';
import { DatePicker } from '../form/DatePicker';
import { dateToEpoch, getTodayDate } from '@/flexternships/utils/date-utils';
import { getUserTimezone } from '@/flexternships/utils/core-utils';
import PrimaryButton from '../buttons/PrimaryButton';

export default function RelistModal(props: RelistModalProps) {
  const { isOpen, onClose } = props;
  const [listImmediately, setListImmediately] = useState(false);
  const [inputs, setInputs] = useState<{
    duration: string;
    startDate: number;
    endDate: number;
  }>({
    duration: '',
    startDate: 0,
    endDate: 0,
  });
  const [customListing, setCustomListing] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  const handleListImmediatelyChange = () => {
    setListImmediately(true);
    setCustomListing(false);
    setInputs({ duration: '', startDate: 0, endDate: 0 });
  };

  const handleCustomListingChange = () => {
    setListImmediately(false);
    setCustomListing(true);
    setInputs({ duration: '', startDate: 0, endDate: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEstimatedStartDateChange = (newDate: number) => {
    if (newDate >= dateToEpoch(new Date(new Date().setHours(0, 0, 0, 0)))) {
      setInputs((prev) => ({ ...prev, startDate: newDate }));
    }
  };

  const handleEstimatedEndDateChange = (newDate: number) => {
    if (newDate >= dateToEpoch(new Date(new Date().setHours(0, 0, 0, 0)))) {
      setInputs((prev) => ({ ...prev, endDate: newDate }));
    }
  };

  useEffect(() => {
    if (listImmediately) {
      setInputs((prev) => ({
        ...prev,
        startDate: dateToEpoch(getTodayDate(getUserTimezone())),
        endDate: dateToEpoch(new Date(new Date().setDate(new Date().getDate() + parseInt(inputs.duration, 10)))),
      }));
    }
  }, [inputs?.duration]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-6 shadow-lg z-[100]">
        <CloseModalButton onClick={handleClose} />
        <div className="flex flex-col items-start gap-5">
          <h1 className="font-semibold text-xl">Add Listing Details</h1>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-row items-center gap-2">
              <input
                type="radio"
                name="listing"
                id="list-immediately"
                className="peer hidden"
                checked={listImmediately}
                onChange={handleListImmediatelyChange}
              />
              <label
                htmlFor="list-immediately"
                className="w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer peer-checked:bg-trublue peer-checked:border-trublue"
              ></label>
              <label htmlFor="list-immediately">List in marketplace immediately</label>
            </div>

            <div className="flex flex-row items-center gap-2">
              <h1>De-list After </h1>
              <input
                type="text"
                name="duration"
                placeholder="number of"
                value={inputs.duration}
                onChange={handleChange}
                disabled={!listImmediately}
                className={`${
                  listImmediately ? 'bg-white' : 'bg-gray-100'
                } p-3 text-black border border-grey-200 rounded-md`}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <input
                type="radio"
                name="listing"
                id="custom-listing"
                className="peer hidden"
                checked={customListing}
                onChange={handleCustomListingChange}
              />
              <label
                htmlFor="custom-listing"
                className="w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer peer-checked:bg-trublue peer-checked:border-trublue"
              ></label>
              <label htmlFor="custom-listing">Select custom listing duration</label>
            </div>

            <div className="flex flex-row items-center gap-5">
              <DatePicker
                value={inputs.startDate ?? 0}
                onChange={handleEstimatedStartDateChange}
                className="w-[272px]"
                label="Listing Start Date"
                placeholder="Enter start date"
                fromDate={getTodayDate(getUserTimezone())}
                timeZone={getUserTimezone()}
                required
                disabled={!customListing}
              />
              <DatePicker
                value={inputs.endDate ?? 0}
                onChange={handleEstimatedEndDateChange}
                className="w-[272px]"
                label="Listing End Date"
                placeholder="Enter end date"
                fromDate={inputs.startDate > 0 ? new Date(inputs.startDate) : undefined}
                timeZone={getUserTimezone()}
                required
                disabled={!customListing || inputs.startDate === 0}
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-3">
            <PrimaryButton
              onClick={() => {}}
              className="bg-white border-trublue-secondary-500 text-trublue-secondary-500 border"
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton onClick={() => {}}>Re-list</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}
