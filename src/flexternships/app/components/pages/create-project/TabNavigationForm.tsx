"use client";

import FlatProgressBar from '@flexternships/app/components/core/FlatProgressBar';
import SavedDrafts from '@flexternships/app/components/core/modals/SavedDrafts';
import Styles from '@flexternships/styles/pages/create-project/tab-navigation-form.module.css';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import Spinner from '../../core/Spinner';

export default function TabNavigationForm({ tabs }: { tabs: TabProp[] }) {
    const currentTabIndex = useProjectCreationStore((state) => (state.currentTabIndex));
    const jumpToTab = useProjectCreationStore((state) => (state.jumpToTab));
    const closeModal = useProjectCreationStore((state) => (state.closeModal));
    const populateDraftProject = useProjectCreationStore((state) => (state.populateDraftProject));
    const resetProjectCreationStore = useProjectCreationStore((state) => (state.resetStore));
    const [isDraftLoading, setIsDraftLoading] = useState(false);

    const navigate = useNavigate();
    const { projectId } = useParams();

    const handleTabJump = (index: number) => {
        if (index < currentTabIndex) {
            jumpToTab(index);
        }
    }

    const redirectToMyListings = () => {
        closeModal();
        navigate('/marketplace/my_listings');
        resetProjectCreationStore();
    }

    useEffect(() => {
        const populateDraftIfProjectId = async () => {
            if (projectId) {
                resetProjectCreationStore();
                setIsDraftLoading(true);
                try {
                    await populateDraftProject(projectId);
                } catch (error) {
                    showToastMessage(ToastType.ERROR, 'An unexpected error occurred while loading the draft project data');
                    navigate('/create-project');
                } finally {
                    setIsDraftLoading(false);
                }
            }
        }
        populateDraftIfProjectId();
    }, [projectId]);


    return (
        <div className={Styles.formContainer}>
            <div className={Styles.tabsContainer}>
                {
                    tabs.map((tab, index) => (
                        <div className={`${Styles.tab} ${(index <= currentTabIndex) ? Styles.tabActive : Styles.tabInactive}`} key={tab.id} onClick={() => (handleTabJump(index))}>
                            <div className={Styles.tabIconContainer}>
                                {tab.icon}
                            </div>
                            <div>
                                <div className={Styles.tabTitle}>
                                    {tab.title}
                                </div>
                                <div className={Styles.tabSubtitle}>
                                    {tab.subtitle}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {/* Progress Bar */}
                <FlatProgressBar currentProgress={currentTabIndex + 1} maxProgress={tabs.length} />
            </div>
            <div className={Styles.formBodyContainer}>
                {
                    isDraftLoading ? (
                        <div className='w-full min-h-40 flex justify-center items-center'>
                            <div className='w-8 h-8'>
                                <Spinner />
                            </div>
                        </div>
                    ) : (tabs[currentTabIndex]?.content)
                }
            </div>
            <SavedDrafts onConfirm={redirectToMyListings} />
        </div>
    );
}

type TabProp = {
    id: string
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    content: React.ReactNode,
};
