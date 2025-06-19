import CustomBreadCrumbs from '../../components/core/CustomBreadCrumbs';
import ProjectSection from '../../components/pages/private-dashboard/ProjectSection';
import AssessmentSection from '../../components/pages/assessments/AssessmentSection';

export default function TalentPrivateDashboard() {
  return (
    <div>
      {/* Breadcrumbs */}
      <CustomBreadCrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Projects' }]} />
      <div className="flex flex-col gap-6 mt-8">
        <AssessmentSection />
        <ProjectSection />
      </div>
    </div>
  );
}
