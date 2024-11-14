import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { recognitionCardContent } from '@/flexternships/static/milestones-content';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import DefaultWow from '@/flexternships/assets/icons/core/wow/wow-default.svg';
import DisabledWow from '@/flexternships/assets/icons/core/wow/wow-disabled.svg';
import DefaultKudos from '@/flexternships/assets/icons/core/kudos/kudos-default.svg';
import DisabledKudos from '@/flexternships/assets/icons/core/kudos/kudos-disabled.svg';

export default function RecognitionCard(props: RecognitionCardProps) {
  const { isDisabled = false } = props;
  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const giveRecognition = () => {
    console.log('give recognition');
  };

  const recognitionIcon =
    userDetails.userType === UserType.CLIENT
      ? isDisabled
        ? DisabledWow
        : DefaultWow
      : isDisabled
      ? DisabledKudos
      : DefaultKudos;
  return (
    <div className="flex flex-row items-center justify-between p-4 rounded-lg border-1 border-solid border-trublue-secondary-500 bg-white">
      <div className="flex flex-row items-center gap-4">
        <img src={recognitionIcon} alt="recognition-icon" className="w-[38px] h-[38px]" />
        <div className="text-grey-heading text-[15px] not-italic leading-5 max-w-[814px]">
          <span className="font-semibold">{recognitionCardContent.title}: </span>
          <span>{recognitionCardContent.description[userDetails.userType]}</span>
        </div>
      </div>
      <PrimaryButton className="m-0 self-stretch" onClick={giveRecognition}>
        {recognitionCardContent.primaryCtaText[userDetails.userType]}
      </PrimaryButton>
    </div>
  );
}

type RecognitionCardProps = {
  isDisabled?: boolean;
};
