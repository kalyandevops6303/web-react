'use client';

import FlatProgressBar from '@flexternships/app/components/core/FlatProgressBar';
import SavedDrafts from '@flexternships/app/components/core/modals/SavedDrafts';
import Styles from '@flexternships/styles/pages/create-project/tab-navigation-form.module.css';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { useNavigate } from 'react-router-dom';

export default function TabNavigationForm({ tabs }: { tabs: TabProp[] }) {
  const currentTabIndex = useProjectCreationStore((state) => state.currentTabIndex);
  const jumpToTab = useProjectCreationStore((state) => state.jumpToTab);

  const navigate = useNavigate();
  const handleTabJump = (index: number) => {
    if (index < currentTabIndex) {
      jumpToTab(index);
    }
  };

  const redirectToMyListings = () => {
    navigate('/marketplace/my_listings');
  };

  return (
    <div className={Styles.formContainer}>
      <div className={Styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <div
            className={`${Styles.tab} ${index <= currentTabIndex ? Styles.tabActive : Styles.tabInactive}`}
            key={tab.id}
            onClick={() => handleTabJump(index)}
          >
            <div className={Styles.tabIconContainer}>{tab.icon}</div>
            <div>
              <div className={Styles.tabTitle}>{tab.title}</div>
              <div className={Styles.tabSubtitle}>{tab.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Progress Bar */}
        <FlatProgressBar currentProgress={currentTabIndex + 1} maxProgress={tabs.length} />
      </div>
      <div className={Styles.formBodyContainer}>{tabs[currentTabIndex]?.content}</div>
      <SavedDrafts onConfirm={redirectToMyListings} />
    </div>
  );
}

type TabProp = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};
