'use client';

import { ArrowLeft, Check, ChevronLeft } from "react-feather";
import PrimaryIconText from "../../components/core/buttons/PrimaryIconText";
import ExpandableText from "../../components/core/ExpandableText";

export default function ClientPublicProfile() {

    return (
        <div className="flexternships-page p-6">
            {/* TODO: Add Breadcrumbs */}
            <div className="flex flex-row gap-x-5">
                <div className="flex flex-col">

                </div>
                <div className="flex flex-col grow gap-y-5">
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
                            About Trusted Business Systems
                        </div>
                        <div className="text-grey text-sm font-light">
                            <ExpandableText charLimit={200}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </ExpandableText>
                        </div>
                    </div>
                    <div className="bg-white rounded-md shadow-card p-6">
                        <div>Recent Projects</div>
                        <div className="flex flex-row flex-wrap gap-6">
                            <div className="w-[471px] flex flex-col gap-y-2 bg-white shadow-card rounded-md p-5">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex flex-col gap-y-3">
                                        <div className="self-start text-grey-heading text-lg font-semibold leading-[26px]">WebBoost Application Development</div>
                                        <div className="flex flex-row gap-x-2">
                                            <div className="text-grey text-sm font-normal leading-[21px]">Roles</div>
                                            <div className="flex flex-row flex-wrap gap-x-1">
                                                <span className="w-[140px] text-center">Front-End Dev</span>
                                                <span>Back-End Dev</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <span>View Project</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
