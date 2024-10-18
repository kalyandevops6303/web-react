import { Briefcase, Home, Link } from 'react-feather'
import RestrictedNavbar from '../../components/core/layouts/RestrictedNavbar'
import TabNavigationForm from '../../components/pages/profile/client/TabNavigationForm'
import AccountDetails from '../../components/pages/profile/client/tabs/AccountDetails'
import CompanyDetails from '../../components/pages/profile/client/tabs/CompanyDetails'
import SocialDetails from '../../components/pages/profile/client/tabs/SocialDetails'

export default function ClientProfilePage(props: PageProps) {

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
    <div className='h-screen w-screen overflow-y-auto overflow-x-hidden'>
      <RestrictedNavbar />
      <div className='flex flex-col gap-6 py-6 mx-[72px] max-w-[858px]'>
        <div className='text-grey-heading text-2xl font-medium not-italic'>
          Onboarding
        </div>
        <TabNavigationForm tabs={tabs} />
      </div>
    </div>
  )
}

type PageProps = {
}