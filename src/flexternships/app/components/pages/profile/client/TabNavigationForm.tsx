"use client";

import { useFlexternUserProfileStore } from "@/flexternships/stores/user-profile-store";


export default function TabNavigationForm({ tabs }: { tabs: TabProp[] }) {
    const currentTabIndex = useFlexternUserProfileStore((state) => state.currentTabIndex);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex">
                {
                    tabs.map((tab, index) => (
                        <div className={`flex items-center gap-2 px-6 py-2.5 rounded-md ${index === currentTabIndex ? 'text-trublue-secondary-500 bg-trublue-light' : 'text-grey-muted'} `}>
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