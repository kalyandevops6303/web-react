import TextInput from '../../../core/form/TextInput';
import SelectCompetencyCard from './SelectCompetencyCard';
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import checkedIcon from '@flexternships/assets/icons/checkboxes/checked.svg';
import uncheckedIcon from '@flexternships/assets/icons/checkboxes/unchecked.svg';
import Rating from '../../../core/feedback/Rating';

export default function GiveRecognitionTalentCard(props: GiveRecognitionTalentCardProps) {
  const { selected } = props;
  return (
    <div
      className={`flex flex-col gap-y-4 py-3 px-6 rounded-lg ${selected ? 'bg-trublue-light' : 'bg-white shadow-card'}`}
    >
      <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2">
        <div className="flex flex-row items-center gap-x-3">
          <div>
            <img src={selected ? checkedIcon : uncheckedIcon} alt="checkbox" />
          </div>
          <div className="flex flex-row items-center gap-x-4">
            <Avatar className="size-8">
              <AvatarImage src={''} />
              <AvatarFallback
                className="p-2 font-semibold text-sm"
                style={{
                  color: stringToColour('Varun Yadav'),
                  backgroundColor: `${stringToColour('Varun Yadav', { opacity: 10 })}`,
                }}
              >
                {'Varun Yadav'.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-[400px] text-sm font-semibold leading-5.5 text-grey">Varun Yadav</div>
          </div>
        </div>
        <div className="w-[200px] text-sm text-grey font-medium leading-5.5">Frontend Developer</div>
        <div>
          <Rating rating={3} ratingColor="#0185E4" showTotalScore />
        </div>
      </div>
      {selected && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <div className="text-sm font-medium leading-5.5 text-grey-600">
              Select applicable competencies <span className="text-error">*</span>
            </div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
              <SelectCompetencyCard text="Communication" value="communication" selected={true} onClick={() => {}} />
              <SelectCompetencyCard text="Communication" value="communication" selected={false} onClick={() => {}} />
            </div>
          </div>
          <div>
            <TextInput
              label="Your comment"
              textarea
              required
              placeholder="Please enter your comment"
              className="w-full"
              value={''}
              onChange={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

type GiveRecognitionTalentCardProps = {
  selected?: boolean;
};
