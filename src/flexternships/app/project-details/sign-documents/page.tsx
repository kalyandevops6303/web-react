import LeftSideBarProjectDetails from '../../components/pages/project-details/LeftSideBarProjectDetails';
import LegalDocCard from '../../components/pages/project-details/sign-documents/LegalDocCard';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { useLegalStore } from '@/flexternships/stores/legal-store';
import { useEffect } from 'react';
import { isEmpty, toUpper } from 'lodash';
import { ArrowLeft } from 'react-feather';
import { DocTypes } from '@/flexternships/constraints/enums/project-enums';
import BreadCrumbs from '../../components/pages/project-details/BreadCrumbs';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';

export default function FlexternshipsContractView() {
  const getLegalDocDetails = useLegalStore((state) => state.getLegalDocDetails);

  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const params: Readonly<Params<string>> = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(projectDetails) && !projectDetails.isDocumentsNeeded) {
      throw new Error('Documents are not needed for this project');
    }
  }, [projectDetails.isDocumentsNeeded]);

  useEffect(() => {
    getLegalDocDetails(params?.projectId, toUpper(params?.docType));
    getProjectDetails(params?.projectId as string);
  }, [getLegalDocDetails]);

  return (
    <div>
      <BreadCrumbs
        steps={[
          {
            title: 'Projects',
            link: '/projects/ongoing',
          },
          {
            title: projectDetails?.details?.name ?? 'Unknown Project',
            link: `/project-details/${params?.projectId}/team`,
          },
          {
            title: 'Projects',
            link: `/project-details/${params?.projectId}/projects`,
          },
          {
            title: toUpper(params?.docType) === DocTypes.CONTRACT ? 'Contract' : 'NDA',
            link: `/project-details/${params?.projectId}/doc/${params?.docType}`,
          },
        ]}
      />
      <div className=" w-full mt-5 flex flex-row items-start justify-start gap-5 max-w-screen">
        <LeftSideBarProjectDetails />
        <div className="w-full">
          <div
            className="flex items-center gap-2 cursor-pointer mb-5"
            onClick={() => navigate(`/project-details/${params?.projectId}/projects`)}
          >
            <div className="p-1 bg-[#0185E4] w-min text-white rounded-full">
              <ArrowLeft size="20px" />
            </div>
            <div className="text-[#0185E4] font-montserrat text-[16px] font-medium leading-normal not-italic">
              Go to Project
            </div>
          </div>
          <LegalDocCard docType={params?.docType as string} />
        </div>
      </div>
    </div>
  );
}
