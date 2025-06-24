import { DropdownOption } from '@/flexternships/constraints/types/form-types';
import { MatrixCell } from '@/flexternships/constraints/types/form-types';
import ExcelGrid from './ExcelGrid';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '../../../ui/dropdown-menu';
import TextBox from '../../../core/surveys/TextBox';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import { leaderOptions, teamColumns } from '@/flexternships/mocks/meeting-feedback';
import MatrixElements from './MatrixElements';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { ChevronDown } from 'react-feather';

interface TeamFeedbackProps {
  teamMatrix: MatrixCell[][];
  setTeamMatrix: (matrix: MatrixCell[][]) => void;
  topLeaders: DropdownOption[];
  setTopLeaders: (leaders: DropdownOption[]) => void;
  qualitativeFeedback: string;
  setQualitativeFeedback: (feedback: string) => void;
}

const TeamFeedback = ({
  teamMatrix,
  setTeamMatrix,
  topLeaders,
  setTopLeaders,
  qualitativeFeedback,
  setQualitativeFeedback,
}: TeamFeedbackProps) => {
  const handleTeamSubmit = () => {
    console.log('Team Matrix:', teamMatrix);
    console.log(
      'Top Leaders:',
      topLeaders.map((l) => l.value),
    );
    console.log('Qualitative Feedback:', qualitativeFeedback);
  };

  const handleLeaderToggle = (leader: DropdownOption) => {
    const isSelected = topLeaders.some((l) => l.value === leader.value);
    if (isSelected) {
      setTopLeaders(topLeaders.filter((l) => l.value !== leader.value));
    } else {
      setTopLeaders([...topLeaders, leader]);
    }
  };

  const { headers } = MatrixElements({
    feedbackType: MilestoneFeedbackType.TEAM_FEEDBACK,
  });
  return (
    <div className="flex flex-col gap-8 py-4 px-6 w-full">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold text-grey-heading">Team Feedback</div>
        <ExcelGrid
          headers={teamColumns}
          firstColumn={headers}
          matrix={teamMatrix}
          onChange={setTeamMatrix}
          inputConfig
        />
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <div>
          <div className="font-semibold mb-1">Top Leaders</div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between w-64 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <span className="text-sm text-gray-700">
                {topLeaders.length > 0 ? `${topLeaders.length} selected` : 'Select top leaders'}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              {leaderOptions.map((leader) => (
                <DropdownMenuCheckboxItem
                  key={leader.value}
                  checked={topLeaders.some((l) => l.value === leader.value)}
                  onCheckedChange={() => handleLeaderToggle(leader)}
                >
                  {leader.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full">
          <div className="font-semibold mb-1">Qualitative Feedback</div>
          <TextBox
            id="qualitative-feedback"
            placeholder="Write qualitative feedback..."
            value={qualitativeFeedback}
            onChange={(value) => setQualitativeFeedback(value)}
            rows={3}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <PrimaryButton onClick={handleTeamSubmit}>Submit Feedback</PrimaryButton>
      </div>
    </div>
  );
};

export default TeamFeedback;
