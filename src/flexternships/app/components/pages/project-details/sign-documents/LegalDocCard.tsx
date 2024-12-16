import { useState, useEffect } from 'react';
import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import Styles from '@flexternships/styles/pages/project-details/sign-document/sign-document.content.module.css';
import { Checkbox } from '@flexternships/app/components/ui/checkbox';
import { DocTypes } from '@/flexternships/constraints/enums/project-enums';
import { toLower, toUpper } from 'lodash';
import LegalDocSignee from './LegalDocSignee';
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { useLegalStore } from '@/flexternships/stores/legal-store';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useParams } from 'react-router-dom';
import Spinner from '../../../core/Spinner';
import { showToastMessage } from '@/flexternships/utils/core-utils';

export default function LegalDocCard(props: LegalDocCardProps) {
  const { docType } = props;

  const params = useParams();

  const legalDocDetails = useLegalStore((state) => state.legal?.details);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const currentUserDetails = useFlexternUserStore((state) => state.userDetails);

  const isSignDocumentLoading = useLegalStore((state) => state.legal?.isSignLegalDocumentLoading);
  const isLegalDetailsLoading = useLegalStore((state) => state.isLegalDetailsLoading);

  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const getLegalDocDetails = useLegalStore((state) => state.getLegalDocDetails);
  const signDocument = useLegalStore((state) => state.signDocument);

  const styles = {
    checkbox: {
      checked: 'shadow-[0px_2px_4px_0px_rgba(1,133,228,0.4)] bg-[#0185E4] text-white border-none rounded-[4px] h-5 w-5',
      unchecked: 'border border-2 border-gray-300 shadow-none rounded-[4px] h-5 w-5',
    },
  };

  const hasSigned = () => {
    const currentUserSignature = legalDocDetails?.signatures?.filter((signature: any) => {
      return signature.user_id === currentUserDetails?.id;
    });

    return currentUserSignature && currentUserSignature[0]?.is_signed;
  };

  const handleConfirmAgreement = () => {
    signDocument(params?.projectId, toUpper(docType), () => {
      const docTypeText = docType === toLower(DocTypes.NDA) ? 'NDA' : 'Contract';
      showToastMessage(ToastType.SUCCESS, `'${projectDetails?.details?.name}' ${docTypeText} signed by project member`);
    });
  };

  const [termsRead, setTermsRead] = useState(false);

  const talentSigneeData = legalDocDetails?.signatures?.map((signature: any) => {
    return {
      role: signature.role_name,
      name: `${signature.first_name} ${signature.last_name}`,
      image_uri: signature.image_uri,
      signed: signature.is_signed,
      signedDate: new Date(signature.signed_on),
      userType: UserType.TALENT,
      disabled: !termsRead || signature.user_id != currentUserDetails?.id,
      isCurrentUser: signature.user_id === currentUserDetails?.id,
      onClick: handleConfirmAgreement,
    };
  });

  useEffect(() => {
    populateUserDetails();
    if (!isSignDocumentLoading) {
      getProjectDetails(params?.projectId as string);
      getLegalDocDetails(params?.projectId as string, toUpper(params?.docType));
    }
  }, [isSignDocumentLoading]);

  return (
    <SimpleElevatedCard className="w-full max-w-[1021px] p-5 ">
      <div className={Styles.contentHeader}>Standard {docType === toLower(DocTypes.NDA) ? 'NDA' : 'Contract'}</div>
      {isLegalDetailsLoading ? (
        <div className="d-flex justify-center">
          <Spinner />
        </div>
      ) : (
        <SimpleElevatedCard className="bg-white p-5 ">
          <div className={Styles.contentHeader}>{docType === toLower(DocTypes.NDA) ? 'NDA' : 'Contract'}</div>
          <div
            dangerouslySetInnerHTML={{ __html: legalDocDetails?.doc_content }}
            className="text-[#5E5873] font-montserrat text-[16px] font-normal leading-[24px] max-h-[700px] overflow-y-scroll"
          ></div>
        </SimpleElevatedCard>
      )}

      <div className="flex items-center space-x-2 my-5">
        <Checkbox
          className={termsRead || hasSigned() ? styles.checkbox.checked : styles.checkbox.unchecked}
          id="terms"
          checked={termsRead || hasSigned()}
          onCheckedChange={() => setTermsRead(!termsRead)}
        />
        <label htmlFor="terms" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I have read Terms & Conditions
        </label>
      </div>

      {!isLegalDetailsLoading && (
        <div className="mt-10">
          <div className="text-[#6E6B7B] font-semibold font-montserrat text-base leading-[21px] mb-3">
            Team Member Name
          </div>
          {talentSigneeData?.map((item: any, index: number) => (
            <div className="my-5" key={index}>
              <LegalDocSignee {...item} key={item?.name} />
            </div>
          ))}
        </div>
      )}
    </SimpleElevatedCard>
  );
}

type LegalDocCardProps = {
  docType: string;
};
