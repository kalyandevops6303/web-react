import CustomBreadCrumbs from '../../components/core/CustomBreadCrumbs';
import ProjectSection from '../../components/pages/private-dashboard/ProjectSection';
import DashboardAssessmentSection from '../../components/pages/assessments/DashboardAssessmentSection';
import routes from '@/flexternships/routes';

export default function TalentPrivateDashboard() {
  return (
    <div>
      {/* Breadcrumbs */}
      <CustomBreadCrumbs items={[{ label: 'Dashboard', href: routes.dashboard.path }, { label: 'Projects' }]} />
      <div className="flex flex-col gap-6 mt-8">
        <DashboardAssessmentSection />
        <ProjectSection />
      </div>
    </div>
  );
}
