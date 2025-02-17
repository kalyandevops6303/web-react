import PreRelistProjectModal from '../modals/relist/PreRelistProjectModal';
import { useState } from 'react';
import RelistProjectInputModal from '../modals/relist/RelistProjectInputModal';
import RelistProjectConfirmationModal from '../modals/relist/RelistProjectConfirmationModal';
import { relistProject } from '@/flexternships/services/project-management-v2';
import { useNavigate } from 'react-router-dom';
import routes from '@/flexternships/routes';

export default function ProjectRelistFlow({ project, onClose }: ProjectRelistFlowProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [startDate, setStartDate] = useState<number | undefined>();

  const navigate = useNavigate();

  const handleStartDateChange = (date: number) => {
    setStartDate(date);
  };

  const confirmRelist = async () => {
    if (!startDate) throw new Error('Start date is required');
    await relistProject(project.id, startDate);
    handleNext();
  };

  const handleNext = () => {
    switch (currentStep) {
      case 0:
        setCurrentStep((cur) => cur + 1);
        break;
      case 1:
        setCurrentStep((cur) => cur + 1);
        break;
      case 2:
        navigate(`${routes.marketplace.path}/my_listings`);
        onClose();
        break;
    }
  };

  const flowSteps = [
    <PreRelistProjectModal isOpen onClose={onClose} onConfirm={handleNext} />,
    <RelistProjectInputModal
      isOpen
      onClose={onClose}
      onConfirm={confirmRelist}
      onStartDateChange={handleStartDateChange}
      startDate={startDate}
    />,
    <RelistProjectConfirmationModal
      isOpen
      onClose={onClose}
      onConfirm={handleNext}
      startDate={startDate}
      project={project}
    />,
  ];

  return flowSteps[currentStep];
}

interface ProjectRelistFlowProps {
  project: {
    id: string;
    name: string;
  };
  onClose: () => void;
}
