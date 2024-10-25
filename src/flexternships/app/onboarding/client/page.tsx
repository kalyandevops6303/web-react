import { Briefcase, Home, Link } from 'react-feather'
import RestrictedNavbar from '../../components/core/layouts/RestrictedNavbar'
import TabNavigationForm from '../../components/pages/profile/client/TabNavigationForm'
import AccountDetails from '../../components/pages/profile/client/tabs/AccountDetails'
import CompanyDetails from '../../components/pages/profile/client/tabs/CompanyDetails'
import SocialDetails from '../../components/pages/profile/client/tabs/SocialDetails'
import { useFlexternUserStore } from '@/flexternships/stores/core-stores'
import { FlexternUserCheckpoint } from '@/flexternships/constraints/enums/core-enums'
import { useParams } from 'react-router-dom'
import { useFlexternUserProfileStore } from '@/flexternships/stores/user-profile-store'
import { use } from 'i18next'
import { useEffect } from 'react'

export default function ClientProfilePage() {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  
  const params=useParams();

  useEffect(() => {
      if (userDetails?.checkpoint === FlexternUserCheckpoint.COMPLETE){
          const tabIndex= tabs.findIndex((tab) => tab.id === params.tabId);
          useFlexternUserProfileStore((state) => state.setCurrentTabIndex(tabIndex));
      }
  }, [userDetails?.checkpoint]);

  const tabs = [
    {
      id: 'account',
      title: 'Account',
      icon: <Home size={18} />,
      content: <AccountDetails />,
    },
    {
      id: 'company',
      title: 'Company',
      icon: <Briefcase size={18} />,
      content: <CompanyDetails />,
    },
    {
      id: 'social-links',
      title: 'Social Link',
      icon: <Link size={18} />,
      content: <SocialDetails />,
    },
  ]

  return (
    <div className='overflow-y-auto overflow-x-hidden'>
      {
        userDetails?.checkpoint !== FlexternUserCheckpoint.COMPLETE && (
          <RestrictedNavbar />
        )
      }
      <div className='flex flex-col gap-6 py-6 mx-[72px] max-w-[858px]'>
        <div className='text-grey-heading text-2xl font-medium not-italic'>
          {
            (userDetails?.checkpoint === FlexternUserCheckpoint.ACCOUNT_DETAILS)
              ? 'Onboarding'
              : 'Edit Profile'
          }
        </div>
        <TabNavigationForm tabs={tabs} />
      </div>
    </div>
  )
}
