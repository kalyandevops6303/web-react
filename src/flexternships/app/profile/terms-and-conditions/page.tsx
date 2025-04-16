import { ArrowLeft } from 'react-feather';
import PrimaryIconText from '../../components/core/buttons/PrimaryIconText';
import parse from 'html-react-parser';
import checkSVG from '@/flexternships/assets/svgs/legal/check.svg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/core/buttons/PrimaryButton';
import { isUserLoggedIn } from '@/utility/commonUtils';
import { DocType, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { TnCLocationStateTypes } from '@/flexternships/constraints/types/core-types';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable, formatEpochToTimeInTimezone } from '@/flexternships/utils/date-utils';
import Navbar from '../../components/core/navbar';
import { statusTextMap } from '@/flexternships/static/constants/core-constants';
import ComponentSpinner from '@/@core/components/spinner/Loading-spinner';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import routes from '@/flexternships/routes';
import RestrictedNavbar from '../../components/core/layouts/RestrictedNavbar';
import TabNavigation from '../../components/core/tab-navigation/TabNavigation';

const TermsAndConditions = () => {
  const location = useLocation();
  const locationState = location.state as TnCLocationStateTypes;
  const [tab, setTab] = useState<DocType>(locationState?.tncType ?? DocType.PRIVACY_POLICY);
  const tncDetails = useFlexternUserStore((state) => state.tncDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const isTnCLoading = useFlexternUserStore((state) => state.isTnCDetailsLoading);
  const isAgreeToTnCLoading = useFlexternUserStore((state) => state.isAgreeToTnCLoading);
  const fetchTnCDocuments = useFlexternUserStore((state) => state.populateTnCDetails);
  const agreeToTnC = useFlexternUserStore((state) => state.agreeToTnC);
  const generateInitialStateForAcceptedTime = () =>
    tncDetails.map((item) => {
      return {
        docType: item.doc_type,
        signedAt: item.signed_at,
      };
    });

  const [tncAcceptTime, setTncAcceptTime] = useState(generateInitialStateForAcceptedTime());

  const navigate = useNavigate();

  useEffect(() => {
    fetchTnCDocuments({ docType: null, docContentRequired: true });
    if (locationState?.tncAccepted && locationState?.tncAccepted.length > 0) {
      setTncAcceptTime((prev) =>
        prev.map((item) => {
          const match = locationState?.tncAccepted?.find((tncTab) => tncTab.docType === item.docType);
          return match ? { ...item, signedAt: match.acceptTime } : item;
        }),
      );
    } else if (tncDetails && tncDetails.length > 0) {
      setTncAcceptTime(generateInitialStateForAcceptedTime());
    }
  }, [locationState?.tncAccepted, tncDetails?.length === 0]);

  useEffect(() => {
    if (!location.state && !isUserLoggedIn()) {
      navigate(routes.auth.path);
    }
  }, []);

  const handleGoBack = () => {
    if (isUserLoggedIn()) {
      navigate(routes.dashboard.path);
    } else {
      const tncAcceptedPayload = tncAcceptTime.map((item) => {
        return {
          docType: item.docType,
          acceptTime: item.signedAt,
        };
      });
      navigate(routes.flexternRegister.generate(locationState?.invitationToken), {
        state: {
          ...locationState,
          tncAccepted: tncAcceptedPayload,
        },
      });
    }
  };

  const handleAccept = async () => {
    try {
      isUserLoggedIn() && (await agreeToTnC(tab));
      showToastMessage(ToastType.SUCCESS, `${statusTextMap[tab]} accepted successfully.`);

      const updatedAcceptTime = tncAcceptTime.map((item) =>
        item.docType === tab ? { ...item, signedAt: Date.now() } : item,
      );

      setTncAcceptTime(updatedAcceptTime);

      const allAccepted = updatedAcceptTime.every((item) => item.signedAt !== null);

      if (allAccepted) {
        if (isUserLoggedIn()) {
          await populateUserDetails(true);
          navigate(routes.dashboard.path);
        } else {
          const tncAcceptedPayload = updatedAcceptTime.map((item) => ({
            docType: item.docType,
            acceptTime: item.signedAt,
          }));

          navigate(routes.flexternRegister.generate(locationState?.invitationToken), {
            state: {
              ...locationState,
              tncAccepted: tncAcceptedPayload,
            },
          });
        }
      } else {
        const nextTab = updatedAcceptTime.find((item) => item.signedAt === null)?.docType;
        if (nextTab) {
          setTab(nextTab);
        } else {
          showToastMessage(ToastType.ERROR, 'Please accept all terms to continue.');
        }
      }
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Something went wrong. Please try again later.');
    }
  };

  const getAgreedOnTime = (timeStamp: number) => {
    if (timeStamp) {
      return `${formatEpochToTimeInTimezone(timeStamp)} ${formatEpochToHumanReadable(timeStamp)}`;
    }
  };
  const signedAt = isUserLoggedIn()
    ? tncDetails.find((item) => item.doc_type === tab)?.signed_at
    : locationState?.invitationToken && tncAcceptTime.find((item) => item.docType === tab)?.signedAt;
  return (
    <div>
      {isUserLoggedIn() ? <Navbar /> : <RestrictedNavbar />}
      {isTnCLoading ? (
        <div>
          <ComponentSpinner className="mt-0" />
        </div>
      ) : (
        <div className="flex flex-col px-10 py-5 items-start gap-5">
          <PrimaryIconText
            className="bg-inherit"
            text="Back"
            icon={<ArrowLeft color="#0065c1" size={16} />}
            onClick={handleGoBack}
          />

          <TabNavigation
            data={tncDetails}
            selectedValue={tab}
            onSelect={(value) => setTab(value as DocType)}
            getLabel={(item) => item.doc_title}
            getValue={(item) => item.doc_type}
            showIcon={(item) => tncAcceptTime.find((doc) => doc.docType === item.doc_type)?.signedAt !== null}
            iconSrc={checkSVG}
          />

          <div className="p-5 w-full h-[65vh] overflow-y-scroll rounded-lg border-2 border-[#D8D6DE]">
            <p className="text-[16px] font-normal leading-[20px]">
              {parse(tncDetails?.find((item) => item.doc_type === tab)?.doc_content || '')}
            </p>
          </div>

          {signedAt ? (
            <h1>
              Agreed on <b>{getAgreedOnTime(signedAt || 0)}</b>
            </h1>
          ) : (
            <PrimaryButton onClick={handleAccept}>
              {isAgreeToTnCLoading ? <Spinner className="size-10" /> : 'Accept and Continue'}
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  );
};

export default TermsAndConditions;
