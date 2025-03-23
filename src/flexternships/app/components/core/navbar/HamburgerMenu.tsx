// External dependencies
import classNames from 'classnames';
import { Menu } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';

// Internal dependencies
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import routes from '@/flexternships/routes';
import { NAVBAR_ITEMS } from '@/flexternships/static/constants/core-constants';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';

/**
 * HamburgerMenu component that provides mobile navigation functionality
 * Shows a hamburger menu icon that opens a side sheet with navigation items
 *
 * @component
 * @returns {JSX.Element} The rendered HamburgerMenu component
 */
export default function HamburgerMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const isWorkInProgress = useAppStore((state) => state.isWip);
  const openModal = useAppStore((state) => state.openModal);

  /**
   * Checks if the current route matches the given path
   * @param {string} route - Route path to check against current location
   * @returns {boolean} Whether the current route matches
   */
  const isActiveRoute = (route: string): boolean => location.pathname.includes(route);

  /**
   * Handles navigation item clicks with work-in-progress check
   * @param {string} route - Destination route path
   */
  const handleNavItemClick = (route: string) => {
    if (isWorkInProgress) return openModal(GlobalModalType.UNSAVED_WORK, undefined, undefined, { nextPath: route });
    navigate(route);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex-col justify-center d-flex d-lg-none">
          <Menu size={20} className="text-grey hover:text-trublue-secondary-500 cursor-pointer" />
        </div>
      </SheetTrigger>
      <SheetContent className="p-0" side="left">
        <div className="flex flex-col py-12">
          {[
            ...NAVBAR_ITEMS,
            { path: routes.notifications.path, label: 'Notifications', activeTabMatch: routes.notifications.path },
          ].map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavItemClick(item.path)}
              role="button"
              aria-current={isActiveRoute(item.activeTabMatch) ? 'page' : undefined}
              className={classNames(
                'text-base font-normal leading-6 text-grey-800 cursor-pointer px-6 py-4',
                {
                  'text-white font-semibold bg-trublue-secondary-500': isActiveRoute(item.activeTabMatch),
                },
                {
                  'd-block d-md-none': item.path === routes.notifications.path,
                },
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
