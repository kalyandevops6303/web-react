import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import GiveRecognitionTalentCard from './GiveRecognitionTalentCard';
import PrimaryButton from '../../../core/buttons/PrimaryButton';

export default function GiveRecognition() {
  return (
    <SimpleElevatedCard className="bg-white p-6 flex flex-col gap-y-5">
      <div>
        <div className="text-base text-grey-600 font-medium leading-6">
          Do you see impressive work or contribution from team member(s)? Recognize with a WOW!
        </div>
        <div>
          {/* TODO: select a milestone */}
          {/* <SingleSelectInput name="milestone" control={{}} label="Milestone" loadOptions={async () => ({metadata: {
                current_page: 1,
                page_size: 10,
                total_records: 10,
                has_next_page: false,
            }, data: [{_id: '1', name: 'Milestone 1'}, {_id: '2', name: 'Milestone 2'}]})} /> */}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="text-grey-300 text-xs font-semibold leading-5 text-uppercase">Selected 2/7</div>
        <div className="flex flex-col gap-y-5">
          {/* TODO: select team members */}
          <GiveRecognitionTalentCard selected />
          <GiveRecognitionTalentCard />
        </div>
      </div>
      <div>
        <PrimaryButton className="m-0" onClick={() => {}}>
          Submit
        </PrimaryButton>
      </div>
    </SimpleElevatedCard>
  );
}
