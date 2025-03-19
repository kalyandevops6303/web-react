import { ArrowLeft, Home } from 'react-feather';
import RestrictedNavbar from '../../components/core/layouts/RestrictedNavbar';
import TabNavigationForm from '../../components/pages/profile/client/TabNavigationForm';
import AccountDetails from '../../components/pages/profile/client/tabs/AccountDetails';
// import CompanyDetails from '../../components/pages/profile/client/tabs/CompanyDetails';
// import SocialDetails from '../../components/pages/profile/client/tabs/SocialDetails';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { FlexternUserCheckpoint } from '@/flexternships/constraints/enums/core-enums';
import { useNavigate, useParams } from 'react-router-dom';
import { useFlexternUserProfileStore } from '@/flexternships/stores/user-profile-store';
import { useEffect } from 'react';
import PrimaryIconText from '../../components/core/buttons/PrimaryIconText';
import routes from '@/flexternships/routes';

export default function ClientProfilePage() {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const setCurrentTabIndex = useFlexternUserProfileStore((state) => state.setCurrentTabIndex);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails?.checkpoint === FlexternUserCheckpoint.COMPLETE) {
      const tabIndex = tabs.findIndex((tab) => tab.id === params.tabId);
      if (tabIndex !== -1) {
        setCurrentTabIndex(tabIndex);
      }
    }
  }, [userDetails?.checkpoint, params.tabId]);

  const tabs = [
    {
      id: 'account-details',
      title: 'Account',
      icon: <Home size={18} />,
      content: <AccountDetails />,
    },
    /**
     * Removing these tabs as a part of design change - client onboarding
     */
    // {
    //   id: 'personal-details',
    //   title: 'Company',
    //   icon: <Briefcase size={18} />,
    //   content: <CompanyDetails />,
    // },
    // {
    //   id: 'social-details',
    //   title: 'Social Link',
    //   icon: <Link size={18} />,
    //   content: <SocialDetails />,
    // },
  ];

  /**
   * Navigates back to the previous page if there is a history state,
   * otherwise navigates to the individual analytics page for the given project and user.
   */
  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(routes.dashboard.path);
    }
  };

  const isOnboarding = userDetails?.checkpoint !== FlexternUserCheckpoint.COMPLETE;

  return (
    <div>
      {isOnboarding && <RestrictedNavbar />}
      <div className="flex flex-col gap-6 py-6 mx-[72px] max-w-[858px]">
        {!isOnboarding && (
          <PrimaryIconText
            icon={<ArrowLeft size={18} />}
            text="Back"
            onClick={goBack}
            className="self-start text-trublue-secondary-500"
          />
        )}
        <div className="text-grey-heading text-2xl font-medium not-italic">
          {isOnboarding ? 'Onboarding' : 'Edit Profile'}
        </div>
        <TabNavigationForm tabs={tabs} hideTabHeader />
      </div>
    </div>
  );
}
