// import {
//     FeedbackSkeletonItemType,
//     FeedbackType,
//     } from "@/flexternships/constraints/enums/core-enums";
// import { MilestoneFeedbackInputCellType } from "@/flexternships/constraints/enums/feedback-enums";
// import { useCoreStore } from "@/flexternships/stores/core-store";
// import { CellProps } from "@/flexternships/constraints/types/form-types";
// import { useEffect } from "react";
// import {
//     getAreaCheckboxInputConfig,
//     getNumberRatingInputConfig,
//     getWowGroupInputConfig,
// } from "@/utils/miscellaneous-utils";

// const MatrixElements = ({ feedbackType }: { feedbackType: FeedbackType }) => {
//     const { feedbackSkeletons, populateFeedbackSkeletons } = useCoreStore();
//     const feedbackSkeleton = feedbackSkeletons.find(
//         (skeleton) => skeleton.type === feedbackType
//     );
//     useEffect(() => {
//         if (!feedbackSkeleton) {
//             populateFeedbackSkeletons();
//         }
//     }, [feedbackSkeleton, populateFeedbackSkeletons]);
//     console.log(feedbackSkeleton);

//     const headers: CellProps[] =
//         feedbackSkeleton?.elements
//             .filter((element) =>
//                 [
//                     FeedbackSkeletonItemType.NUMBER_RATING,
//                     FeedbackSkeletonItemType.AREA_CHECKBOX,
//                     FeedbackSkeletonItemType.WOW_GROUP,
//                 ].includes(element.type as FeedbackSkeletonItemType)
//             )
//             .map((element) => {
//                 let inputConfig: CellProps["inputConfig"] = {
//                     type: MilestoneFeedbackInputCellType.STRING,
//                 };
//                 switch (element.type) {
//                     case FeedbackSkeletonItemType.NUMBER_RATING:
//                         inputConfig = getNumberRatingInputConfig(element);
//                         break;
//                     case FeedbackSkeletonItemType.WOW_GROUP:
//                         inputConfig = getWowGroupInputConfig(element);

//                         break;
//                     case FeedbackSkeletonItemType.AREA_CHECKBOX:
//                         inputConfig = getAreaCheckboxInputConfig(element);
//                         break;
//                 }

//                 return {
//                     value: element.tag?.text || "",
//                     identifier: element.name,
//                     backgroundColor: element.tag?.backgroundColor || "",
//                     color: element.tag?.color || "",
//                     inputConfig,
//                 };
//             }) || [];

//     if (feedbackType === FeedbackType.MANAGER_TO_PEER) {
//         headers.push({
//             value: "Competency",
//             identifier: "competency",
//             backgroundColor: "#FF9F431F",
//             color: "#FF9F43",
//             inputConfig: {
//                 type: MilestoneFeedbackInputCellType.DROPDOWN,
//                 options:
//                     feedbackSkeleton?.elements
//                         ?.find(
//                             (element) => element.type === FeedbackSkeletonItemType.WOW_GROUP
//                         )
//                         ?.competency?.choices?.map((choice: { name: string }) => ({
//                             label: choice.name,
//                             value: choice.name,
//                         })) || [],
//                 placeholder: "Select competencies",
//             },
//         });
//     }

//     const commentsHeaders: CellProps[] =
//         feedbackSkeleton?.elements
//             .filter(
//                 (element) =>
//                     element.type === FeedbackSkeletonItemType.NUMBER_RATING ||
//                     element.type === FeedbackSkeletonItemType.COMMENT
//             )
//             .map((element) => {
//                 return {
//                     value:
//                         element.type === FeedbackSkeletonItemType.COMMENT
//                             ? element.title || ""
//                             : element.tag?.text || "",
//                     identifier: element.name,
//                     backgroundColor: element.tag?.backgroundColor || "",
//                     color: element.tag?.color || "",
//                 };
//             }) || [];

//     return {
//         headers,
//         commentsHeaders,
//     };
// };

// export default MatrixElements;
