import SteppedProgress from "@/flexternships/app/components/core/progress/SteppedProgress";
import VerticalTimeline from "@/flexternships/app/components/core/timelines/VerticalTimeline";
import { isEmpty } from "lodash";

export default function IndividualFeedbackResponse(props: any) {

    const { response } = props;

    const getResponseComponent = (data: any, index: number) => {
        return (
            <div className="flex flex-col gap-3 -ml-5">
                <div className="text-[14px] font-medium leading-[22px] text-[var(--Grey-600,#515759)] font-montserrat">{index + 1}. {data?.name}</div>
                {data?.values?.map((item: any) => (
                    <div>
                        {item?.type === 'rating' && <SteppedProgress value={item?.value} muted/>}
                        {item?.type === 'comment' && !isEmpty(item?.value) &&
                            <div className="rounded-md border border-[var(--Grey-50,#E6E7E7)] bg-[var(--Grey-0,#FFF)] px-3 py-2 min-h-[38px]">
                                <div className="text-[14px] font-medium leading-[22px] text-[var(--1-theme-color-heading-display-text,#5E5873)] font-montserrat">{item?.value}</div>
                            </div>}
                    </div>
                ))}
            </div>
        )
    }

    const timelineItems = response?.map((item: any, index: number) => {
        return (
            {
                component: getResponseComponent(item, index),
            }
        )
    })

    return (
        <div className="px-8">
            <VerticalTimeline timelineItems={timelineItems} checked/>
        </div>
    )
}

