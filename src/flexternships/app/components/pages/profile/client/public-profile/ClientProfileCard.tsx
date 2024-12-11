import React from 'react';
import { Link2, Twitter, Users } from 'react-feather';
import linkedinIcon from '@flexternships/assets/icons/brands/linkedin.svg';
import defaultAvatar from '@flexternships/assets/icons/core/default-avatar.jpg';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import { FlexternClientPublicProfileDetails } from '@/flexternships/constraints/types/user-profile-types';

export default function ClientProfileCard(props: ClientProfileCardProps) {
  const { clientDetails, isDelegatesInView, scrollToDelegates } = props;
  const getLinkIcon = (link: string) => {
    switch (link) {
      case 'linkedin':
        return <img src={linkedinIcon} className="size-[18px]" />;
      case 'twitter':
        return <Twitter size={18} />;
      default:
        return <Link2 size={18} />;
    }
  };
  return (
    <div className="flex flex-col gap-y-6 bg-white rounded-md shadow-card p-5">
      <div className="flex flex-col items-center gap-y-3">
        {/* Commented out for now - may need it add later */}
        {/* <div className="flex flex-row self-stretch justify-end">
                <span className="cursor-pointer">
                  <Heart size={24} className="text-error" />
                </span>
              </div> */}
        <div className="size-[120px]">
          <img
            className="w-full h-full object-contain"
            src={clientDetails?.companyDetails?.companyLogo || defaultAvatar}
          />
        </div>
        <div className="text-lg text-grey-heading font-medium">
          {clientDetails?.companyDetails?.companyName || 'Unknown Company'}
        </div>
        <div className="flex flex-row gap-x-2.5">
          <div className="size-11">
            <img className="w-full h-full object-contain rounded-full" src={clientDetails?.imageUri || defaultAvatar} />
          </div>
          <div>
            <div className="text-grey-500 text-lg font-semibold leading-7">
              {clientDetails?.firstname || ''} {clientDetails?.lastname || ''}
            </div>
            <div className="text-sm text-grey-heading font-normal leading-5">
              {clientDetails?.title || 'Unknown Title'}
            </div>
          </div>
        </div>
      </div>
      {!isDelegatesInView && clientDetails?.delegates && clientDetails.delegates.length > 0 && (
        <div>
          <PrimaryIconText
            icon={<Users size={18} className="text-trublue-secondary-500" />}
            text="View All Delegates"
            onClick={scrollToDelegates}
          />
        </div>
      )}
      <div>
        <div className="pb-2 text-lg font-medium text-grey-heading border-b-1 border-grey-border">Details</div>
        <div className="flex flex-col gap-y-5 pt-4">
          <div className="flex flex-row gap-x-2">
            <span className="text-sm text-grey font-semibold">Department:</span>
            <span className="text-sm text-grey font-normal">
              {clientDetails?.companyDetails?.companyName || 'Unknown Company'}
            </span>
          </div>
          <div className="flex flex-row w-[350px] gap-x-2">
            <span className="text-sm text-grey font-semibold">Location:</span>
            <span className="text-sm text-grey font-normal">
              {[
                `B. No. ${clientDetails?.officeAddress?.buildingNumber}`,
                clientDetails?.officeAddress?.streetAddress,
                clientDetails?.officeAddress?.city,
                clientDetails?.officeAddress?.state,
                clientDetails?.officeAddress?.country,
                clientDetails?.officeAddress?.zipCode,
              ]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="text-sm text-grey font-semibold">Social Links</div>
            <div className="flex flex-row flex-wrap gap-x-2">
              {clientDetails?.socialLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  className="cursor-pointer p-2.5 rounded-full text-trublue bg-trublue-light"
                >
                  {getLinkIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row justify-center">
              <SecondaryButton className="m-0" onClick={() => { }}>
                Message
              </SecondaryButton>
            </div> */}
    </div>
  );
}

type ClientProfileCardProps = {
  clientDetails: FlexternClientPublicProfileDetails;
  isDelegatesInView: boolean;
  scrollToDelegates: () => void;
};
