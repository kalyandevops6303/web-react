// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { CardHeader, Col, Row } from 'reactstrap';
import { Container } from 'reactstrap';
import Statbox from './components/StatBox';
// import styled from 'styled-components';
import CommentBox from './components/CommentBox';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from './components/Breadcrumb';

const commentJson = [
  {
    _id: '6776b27072eb065adf54fba9',
    comment:
      'Collab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V goodCollab V good',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    competency_info: {
      name: 'Collaboration and Teamwork',
      _id: '6749790dee257cea5ae0f45e',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
  },
  {
    _id: '6776b27072eb065adf54fbaa',
    comment: 'V Good Communication',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    competency_info: {
      name: 'Communication',
      _id: '6749790dee257cea5ae0f45f',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
  },
  {
    _id: '6776b27072eb065adf54fbab',
    comment: 'V good leadership',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    competency_info: {
      name: 'Leadership',
      _id: '6749790eee257cea5ae0f460',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
  },
  {
    _id: '6776b27072eb065adf54fbac',
    comment: 'V good ownerhsip',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    competency_info: {
      name: 'Effectiveness/Productivity',
      _id: '6749790fee257cea5ae0f461',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
  },
  {
    _id: '6776b27072eb065adf54fbad',
    comment: 'V good analytical Thinking',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    competency_info: {
      name: 'Problem Solving',
      _id: '6749790fee257cea5ae0f462',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
  },
  {
    _id: '6776b27072eb065adf54fbae',
    comment: 'V good innovative thinking',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    competency_info: {
      name: 'Innovation',
      _id: '67497910ee257cea5ae0f463',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
  },
  {
    _id: '6776b27072eb065adf54fbaf',
    comment: 'v good improvement',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
    competency_info: {},
  },
  {
    _id: '6776b27072eb065adf54fbb0',
    comment: 'v good talent',
    created_at: 1735832176673,
    updated_at: 1735832176673,
    milestone_info: {
      name: 'Plan and Design',
      seq: 1,
      _id: '6762a741beae7c74b90e98a6',
    },
    project_info: {
      _id: '6762a741beae7c74b90e98a5',
      name: 'Blocked Testing Project',
    },
    giver_details: {
      image_uri:
        'https://trudevsa.blob.core.windows.net/tru-public/profile/64e3774eddb6aade15392440/cd377acb-7c99-43c4-aefc-4be5b78b04a8.jpg',
      first_name: 'Kavya Test',
      last_name: 'Sharma',
      user_id: '64e3774eddb6aade15392440',
      app_role: 'FLEXTERN_CLIENT',
      user_type: 'CLIENT',
    },
    competency_info: {},
  },
];
// const CommentsContainer = styled.div`
//   @media only screen and (max-device-width: 600px) {
//     .primary-row {
//       display: block;
//     }
//   }
//   @media only screen and (max-device-width: 1200px) {
//     .top-padding {
//     padding-top: 5rem;
//   }

// `;

const Comments = () => {
  const navigate = useNavigate();
  return (
    // <div className="flexternships-page">
    <div>
      {/* <CommentsContainer> */}
      <BreadCrumbs />

      <div className="flex items-center gap-1 cursor-pointer mb-5" onClick={() => navigate('/analytics')}>
        <div className="p-1 bg-[#0185E4] w-min text-white rounded-full">
          <ArrowLeft size="20px" />
        </div>
        <div className="text-[#0185E4] font-montserrat text-[16px] font-light leading-normal">Analytics</div>
      </div>

      <Container className="flex items-start p-5 gap-5 self-stretch rounded-lg">
        <Statbox title={commentJson.length} desc="Overall Comments" />
        {/* <Statbox title="12" desc="Manager Comments" />
            <Statbox title="12" desc="Mentor Comments" />
            <Statbox title="80%" desc="Positive Comments" /> */}
      </Container>
      <Container className="flex flex-col items-start py-5 px-0 gap-7 self-stretch">
        <div>
          <h1 className="text-lg font-semibold">Detailed Comments</h1>
          <p className="text-sm text-gray-500">Project: Usage Data Collection and Payment</p>
        </div>
        <div className="gap-4 flex flex-col w-full">
          {commentJson.map((comment) => (
            <CommentBox
              comment={comment.comment}
              giverDetails={comment.giver_details}
              milestoneInfo={comment.milestone_info}
              createdAt={comment.created_at}
            />
          ))}
        </div>
      </Container>
      {/* </CommentsContainer> */}
    </div>
    // </div>
  );
};

export default Comments;
