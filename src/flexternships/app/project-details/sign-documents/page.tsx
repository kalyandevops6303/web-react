import LeftSideBarProjectDetails from '../../components/pages/project-details/LeftSideBarProjectDetails';
import LegalDocCard from '../../components/pages/project-details/sign-documents/LegalDocCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useLegalStore } from '@/flexternships/stores/legal-store';
import { useEffect } from 'react';
import { toUpper } from 'lodash';
import { ArrowLeft } from 'react-feather';

export default function FlexternshipsContractView() {
  const params = useParams();
  const getLegalDocDetails = useLegalStore((state) => state.getLegalDocDetails);

  const navigate = useNavigate();

  useEffect(() => {
    getLegalDocDetails(params?.projectId, toUpper(params?.docType));
  }, [getLegalDocDetails]);

  return (
    <div>
      <div className='flex items-center gap-1 cursor-pointer'
        onClick={() => navigate(`/project-details/${params?.projectId}/projects`)}
      >
        <div className='p-1 bg-[#0185E4] w-min text-white rounded-full'>
          <ArrowLeft size="20px" />
        </div>
        <div className='text-[#0185E4] font-montserrat text-[16px] font-light leading-normal' >Sign Contract</div>
      </div>
      <div className=" w-full mt-5 flex flex-row items-start justify-start gap-5 max-w-screen">
        <LeftSideBarProjectDetails />
        <LegalDocCard docType={params?.docType as string} />
      </div>
    </div>
  );
}
