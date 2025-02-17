import { useState } from 'react';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import CalendarCheckGif from '@flexternships/assets/gifs/calendar-check.gif';
import { DatePicker } from '../../form/DatePicker';
import { getUserTimezone, showToastMessage } from '@/flexternships/utils/core-utils';
import { getTodayDate } from '@/flexternships/utils/date-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

export default function RelistProjectInputModal(props: RelistProjectInputModalProps) {
  const { onClose, isOpen, onConfirm, startDate, onStartDateChange } = props;

  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    if (!startDate) return;
    setIsConfirmLoading(true);
    try {
      await onConfirm();
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Failed to re-list project');
    } finally {
      setIsConfirmLoading(false);
    }
  };

  return (
    <GenericModal className="max-w-[670px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-12 px-12 pt-12 pb-7">
        <div className="flex flex-col justify-center items-center">
          <img className="size-36" src={CalendarCheckGif} alt="confirm-action" />
        </div>
        <div className="flex flex-col grow gap-y-10">
          <div className="flex flex-col gap-y-6">
            <div className="text-2xl font-medium text-grey-heading not-italic">
              When would you like the project to start?
            </div>
            <div>
              <DatePicker
                className="w-[386px]"
                placeholder="Select a start date"
                value={startDate || 0}
                onChange={onStartDateChange}
                fromDate={getTodayDate(getUserTimezone())}
                timeZone={getUserTimezone()}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0" onClick={onClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              className="m-0"
              onClick={handleConfirm}
              loading={isConfirmLoading}
              disabled={!startDate || isConfirmLoading}
            >
              Re-list
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

interface RelistProjectInputModalProps {
  onClose: () => void;
  isOpen?: boolean;
  onConfirm: () => Promise<void>;
  startDate?: number;
  onStartDateChange: (date: number) => void;
}
