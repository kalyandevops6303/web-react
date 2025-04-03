import { useAppStore } from '@/flexternships/stores/core-stores';
import privacyGif from '@/flexternships/assets/gifs/privacymodal.gif';
import GenericModal from '../GenericModal';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import SecondaryButton from '../../buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFlexternUserProfileStore } from '@/flexternships/stores/user-profile-store';
import ComponentSpinner from '@/@core/components/spinner/Loading-spinner';

export default function PrivacyPolicyModal() {
  const modal = useAppStore((state) => state.modal);
  const closeGlobalModal = useAppStore((state) => state.closeModal);
  const navigate = useNavigate();
  const checkTnCStatus = useFlexternUserProfileStore((state) => state.checkTnCStatus);
  const tncDetails = useFlexternUserProfileStore((state) => state.tncDetails);
  const isTnCLoading = useFlexternUserProfileStore((state) => state.isTnCDetailsLoading);
  useEffect(() => {
    checkTnCStatus();
  }, []);

  const getUpdateTnCText = () => {
    return tncDetails
      ?.filter((item) => !item.accepted)
      .map((item) => item.doc_title)
      .join(' and ');
  };
  return (
    <GenericModal
      isOpen={modal === GlobalModalType.TERMS_AND_CONDITIONS}
      onClose={closeGlobalModal}
      className="max-w-[700px] min-h-[200px] h-fit"
    >
      {isTnCLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <ComponentSpinner className="mt-0" />
        </div>
      ) : (
        <div className="flex gap-x-7 pl-9 pr-8 py-10">
          <img className="w-40 h-40 object-cover" src={privacyGif} alt="blocked-gif" />
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-[28px]  font-medium leading-[30px]">Privacy policy and Terms of Service</h1>
            <p
              className="text-[18px] font-normal leading-[22px]
"
            >
              We have updated our <span className="font-bold">{getUpdateTnCText()}</span> please read and accept to
              continue.
            </p>
            <div className="flex flex-row items-center gap-5">
              {tncDetails
                ?.filter((item) => !item.accepted)
                .map((item, index) => {
                  return (
                    <SecondaryButton
                      key={index}
                      onClick={() => {
                        navigate('/privacy-policy', { state: { tncType: item.doc_type } });
                        closeGlobalModal();
                      }}
                      className="rounded-[6px] py-2.5 px-5"
                    >
                      {item.doc_title}
                    </SecondaryButton>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </GenericModal>
  );
}
