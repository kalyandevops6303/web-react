"use client" // Mark this component as Client Component
import { ArrowLeft, Box, Check, Clock, FileText, Users } from "react-feather";
import { useNavigate } from "react-router-dom";

import PrimaryIconText from "@flexternships/app/components/core/buttons/PrimaryIconText";
import TabNavigationForm from "@flexternships/app/components/pages/create-project/TabNavigationForm"
import Listing from "@flexternships/app/components/pages/create-project/tabs/Listing";
import Milestones from "@flexternships/app/components/pages/create-project/tabs/milestone/Milestones";
import Preview from "@flexternships/app/components/pages/create-project/tabs/preview/Preview";
import Requirements from "@flexternships/app/components/pages/create-project/tabs/Requirements";
import Roles from "@flexternships/app/components/pages/create-project/tabs/roles/Roles";
import SaveForLater from "../components/core/modals/SaveForLater";
import { useProjectCreationStore } from "@/flexternships/stores/project-creation-store";
import { ModalType } from "@/flexternships/constraints/types/project-creation-types";

export default function CreateFlexternProject() {
  const openModal = useProjectCreationStore((state) => state.openModal);
  const navigate = useNavigate();

  const tabs = [
    {
      id: "requirements",
      title: "Requirements",
      subtitle: "Project Details",
      icon: <FileText size={20} />,
      content: <Requirements />,
    },
    {
      id: "roles",
      title: "Roles",
      subtitle: "Define required roles",
      icon: <Users size={20} />,
      content: <Roles />
    },
    {
      id: "milestones",
      title: "Milestones",
      subtitle: "Enter tasks & deliverables",
      icon: <Box size={20} />,
      content: <Milestones />,
    },
    {
      id: "listing",
      title: "Listing",
      subtitle: "Add start and end date",
      icon: <Clock size={20} />,
      content: <Listing />,
    },
    {
      id: "preview",
      title: "Preview",
      subtitle: "Review before posting",
      icon: <Check size={20} />,
      content: <Preview />,
    },
  ]

  const onBack = () => {
    navigate('/dashboard');
  }

  const openSaveForLaterModal = () => {
    openModal(ModalType.SAVE_FOR_LATER);
  }


  return (
    <div className="flexternships-page p-6">
      <PrimaryIconText onClick={openSaveForLaterModal} className={'mb-2.5'} text='Create Project' icon={<ArrowLeft className={'text-white'} size={18} />} bgDark />
      <TabNavigationForm tabs={tabs} />
      <SaveForLater onCancel={onBack} />
    </div>
  )
}
