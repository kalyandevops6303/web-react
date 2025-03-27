import { ArrowLeft } from 'react-feather';
import PrimaryIconText from '../../components/core/buttons/PrimaryIconText';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/core/buttons/PrimaryButton';
import Header from '@/views/Onboarding/Header';
import { isUserLoggedIn } from '@/utility/commonUtils';
import { TnCTypes, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { TnCLocationStateTypes } from '@/flexternships/constraints/types/core-types';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable, formatEpochToTimeInTimezone } from '@/flexternships/utils/date-utils';
import Navbar from '../../components/core/navbar';

const PrivacyPolicy = () => {
  const location = useLocation();
  const locationState = location.state as TnCLocationStateTypes;
  const [tab, setTab] = useState<keyof typeof isTncAccepted>(
    (locationState?.tncType as unknown as keyof typeof isTncAccepted) || TnCTypes.PRIVACY_POLICY,
  );
  const [tncAcceptTime, setTncAcceptTime] = useState({
    PRIVACY_POLICY: 0,
    USER_TERMS: 0,
  });
  const [isTncAccepted, setIsTncAccepted] = useState({
    PRIVACY_POLICY: false,
    USER_TERMS: false,
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (isUserLoggedIn()) {
      navigate('/dashboard');
    } else {
      navigate(`/auth/flextern/register?invitation_token=${locationState?.invitationToken}`);
    }
  };
  const handleAccept = () => {
    if (!isUserLoggedIn() && locationState?.invitationToken) {
      setIsTncAccepted((prev) => {
        const updatedState = {
          ...prev,
          [tab]: true,
        };
        setTncAcceptTime((prev) => ({
          ...prev,
          [tab]: Date.now(),
        }));
        if (tab === TnCTypes.PRIVACY_POLICY) {
          setTab(TnCTypes.USER_TERMS);
        } else if (updatedState.PRIVACY_POLICY && updatedState.USER_TERMS) {
          navigate(`/auth/flextern/register?invitation_token=${locationState?.invitationToken}`, {
            state: { tncAccepted: true },
          });
        } else {
          showToastMessage(ToastType.ERROR, 'Please accept privacy policy and user terms to continue.');
          setTab(TnCTypes.PRIVACY_POLICY);
        }

        return updatedState;
      });
    } else {
      showToastMessage(ToastType.ERROR, 'Something went wrong. Please try again later.');
    }
  };

  const getAgreedOnTime = () => {
    if (tab === TnCTypes.PRIVACY_POLICY) {
      return `${formatEpochToTimeInTimezone(tncAcceptTime?.PRIVACY_POLICY)} ${formatEpochToHumanReadable(
        tncAcceptTime?.PRIVACY_POLICY,
      )}`;
    } else {
      return `${formatEpochToTimeInTimezone(tncAcceptTime?.USER_TERMS)} ${formatEpochToHumanReadable(
        tncAcceptTime?.USER_TERMS,
      )}`;
    }
  };

  return (
    <div>
      {isUserLoggedIn() ? <Navbar /> : <Header />}
      <div className="flex flex-col px-10 py-5 items-start gap-5">
        <PrimaryIconText
          className="bg-inherit"
          text="Back"
          icon={<ArrowLeft color="#0065c1" size={16} />}
          onClick={handleGoBack}
        />

        <div className="bg-white flex flex-row items-center gap-3 p-3 justify-center border border-trublue rounded-lg">
          <Button
            onClick={() => setTab(TnCTypes.PRIVACY_POLICY)}
            className={`${
              tab === TnCTypes.PRIVACY_POLICY ? 'bg-trublue text-white' : 'bg-white text-gray-500'
            } hover:bg-white hover:text-trublue hover:border hover:border-trublue`}
          >
            Privacy Policy
          </Button>
          <Button
            onClick={() => setTab(TnCTypes.USER_TERMS)}
            className={`${
              tab === TnCTypes.USER_TERMS ? 'bg-trublue text-white' : 'bg-white text-gray-500'
            } hover:bg-white hover:text-trublue hover:border hover:border-trublue`}
          >
            User terms of service
          </Button>
        </div>

        <div className="p-5 w-full rounded-lg border-2 border-[#D8D6DE]">
          <p
            className="text-[16px] font-normal leading-[20px]
"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic fuga quasi, tempore pariatur numquam ipsum
            exercitationem ut sit quibusdam, aspernatur at, facere error distinctio et consequatur inventore officiis
            libero nihil modi veritatis enim id aut ex perferendis? Adipisci quae animi nemo possimus aperiam, fugit id
            voluptatum debitis aspernatur ea, voluptas ducimus, unde quaerat doloribus. Non labore alias asperiores ex,
            repellat atque iste ratione quis aliquid corporis placeat aliquam ea aspernatur, obcaecati veniam quidem
            molestias facilis velit quam accusamus! Illo aliquam id praesentium, cumque, excepturi iusto voluptates amet
            eligendi optio est laudantium temporibus, quae deleniti consequuntur repellat voluptas eius quibusdam
            placeat.
          </p>
        </div>

        {locationState?.invitationToken &&
          (isTncAccepted[tab] ? (
            <h1>Agreed on {getAgreedOnTime()}</h1>
          ) : (
            <PrimaryButton onClick={handleAccept}>Accept and Continue</PrimaryButton>
          ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
