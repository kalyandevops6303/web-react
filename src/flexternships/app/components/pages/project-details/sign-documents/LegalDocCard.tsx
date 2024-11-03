import { useState, useEffect } from "react";
import SimpleElevatedCard from "../../../core/cards/SimpleElevatedCard";
import Styles from '@flexternships/styles/pages/project-details/sign-document/sign-document.content.module.css';

import { Checkbox } from "@flexternships/app/components/ui/checkbox"
import { DocTypes } from "@/flexternships/constraints/enums/project-enums";
import { toLower } from "lodash";
import LegalDocSignee from "./LegalDocSignee";
import { UserType } from "@/flexternships/constraints/enums/core-enums";
import { useLegalStore } from "@/flexternships/stores/legal-store";

export default function LegalDocCard(props: LegalDocCardProps) {

    const { docType } = props;

    const legalDocDetails = useLegalStore((state) => state.legal?.details);

    const clientSigneeData = {
        company: 'Trusted Business Systems',
        name: 'Anil Chad',
        image_uri: 'https://github.com/shadcn.png',
        signed: true,
        signed_date: '21st Aug 2023'
    }

    const talentSigneeData = [
        {
            role: 'Role',
            name: 'Jane Doe',
            image_uri: 'https://github.com/shadcn.png',
            signed: true,
            signed_date: '11th Aug 2023'
        },
        {
            role: 'Role',
            name: 'Jane Doe',
            image_uri: 'https://github.com/shadcn.png',
            signed: false,
            signed_date: '11th Aug 2023'
        }
    ]

    const [termsRead, setTermsRead] = useState(false);



    return (
        <SimpleElevatedCard className="w-full max-w-[1021px] p-5">
            <div className={Styles.contentHeader}>Standard {docType === toLower(DocTypes.NDA) ? 'NDA' : 'Contract'}</div>
            <SimpleElevatedCard className="bg-white p-5 ">
                <div className={Styles.contentHeader}>{docType === toLower(DocTypes.NDA) ? 'NDA' : 'Contract'}</div>
                <div dangerouslySetInnerHTML={{ __html: legalDocDetails?.doc_content }}  className="text-[#5E5873] font-montserrat text-[16px] font-normal leading-[24px] max-h-[700px] overflow-y-scroll">
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
                <LegalDocSignee
                    {...clientSigneeData}
                    userType={UserType.CLIENT}
                />
            </div>

            <div className="mt-10">
                <div className="text-[#6E6B7B] font-semibold font-montserrat text-base leading-[21px] mb-3">Team name / Team member</div>
                {talentSigneeData?.map((item) => (
                    <div className="my-5">
                    <LegalDocSignee
                        {...item}
                        userType={UserType.TALENT}
                        disabled={!termsRead}
                    />
                    </div>
                ))}
            </div>


        </SimpleElevatedCard>
    )
}

type LegalDocCardProps = {
    docType: string
}