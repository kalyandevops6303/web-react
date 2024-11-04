import { UserType } from "@/flexternships/constraints/enums/core-enums";
import { Avatar, AvatarFallback, AvatarImage } from "@flexternships/app/components/ui/avatar"
import PrimaryButton from "../../../core/buttons/PrimaryButton";
import { Check, User } from "react-feather";
import { useEffect } from "react";

export default function LegalDocSignee(props: LegalDocSigneeProps) {
    const { userType, company, image_uri, name, role, signed, signedDate, disabled } = props;

    return (
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={image_uri} />
                    <AvatarFallback><User color="#6E6B7B"/></AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="text-[#5E5873] font-medium font-montserrat">{userType === UserType.CLIENT ? company : name}</div>
                    <div className="text-[#6E6B7B] font-normal font-montserrat">{userType === UserType.CLIENT ? name : role}</div>
                </div>
            </div>

            <div className="flex flex-col">
                <PrimaryButton
                    disabled={disabled}
                    className={`${signed ? "bg-white border border-[#0185E4] text-[#0185E4] text-center font-medium font-montserrat text-sm tracking-[0.4px]" : "text-white text-center font-medium font-montserrat text-sm tracking-[0.4px]"} m-0 mb-2 flex w-[208px] h-[37px] p-[10px_22px] justify-center items-center gap-[8px] shrink-0`}
                    onClick={() => { }}
                >
                    <div className={`flex items-center ${signed && "gap-2"}`}>
                        <div className="bg-[#28C76F30] rounded-full p-[2px]">{signed && <Check size="15.429px" color="#28C76F" />}</div>
                        <div>{signed ? 'Confirmed' : 'Confirm Angreement'}</div>
                    </div>
                </PrimaryButton>
                <div className="text-[#6E6B7B] font-normal font-montserrat text-sm leading-[21px]">
                    <span className="font-medium">Sign on</span>: {signedDate?.toDateString()}
                </div>
            </div>
        </div>
    )

}

type LegalDocSigneeProps = {
    userType: string,
    company?: string,
    image_uri: string,
    name: string,
    role?: string,
    signed: boolean,
    signedDate?: Date
    disabled?: boolean
}