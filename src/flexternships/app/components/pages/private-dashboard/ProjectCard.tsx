import FlexternAvatar from '../../core/avatars/FlexternAvatar';
import SimpleElevatedCard from '../../core/cards/SimpleElevatedCard';
import { Progress } from '../../ui/progress';
import { CheckCircle, ChevronRight, Clock } from 'react-feather';
import SecondaryButton from '../../core/buttons/SecondaryButton';
import SkillBadge from '../../core/badges/SkillBadge';
import { SkillBadgeType } from '@/flexternships/constraints/enums/miscellaneous-enums';
import { DashboardProject } from '@/flexternships/constraints/types/dashboard-types';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { MilestoneStatus, ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { DashboardMilestone } from '@/flexternships/constraints/types/dashboard-types';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import FlexternProjectDetailsModal from '../../core/modals/global/FlexternProjectDetailsModal';
import { parseDashboardProjectIntoProjectCreationFormData } from '@/flexternships/utils/parsing-utils';
import { useNavigate } from 'react-router-dom';
import routes from '@/flexternships/routes';
import { isEmpty } from 'lodash';
import ProjectStatusChip from '../project-details/project-card/ProjectStatusChip';
import { StatusType } from '@/flexternships/constraints/enums/project-enums';

function MilestoneChip({ milestone }: { milestone: DashboardMilestone }) {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const getMilestoneAvatarByStatus = (status: MilestoneStatus) => {
    if (status === MilestoneStatus.COMPLETED) {
      return <CheckCircle size={20} className="text-success" />;
    }
    if (status === MilestoneStatus.CREATED) {
      return <Clock size={20} className="text-grey-200" />;
    }
    return (
      <FlexternAvatar
        size="sm"
        className="w-7 h-7 text-xs border-2 border-white shadow-card"
        imageUri={userDetails.imageUri}
        name={`${userDetails.firstName} ${userDetails.lastName}`}
      />
    );
  };
  return (
    <div
      className={classNames('flex items-center gap-x-2 py-1.5 pl-2 pr-3 border-1 rounded-[28px]', {
        'border-grey-50': milestone.status === MilestoneStatus.CREATED,
        'border-orange bg-orange/10': milestone.status === MilestoneStatus.IN_PROGRESS,
        'border-success': milestone.status === MilestoneStatus.COMPLETED,
      })}
    >
      {getMilestoneAvatarByStatus(milestone.status)}
      <div
        className={classNames('text-xs font-medium leading-4', {
          'text-grey-200': milestone.status === MilestoneStatus.CREATED,
          'text-orange': milestone.status === MilestoneStatus.IN_PROGRESS,
          'text-grey-600': milestone.status === MilestoneStatus.COMPLETED,
        })}
      >
        {milestone.title}
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: { project: DashboardProject }) {
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);

  const navigate = useNavigate();

  const completedMilestonesCount = project.milestones.filter(
    (milestone) => milestone.status === MilestoneStatus.COMPLETED,
  ).length;
  const progress = Math.round((completedMilestonesCount / project.milestones.length) * 100);

  const handleProjectClick = () => {
    setIsProjectDetailsModalOpen(true);
  };

  const viewProject = () => {
    navigate(routes.projectDetails.generate(project.id));
  };

  const getProjectActions = () => {
    // if (project.primaryStatus === ProjectPrimaryStatus.ON_GOING) {
    //   return [
    //     <div className="flex flex-row gap-x-2 items-center">
    //               <SecondaryButton className="m-0" onClick={() => {}}>
    //                 Give Feedback
    //               </SecondaryButton>
    //               <div className="flex items-center gap-x-1">
    //                 <Info size={16} className="text-grey-300" />
    //                 Estimated time to complete feedback <span>3 mins</span>
    //               </div>
    //             </div>
    //   ];
    // }
    //  Pending on BE

    if (project.primaryStatus === ProjectPrimaryStatus.COMPLETED)
      return [
        <SecondaryButton className="m-0" onClick={handleProjectClick}>
          View Project
        </SecondaryButton>,
      ];

    return null;
  };

  const getProjectModalActions = (): { type: 'primary' | 'secondary'; label: ReactNode; onClick: () => void }[] => {
    if (project.primaryStatus === ProjectPrimaryStatus.WITHDRAWN) return [];

    return [
      {
        type: 'primary',
        label: (
          <>
            View Project <ChevronRight size={18} />
          </>
        ),
        onClick: viewProject,
      },
    ];
  };

  const projectActions = getProjectActions();

  return (
    <>
      <SimpleElevatedCard onClick={handleProjectClick} className="relative p-8 overflow-hidden bg-white">
        {!project.isRead && (
          <div className="absolute top-0 right-0 rounded-bl-[12px] flex flex-row items-center gap-x-1 px-2 py-[1px] bg-grey-50">
            <span className="bg-error size-1.5 rounded-full" />
            <span className="text-grey-heading text-xs font-semibold leading-4.5">New</span>
          </div>
        )}
        <ProjectStatusChip status={project.primaryStatus} statusType={StatusType.PRIMARY} />
        <div className="flex flex-row gap-x-6 flex-wrap lg:flex-nowrap">
          <div className="grow flex flex-col gap-y-4">
            <div className="mt-2 text-grey-600 text-lg font-medium leading-5.5">{project.details.projectName}</div>
            <div className="flex flex-row gap-x-9">
              <div className="flex flex-col gap-y-1">
                <div className="text-grey-heading text-base font-semibold leading-5">
                  {project.clientInfo.departmentName}
                </div>
                <div className="grow text-grey-500 text-sm font-normal leading-4.5">{project.cohortDetails.name}</div>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="text-grey-heading text-base font-semibold leading-5">Project Team</div>
                <div className="flex flex-row gap-x-2.5 items-center">
                  <div className="flex flex-row -space-x-1.5">
                    {project.team
                      .slice(0, 3)
                      .map(
                        (member, index) =>
                          member.userId && (
                            <FlexternAvatar
                              key={index}
                              size="sm"
                              className="w-7 h-7 text-xs border-2 border-white shadow-card cursor-default"
                              name={`${member.firstName} ${member.lastName}`}
                            />
                          ),
                      )}
                  </div>
                  {project.team.length > 3 && (
                    <div className="text-grey text-sm font-medium">+{project.team.length - 3}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-grey-400 text-xs font-medium leading-4">My Progress</div>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center">
                  {project.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex flex-row items-center">
                      <MilestoneChip milestone={milestone} />
                      {index < project.milestones.length - 1 && (
                        <div className="w-6 h-[1px] border-t border-dashed border-grey-50" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3" />
            </div>
          </div>
          <div className="grow flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <div className="text-xs font-medium leading-4 text-grey-400">Key Cohort Skills</div>
              <div className="flex flex-row gap-x-2 flex-wrap">
                {project.cohortDetails.skills.slice(0, 3).map((skill, index) => (
                  <SkillBadge key={index} name={skill.name} type={SkillBadgeType.COHORT} />
                ))}
                {project.cohortDetails.skills.length > 3 && (
                  <SkillBadge name={`+ ${project.cohortDetails.skills.length - 3}`} type={SkillBadgeType.COHORT} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-xs font-medium leading-4 text-grey-400">Project Skills</div>
              <div className="flex flex-row gap-x-2 flex-wrap">
                {project.skills.slice(0, 3).map((skill, index) => (
                  <SkillBadge key={index} name={skill.name} type={SkillBadgeType.PROJECT} />
                ))}
                {project.skills.length > 3 && (
                  <SkillBadge name={`+ ${project.skills.length - 3}`} type={SkillBadgeType.PROJECT} />
                )}
              </div>
            </div>
            {!isEmpty(projectActions) && (
              <div className="flex flex-col gap-y-2">
                <div className="text-xs font-medium leading-4 text-grey-400">Action(s) Required</div>
                <div className="flex flex-row gap-x-2 items-center">{projectActions}</div>
              </div>
            )}
          </div>
        </div>
      </SimpleElevatedCard>
      <FlexternProjectDetailsModal
        isOpen={isProjectDetailsModalOpen}
        onClose={() => setIsProjectDetailsModalOpen(false)}
        data={{
          ...parseDashboardProjectIntoProjectCreationFormData(project),
          client: { departmentName: project.clientInfo.departmentName },
        }}
        ctas={getProjectModalActions()}
      />
    </>
  );
}
