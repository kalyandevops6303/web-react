import CollapsableCard from "../../components/core/cards/CollapsableCard";

export default function InvitationCard() {

    const invitationCardData = {
        title: "Invitation",
        subtitle: "STEP 1",
        isCollapsible: false,
        bordered: true,
        isOpen: true,
        link: {
            text: "View Milestone(s)",
            href: "/milestone"
        }
    }

    return (
        <CollapsableCard
            {...invitationCardData}
        >
            children
        </CollapsableCard>
    )
}