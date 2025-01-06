import { Card, CardText, Row } from 'reactstrap';
import { useState } from 'react';
import { convertUnixTimestampToDate } from '@/utility/Utils';
interface CommentBoxProps {
  comment: string;
  giverDetails: {
    image_uri: string;
    first_name: string;
    last_name: string;
    user_id: string;
    app_role: string;
    user_type: string;
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
  const Date = convertUnixTimestampToDate(createdAt);
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
    <Card className="w-full p-4 flex m-0">
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <div className="flex flex-col gap-5 w-full md:w-1/3">
          <Row>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-200">
                <img src={giverDetails.image_uri} alt="user" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">
                  {giverDetails.first_name}
                  <span> </span>
                  {giverDetails.last_name}
                </h4>
                <p className="text-sm text-gray-500">{giverDetails.user_type}</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="flex items-center">
              Milestone {milestoneInfo.seq}: {milestoneInfo.name}
            </div>
          </Row>
        </div>
        <div className="w-[1px] bg-gray-300"></div>
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <Row>
            <div>
              <p className="text-xs text-gray-300">{Date}</p>
            </div>
          </Row>
          <Row>
            <CardText className="text-sm text-gray-500">{renderText()}</CardText>
          </Row>
        </div>
      </div>
    </Card>
  );
};
export default CommentBox;
