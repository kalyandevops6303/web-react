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
import ExpandableText from '../../ExpandableText';
import SecondaryButton from '../../buttons/SecondaryButton';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '../../../ui/accordion';

export default function FlexternProjectDetailsModal(props: FlexternProjectDetailsModalProps) {
  const { data, isOpen, onClose, ctas } = props;

  return (
    <GenericModal onClose={onClose} className="max-w-[1240px] flex flex-col" isOpen={isOpen}>
      <div
        className={`flex flex-col gap-y-6 py-8 px-6 bg-white-fa rounded-md max-h-[80vh] overflow-y-scroll overflow-x-hidden ${TabStyles.previewTab}`}
      >
        <div className={Styles.projectDetailsCard}>
          <div className={`px-6 pt-6 pb-4 border-b-1 border-grey-border ${Styles.projectDetailsCardHeader}`}>
            Project Details
          </div>
          <div className={Styles.projectDetailsCardBody}>
            <ProjectDetailsItem
              className="w-[460px] m-0"
              title="Project name"
              value={data?.requirements?.projectName}
            />
            <ProjectDetailsItem
              className="w-[333px] m-0"
              title="Department Name (BU) *"
              value={data?.client?.departmentName}
            />
            <ProjectDetailsItem
              className="w-[237px] m-0"
              title="Estimated Duration"
              value={
                data?.requirements?.estimatedDuration ? `${data?.requirements?.estimatedDuration} weeks` : undefined
              }
              tooltip="Estimated duration of the project in weeks"
            />
            <ProjectDetailsItem
              className="w-[204px] m-0"
              title="Estimated Start Date"
              value={
                data?.requirements?.estimatedStartDate
                  ? formatEpochToHumanReadable(
                      data?.requirements?.estimatedStartDate || 0,
                      false,
                      false,
                      getUserTimezone(),
                    )
                  : undefined
              }
            />
            <ProjectDetailsItem
              className="w-[230px] m-0"
              title="Total Milestones"
              value={data?.milestones?.length ? `${data?.milestones?.length}`.padStart(2, '0') : undefined}
            />
            <ProjectDetailsItem
              className="w-[333px] m-0"
              title="Estimated Hours/Week per Flextern *"
              value={
                data?.requirements?.estimatedWeeklyHours
                  ? `${data?.requirements?.estimatedWeeklyHours}hrs weekly`
                  : undefined
              }
              tooltip="Estimated weekly work-hours for each flextern"
            />
            <ProjectDetailsItem
              className="w-[237px] m-0"
              title="Total Hours per Flextern"
              value={
                data?.requirements?.totalProjectHoursEach
                  ? `${data?.requirements?.totalProjectHoursEach}hrs`
                  : undefined
              }
              tooltip="Total project hours for each flextern"
            />
          </div>
        </div>

        <div className={Styles.projectDetailsCard}>
          <Accordion type="single" defaultValue="description" collapsible>
            <AccordionItem value="description" className="p-0 m-0 border-0">
              <AccordionTrigger
                className={`p-0 m-0 px-6 pt-6 pb-4 data-[state=open]:border-b-1 data-[state=open]:border-grey-border outline-none hover:no-underline`}
              >
                <div className={Styles.projectDetailsCardHeader}>Project Description</div>
              </AccordionTrigger>
              <AccordionContent className="p-0 m-0">
                <div className={Styles.projectDetailsCardBody}>
                  <ExpandableText
                    className="text-base text-grey-heading font-normal leading-6 max-w-full break-words"
                    charLimit={350}
                  >
                    {data?.requirements?.projectDescription || '(Add description)'}
                  </ExpandableText>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {(data?.requirements?.documents?.length ?? 0) > 0 &&
          data.requirements?.documents.map((document, index) => (
            <HorizontalFileCard
              key={index}
              className="m-0"
              fileName={document.fileName}
              fileSize={formatFileSize(document.size)}
              createdAt={formatEpochToHumanReadable(document.createdAt)}
              generateDownloadLink={async () => await getFileDownloadUrl(document.fileKey)}
            />
          ))}

        {(data?.roles?.length ?? 0) > 0 && (
          <div className={Styles.projectDetailsCard}>
            <Accordion type="single" collapsible>
              <AccordionItem value="roles" className="p-0 m-0 border-0">
                <AccordionTrigger
                  className={`p-0 m-0 px-6 pt-6 pb-4 data-[state=open]:border-b-1 data-[state=open]:border-grey-border hover:no-underline`}
                >
                  <div className={Styles.projectDetailsCardHeader}>Roles</div>
                </AccordionTrigger>
                <AccordionContent className="p-0 m-0">
                  <div className={Styles.projectDetailsCardBody}>
                    <div className={`${TabStyles.rolesPreview} m-0`}>
                      <div className={TabStyles.rolesPreviewHeader}>
                        <div className={`${TabStyles.rolesPreviewHeaderItem} w-[240px]`}>Roles</div>
                        <div className={`${TabStyles.rolesPreviewHeaderItem} w-[100px]`}>Count</div>
                        <div className={`${TabStyles.rolesPreviewHeaderItem} grow`}>Skills</div>
                        <div className={`${TabStyles.rolesPreviewHeaderItem} grow`}>Tools</div>
                      </div>
                      <div>
                        {data?.roles?.map((role, index) => (
                          <RoleItem key={index} data={role} last={index === (data?.roles?.length || 0) - 1} />
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {(data?.milestones?.length ?? 0) > 0 && (
          <div className={Styles.projectDetailsCard}>
            <Accordion type="single" collapsible>
              <AccordionItem value="milestones" className="p-0 m-0 border-0">
                <AccordionTrigger
                  className={`p-0 m-0 px-6 pt-6 pb-4 data-[state=open]:border-b-1 data-[state=open]:border-grey-border hover:no-underline`}
                >
                  <div className={Styles.projectDetailsCardHeader}>Milestones</div>
                </AccordionTrigger>
                <AccordionContent className="p-0 m-0">
                  <div className={Styles.projectDetailsCardBody}>
                    <div className={`${TabStyles.milestonesPreview} m-0`}>
                      <div className={TabStyles.milestonesPreviewHeader}>
                        <div className={`${TabStyles.milestonesPreviewHeaderItem} w-[200px]`}>Milestone Count</div>
                        <div className={`${TabStyles.milestonesPreviewHeaderItem} w-[120px]`}>Duration</div>
                        <div className={`${TabStyles.milestonesPreviewHeaderItem} grow`}>Milestone Name</div>
                      </div>
                      <div className={TabStyles.milestonesPreviewBody}>
                        {data?.milestones?.map((milestone, index) => (
                          <MilestoneItem
                            key={index}
                            data={milestone}
                            milestoneIndex={index}
                            last={index === (data?.milestones?.length || 0) - 1}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        <div className="flex flex-row gap-x-6 justify-end">
          {ctas.map((cta, index) =>
            cta.type === 'primary' ? (
              <PrimaryButton key={index} className="gap-x-1" onClick={cta.onClick}>
                {cta.label}
              </PrimaryButton>
            ) : (
              <SecondaryButton key={index} cancel={cta.error} className="gap-x-1" onClick={cta.onClick}>
                {cta.label}
              </SecondaryButton>
            ),
          )}
        </div>
      </div>
    </GenericModal>
  );
}

type FlexternProjectDetailsModalProps = {
  data: Partial<ProjectCreationFormData> & { client: { departmentName: string } };
  isOpen: boolean;
  onClose: () => void;
  ctas: {
    type: 'primary' | 'secondary';
    error?: boolean;
    label: string | React.ReactNode;
    onClick: () => void;
  }[];
};
