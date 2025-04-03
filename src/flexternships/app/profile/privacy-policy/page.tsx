import { ArrowLeft } from 'react-feather';
import PrimaryIconText from '../../components/core/buttons/PrimaryIconText';
import { Button } from '@/components/ui/button';
import parse from 'html-react-parser';
import checkSVG from '@/flexternships/assets/svgs/legal/check.svg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/core/buttons/PrimaryButton';
import Header from '@/views/Onboarding/Header';
import { isUserLoggedIn } from '@/utility/commonUtils';
import { DocType, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { TnCLocationStateTypes } from '@/flexternships/constraints/types/core-types';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable, formatEpochToTimeInTimezone } from '@/flexternships/utils/date-utils';
import Navbar from '../../components/core/navbar';
import { useFlexternUserProfileStore } from '@/flexternships/stores/user-profile-store';
import { statusTextMap } from '@/flexternships/static/constants/core-constants';
import ComponentSpinner from '@/@core/components/spinner/Loading-spinner';
import { Spinner } from 'reactstrap';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

const PrivacyPolicy = () => {
  const location = useLocation();
  const locationState = location.state as TnCLocationStateTypes;
  const [tab, setTab] = useState<DocType>((locationState?.tncType as DocType) || DocType.PRIVACY_POLICY);
  const tncDetails = useFlexternUserProfileStore((state) => state.tncDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const isTnCLoading = useFlexternUserProfileStore((state) => state.isTnCDetailsLoading);
  const isAgreeToTnCLoading = useFlexternUserProfileStore((state) => state.isAgreeToTnCLoading);
  const fetchTnCDocuments = useFlexternUserProfileStore((state) => state.populateTnCDetails);
  const agreeToTnC = useFlexternUserProfileStore((state) => state.agreeToTnC);
  const generateInitialStateForIsAccepted = () =>
    tncDetails.reduce((acc, item) => {
      acc[item.doc_type as keyof typeof DocType] = item.accepted ?? false;
      return acc;
    }, {} as Record<keyof typeof DocType, boolean>);

  const generateInitialStateForAcceptedTime = () =>
    tncDetails.reduce((acc, item) => {
      acc[item.doc_type as keyof typeof DocType] = item.signed_at ?? 0;
      return acc;
    }, {} as Record<keyof typeof DocType, number>);

  const [tncAcceptTime, setTncAcceptTime] = useState(generateInitialStateForAcceptedTime());
  const [isTncAccepted, setIsTncAccepted] = useState(generateInitialStateForIsAccepted());
  const navigate = useNavigate();

  useEffect(() => {
    if (tncDetails && tncDetails.length > 0) {
      setTncAcceptTime(generateInitialStateForAcceptedTime());
      setIsTncAccepted(generateInitialStateForIsAccepted());
    } else {
      fetchTnCDocuments(null, true);
    }
  }, [tncDetails]);
  useEffect(() => {
    fetchTnCDocuments(null, true);
  }, []);

  const handleGoBack = () => {
    if (isUserLoggedIn()) {
      navigate('/dashboard');
    } else {
      navigate(`/auth/flextern/register?invitation_token=${locationState?.invitationToken}`);
    }
  };
  const handleAccept = async () => {
    try {
      await agreeToTnC(tab);
      showToastMessage(ToastType.SUCCESS, `${statusTextMap[tab]} accepted successfully.`);
      const updatedState = {
        ...isTncAccepted,
        [tab]: true,
      };
      setIsTncAccepted(updatedState);
      setTncAcceptTime((prev) => ({
        ...prev,
        [tab]: Date.now(),
      }));

      const allAccepted = Object.values(updatedState).every((value) => value);
      if (allAccepted) {
        if (isUserLoggedIn()) {
          await populateUserDetails(true);
          navigate(`/dashboard`);
        } else {
          navigate(`/auth/flextern/register?invitation_token=${locationState?.invitationToken}`);
        }
      } else {
        const nextTab = (Object.keys(updatedState) as DocType[]).find((key) => !updatedState[key]);
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

  return (
    <div>
      {isUserLoggedIn() ? <Navbar /> : <Header />}
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

          <div className="bg-white flex flex-row items-center gap-3 p-3 justify-center border border-trublue rounded-lg">
            {tncDetails?.map((item, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => setTab(item.doc_type as DocType)}
                  className={`${
                    tab === item.doc_type ? 'bg-trublue text-white' : 'bg-white text-gray-500'
                  } hover:bg-white hover:text-trublue hover:border hover:border-trublue flex flex-row items-center gap-2 rounded-lg px-4 py-2`}
                >
                  <img
                    src={checkSVG}
                    alt="check"
                    className={`w-4 h-4 ${isTncAccepted[item.doc_type] ? 'block' : 'hidden'}`}
                  />
                  {item.doc_title}
                </Button>
              );
            })}
          </div>

          <div className="p-5 w-full h-[65vh] overflow-y-scroll rounded-lg border-2 border-[#D8D6DE]">
            <p
              className="text-[16px] font-normal leading-[20px]
"
            >
              {parse(tncDetails?.find((item) => item.doc_type === tab)?.doc_content || '')}
            </p>
          </div>

          {!isUserLoggedIn() ? (
            locationState?.invitationToken && isTncAccepted[tab] ? (
              <h1>
                Agreed on <b>{getAgreedOnTime(tncAcceptTime[tab])}</b>
              </h1>
            ) : (
              <PrimaryButton onClick={handleAccept}>
                {isAgreeToTnCLoading ? <Spinner size="sm" /> : 'Accept and Continue'}
              </PrimaryButton>
            )
          ) : tncDetails.find((item) => item.doc_type === tab)?.signed_at ? (
            <h1>
              Agreed on <b>{getAgreedOnTime(tncDetails.find((item) => item.doc_type === tab)?.signed_at || 0)}</b>
            </h1>
          ) : (
            <PrimaryButton onClick={handleAccept}>
              {isAgreeToTnCLoading ? <Spinner size="sm" /> : 'Accept and Continue'}
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
