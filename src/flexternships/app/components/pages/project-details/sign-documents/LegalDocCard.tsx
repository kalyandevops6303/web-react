import { useState, useEffect } from "react";
import SimpleElevatedCard from "../../../core/cards/SimpleElevatedCard";
import Styles from '@flexternships/styles/pages/project-details/sign-document/sign-document.content.module.css';

import { Checkbox } from "@flexternships/app/components/ui/checkbox"
import { DocTypes } from "@/flexternships/constraints/enums/project-enums";
import { toLower } from "lodash";
import LegalDocSignee from "./LegalDocSignee";
import { UserType } from "@/flexternships/constraints/enums/core-enums";
import { useLegalStore } from "@/flexternships/stores/legal-store";
import { useProjectsStore } from "@/flexternships/stores/project-details-store";
import { useFlexternUserStore } from "@/flexternships/stores/core-stores";
import { useParams } from "react-router-dom";

export default function LegalDocCard(props: LegalDocCardProps) {

    const { docType } = props;

    const params = useParams();

    const legalDocDetails = useLegalStore((state) => state.legal?.details);
    const projectDetails = useProjectsStore((state) => state.projectDetails);
    const currentUserDetails = useFlexternUserStore((state) => state.userDetails);

    const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
    const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);

    const [termsRead, setTermsRead] = useState(false);

    const clientSigneeData = {
        company: projectDetails?.orgDetails?.company_name,
        name: `${projectDetails?.clientDetails?.first_name} ${projectDetails?.clientDetails?.last_name}`,
        image_uri: projectDetails?.clientInfo?.[0]?.imageUri ?? '',  // Fallback if imageUri is undefined
        signed: true,
        signedDate: new Date(legalDocDetails?.updated_at),
        userType: UserType.CLIENT,
        disabled: true,
        isCurrentUser: false
    };

    const talentSigneeData = legalDocDetails?.signatures?.map((signature: any) => {
        return {
            role: signature.role,
            name: `${signature.first_name} ${signature.last_name}`,
            image_uri: signature.image_uri,
            signed: signature.is_signed,
            signedDate: new Date(signature.signed_on),
            userType: UserType.TALENT,
            disabled: !termsRead || (signature.user_id != currentUserDetails?.id),
            isCurrentUser: (signature.user_id === currentUserDetails?.id)
        }
    })

    useEffect(() => {
        populateUserDetails()
        getProjectDetails(params?.projectId as string)
    }, [])

    return (
        <SimpleElevatedCard className="w-full max-w-[1021px] p-5">
            <div className={Styles.contentHeader}>Standard {docType === toLower(DocTypes.NDA) ? 'NDA' : 'Contract'}</div>
            <SimpleElevatedCard className="bg-white p-5 ">
                <div className={Styles.contentHeader}>{docType === toLower(DocTypes.NDA) ? 'NDA' : 'Contract'}</div>
                <div dangerouslySetInnerHTML={{ __html: legalDocDetails?.doc_content }} className="text-[#5E5873] font-montserrat text-[16px] font-normal leading-[24px] max-h-[700px] overflow-y-scroll">
                </div>
            </SimpleElevatedCard>

            <div className="flex items-center space-x-2 my-5">
                <Checkbox id="terms"
                    checked={termsRead}
                    onCheckedChange={() => setTermsRead(!termsRead)}
                />
                <label
                    htmlFor="terms"
                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    I have read Terms & Conditions
                </label>
            </div>

            <div className="mt-10">
                <div className="text-[#6E6B7B] font-semibold font-montserrat text-base leading-[21px] mb-3">Client</div>
                <LegalDocSignee {...clientSigneeData} />
            </div>

            <div className="mt-10">
                <div className="text-[#6E6B7B] font-semibold font-montserrat text-base leading-[21px] mb-3">Team name / Team member</div>
                {talentSigneeData?.map((item: any) => (
                    <div className="my-5">
                        <LegalDocSignee {...item} />
                    </div>
                ))}
            </div>


        </SimpleElevatedCard>
    )
}

type LegalDocCardProps = {
    docType: string
}