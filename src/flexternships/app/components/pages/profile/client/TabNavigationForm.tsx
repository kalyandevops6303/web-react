"use client";

import { FlexternUserCheckpoint } from "@/flexternships/constraints/enums/core-enums";
import { useFlexternUserStore } from "@/flexternships/stores/core-stores";
import { useFlexternUserProfileStore } from "@/flexternships/stores/user-profile-store";
import { useNavigate } from "react-router-dom";


export default function TabNavigationForm({ tabs }: { tabs: TabProp[] }) {
    const currentTabIndex = useFlexternUserProfileStore((state) => state.currentTabIndex);
    const userDetails = useFlexternUserStore((state) => state.userDetails);

    const navigate = useNavigate();

    const tabClickHandler = (tabId: string) => {
        if (userDetails.checkpoint === FlexternUserCheckpoint.COMPLETE)
            navigate(`/client-profile-edit/${tabId}`);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex">
                {
                    tabs.map((tab, index) => (
                        <div key={tab.id} onClick={() => tabClickHandler(tab.id)} className={`flex items-center gap-2 px-6 py-2.5 rounded-md ${index === currentTabIndex ? 'text-trublue-secondary-500 bg-trublue-light' : 'text-grey-muted'} ${userDetails.checkpoint === FlexternUserCheckpoint.COMPLETE ? 'cursor-pointer' : ''}`}>
                            <div>
                                {tab.icon}
                            </div>
                            <div className="text-sm tracking-wide leading-4 font-medium">
                                {tab.title}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {tabs[currentTabIndex].content}
            </div>
        </div>
    )
}

type TabProp = {
    id: string
    title: string,
    icon: React.ReactNode,
    content: React.ReactNode,
};