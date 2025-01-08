import { useState } from 'react';
import { CommenterType } from '@/flexternships/constraints/enums/project-enums';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { getUserTimezone } from '@/flexternships/utils/core-utils';
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
    _id: string;
  };
  createdAt: number;
}

const CommentBox = ({ comment, giverDetails, milestoneInfo, createdAt }: CommentBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Date = formatEpochToHumanReadable(createdAt, false, false, getUserTimezone());
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const renderText = () => {
    if (isExpanded) {
      return (
        <>
          {comment}
          <span className="text-blue-500 cursor-pointer" onClick={toggleReadMore}>
            {' '}
            Read Less
          </span>
        </>
      );
    }

    const truncatedText = comment.length > 242 ? comment.substring(0, 242) + '...' : comment;

    return (
      <>
        {truncatedText}
        {comment.length > 242 && (
          <span className="text-blue-500 cursor-pointer" onClick={toggleReadMore}>
            {' '}
            Read More
          </span>
        )}
      </>
    );
  };

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
              <p className="text-sm text-gray-500 font-normal">
                {giverDetails.appRole === CommenterType.FLEXTERN_CLIENT ? 'Manager' : 'Mentor'}
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <span className="font-medium">Milestone {milestoneInfo.seq}: </span>
            <span className="ml-1">{milestoneInfo.name}</span>
          </div>
        </div>
        <div className="w-px bg-[#EBE9F1]"></div>
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <div>
            <p className="text-xs text-gray-300">{Date}</p>
          </div>

          <div className="text-sm text-gray-500">{renderText()}</div>
        </div>
      </div>
    </div>
  );
};
export default CommentBox;
