import logo from '@flexternships/assets/images/ic_trumio_logo.png';
import { Bell } from 'react-feather';
import ProfileDropdown from './profile-dropdown';
import { Link } from 'react-router-dom';
import routes from '@/flexternships/routes';

// Main Navbar component
export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center bg-white shadow-card px-6">
      {/* Left section: Logo and Navigation */}
      <div className="flex flex-row gap-x-5">
        <div className="py-4 cursor-pointer">
          <img src={logo} className="h-8" alt="logo" />
        </div>
        <div className="w-0.5 bg-grey-border my-4 h-7 self-center" />
        <div className="flex flex-row items-center gap-x-12">
          <div className="text-base font-normal leading-6 text-grey-800 hover:text-trublue-secondary-500 cursor-pointer py-5">
            Dashboard
          </div>
          <div className="text-base font-normal leading-6 text-grey-800 hover:text-trublue-secondary-500 cursor-pointer py-5">
            Marketplace
          </div>
          <div className="text-base font-normal leading-6 text-grey-800 hover:text-trublue-secondary-500 cursor-pointer py-5">
            Projects
          </div>
        </div>
      </div>

      {/* Right section: Notifications and Profile */}
      <div className="flex flex-row gap-x-6">
        <Link to={routes.notifications.path} className="flex flex-col justify-center py-3 relative cursor-pointer">
          <Bell size={20} className="text-grey" />
          <span className="bg-error size-[18px] rounded-full text-xs text-white font-semibold leading-5 text-center absolute top-3.5 -right-1.5">
            6
          </span>
        </Link>
        <div className="w-0.5 bg-grey-border my-3 h-7 self-center" />
        <ProfileDropdown />
      </div>
    </div>
  );
}
