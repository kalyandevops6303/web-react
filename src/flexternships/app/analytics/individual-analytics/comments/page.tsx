import Statbox from '@/flexternships/app/components/pages/analytics/StatBox';
import { useState, useEffect } from 'react';
import CommentBox from '@/flexternships/app/components/pages/analytics/CommentBox';
import { ArrowLeft } from 'react-feather';
import { useParams, useNavigate } from 'react-router-dom';
import { getFlexternComments, getFlexternCommentCount } from '@/flexternships/services/project-details';
import { FlexternComments } from '@/flexternships/constraints/types/project-details-types';
import Spinner from '@/flexternships/app/components/core/Spinner';
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';

const Comments = () => {
  const defaultMetadata = {
    currentPage: 0,
    pageSize: 0,
    totalRecords: 0,
    hasNextPage: true,
  };
  const [flexternComments, setFlexternComments] = useState<FlexternComments>({
    comments: [],
    metadata: defaultMetadata,
  });

  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [overallCommentCount, setOverallCommentCount] = useState(0);
  const [mentorCommentCount, setMentorCommentCount] = useState(0);
  const [managerCommentCount, setManagerCommentCount] = useState(0);

  const { userId } = useParams();
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFelxternCommentCount();
    fetchMoreComments();
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        !isCommentsLoading &&
        flexternComments.metadata.hasNextPage
      ) {
        fetchMoreComments();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [flexternComments.metadata.hasNextPage, isCommentsLoading]);

  const fetchMoreComments = async () => {
    if (!userId) {
      throw new Error('Invalid page url or user id not found');
    }
    if (!projectId) {
      throw new Error('Invalid page url or project id not found');
    }
    setIsCommentsLoading(true);
    const data = await getFlexternComments(projectId, userId, flexternComments.metadata.currentPage + 1);
    setFlexternComments((cur: any) => ({
      metadata: data?.metadata || defaultMetadata,
      comments: [...cur.comments, ...(data?.comments || [])],
    }));
    setIsCommentsLoading(false);
  };

  const getFelxternCommentCount = async () => {
    if (!userId) {
      throw new Error('Invalid page url or user id not found');
    }
    if (!projectId) {
      throw new Error('Invalid page url or project id not found');
    }
    const data = await getFlexternCommentCount(projectId, userId);
    setOverallCommentCount(data?.overall || 0);
    setMentorCommentCount(data?.mentor || 0);
    setManagerCommentCount(data?.manager || 0);
  };

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(`/analytics/project/${projectId}/individual/${userId}`);
    }
  };

  return (
    <div className="pt-[70px] xl:pt-0">
      <div className="flexternships-page flex flex-col items-start gap-4 p-7 xl:p-0">
        <div>
          <CustomBreadCrumbs
            items={[
              { label: 'Analytics', href: `/analytics/project/${projectId}` },
              { label: 'Individual Analytics', href: `/analytics/project/${projectId}/individual/${userId}` },
              { label: 'Comments', href: `/analytics/${projectId}/individual/${userId}/comments` },
            ]}
            startWithHome={true}
          />
        </div>
        <div className="flex items-center gap-1 cursor-pointer mb-5" onClick={goBack}>
          <div className="p-1 bg-[#0185E4] w-min text-white rounded-full">
            <ArrowLeft size="20px" />
          </div>
          <div className="text-[#0185E4] font-montserrat text-base font-light leading-normal">Analytics</div>
        </div>
        <div className="flex flex-col items-start w-full">
          <div className="flex items-start p-5 gap-5 bg-white self-stretch rounded-lg">
            <Statbox title={overallCommentCount} desc="Overall Comments" />
            <Statbox title={managerCommentCount} desc="Manager Comments" />
            <Statbox title={mentorCommentCount} desc="Mentor Comments" />
          </div>
          <div className="flex flex-col items-start py-5 px-0 gap-7 self-stretch">
            <div>
              <h1 className="text-lg font-semibold">Detailed Comments</h1>
              <p className="text-sm text-gray-500">Project: Usage Data Collection and Payment</p>
            </div>
            <div className="gap-4 flex flex-col w-full">
              {flexternComments.comments.map((commentData) => (
                <CommentBox
                  comment={commentData.comment}
                  giverDetails={commentData.giverDetails}
                  milestoneInfo={commentData.milestoneInfo}
                  createdAt={commentData.createdAt}
                />
              ))}
            </div>
            {isCommentsLoading && (
              <div className="w-full flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
