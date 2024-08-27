import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardText, Label, NavLink, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import { ChevronRight, Link } from 'react-feather';
import { ProfileFormContainer } from '../style';
import { Input } from 'reactstrap';
import { AcceptModalWrapper } from '../../modals/style';
import Notepad from '../../../assets/images/youDidIt.gif';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsLink } from '../../../redux/actions/hiringActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const FULL_STACK_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const AI_ML_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const PRODUCT_MANAGER_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';

const InternXobinHiringItem = ({ listing }) => {

  return (
    <Card className="w-75">
      <CardHeader>
        <h4 className="m-0 mt-1">{listing?.name}</h4>
      </CardHeader>
      <hr className="m-0 card-header-border" />
      <CardBody>
        <CardText>Thank you for showing interest in Trumio. Click on
          <b> Take Assessment, </b>
          it will take you the Assessment platform where you need to provide your same email used to register Trumio, Name and Roll No. It will then take you to the assessment page.</CardText>
        <CardText>Before you start with the assessment, make sure to:</CardText>
        <ul>
          <li>Take up this assessment on a laptop or desktop rather than on a mobile phone.</li>
          <li>Close all other applications and browser tabs to ensure no distractions.</li>
          <li>Block time to start and finish the assessment in one go. Please make sure you are not interrupted.</li>
          <li>Please take up the test in Incognito window to avoid browser extensions/plugins interference and ensure a seamless test experience.</li>
        </ul>
        <Button disabled={listing?.is_expired} color="primary" className="ml-2 mr-1 mt-2">
          <a href={listing?.link} className='text-white'>
            Take Assessment
          </a>
        </Button>
      </CardBody>
    </Card>
  )
}

const InternXobinHiring = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listings = useSelector((state) => state.hiring?.questionsLink);
  const listingsLoading = useSelector((state) => state.hiring?.questionsLinkLoading);

  useEffect(() => {
    dispatch(getQuestionsLink(() => {}));
  }, [])

  return (
    <>
      {listingsLoading ?
        <ComponentSpinner />
        :
        <ProfileFormContainer>
          {listings?.map((listing) => (
            <InternXobinHiringItem listing={listing} />
          ))}

          <div className="d-flex justify-content-end w-75">
            <Button
              onClick={() => navigate("/dashboard")}
              color="primary"
              type="submit"
            >
              <span className="me-50">Continue</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </ProfileFormContainer>}
    </>
  );
};

export default InternXobinHiring;
