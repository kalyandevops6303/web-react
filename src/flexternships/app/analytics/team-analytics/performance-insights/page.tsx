// 'use client'; // For NextJS App

import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';
import CompetencyMatrix from '@/flexternships/app/components/pages/analytics/team-analytics/performance-insights/CompetencyMatrix';
import { ArrowLeft, Upload } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';

export default function TeamPerformanceInsights() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  /**
   * Handles navigation when user clicks back
   * If there is browser history, goes back one page
   * Otherwise redirects to dashboard as fallback
   */
  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back one page in history
    } else {
      navigate(`/project-details/${projectId}`); // Fallback to dashboard if no history
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <CustomBreadCrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Team Analytics', href: `/analytics/project/${projectId}/team` },
            { label: 'Team Performance Insights' },
          ]}
        />
      </div>
      <div className="text-trublue-secondary-500">
        <PrimaryIconText icon={<ArrowLeft size={18} />} text="Team Analytics" onClick={goBack} />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row justify-between items-center">
          <div className="text-grey-700 text-lg font-medium leading-[26px]">Team Performance Insights</div>
          {/* TODO: Implement export functionality or hide */}
          <SecondaryButton className="m-0" onClick={() => {}}>
            <Upload className="mr-2" size={18} />
            Export
          </SecondaryButton>
        </div>
        <div className="flex flex-col gap-y-4">
          {[
            { abbreviation: 'collab', name: 'Collaboration' },
            { abbreviation: 'comm', name: 'Communication' },
            { abbreviation: 'probl', name: 'Problem Solving' },
            { abbreviation: 'tech', name: 'Technical Skills' },
          ].map((competencyItem) => (
            <SimpleElevatedCard className="bg-white">
              <div className="flex flex-row items-end gap-x-2 px-5 py-4 border-b-1 border-grey-border">
                <div className="text-grey-700 text-lg font-medium leading-[26px]">{competencyItem.name}</div>
                <div className="flex flex-row items-center gap-x-0.5">
                  <span className="text-grey-900 text-lg font-semibold leading-[26px]">6</span>
                  <span className="text-grey-400 text-sm font-normal leading-5.5 mt-0.5 ">/10</span>
                </div>
                <div className="text-grey-500 text-xs font-normal leading-5">(Avg)</div>
              </div>
              <div className="p-5 flex flex-col gap-y-5">
                {/* TODO: Add AI Summary Card and implement grid layout */}
                <CompetencyMatrix competencyId={competencyItem.abbreviation} />
              </div>
            </SimpleElevatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
