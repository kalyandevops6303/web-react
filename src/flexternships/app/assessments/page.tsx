// import PreparingAssessmentModal from '../components/core/modals/assessments/PreparingAssessmentModal';
import CustomBreadCrumbs from '../components/core/CustomBreadCrumbs';
import PrimaryIconText from '../components/core/buttons/PrimaryIconText';
import { ChevronLeft, Info } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import routes from '@/flexternships/routes';
import InfoNote from '../components/core/InfoNote';
import AssessmentCard from '../components/pages/assessments/AssessmentCard';

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(routes.dashboard.path);
  };
  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <CustomBreadCrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Assessments' }]} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <PrimaryIconText
          icon={<ChevronLeft size={18} className="text-trublue-secondary-500" />}
          text="Dashboard"
          onClick={goBack}
        />
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-trublue-secondary-500 mr-6">
          <div>Sample Assessment</div>
          <Info size={16} className="text-trublue-secondary-500" />
        </div>
      </div>
      <div>
        <InfoNote note="You have been assigned to take following assessment(s). Please complete them at your earliest to expedite your flexternship process." />
      </div>
      <div className="flex flex-col gap-y-6">
        <AssessmentCard />
      </div>

      {/* <PreparingAssessmentModal isOpen={true} onClose={() => {}} /> */}
    </div>
  );
}
