'use client'; // Mark this component as Client Component
import { ArrowLeft, Box, Check, FileText, Users } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import TabNavigationForm from '@flexternships/app/components/pages/create-project/TabNavigationForm';
import Milestones from '@flexternships/app/components/pages/create-project/tabs/milestone/Milestones';
import Preview from '@flexternships/app/components/pages/create-project/tabs/preview/Preview';
import Requirements from '@flexternships/app/components/pages/create-project/tabs/Requirements';
import Roles from '@flexternships/app/components/pages/create-project/tabs/roles/Roles';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import routes from '@/flexternships/routes';

export default function CreateFlexternProject() {
  const isWorkInProgress = useAppStore((state) => state.isWip);
  const openGlobalModal = useAppStore((state) => state.openModal);

  const navigate = useNavigate();

  const tabs = [
    {
      id: 'requirements',
      title: 'Requirements',
      subtitle: 'Project Details',
      icon: <FileText size={20} />,
      content: <Requirements />,
    },
    {
      id: 'roles',
      title: 'Roles',
      subtitle: 'Define required roles',
      icon: <Users size={20} />,
      content: <Roles />,
    },
    {
      id: 'milestones',
      title: 'Milestones',
      subtitle: 'Enter tasks & deliverables',
      icon: <Box size={20} />,
      content: <Milestones />,
    },
    {
      id: 'preview',
      title: 'Preview',
      subtitle: 'Review before posting',
      icon: <Check size={20} />,
      content: <Preview />,
    },
  ];

  const onBack = () => {
    if (isWorkInProgress) {
      openGlobalModal(GlobalModalType.UNSAVED_WORK, undefined, undefined, { nextPath: routes.dashboard.path });
      return;
    }
    navigate(routes.dashboard.path);
  };

  return (
    <div className="flexternships-page p-6">
      <PrimaryIconText
        onClick={onBack}
        className={'mb-2.5'}
        text="Create Project"
        icon={<ArrowLeft className={'text-white'} size={18} />}
        bgDark
      />
      <TabNavigationForm tabs={tabs} />
    </div>
  );
}
