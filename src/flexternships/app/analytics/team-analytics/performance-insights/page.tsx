// 'use client'; // For NextJS App

import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';
import PerformanceInsightsCard from '@/flexternships/app/components/pages/analytics/team-analytics/performance-insights/PerformanceInsightsCard';
import { mockCompetencies } from '@/flexternships/mocks/competency-data';
// import { useState } from 'react';
import { ArrowLeft, Upload } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';

export default function TeamPerformanceInsights() {
  // const [isCompetenciesLoading, setIsCompetenciesLoading] = useState<boolean>(false);

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
          {/* TODO: Future export functionality */}
          <SecondaryButton className="m-0 cursor-not-allowed" onClick={() => {}} disabled>
            <Upload className="mr-2" size={18} />
            Export
          </SecondaryButton>
        </div>
        <div className="flex flex-col gap-y-4">
          {mockCompetencies.map((competencyItem) => (
            <PerformanceInsightsCard competencyItem={competencyItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
