import { useProjectsStore } from "@/flexternships/stores/project-details-store";
import LeftSideBarProjectDetails from "../../components/pages/project-details/LeftSideBarProjectDetails";
import LegalDocCard from "../../components/pages/project-details/sign-documents/LegalDocCard";
import { useParams } from "react-router-dom";
import { useLegalStore } from "@/flexternships/stores/legal-store";
import { useEffect } from "react";
import { toUpper } from "lodash";

export default function FlexternshipsContractView() {

    const params = useParams();
    const projectDetails = useProjectsStore((state) => state.projectDetails);
    const getLegalDocDetails = useLegalStore((state) => state.getLegalDocDetails);

    useEffect(() => {
        getLegalDocDetails(params?.projectId, toUpper(params?.docType));
    }, [getLegalDocDetails])

    useEffect(() => {
        console.log(projectDetails)
    }, [projectDetails])

    return ( 
        <div className=" w-full mt-5 flex flex-row items-start justify-start gap-5 max-w-screen">
            <LeftSideBarProjectDetails data={projectDetails} />
            <LegalDocCard 
                docType={params?.docType as string}
            />
        </div>
    )
}