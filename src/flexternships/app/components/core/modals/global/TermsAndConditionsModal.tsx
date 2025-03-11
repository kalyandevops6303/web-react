import { useAppStore, useFlexternUserStore } from '@/flexternships/stores/core-stores';
import PrimaryButton from '../../buttons/PrimaryButton';
import GenericModal from '../GenericModal';
import { DocType, GlobalModalType, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { useEffect, useState } from 'react';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import useLogout from '@/utility/hooks/useLogout';
import SecondaryButton from '../../buttons/SecondaryButton';
import { tncModalContent } from '@/flexternships/static/content/core-content';
import { acceptsTermsAndConditions, getDocumentSignStatus } from '@/flexternships/services/user-management';
import Spinner from '../../Spinner';
import parse from 'html-react-parser';

export default function TermsAndConditionsModal() {
  const modal = useAppStore((state) => state.modal);
  const closeGlobalModal = useAppStore((state) => state.closeModal);

  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const [isTncLoading, setIsTncLoading] = useState(false);
  const [tncDoc, setTncDoc] = useState<{ docId: string; docType: string; docContent: string } | null>(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const { handleLogout } = useLogout();
  useEffect(() => {
    const fetchTncDoc = async () => {
      setIsTncLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds TODO: Remove this
        const doc = await getDocumentSignStatus(DocType.TERMS_AND_CONDITIONS);
        if (!doc) throw new Error('Terms and conditions document not found');
        setTncDoc(doc);
      } catch (error: unknown) {
        showToastMessage(ToastType.ERROR, 'An unexpected error occurred while fetching terms and conditions document');
      } finally {
        setIsTncLoading(false);
      }
    };
    fetchTncDoc();
  }, []);

  const handleCancel = async () => {
    setIsCancelLoading(true);
    try {
      await handleLogout({ suppressToast: true });
      showToastMessage(ToastType.SUCCESS, 'Logged out successfully');
    } catch (error: unknown) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while logging out',
      );
    } finally {
      setIsCancelLoading(false);
    }
  };

  const handleConfirm = async () => {
    setIsConfirmLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds TODO: Remove this

      if (!tncDoc) throw new Error('Terms and conditions document not found');
      await acceptsTermsAndConditions(tncDoc.docId, tncDoc.docType);
      populateUserDetails(true);
      closeGlobalModal();
    } finally {
      setIsConfirmLoading(false);
    }
  };

  return (
    <GenericModal isOpen={modal === GlobalModalType.TERMS_AND_CONDITIONS} className="max-w-[800px]">
      <div className="flex gap-x-12 pl-9 pr-8 py-10">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-medium text-grey-heading">{tncModalContent.title}</h1>
            <div className="text-lg font-normal leading-6 text-grey">{tncModalContent.description}</div>
          </div>
          <div>
            {isTncLoading ? (
              <div className="flex justify-center items-center">
                <Spinner className="size-10" />
              </div>
            ) : tncDoc ? (
              <div
                className="max-h-[400px] overflow-y-auto p-4 border border-grey-border rounded-md 
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-grey-light 
                    [&::-webkit-scrollbar-thumb]:bg-grey-muted
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-grey
                    transition-colors"
              >
                {parse(tncDoc.docContent)}
              </div>
            ) : (
              <div>Error fetching terms and conditions document</div>
            )}
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton
              className="m-0"
              onClick={handleCancel}
              loading={isCancelLoading}
              disabled={isCancelLoading || isConfirmLoading}
              cancel
            >
              {tncModalContent.cancelButtonText}
            </SecondaryButton>
            <PrimaryButton
              className="m-0"
              onClick={handleConfirm}
              loading={isConfirmLoading}
              disabled={isConfirmLoading || isCancelLoading || isTncLoading}
            >
              {tncModalContent.confirmButtonText}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
