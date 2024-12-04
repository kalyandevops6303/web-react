'use client';

import { ChevronLeft, Heart, Link2, Users } from 'react-feather';
import PrimaryIconText from '../../components/core/buttons/PrimaryIconText';
import ExpandableText from '../../components/core/ExpandableText';

import defaultAvatar from '@flexternships/assets/images/ic_trumio_logo.png';
import SecondaryButton from '../../components/core/buttons/SecondaryButton';

export default function ClientPublicProfile() {
  return (
    <div className="flexternships-page">
      {/* TODO: Add Breadcrumbs */}
      <div className="flex flex-row gap-x-5">
        <div className="flex flex-col gap-y-6 min-w-[350px]">
          <div className="flex flex-col gap-y-6 bg-white rounded-md shadow-card p-5">
            <div className="flex flex-col items-center gap-y-3">
              <div className="flex flex-row self-stretch justify-end">
                <span className="cursor-pointer">
                  <Heart size={24} className="text-error" />
                </span>
              </div>
              <div className="size-[120px]">
                <img className="w-full h-full object-contain" src={defaultAvatar} />
              </div>
              <div className="text-lg text-grey-heading font-medium">Company Name</div>
              <div className="flex flex-row gap-x-2.5">
                <div className="size-11">
                  <img className="w-full h-full object-contain rounded-full" src={defaultAvatar} />
                </div>
                <div>
                  <div className="text-grey-500 text-lg font-semibold leading-7">Roger Barry</div>
                  <div className="text-sm text-grey-heading font-normal leading-5">CEO</div>
                </div>
              </div>
            </div>
            <div>
              <PrimaryIconText
                icon={<Users size={18} className="text-trublue-secondary-500" />}
                text="View All Delegates"
                onClick={() => {}}
              />
            </div>
            <div>
              <div className="pb-2 text-lg font-medium text-grey-heading border-b-1 border-grey-border">Details</div>
              <div className="flex flex-col gap-y-5 pt-4">
                <div className="flex flex-row gap-x-2">
                  <span className="text-sm text-grey font-semibold">Department:</span>
                  <span className="text-sm text-grey font-normal">Software Development</span>
                </div>
                <div className="flex flex-row gap-x-2">
                  <span className="text-sm text-grey font-semibold">Location:</span>
                  <span className="text-sm text-grey font-normal">New York, NY</span>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="text-sm text-grey font-semibold">Social Links</div>
                  <div className="flex flex-row flex-wrap gap-x-2">
                    <span className="cursor-pointer p-2 rounded-full bg-trublue-light">
                      <Link2 size={18} className="text-trublue-secondary-500" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <SecondaryButton className="m-0" onClick={() => {}}>
                Message
              </SecondaryButton>
            </div>
          </div>
          <div className="flex flex-col gap-y-6 p-6 pt-4 bg-white rounded-md shadow-card">
            <div className="flex flex-row items-center gap-x-3">
              <span className="text-grey-heading text-lg font-medium leading-7">Delegate(s)</span>
              <span className="text-grey text-xs font-normal leading-5">(3 members)</span>
            </div>
            <div className="flex flex-row gap-x-3">
              <div className="size-11">
                <img className="w-full h-full object-contain rounded-full" src={defaultAvatar} />
              </div>
              <div className="flex flex-col justify-between">
                <div className="text-grey-heading text-sm font-medium leading-5">Kim Gart</div>
                <div className="px-2 py-[1px] text-[#0D6EFD] text-xs font-semibold leading-4.5 rounded-2xl border-1 border-[#0D6EFD]">
                  Full Access Delegate
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col grow gap-y-5 max-w-5xl">
          <div className="self-start px-1">
            <PrimaryIconText
              icon={<ChevronLeft size={18} className="text-trublue-secondary-500" />}
              text="Back"
              onClick={() => {}}
            />
          </div>
          <div className="flex flex-row gap-x-6">
            <div className="flex flex-row justify-between items-center shadow-card min-w-60 rounded-md bg-white px-5 py-6">
              <div className="flex flex-col gap-y-2">
                <div className="text-grey-heading text-xl font-semibold">56</div>
                <div className="text-sm text-grey font-light">Open Listings</div>
              </div>
              <div></div>
            </div>
            <div className="flex flex-row justify-between items-center shadow-card min-w-60 rounded-md bg-white px-5 py-6">
              <div className="flex flex-col gap-y-2">
                <div className="text-grey-heading text-xl font-semibold">56</div>
                <div className="text-sm text-grey font-light">Completed Projects</div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-card p-6">
            <div className="text-base font-semibold text-grey-heading">Company Tagline</div>
            <div className="text-grey text-sm font-light">
              <ExpandableText charLimit={200}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </ExpandableText>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 bg-white rounded-md shadow-card p-6">
            <div className="text-lg font-semibold text-grey-heading">Recent Projects</div>
            <div className="flex flex-row flex-wrap gap-6">
              <div className="w-[471px] flex flex-col gap-y-2 bg-white shadow-card rounded-md p-5">
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-3">
                    <div className="self-start text-grey-heading text-lg font-semibold leading-[26px]">
                      WebBoost Application Development
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                      <div className="text-grey text-sm font-normal leading-[21px]">Roles</div>
                      <div className="flex flex-row flex-wrap gap-x-1">
                        <span className="px-3 py-2 text-[#005EFF] text-sm font-normal leading-4.5 border-1 border-[#005EFF] rounded-[4px]">
                          Front-End Dev
                        </span>
                        <span className="px-3 py-2 text-[#005EFF] text-sm font-normal leading-4.5 border-1 border-[#005EFF] rounded-[4px]">
                          Back-End Dev
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-grey font-normal leading-5.5">
                    WebBoost is a web application development platform designed to help businesses and developers create
                    high-quality, scalable web applications
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <span className="underline text-trublue-secondary-500 text-sm font-normal tracking-wide cursor-pointer">
                    View Project
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
