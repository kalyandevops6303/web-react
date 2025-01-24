// 'use client'; // For NextJS App

// React and hooks
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// State management
import { useCompetenciesStore } from '@/flexternships/stores/competencies-store';

// Icons
import { ArrowLeft, Upload } from 'react-feather';

// Components
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import PerformanceInsightsCard from '@/flexternships/app/components/pages/analytics/team-analytics/performance-insights/PerformanceInsightsCard';
import Spinner from '@/flexternships/app/components/core/Spinner';

export default function TeamPerformanceInsights() {
  const isCompetenciesLoading = useCompetenciesStore((state) => state.isCompetenciesLoading);
  const competencies = useCompetenciesStore((state) => state.competencies);
  const populateCompetencies = useCompetenciesStore((state) => state.populateCompetencies);

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

  useEffect(() => {
    populateCompetencies();
  }, [populateCompetencies]);

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
      {isCompetenciesLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="size-10">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row justify-between items-center">
            <div className="text-grey-700 text-lg font-medium leading-[26px]">Team Performance Insights</div>
            {/* TODO: Future export functionality */}
            {/* <SecondaryButton className="m-0 cursor-not-allowed" onClick={() => {}} disabled>
              <Upload className="mr-2" size={18} />
              Export
            </SecondaryButton> */}
          </div>
          <div className="flex flex-col gap-y-4">
            {competencies.map((competencyItem) => (
              <PerformanceInsightsCard competencyItem={competencyItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
