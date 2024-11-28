import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import HorizontalFileCard from '@flexternships/app/components/core/files/HorizontalFileCard';
import SuccessfulCreation from '@flexternships/app/components/core/modals/SuccessfulCreation';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { ModalType } from '@flexternships/types/project-creation-types';
import { createFlexternProject, getFileDownloadUrl } from '@flexternships/services/project-management-v2';
import { formatEpochToHumanReadable } from '@flexternships/utils/date-utils';
import { formatFileSize } from '@flexternships/utils/file-utils';
import MilestoneItem from './MilestoneItem';
import ProjectDetailsItem from './ProjectDetailsItem';
import RoleItem from './RoleItem';
import { getUserTimezone, showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore, useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { FlexternClientDetails } from '@/flexternships/constraints/types/core-types';
import { saveForLaterModalContent } from '@/flexternships/static/core-content';

export default function Preview() {
  const previousTab = useProjectCreationStore((state) => state.previousTab);
  const formData = useProjectCreationStore((state) => state.data);
  const isSaveDraftLoading = useProjectCreationStore((state) => state.isSaveDraftLoading);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);
  const openModal = useProjectCreationStore((state) => state.openModal);
  const closeModal = useProjectCreationStore((state) => state.closeModal);
  const resetProjectCreationStore = useProjectCreationStore((state) => state.resetStore);

  const modalContent = useAppStore((state) => state.modalContent);
  const setWip = useAppStore((state) => state.setWip);
  const unsetWip = useAppStore((state) => state.unsetWip);
  const closeGlobalModal = useAppStore((state) => state.closeModal);

  const [recallTimeLeft, setRecallTimeLeft] = useState<number>(-1);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const postProject = async () => {
      try {
        await createFlexternProject(formData, projectId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          closeModal();
          showToastMessage(ToastType.ERROR, error.message);
        } else {
          showToastMessage(ToastType.ERROR, 'Failed to create project. Please try again.');
        }
      }
    };

    if (recallTimeLeft > 0) {
      const timer = setTimeout(() => setRecallTimeLeft((cur) => cur - 1), 1000);
      return () => clearTimeout(timer);
    } else if (recallTimeLeft === 0) {
      postProject();
    }
  }, [recallTimeLeft, formData]);

  const handlePost = () => {
    setRecallTimeLeft(5);
    openModal(ModalType.PROJECT_CREATED);
  };

  const handleRecall = () => {
    setRecallTimeLeft(-1);
    closeModal();
  };

  const onSaveDraft = async () => {
    try {
      await saveAsDraft(projectId);
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to save draft. Please try again.');
    }
  };

  const closeSuccessfulCreation = () => {
    resetProjectCreationStore();
    closeModal();
    navigate('/marketplace/my_listings');
  };

  useEffect(() => {
    return () => {
      const onDiscard = () => {
        if (modalContent?.metadata?.nextPath) {
          navigate(modalContent.metadata.nextPath);
        }
        unsetWip();
      };
      setWip(saveForLaterModalContent, {
        onConfirm: async () => {
          await onSaveDraft();
          closeGlobalModal();
        },
        onCancel: onDiscard,
        onClose: closeGlobalModal,
      });
    };
  }, [modalContent?.metadata?.nextPath]);

  return (
    <div className={Styles.previewTab}>
      <div className={`${Styles.tabContent} shadow-card`}>
        <div className={Styles.tabContentHeader}>Project Details</div>
        <div className={Styles.previewCardBody}>
          <ProjectDetailsItem
            className="w-[460px] mb-5"
            title="Project name"
            value={formData.requirements.projectName || 'NaN'}
          />
          <ProjectDetailsItem
            className="w-[333px] mb-5"
            title="Department Name (BU)"
            value={(userDetails as FlexternClientDetails).departmentName || 'NaN'}
          />
          <ProjectDetailsItem
            className="w-[237px] mb-5"
            title="Estimated Duration"
            value={`${formData.requirements.estimatedDuration} weeks`}
            tooltip="Estimated duration of the project in weeks"
          />
          {/* <ProjectDetailsItem
            className="w-[280px] mb-5"
            title="Listing Duration"
            value={`${formatEpochToHumanReadable(
              formData.listingDetails.listingStartDate,
            )} to ${formatEpochToHumanReadable(formData.listingDetails.listingEndDate)}`}
          /> */}
          <ProjectDetailsItem
            className="w-[204px]"
            title="Estimated Start Date"
            value={formatEpochToHumanReadable(
              formData.requirements.estimatedStartDate,
              false,
              false,
              getUserTimezone(),
            )}
          />
          <ProjectDetailsItem
            className="w-[230px]"
            title="Total Milestones"
            value={`${formData.milestones.length}`.padStart(2, '0') || 'NaN'}
            // greymatter={`in ${formData.requirements.estimatedDuration} Weeks`}
          />
          <ProjectDetailsItem
            className="w-[333px]"
            title="Estimated Hours/Week per Flextern"
            value={`${formData.requirements.estimatedWeeklyHours}hrs weekly`}
            tooltip="Estimated weekly work-hours for each flextern"
          />
          <ProjectDetailsItem
            className="w-[237px]"
            title="Total Project Hours per Flextern"
            value={`${formData.requirements.totalProjectHoursEach}hrs`}
            tooltip="Total project hours for each flextern"
          />
        </div>
      </div>
      <div className={`${Styles.tabContent} shadow-card`}>
        <div className={Styles.tabContentHeader}>Project Description</div>
        <div className={Styles.previewCardBody}>
          <div className="mt-5 w-full text-grey-heading text-base not-italic font-normal leading-6">
            {formData.requirements.projectDescription || 'NaN'}
          </div>
        </div>
      </div>
      {/* TODO: Project File */}
      {formData.requirements.documents.map((item, index) => (
        <HorizontalFileCard
          key={index}
          fileName={item.fileName}
          fileSize={formatFileSize(item.size)}
          createdAt={formatEpochToHumanReadable(item.createdAt)}
          generateDownloadLink={async () => await getFileDownloadUrl(item.fileKey)}
        />
      ))}
      <div className={`${Styles.tabContent} shadow-card`}>
        <div className={Styles.tabContentHeader}>Roles</div>
        <div className={Styles.previewCardBody}>
          <div className={Styles.rolesPreview}>
            <div className={Styles.rolesPreviewHeader}>
              <div className={`${Styles.rolesPreviewHeaderItem} w-[240px]`}>Role</div>
              <div className={`${Styles.rolesPreviewHeaderItem} w-[100px]`}>Count</div>
              <div className={`${Styles.rolesPreviewHeaderItem} grow`}>Skills</div>
              <div className={`${Styles.rolesPreviewHeaderItem} grow`}>Tools</div>
            </div>
            <div>
              {formData.roles.map((role, index) => (
                <RoleItem key={index} data={role} last={formData.roles.length === index + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`${Styles.tabContent} shadow-card`}>
        <div className={Styles.tabContentHeader}>Milestones</div>
        <div className={Styles.previewCardBody}>
          <div className={Styles.milestonesPreview}>
            <div className={Styles.milestonesPreviewHeader}>
              <div className={`${Styles.milestonesPreviewHeaderItem} w-[200px]`}>Milestone Count</div>
              <div className={`${Styles.milestonesPreviewHeaderItem} w-[120px]`}>Duration</div>
              <div className={`${Styles.milestonesPreviewHeaderItem} grow`}>Milestone Name</div>
            </div>
            <div className={Styles.milestonesPreviewBody}>
              {formData.milestones.map((item, index) => (
                <MilestoneItem
                  key={index}
                  data={item}
                  milestoneIndex={index}
                  last={formData.milestones.length === index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.bottomActionsContainer}>
        {/* Make this a separate component */}
        <PrimaryIconText text="Back" icon={<ChevronLeft className="text-trublue" size={18} />} onClick={previousTab} />
        <div className={Styles.buttonsContainer}>
          <SecondaryButton className="mr-6" onClick={onSaveDraft} loading={isSaveDraftLoading}>
            Save as Draft
          </SecondaryButton>
          <PrimaryButton onClick={handlePost}>
            <span className="mr-2">Post</span>
            <ChevronRight size={18} />
          </PrimaryButton>
        </div>
      </div>
      <SuccessfulCreation recallTimeLeft={recallTimeLeft} onRecall={handleRecall} onConfirm={closeSuccessfulCreation} />
    </div>
  );
}
