import { useEffect, useState } from 'react';
import { ChevronLeft } from 'react-feather';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import { DatePicker } from '@flexternships/app/components/core/form/DatePicker';
import TextInput from '@flexternships/app/components/core/form/TextInput';
import Tooltip from '@flexternships/app/components/core/Tooltip';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import {
  addDaysToEpoch,
  dateToEpoch,
  epochDifferenceInDays,
  epochToDate,
  getTodayDate,
} from '@flexternships/utils/date-utils';

import selectedRadioIcon from '@flexternships/assets/icons/radios/selectedRadio.svg';
import defaultRadioIcon from '@flexternships/assets/icons/radios/defaultRadio.svg';
import { TextInputType } from '@/flexternships/constraints/enums/form-enums';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { isEmpty } from 'lodash';
import { ListingChoice } from '@/flexternships/constraints/types/project-creation-types';
import { useParams } from 'react-router-dom';
import Toast from '../../../core/Toasts/Toast';
import { v4 as uuidv4 } from 'uuid';

export default function Listing() {
  const isSaveDraftLoading = useProjectCreationStore((state) => state.isSaveDraftLoading);
  const listingData = useProjectCreationStore((state) => state.data.listingDetails);
  const previousTab = useProjectCreationStore((state) => state.previousTab);
  const nextTab = useProjectCreationStore((state) => state.nextTab);
  const updateListingData = useProjectCreationStore((state) => state.updateListingData);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);

  const [listingChoice, setListingChoice] = useState<ListingChoice>(ListingChoice.IMMEDIATE);
  const [delistAfterForImmediate, setDelistAfterForImmediate] = useState<number>(30); // in days
  const [listingStartDateEpochForLater, setListingStartDateEpochForLater] = useState<number>(dateToEpoch(new Date())); // in epoch
  const [delistAfterForLater, setDelistAfterForLater] = useState<number>(30); // in days

  const { projectId } = useParams();

  const formatAndUpdateData = () => {
    let listingStartDate: number, listingEndDate: number;
    if (listingChoice === ListingChoice.IMMEDIATE) {
      listingStartDate = dateToEpoch(new Date());
      listingEndDate = addDaysToEpoch(listingStartDate, delistAfterForImmediate);
    } else {
      listingStartDate = dateToEpoch(new Date(listingStartDateEpochForLater));
      listingEndDate = addDaysToEpoch(listingStartDate, delistAfterForLater);
    }
    updateListingData(listingStartDate, listingEndDate);
  };

  const onContinue = () => {
    formatAndUpdateData();
    nextTab();
  };

  const handleStartDateChangeForLater = (selectedDateEpoch: number) => {
    if (selectedDateEpoch < dateToEpoch(new Date(new Date().setHours(0, 0, 0, 0)))) return;
    setListingStartDateEpochForLater(selectedDateEpoch);
  };

  const onSaveDraft = async () => {
    try {
      formatAndUpdateData();
      await saveAsDraft(projectId);
    } catch (error) {
      const toastId = uuidv4();
      showToastMessage(
        ToastType.ERROR,
        <Toast type={ToastType.ERROR} toastId={toastId} description="Failed to save draft. Please try again." />,
        toastId,
      );
    }
  };

  useEffect(() => {
    if (!isEmpty(listingData)) {
      setListingChoice(
        epochToDate(listingData.listingStartDate) <= getTodayDate() ? ListingChoice.IMMEDIATE : ListingChoice.LATER,
      );
      if (epochToDate(listingData.listingStartDate) <= getTodayDate()) {
        setDelistAfterForImmediate(epochDifferenceInDays(listingData.listingStartDate, listingData.listingEndDate));
      } else {
        setDelistAfterForLater(epochDifferenceInDays(listingData.listingStartDate, listingData.listingEndDate));
        setListingStartDateEpochForLater(listingData.listingStartDate);
      }
    }
  }, [listingData]);

  return (
    <>
      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>Project Listing Details</div>
        <div className={Styles.tabContentBody}>
          <div className="flex flex-col w-full gap-7 pt-6">
            <div className={Styles.listImmediatelyContainer} onClick={() => setListingChoice(ListingChoice.IMMEDIATE)}>
              <div className={Styles.listingRadio}>
                <img
                  src={listingChoice === ListingChoice.IMMEDIATE ? selectedRadioIcon : defaultRadioIcon}
                  alt={listingChoice === ListingChoice.IMMEDIATE ? 'selected' : 'default'}
                />
              </div>
              <div className={Styles.listingRadioContent}>
                <div className={Styles.listingRadioTitle}>
                  List immediately
                  <Tooltip content={'Your project will be posted immediately'} />
                </div>
                <div className={Styles.delistActionContainer}>
                  <span className={Styles.delistTextContainer}>De-list after</span>
                  <TextInput
                    value={delistAfterForImmediate}
                    onChange={(value) => {
                      let parsedValue;
                      if (typeof value === 'string') parsedValue = parseInt(value);
                      else parsedValue = value;
                      setDelistAfterForImmediate(parsedValue > 0 ? parsedValue : 1);
                    }}
                    type={TextInputType.NUMERIC}
                    label=""
                    className={Styles.delistAfterInput}
                  />
                  <span className={Styles.delistTextContainer}>Days</span>
                </div>
              </div>
            </div>
            <div className={Styles.listLaterContainer} onClick={() => setListingChoice(ListingChoice.LATER)}>
              <div className={Styles.listingRadio}>
                <img
                  src={listingChoice === ListingChoice.LATER ? selectedRadioIcon : defaultRadioIcon}
                  alt={listingChoice === ListingChoice.LATER ? 'selected' : 'default'}
                />
              </div>
              <div className={Styles.listingRadioContent}>
                <div className={Styles.listingRadioTitle}>
                  List later
                  <Tooltip content={'Your project will be posted on the listing start date'} />
                </div>
                <div className="flex flex-row items-end gap-10">
                  <DatePicker
                    value={listingStartDateEpochForLater}
                    onChange={(dateEpoch) => handleStartDateChangeForLater(dateEpoch)}
                    label="Listing Start Date"
                    placeholder="Select start date"
                    className={Styles.listingStartDate}
                    fromDate={getTodayDate()}
                    required
                  />
                  <div className={Styles.delistActionContainer}>
                    <span className={Styles.delistTextContainer}>De-list after</span>
                    <TextInput
                      value={delistAfterForLater}
                      onChange={(value) => {
                        let parsedValue;
                        if (typeof value === 'string') parsedValue = parseInt(value);
                        else parsedValue = value;
                        setDelistAfterForLater(parsedValue > 0 ? parsedValue : 1);
                      }}
                      type={TextInputType.NUMERIC}
                      label=""
                      className={Styles.delistAfterInput}
                    />
                    <span className={Styles.delistTextContainer}>Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.bottomActionsContainer}>
        {/* Make this a separate component */}
        <PrimaryIconText text="Back" icon={<ChevronLeft className="text-trublue" size={18} />} onClick={previousTab} />
        <div className={Styles.buttonsContainer}>
          <SecondaryButton className="mr-6" loading={isSaveDraftLoading} onClick={onSaveDraft}>
            Save as Draft
          </SecondaryButton>
          <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
        </div>
      </div>
    </>
  );
}
