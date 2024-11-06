import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  CardText,
  Label,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import { ChevronRight, Link } from 'react-feather';
import { ProfileFormContainer } from '../style';
import { Input } from 'reactstrap';
import { AcceptModalWrapper } from '../../modals/style';
import Notepad from '../../../assets/images/youDidIt.gif';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsLink } from '../../../redux/actions/hiringActions';
import { useNavigate } from 'react-router-dom';

const FULL_STACK_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const AI_ML_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const PRODUCT_MANAGER_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';

const listings = [
  {
    name: 'Full Stack Engineer (Intern)',
    type: 'GITHUB',
  },
  {
    name: 'AI-ML Engineer (Intern)',
    type: 'GITHUB',
  },
  {
    name: 'Product Manager (Intern)',
    type: 'XOBIN',
    redirectURL: 'https://trumiotest.xobin.com/wc/assessment/QTEIBB1S6DG',
  },
];

const InternHiringItem = ({ listing }) => {
  const dispatch = useDispatch();

  const [githubLink, setGithubLink] = useState('');
  const [file, setFile] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const questionsLink = useSelector((state) => state.hiring.questionsLink?.question_id?.link);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('GitHub Link:', githubLink);
    console.log('File:', file);

    setShowSubmitModal(true);
  };

  useEffect(() => {
    dispatch(getQuestionsLink());
  }, []);

  return (
    <Card className="w-75">
      <CardHeader>
        <h4 className="m-0 mt-1">{listing?.name}</h4>
      </CardHeader>
      <hr className="m-0 card-header-border" />

      {listing?.type === 'XOBIN' ? (
        <CardBody>
          <CardText>
            Thank you for showing interest in Trumio. Click on <b>Take Assessment</b> and answer the questions within
            this assessment to the best of your ability.
          </CardText>
          <CardText>Before you start with the assessment, make sure to:</CardText>
          <ul>
            <li>Take up this assessment on a laptop or desktop rather than on a mobile phone.</li>
            <li>Close all other applications and browser tabs to ensure no distractions.</li>
            <li>Block time to start and finish the assessment in one go. Please make sure you are not interrupted.</li>
            <li>
              Please take up the test in Incognito window to avoid browser extensions/plugins interference and ensure a
              seamless test experience.
            </li>
          </ul>
          <a href={listing?.redirectURL}>
            <Button color="primary" className="ml-2 mr-1 mt-2">
              Take Assessment
            </Button>
          </a>
        </CardBody>
      ) : (
        <CardBody>
          <CardText>
            Thank you for showing interest in Trumio. Find your problem statement below, and build a solution to the
            best of your ability.{' '}
          </CardText>
          <CardText className="d-flex">
            Find your problem statement here: &nbsp;
            <NavLink
              href={questionsLink || '#'}
              target="_blank"
              className="text-primary d-flex align-items-center gap-1 "
            >
              <b>Problem Statement</b>
            </NavLink>
          </CardText>
          <CardText>To submit your solution:</CardText>
          <ul>
            <li>Upload your code in a public GitHub repository and share the link below.</li>
            <li>Upload your zipped folder. (optional)</li>
          </ul>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="githubLink">
                <b>GitHub Link</b>
              </Label>
              <Input
                style={{ marginBottom: '-20px' }}
                type="url"
                name="githubLink"
                id="githubLink"
                placeholder="Enter your GitHub link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="fileUpload">
                <b>Upload File</b>
              </Label>
              <Input type="file" name="file" id="fileUpload" onChange={(e) => setFile(e.target.files[0])} />
            </FormGroup>
            <Button type="submit" color="primary">
              Submit
            </Button>

            <Modal
              isOpen={showSubmitModal}
              contentClassName="custom-modal-style"
              className="modal-dialog-centered modal-lg"
            >
              <ModalHeader toggle={() => setShowSubmitModal(false)} />
              <ModalBody>
                <AcceptModalWrapper>
                  <div className="d-flex justify-content-between pr-1">
                    <img className="gif" src={Notepad} width={180} height={180} alt="gif" />
                    <div className="content-side">
                      <CardTitle className="modal-heading">Are you sure you want to make this submission? </CardTitle>
                      <CardSubtitle className="mb-1 modal-body-text">
                        <b>Note:</b> You will only be able to submit once.
                      </CardSubtitle>
                    </div>
                  </div>
                  <div className="d-flex gap-1  justify-content-end">
                    <Button outline color="primary" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button color="primary" onClick={() => {}}>
                      Submit
                    </Button>
                  </div>
                </AcceptModalWrapper>
              </ModalBody>
            </Modal>
          </Form>
        </CardBody>
      )}
    </Card>
  );
};

const InternHiring = () => {
  const navigate = useNavigate();

  return (
    <ProfileFormContainer>
      {listings?.map((listing) => (
        <InternHiringItem listing={listing} />
      ))}

      <div className="d-flex justify-content-end w-75">
        <Button onClick={() => navigate('/dashboard')} color="primary" type="submit">
          <span className="me-50">Continue</span>
          <ChevronRight size={14} />
        </Button>
      </div>
    </ProfileFormContainer>
  );
};

export default InternHiring;
