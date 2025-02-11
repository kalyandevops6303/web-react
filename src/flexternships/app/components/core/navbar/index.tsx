import logo from '@flexternships/assets/images/ic_trumio_logo.png';
import { Bell, Plus, Settings } from 'react-feather';
import FlexternAvatar from '../avatars/FlexternAvatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@flexternships/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@flexternships/components/ui/accordion';
import PrimaryIconText from '../buttons/PrimaryIconText';

function DelegateItem() {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-x-3">
        <FlexternAvatar name="Anil Chad" />
        <div>
          <div className="text-sm leading-5 font-normal text-grey-heading">Anil Chad</div>
          <div className="text-error text-xs leading-4.5 font-normal">Invitation Expired</div>
        </div>
      </div>
      <div>
        <span className="py-[1px] px-[9px] rounded-[17px] border-1 border-trublue-secondary-500 text-xs font-semibold leading-4.5 text-trublue-secondary-500">
          Full
        </span>
      </div>
    </div>
  );
}

// Component for the profile dropdown menu
function ProfileDropdown() {
  const logout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('logout');
  };

  // Menu items that require accordion functionality
  const accordionMenuItems = [
    {
      id: 'edit-profile',
      label: 'Edit Profile',
      content: (
        <div className="flex flex-col pt-3 pb-4 px-4">
          <div className="py-2 px-2 hover:bg-trublue-light cursor-pointer">Account Details</div>
          <div className="py-2 px-2 hover:bg-trublue-light cursor-pointer">Personal Information</div>
        </div>
      ),
    },
    {
      id: 'delegates',
      label: 'Delegate(s)',
      content: (
        <div className="flex flex-col gap-y-5 pt-3 pb-4 px-4">
          <DelegateItem />
          <DelegateItem />
          <DelegateItem />
          <div className="flex flex-col gap-y-2 text-trublue-secondary-500 self-start">
            <PrimaryIconText
              text="Add Delegate"
              icon={<Plus size={18} className="text-trublue-secondary-500" />}
              onClick={() => {}}
            />
            <PrimaryIconText
              text="Delegate Settings"
              icon={<Settings size={18} className="text-trublue-secondary-500" />}
              onClick={() => {}}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <DropdownMenu>
      {/* Profile Trigger Button */}
      <DropdownMenuTrigger className="border-b border-transparent data-[state=open]:border-trublue-secondary-500 outline-none">
        <div className="flex flex-row items-center gap-x-3.5 py-3 cursor-pointer">
          <div className="flex flex-col items-end">
            <div className="text-trublue-secondary-500 text-sm font-normal leading-5">Trusted Business Systems</div>
            <div className="text-xs leading-4.5 font-normal text-trublue-secondary-500">
              Roger Barry <span className="text-grey">(Client)</span>
            </div>
          </div>
          <FlexternAvatar name="Roger Barry" />
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="bg-white w-[90vw] max-w-96 pt-2 pb-1 px-0" sideOffset={8} align="end">
        {/* Public Profile Link */}
        <DropdownMenuItem className="text-sm text-grey font-medium leading-5 p-4 hover:bg-trublue-light cursor-pointer">
          Public Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-0 mx-4 p-0 bg-grey-border" />

        {/* Accordion Menu Items */}
        <Accordion type="single" collapsible className="w-full">
          {accordionMenuItems.map((item) => (
            <>
              <AccordionItem value={item.id} key={item.id} className="border-none">
                <AccordionTrigger className="text-sm text-grey font-medium leading-5 p-4 hover:bg-trublue-light data-[state=open]:bg-trublue-light cursor-pointer hover:no-underline">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0 m-0 cursor-pointer">
                    {item.label}
                  </DropdownMenuItem>
                </AccordionTrigger>
                <AccordionContent className="p-0">{item.content}</AccordionContent>
              </AccordionItem>
              <DropdownMenuSeparator className="my-0 mx-4 p-0 bg-grey-border" />
            </>
          ))}
        </Accordion>

        {/* Support Link */}
        <DropdownMenuItem className="text-sm text-grey font-medium leading-5 p-4 hover:bg-trublue-light cursor-pointer">
          Contact Support
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-0 mx-4 p-0 bg-grey-border" />

        {/* Logout Button */}
        <DropdownMenuItem
          className="text-sm text-error font-medium leading-5 p-4 hover:bg-error-light cursor-pointer"
          onSelect={logout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Main Navbar component
export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center bg-white shadow-card px-6">
      {/* Left section: Logo and Navigation */}
      <div className="flex flex-row gap-x-5">
        <div className="py-4 cursor-pointer">
          <img src={logo} className="h-8" alt="logo" />
        </div>
        <div className="w-0.5 bg-grey-border my-4" />
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
        <div className="flex flex-col justify-center py-3 relative cursor-pointer">
          <Bell size={20} className="text-grey" />
          <span className="bg-error size-[18px] rounded-full text-xs text-white font-semibold leading-5 text-center absolute top-3.5 -right-1.5">
            6
          </span>
        </div>
        <div className="w-0.5 bg-grey-border my-3" />
        <ProfileDropdown />
      </div>
    </div>
  );
}
