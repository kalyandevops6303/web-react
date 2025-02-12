import logo from '@flexternships/assets/images/ic_trumio_logo.png';
import { Bell } from 'react-feather';
import ProfileDropdown from './profile-dropdown';
import { Link, useLocation } from 'react-router-dom';
import routes from '@/flexternships/routes';
import { useAppStore, useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';

// Main Navbar component
export default function Navbar() {
  const unreadNotificationsCount = useAppStore((state) => state.unreadNotificationsCount);
  const fetchNotificationsCount = useAppStore((state) => state.fetchNotificationsCount);

  const isUserDetailsLoading = useFlexternUserStore((state) => state.isUserDetailsLoading);
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const location = useLocation();

  const showNotificationsCount: boolean = typeof unreadNotificationsCount === 'number' && unreadNotificationsCount > 0;

  const isActiveRoute = (route: string) => location.pathname.includes(route);

  useEffect(() => {
    fetchNotificationsCount();
    populateUserDetails();
  }, []);

  if (isUserDetailsLoading) return null;

  return (
    <div className="flex flex-row justify-between items-center bg-white shadow-card px-6">
      {/* Left section: Logo and Navigation */}
      <div className="flex flex-row gap-x-5">
        <div className="py-4 cursor-pointer">
          <img src={logo} className="h-8" alt="logo" />
        </div>
        <div className="w-0.5 bg-grey-border my-4 h-7 self-center" />
        <div className="flex flex-row items-center gap-x-12">
          <Link
            to={routes.dashboard.path}
            className={classNames(
              'text-base font-normal leading-6 text-grey-800 hover:text-trublue-secondary-500 cursor-pointer py-5',
              {
                'text-trublue-secondary-500 font-semibold border-b-2 border-trublue-secondary-500': isActiveRoute(
                  routes.dashboard.path,
                ),
              },
            )}
          >
            Dashboard
          </Link>
          <Link
            to={`${routes.marketplace.path}/all_listings`}
            className={classNames(
              'text-base font-normal leading-6 text-grey-800 hover:text-trublue-secondary-500 cursor-pointer py-5',
              {
                'text-trublue-secondary-500 font-semibold border-b-2 border-trublue-secondary-500': isActiveRoute(
                  routes.marketplace.path,
                ),
              },
            )}
          >
            Marketplace
          </Link>
          <Link
            to={`${routes.projects.path}/ongoing`}
            className={classNames(
              'text-base font-normal leading-6 text-grey-800 hover:text-trublue-secondary-500 cursor-pointer py-5',
              {
                'text-trublue-secondary-500 font-semibold border-b-2 border-trublue-secondary-500': isActiveRoute(
                  routes.projects.path,
                ),
              },
            )}
          >
            Projects
          </Link>
        </div>
      </div>

      {/* Right section: Notifications and Profile */}
      <div className="flex flex-row gap-x-6">
        <Link to={routes.notifications.path} className="flex flex-col justify-center py-3 relative cursor-pointer">
          <Bell size={20} className="text-grey hover:text-trublue-secondary-500" />
          {showNotificationsCount && (
            <span className="bg-error size-[18px] rounded-full text-xs text-white font-semibold leading-5 text-center absolute top-3.5 -right-1.5">
              {unreadNotificationsCount}
            </span>
          )}
        </Link>
        <div className="w-0.5 bg-grey-border my-3 h-7 self-center" />
        {!isEmpty(userDetails) && <ProfileDropdown />}
      </div>
    </div>
  );
}
