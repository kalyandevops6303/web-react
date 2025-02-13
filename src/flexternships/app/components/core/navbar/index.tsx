import logo from '@flexternships/assets/images/ic_trumio_logo.png';
import { Bell } from 'react-feather';
import ProfileDropdown from './profile-dropdown';
import { Link, useLocation } from 'react-router-dom';
import routes from '@/flexternships/routes';
import { useAppStore, useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import { useNavigate } from 'react-router-dom';
import { NAVBAR_ITEMS } from '@/flexternships/static/constants/core-constants';

/**
 * Main navigation bar component for the Flexternships application.
 * Provides navigation links, notifications, and user profile access.
 * Handles responsive navigation and work-in-progress state management.
 *
 * @component
 * @returns {JSX.Element | null} The rendered Navbar component or null if user details are loading
 */
export default function Navbar() {
  const unreadNotificationsCount = useAppStore((state) => state.unreadNotificationsCount);
  const fetchNotificationsCount = useAppStore((state) => state.fetchNotificationsCount);
  const isWorkInProgress = useAppStore((state) => state.isWip);
  const openModal = useAppStore((state) => state.openModal);

  const isUserDetailsLoading = useFlexternUserStore((state) => state.isUserDetailsLoading);
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const location = useLocation();
  const navigate = useNavigate();
  const showNotificationsCount: boolean = typeof unreadNotificationsCount === 'number' && unreadNotificationsCount > 0;

  /**
   * Checks if the current route matches the given path
   * @param {string} route - Route path to check against current location
   * @returns {boolean} Whether the current route matches
   */
  const isActiveRoute = (route: string) => location.pathname.includes(route);

  /**
   * Handles navigation item clicks with work-in-progress check
   * @param {string} route - Destination route path
   */
  const handleNavItemClick = (route: string) => {
    if (isWorkInProgress) return openModal(GlobalModalType.UNSAVED_WORK, undefined, undefined, { nextPath: route });
    navigate(route);
  };

  useEffect(() => {
    fetchNotificationsCount();
    populateUserDetails();
  }, []);

  if (isUserDetailsLoading) return null;

  return (
    <nav
      className="flex flex-row justify-between items-center bg-white shadow-card px-6"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Left section: Logo and Navigation */}
      <div className="flex flex-row gap-x-5">
        <div className="py-4 cursor-pointer">
          <img src={logo} className="h-8" alt="Flexternships Logo" />
        </div>
        <div className="w-0.5 bg-grey-border my-4 h-7 self-center" />
        <div className="flex flex-row items-center gap-x-12">
          {NAVBAR_ITEMS.map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavItemClick(item.path)}
              role="button"
              aria-current={isActiveRoute(item.activeTabMatch) ? 'page' : undefined}
              className={classNames(
                'text-base font-normal leading-6 text-grey-800 hover:text-trublue-secondary-500 cursor-pointer py-5',
                {
                  'text-trublue-secondary-500 font-semibold border-b-2 border-trublue-secondary-500': isActiveRoute(
                    item.activeTabMatch,
                  ),
                },
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Right section: Notifications and Profile */}
      <div className="flex flex-row gap-x-6">
        <Link
          to={routes.notifications.path}
          className="flex flex-col justify-center py-3 relative cursor-pointer"
          aria-label={`Notifications ${showNotificationsCount ? `(${unreadNotificationsCount} unread)` : ''}`}
        >
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
    </nav>
  );
}
