import { ProjectTabType } from '@/flexternships/constraints/types/project-details-types';
import NavigationTab from './NavigationTab';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import React from 'react';
import PrimaryButton from '../../core/buttons/PrimaryButton';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';

export default function ProjectDetailsTabNavigation({ tabs }: { tabs: ProjectTabType[] }) {
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const projectLoading = useProjectsStore((state) => state.isProjectsLoading);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const navigate = useNavigate();
  const param = useParams();
  const milestoneId = param['milestoneId'];
  const projectStep = milestoneId ? 'milestone' : param['projectStep'];

  const handleGiveRecognition = () => {
    navigate(`/recognition/${param.projectId}`);
  };

  return (
    <div className="w-full">
      {isEmpty(milestoneId) && (
        <div className="flex justify-between items-end max-w-5xl">
          <div className=" bg-white w-fit flex flex-row items-start justify-start gap-1">
            {tabs.map((tab, index) => (
              <NavigationTab key={index} tab={tab} index={index} />
            ))}
          </div>
          {!projectLoading && (
            <PrimaryButton className="m-0" onClick={handleGiveRecognition} disabled={!projectDetails.giveRecognition}>
              {userDetails.userType === UserType.TALENT ? 'Give Kudos!' : 'Give a WOW!'}
            </PrimaryButton>
          )}
        </div>
      )}
      <div>
        {tabs.map((tab) => tab.id === projectStep && <React.Fragment key={tab.id}>{tab.component}</React.Fragment>)}
      </div>
    </div>
  );
}
