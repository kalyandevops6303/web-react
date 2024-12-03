import GenericModal from '../GenericModal';
import { ProjectCreationFormData } from '@/flexternships/constraints/types/project-creation-types';
import Styles from '@flexternships/styles/components/core/modals/flextern-project-details-modal.module.css';
import TabStyles from '@flexternships/styles/pages/create-project/tabs.module.css';
import ProjectDetailsItem from '../../../pages/create-project/tabs/preview/ProjectDetailsItem';
import { getUserTimezone } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import HorizontalFileCard from '../../files/HorizontalFileCard';
import { formatFileSize } from '@/flexternships/utils/file-utils';
import { getFileDownloadUrl } from '@/flexternships/services/project-management-v2';
import RoleItem from '../../../pages/create-project/tabs/preview/RoleItem';
import MilestoneItem from '../../../pages/create-project/tabs/preview/MilestoneItem';
import PrimaryButton from '../../buttons/PrimaryButton';
import { ChevronRight } from 'react-feather';

export default function FlexternProjectDetailsModal(props: FlexternProjectDetailsModalProps) {
  const { data, isOpen, onClose, onConfirm } = props;

  console.log(data);

  return (
    <GenericModal className="max-w-[1240px]" isOpen={isOpen} onClose={onClose}>
      {/* TODO: Add Accordions */}
      <div
        className={`flex flex-col gap-y-6 py-8 px-6 bg-white-fa rounded-md max-h-[80vh] overflow-y-scroll overflow-x-hidden ${TabStyles.previewTab}`}
      >
        <div className={Styles.projectDetailsCard}>
          <div className={Styles.projectDetailsCardHeader}>Project Details</div>
          <div className={Styles.projectDetailsCardBody}>
            <ProjectDetailsItem
              className="w-[460px] m-0"
              title="Project name"
              value={'Usage Data Collection and Payment' || 'NaN'}
            />
            <ProjectDetailsItem
              className="w-[333px] m-0"
              title="Department Name (BU)"
              value={'Research & Development' || 'NaN'}
            />
            <ProjectDetailsItem
              className="w-[237px] m-0"
              title="Estimated Duration"
              value={`5 weeks`}
              tooltip="Estimated duration of the project in weeks"
            />
            <ProjectDetailsItem
              className="w-[204px] m-0"
              title="Estimated Start Date"
              value={formatEpochToHumanReadable(0, false, false, getUserTimezone())}
            />
            <ProjectDetailsItem
              className="w-[230px] m-0"
              title="Total Milestones"
              value={`3`.padStart(2, '0') || 'NaN'}
            />
            <ProjectDetailsItem
              className="w-[333px] m-0"
              title="Estimated Hours/Week per Flextern"
              value={`20hrs weekly`}
              tooltip="Estimated weekly work-hours for each flextern"
            />
            <ProjectDetailsItem
              className="w-[237px] m-0"
              title="Total Hours per Flextern"
              value={`70hrs`}
              tooltip="Total project hours for each flextern"
            />
          </div>
        </div>

        <div className={Styles.projectDetailsCard}>
          <div className={Styles.projectDetailsCardHeader}>Project Description</div>
          <div className={Styles.projectDetailsCardBody}>
            <div className="text-base text-grey-heading font-normal leading-6">
              The data collection and payment system is designed to allow automotive companies to compensate users for
              sharing their data. By collecting data such as driving habits, vehicle usage, road conditions and other
              environmental data, valuable insights that can be created to support autonomous driving.
            </div>
          </div>
        </div>
        {/* TODO: Project Files */}
        <HorizontalFileCard
          className="m-0"
          fileName={'Project_Description.pdf'}
          fileSize={formatFileSize(1000000)}
          createdAt={formatEpochToHumanReadable(1717334400)}
          generateDownloadLink={async () => await getFileDownloadUrl('123')}
        />

        <div className={Styles.projectDetailsCard}>
          <div className={Styles.projectDetailsCardHeader}>Roles</div>
          <div className={Styles.projectDetailsCardBody}>
            <div className={`${TabStyles.rolesPreview} m-0`}>
              <div className={TabStyles.rolesPreviewHeader}>
                <div className={`${TabStyles.rolesPreviewHeaderItem} w-[240px]`}>Role</div>
                <div className={`${TabStyles.rolesPreviewHeaderItem} w-[100px]`}>Count</div>
                <div className={`${TabStyles.rolesPreviewHeaderItem} grow`}>Skills</div>
                <div className={`${TabStyles.rolesPreviewHeaderItem} grow`}>Tools</div>
              </div>
              <div>
                {/* TODO: Add roles */}
                <RoleItem
                  data={{
                    role: { _id: '123', name: 'Data Analyst' },
                    count: 1,
                    skills: [
                      { _id: '123', name: 'Data Analysis' },
                      { _id: '123', name: 'Python' },
                      { _id: '123', name: 'SQL' },
                    ],
                    tools: [
                      { _id: '123', name: 'Python' },
                      { _id: '123', name: 'SQL' },
                    ],
                  }}
                  last={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.projectDetailsCard}>
          <div className={Styles.projectDetailsCardHeader}>Milestones</div>
          <div className={Styles.projectDetailsCardBody}>
            <div className={`${TabStyles.milestonesPreview} m-0`}>
              <div className={TabStyles.milestonesPreviewHeader}>
                <div className={`${TabStyles.milestonesPreviewHeaderItem} w-[200px]`}>Milestone Count</div>
                <div className={`${TabStyles.milestonesPreviewHeaderItem} w-[120px]`}>Duration</div>
                <div className={`${TabStyles.milestonesPreviewHeaderItem} grow`}>Milestone Name</div>
              </div>
              <div className={TabStyles.milestonesPreviewBody}>
                {/* TODO: Add milestones */}
                <MilestoneItem
                  data={{
                    _id: '123',
                    title: 'Data Collection',
                    duration: 5,
                    description: 'Data Collection',
                    deliverables: ['Data Collection'],
                  }}
                  milestoneIndex={0}
                  last={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          {/* TODO: Conditionally show these CTAs */}
          {onConfirm && (
            <PrimaryButton onClick={onConfirm}>
              View Project <ChevronRight size={16} />
            </PrimaryButton>
          )}
        </div>
      </div>
    </GenericModal>
  );
}

type FlexternProjectDetailsModalProps = {
  data: Partial<ProjectCreationFormData>;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};
