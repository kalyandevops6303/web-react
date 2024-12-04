'use client';

import { ChevronLeft, Heart, Users } from "react-feather";
import PrimaryIconText from "../../components/core/buttons/PrimaryIconText";
import ExpandableText from "../../components/core/ExpandableText";

import defaultAvatar from "@flexternships/assets/images/ic_trumio_logo.png";
import SecondaryButton from "../../components/core/buttons/SecondaryButton";

export default function ClientPublicProfile() {

    return (
        <div className="flexternships-page p-6">
            {/* TODO: Add Breadcrumbs */}
            <div className="flex flex-row gap-x-5">
                <div className="flex flex-col bg-white rounded-md shadow-card p-5">
                    <div>
                        <span className="cursor-pointer">
                            <Heart size={24} className="text-trublue-secondary-500" />
                        </span>
                    </div>
                    <div>
                        <img className="w-30 h-30 object-cover" src={defaultAvatar} />
                        <div>
                            Company Name
                        </div>
                        <div>
                            <div>
                                <img src={defaultAvatar} />
                            </div>
                            <div>
                                <div>
                                    Roger Barry
                                </div>
                                <div>
                                    CEO
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <PrimaryIconText icon={<Users size={18} className="text-trublue-secondary-500" />} text="View All Delegates" onClick={() => { }} />
                    </div>
                    <div>
                        <div>
                            Details
                        </div>
                        <div>
                            <div>
                                <span>Department:</span>
                                <span>Software Development</span>
                            </div>
                            <div>
                                <span>Location:</span>
                                <span>New York, NY</span>
                            </div>
                            <div>
                                <div>Social Links:</div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SecondaryButton onClick={() => { }}>
                            Message
                        </SecondaryButton>
                    </div>
                </div>
                <div className="flex flex-col grow gap-y-5 max-w-5xl">
                    <div className="self-start">
                        <PrimaryIconText icon={<ChevronLeft size={18} className="text-trublue-secondary-500" />} text="Back" onClick={() => { }} />
                    </div>
                    <div className="flex flex-row gap-x-6">
                        <div className="flex flex-row justify-between items-center shadow-card rounded-md bg-white px-5 py-6">
                            <div className="flex flex-col gap-y-2">
                                <div className="text-grey-heading text-xl font-semibold">
                                    56
                                </div>
                                <div className="text-sm text-grey font-light">
                                    Open Listings
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center shadow-card rounded-md bg-white px-5 py-6">
                            <div className="flex flex-col gap-y-2">
                                <div className="text-grey-heading text-xl font-semibold">
                                    56
                                </div>
                                <div className="text-sm text-grey font-light">
                                    Completed Projects
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md shadow-card p-6">
                        <div className="text-base font-semibold text-grey-heading">
                            Company Tagline
                        </div>
                        <div className="text-grey text-sm font-light">
                            <ExpandableText charLimit={200}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </ExpandableText>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 bg-white rounded-md shadow-card p-6">
                        <div className="text-lg font-semibold text-grey-heading">Recent Projects</div>
                        <div className="flex flex-row flex-wrap gap-6">
                            <div className="w-[471px] flex flex-col gap-y-2 bg-white shadow-card rounded-md p-5">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex flex-col gap-y-3">
                                        <div className="self-start text-grey-heading text-lg font-semibold leading-[26px]">WebBoost Application Development</div>
                                        <div className="flex flex-row items-center gap-x-2">
                                            <div className="text-grey text-sm font-normal leading-[21px]">Roles</div>
                                            <div className="flex flex-row flex-wrap gap-x-1">
                                                <span className="px-3 py-2 text-[#005EFF] text-sm font-normal leading-4.5 border-1 border-[#005EFF] rounded-[4px]">Front-End Dev</span>
                                                <span className="px-3 py-2 text-[#005EFF] text-sm font-normal leading-4.5 border-1 border-[#005EFF] rounded-[4px]">Back-End Dev</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-grey font-normal leading-5.5">
                                        WebBoost is a web application development platform designed to help businesses and developers create high-quality, scalable web applications
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <span className="underline text-trublue-secondary-500 text-sm font-normal tracking-wide cursor-pointer">View Project</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
