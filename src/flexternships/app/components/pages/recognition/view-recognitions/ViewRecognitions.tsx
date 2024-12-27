import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import SelectTalentCard from './SelectTalentCard';
import ViewRecognitionManagerCard from './ViewRecognitionManagerCard';

export default function ViewRecognitions() {
  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-3">
        <SelectTalentCard selected />
        <SelectTalentCard />
        <SelectTalentCard />
        <SelectTalentCard />
      </div>
      <div className="grow">
        <SimpleElevatedCard className="bg-white p-6">
          <div className="flex flex-col gap-y-4">
            <div className="text-lg font-medium leading-[26px] text-grey-700">Timeline</div>
            {/* TODO: Select milestone */}
            <div></div>
          </div>
          {/* TODO: Add timeline */}
          <div className="flex flex-col gap-y-7 border-l-1 border-grey-border pl-6">
            <ViewRecognitionManagerCard />
            <ViewRecognitionManagerCard />
          </div>
        </SimpleElevatedCard>
      </div>
    </div>
  );
}
