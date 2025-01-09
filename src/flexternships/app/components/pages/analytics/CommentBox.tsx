import { FlexternUserAppRole } from '@/flexternships/constraints/enums/core-enums';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { getUserTimezone } from '@/flexternships/utils/core-utils';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';
interface CommentBoxProps {
  comment: string;
  giverDetails: {
    imageUri: string;
    firstName: string;
    lastName: string;
    userId: string;
    appRole: string;
    userType: string;
  };
  milestoneInfo: {
    name: string;
    seq: number;
    id: string;
  };
  createdAt: number;
}

const CommentBox = ({ comment, giverDetails, milestoneInfo, createdAt }: CommentBoxProps) => {
  const formattedDate = formatEpochToHumanReadable(createdAt, false, false, getUserTimezone());
  return (
    <div className="w-full p-4 flex m-0 bg-white">
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <div className="flex flex-col gap-5 w-full md:w-1/3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200">
              <img src={giverDetails.imageUri} alt="user" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-medium">
                {giverDetails.firstName}
                <span> </span>
                {giverDetails.lastName}
              </div>
              <p className="text-sm text-grey-DEFAULT font-normal">
                {giverDetails.appRole === FlexternUserAppRole.FLEXTERN_CLIENT ? 'Manager' : 'Mentor'}
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <span className="font-medium">Milestone {milestoneInfo.seq}: </span>
            <span className="ml-1">{milestoneInfo.name}</span>
          </div>
        </div>
        <div className="w-px bg-grey-border"></div>
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <div>
            <p className="text-xs text-grey-muted">{formattedDate}</p>
          </div>
          <ExpandableText charLimit={250} className="text-sm text-grey-DEFAULT">
            {comment}
          </ExpandableText>
        </div>
      </div>
    </div>
  );
};
export default CommentBox;
