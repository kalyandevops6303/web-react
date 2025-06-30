import { FeedbackSkeletonItemType } from '@/flexternships/constraints/enums/feedback-enums';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneFeedbackInputCellType } from '@/flexternships/constraints/enums/feedback-enums';
import { useMilestoneFeedbackStore } from '@/flexternships/stores/feedback-store';
import { CellProps } from '@/flexternships/constraints/types/form-types';
import {
  getAreaCheckboxInputConfig,
  getNumberRatingInputConfig,
  getWowGroupInputConfig,
} from '@/flexternships/utils/miscellaneous-utils';

const MatrixElements = ({ feedbackType }: { feedbackType: MilestoneFeedbackType }) => {
  const { feedbackSkeletons } = useMilestoneFeedbackStore();
  const feedbackSkeleton = feedbackSkeletons.find((skeleton) => skeleton.type === feedbackType);
  const headers: CellProps[] =
    feedbackSkeleton?.elements
      .filter((element) =>
        [
          FeedbackSkeletonItemType.NUMBER_RATING,
          FeedbackSkeletonItemType.AREA_CHECKBOX,
          FeedbackSkeletonItemType.WOW_GROUP,
        ].includes(element.type as FeedbackSkeletonItemType),
      )
      .map((element) => {
        let inputConfig: CellProps['inputConfig'] = {
          type: MilestoneFeedbackInputCellType.STRING,
        };
        switch (element.type) {
          case FeedbackSkeletonItemType.NUMBER_RATING:
            inputConfig = getNumberRatingInputConfig(element);
            break;
          case FeedbackSkeletonItemType.WOW_GROUP:
            inputConfig = getWowGroupInputConfig(element);

            break;
          case FeedbackSkeletonItemType.AREA_CHECKBOX:
            inputConfig = getAreaCheckboxInputConfig(element);
            break;
        }

        return {
          value: element.tag?.text || '',
          identifier: element.name,
          backgroundColor: element.tag?.backgroundColor || '',
          color: element.tag?.color || '',
          inputConfig,
        };
      }) || [];

  if (feedbackType === MilestoneFeedbackType.INDIVIDUAL_FEEDBACK) {
    headers.push({
      value: 'Qualitative Feedback',
      identifier: 'qualitativeFeedback',
      backgroundColor: '#FF9F431F',
      color: '#FF9F43',
      inputConfig: {
        type: MilestoneFeedbackInputCellType.STRING,
        placeholder: 'Please type here',
      },
      width: 300,
    });
    headers.push({
      value: 'Competency',
      identifier: 'competency',
      backgroundColor: '#FF9F431F',
      color: '#FF9F43',
      inputConfig: {
        type: MilestoneFeedbackInputCellType.DROPDOWN,
        options:
          feedbackSkeleton?.elements
            ?.find((element) => element.type === FeedbackSkeletonItemType.WOW_GROUP)
            ?.competency?.choices?.map((choice: { name: string; id?: string }) => ({
              label: choice.name,
              value: choice.id || choice.name,
            })) || [],
        placeholder: 'Select competencies',
        isMultiSelect: true,
      },
    });
  }

  const commentsHeaders: CellProps[] =
    feedbackSkeleton?.elements
      .filter(
        (element) =>
          element.type === FeedbackSkeletonItemType.NUMBER_RATING || element.type === FeedbackSkeletonItemType.COMMENT,
      )
      .map((element) => {
        return {
          value: element.type === FeedbackSkeletonItemType.COMMENT ? element.title || '' : element.tag?.text || '',
          identifier: element.name,
          backgroundColor: element.tag?.backgroundColor || '',
          color: element.tag?.color || '',
        };
      }) || [];

  return {
    headers,
    commentsHeaders,
  };
};

export default MatrixElements;
