import FlexternAvatar from '@flexternships/components/core/avatars/FlexternAvatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@flexternships/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@flexternships/components/ui/accordion';
import DelegateAccordionBody from './DelegateAccordionBody';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { FlexternUserAppRole, ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { Link } from 'react-router-dom';
import routes from '@/flexternships/routes';
import useLogout from '@/utility/hooks/useLogout';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { useState } from 'react';
import ContactSupportModal from '../../modals/profile-dropdown/ContactSupportModal';
import ContactSupportSuccessModal from '../../modals/profile-dropdown/ContactSupportSuccessModal';
import TalentEditProfileAccordionBody from './TalentEditProfileAccordionBody';
import { FlexternClientDetails } from '@/flexternships/constraints/types/core-types';
import InviteDelegateModal from '../../modals/profile-dropdown/InviteDelegateModal';

function DelegateProfile() {
  const userDetails = useFlexternUserStore((state) => state.userDetails) as FlexternClientDetails;

  // Derived
  const fullName = `${userDetails.firstName} ${userDetails.lastName}`;
  const clientFullName = `${userDetails.adminClient?.firstName} ${userDetails.adminClient?.lastName}`;

  return (
    <div className="flex flex-row items-center gap-x-3.5 py-3 cursor-pointer">
      <div className="flex flex-col items-end">
        <div className="text-trublue-secondary-500 text-sm font-normal leading-5">Trusted Business Systems</div>
        <div className="text-xs leading-4.5 font-normal text-trublue-secondary-500">
          {fullName} <span className="text-grey">({clientFullName})</span>
        </div>
      </div>
      <FlexternAvatar name={fullName} imageUri={userDetails.imageUri} />
    </div>
  );
}

function GenericProfile() {
  const userDetails = useFlexternUserStore((state) => state.userDetails);

  // Derived
  const isClient = userDetails?.userType === UserType.CLIENT;
  const fullName = `${userDetails.firstName} ${userDetails.lastName}`;

  return (
    <div className="flex flex-row items-center gap-x-3.5 py-3 cursor-pointer">
      <div className="flex flex-col items-end">
        <div className="text-trublue-secondary-500 text-sm font-normal leading-5">{fullName}</div>
        <div className="text-xs leading-4.5 font-normal text-grey">{isClient ? 'Client' : 'Talent'}</div>
      </div>
      <FlexternAvatar name={fullName} imageUri={userDetails.imageUri} />
    </div>
  );
}

// Component for the profile dropdown menu
export default function ProfileDropdown() {
  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isContactSupportModalOpen, setIsContactSupportModalOpen] = useState(false);
  const [isContactSupportSuccessModalOpen, setIsContactSupportSuccessModalOpen] = useState(false);
  const [isInviteDelegateModalOpen, setIsInviteDelegateModalOpen] = useState(false);

  const { handleLogout } = useLogout();

  const isClient = userDetails?.userType === UserType.CLIENT;
  const isDelegate = userDetails?.appRoles.includes(FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE);

  const adminClient = (userDetails as FlexternClientDetails).adminClient;

  const publicProfileUrl = isClient
    ? routes.clientProfile.generate(userDetails.id)
    : routes.talentProfile.generate(userDetails.id);

  const logout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      await handleLogout({ suppressToast: true });
      showToastMessage(ToastType.SUCCESS, 'Logged out successfully');
    } catch (error: unknown) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while logging out',
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  //* Contact Support Modal Actions */
  const handleOpenContactSupportModal = () => {
    setIsContactSupportModalOpen(true);
  };

  const handleCloseContactSupportModal = () => {
    setIsContactSupportModalOpen(false);
  };

  const handleOpenContactSupportSuccessModal = () => {
    setIsContactSupportSuccessModalOpen(true);
  };

  const handleCloseContactSupportSuccessModal = () => {
    setIsContactSupportSuccessModalOpen(false);
  };

  //* Delegate Actions */
  const handleCloseInviteDelegateModal = () => {
    setIsInviteDelegateModalOpen(false);
  };

  const handleAddDelegate = () => {
    setIsInviteDelegateModalOpen(true);
  };

  // Menu items that require accordion functionality
  const accordionToDisplay = isClient
    ? {
        id: 'delegates',
        label: 'Delegate(s)',
        content: <DelegateAccordionBody onAddDelegate={handleAddDelegate} />,
      }
    : {
        id: 'edit-profile',
        label: 'Edit Profile',
        content: <TalentEditProfileAccordionBody />,
      };
  return (
    <>
      <DropdownMenu modal={false}>
        {/* Profile Trigger Button */}
        <DropdownMenuTrigger className="border-b-2 border-transparent data-[state=open]:border-trublue-secondary-500 outline-none">
          {isDelegate ? <DelegateProfile /> : <GenericProfile />}
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent className="bg-white w-[90vw] max-w-96 pt-2 pb-1 px-0" sideOffset={8} align="end">
          {/* Public Profile Link */}
          {isDelegate && adminClient ? (
            <DropdownMenuItem asChild className="p-4 hover:bg-trublue-light cursor-pointer">
              <Link to={routes.clientProfile.generate(adminClient.id)}>
                <div className="flex flex-col gap-y-3">
                  <div className="text-grey text-sm font-medium leading-5">Delegate for:</div>
                  <div className="flex flex-row items-center gap-x-3.5">
                    <FlexternAvatar
                      name={`${adminClient.firstName} ${adminClient.lastName}`}
                      imageUri={adminClient.imageUri}
                    />
                    <div>
                      <div className="text-sm text-grey font-normal leading-5">{`${adminClient.firstName} ${adminClient.lastName}`}</div>
                      <div className="text-xs text-grey-muted font-normal leading-4.5">Client</div>
                    </div>
                  </div>
                </div>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              asChild
              className="text-sm text-grey font-medium leading-5 p-4 hover:bg-trublue-light cursor-pointer"
            >
              <Link to={publicProfileUrl}>Public Profile</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="my-0 mx-4 p-0 bg-grey-border" />

          {/* Client Edit Profile Link */}
          {isClient && (
            <>
              <DropdownMenuItem
                asChild
                className="text-sm text-grey font-medium leading-5 p-4 hover:bg-trublue-light cursor-pointer"
              >
                <Link to={routes.clientProfileEdit.generate('account-details')}>Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-0 mx-4 p-0 bg-grey-border" />
            </>
          )}

          {/* Accordion Menu Items */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={accordionToDisplay.id} key={accordionToDisplay.id} className="border-none">
              <AccordionTrigger className="text-sm text-grey font-medium leading-5 p-4 hover:bg-trublue-light data-[state=open]:bg-trublue-light cursor-pointer hover:no-underline">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0 m-0 cursor-pointer">
                  {accordionToDisplay.label}
                </DropdownMenuItem>
              </AccordionTrigger>
              <AccordionContent className="p-0">{accordionToDisplay.content}</AccordionContent>
            </AccordionItem>
            <DropdownMenuSeparator className="my-0 mx-4 p-0 bg-grey-border" />
          </Accordion>

          {/* Support Link */}
          <DropdownMenuItem
            onClick={handleOpenContactSupportModal}
            className="text-sm text-grey font-medium leading-5 p-4 hover:bg-trublue-light cursor-pointer"
          >
            Contact Support
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-0 mx-4 p-0 bg-grey-border" />

          {/* Logout Button */}
          <DropdownMenuItem
            className="text-sm text-error font-medium leading-5 p-4 hover:bg-error-light cursor-pointer"
            onSelect={logout}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ContactSupportModal
        isOpen={isContactSupportModalOpen}
        onClose={handleCloseContactSupportModal}
        onConfirmSuccess={handleOpenContactSupportSuccessModal}
      />
      <ContactSupportSuccessModal
        isOpen={isContactSupportSuccessModalOpen}
        onClose={handleCloseContactSupportSuccessModal}
      />
      <InviteDelegateModal isOpen={isInviteDelegateModalOpen} onClose={handleCloseInviteDelegateModal} />
    </>
  );
}
