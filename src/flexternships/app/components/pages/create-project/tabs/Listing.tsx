import { useState } from 'react';
import { ChevronLeft } from 'react-feather';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import { DatePicker } from '@flexternships/app/components/core/form/DatePicker';
import TextInput from '@flexternships/app/components/core/form/TextInput';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { addDaysToEpoch, dateToEpoch } from '@flexternships/utils/date-utils';

export default function Listing() {
  const previousTab = useProjectCreationStore((state) => (state.previousTab));
  const nextTab = useProjectCreationStore((state) => (state.nextTab));
  const updateListingData = useProjectCreationStore((state) => state.updateListingData);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);

  const [listingChoice, setListingChoice] = useState<"immediate" | "later">("immediate");
  const [delistAfterForImmediate, setDelistAfterForImmediate] = useState<number>(14); // in days
  const [listingStartDateEpochForLater, setListingStartDateEpochForLater] = useState<number>(dateToEpoch(new Date())); // in epoch
  const [delistAfterForLater, setDelistAfterForLater] = useState<number>(14); // in days

  const onContinue = () => {
    let listingStartDate: number, listingEndDate: number;
    if (listingChoice === "immediate") {
      listingStartDate = dateToEpoch(new Date());
      listingEndDate = addDaysToEpoch(listingStartDate, delistAfterForImmediate);;
    } else {
      listingStartDate = dateToEpoch(new Date(listingStartDateEpochForLater));
      listingEndDate = addDaysToEpoch(listingStartDate, delistAfterForLater);
    }
    updateListingData(listingStartDate, listingEndDate);
    console.log(listingStartDate, listingEndDate);
    nextTab();
  }

  return (
    <>
      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>
          Project Listing Details
        </div>
        <div className={Styles.tabContentBody}>
          <div className='flex flex-col w-full gap-7 pt-6'>
            <div className={Styles.listImmediatelyContainer} onClick={() => setListingChoice("immediate")}>
              <div className={Styles.listingRadio}>
                {
                  listingChoice === "immediate" ? (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <g filter="url(#filter0_d_6220_38284)">
                      <circle cx="13" cy="11" r="9" fill="#0185E4" />
                    </g>
                    <defs>
                      <filter id="filter0_d_6220_38284" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.00392157 0 0 0 0 0.521569 0 0 0 0 0.894118 0 0 0 0.4 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6220_38284" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6220_38284" result="shape" />
                      </filter>
                    </defs>
                  </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8.25" stroke="#D8D6DE" strokeWidth="1.5" />
                  </svg>)
                }

              </div>
              <div className={Styles.listingRadioContent}>
                <div className={Styles.listingRadioTitle}>
                  List immediately
                </div>
                <div className={Styles.delistActionContainer}>
                  <span className={Styles.delistTextContainer}>
                    De-list After
                  </span>
                  <TextInput
                    value={delistAfterForImmediate}
                    onChange={(e) => {
                      const parsedValue = parseInt(e.target.value);
                      setDelistAfterForImmediate(isNaN(parsedValue) ? 1 : parsedValue); // Set to 0 if NaN
                    }}
                    type='numeric'
                    label=''
                    className={Styles.delistAfterInput} />
                  <span className={Styles.delistTextContainer}>
                    Days
                  </span>
                </div>
              </div>
            </div>
            <div className={Styles.listLaterContainer} onClick={() => setListingChoice("later")}>
              <div className={Styles.listingRadio}>
                {
                  listingChoice === "later" ? (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <g filter="url(#filter0_d_6220_38284)">
                      <circle cx="13" cy="11" r="9" fill="#0185E4" />
                    </g>
                    <defs>
                      <filter id="filter0_d_6220_38284" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.00392157 0 0 0 0 0.521569 0 0 0 0 0.894118 0 0 0 0.4 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6220_38284" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6220_38284" result="shape" />
                      </filter>
                    </defs>
                  </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8.25" stroke="#D8D6DE" strokeWidth="1.5" />
                  </svg>)
                }
              </div>
              <div className={Styles.listingRadioContent}>
                <div className={Styles.listingRadioTitle}>
                  List later
                </div>
                <div className='flex flex-row items-end gap-10'>
                  <DatePicker value={listingStartDateEpochForLater} onChange={(dateEpoch) => (setListingStartDateEpochForLater(dateEpoch))} label='Listing Start Date' placeholder='Select start date' className={Styles.listingStartDate} required />
                  <div className={Styles.delistActionContainer}>
                    <span className={Styles.delistTextContainer}>
                      De-list After
                    </span>
                    <TextInput
                      value={delistAfterForLater}
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        setDelistAfterForLater(isNaN(parsedValue) ? 1 : parsedValue); // Set to 0 if NaN
                      }}
                      type='numeric'
                      label=''
                      className={Styles.delistAfterInput} />
                    <span className={Styles.delistTextContainer}>
                      Days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className={Styles.bottomActionsContainer}>
        {/* Make this a separate component */}
        <PrimaryIconText text='Back' icon={<ChevronLeft className='text-trublue' size={18} />} onClick={previousTab} />
        <div className={Styles.buttonsContainer}>
          <SecondaryButton className='mr-6' text='Save as Draft ' onClick={saveAsDraft} />
          <PrimaryButton onClick={onContinue}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
