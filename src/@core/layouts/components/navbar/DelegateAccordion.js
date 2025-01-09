import React, { useCallback, useState } from 'react';
import {
  DropdownItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Button,
  CardText,
  Badge,
  UncontrolledTooltip,
} from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '../../../components/avatar';
import addIcon from '../../../../assets/images/plus-rounded-circle.svg';
import settingsIcon from '../../../../assets/images/settingsIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsInviteDelegateModalVisible,
  delegateInvitationStatusData,
  selectDelegateLoading,
} from '../../../../redux/selectors/delegateSelectors';
import { toggleAddDelegateModal } from '../../../../redux/reducers/delegate';
import { getDelegateInvitationStatus } from '../../../../redux/actions/delegateActions';
import theme from '../../../../configs/themeVariables';
import ComponentSpinner from '../../../components/spinner/Loading-spinner';
import { TextWrapper } from './style';

const DelegateAccordion = ({ setDelegateEmail }) => {
  const [open, setOpen] = useState('');
  const toggle = useCallback((id) => (open === id ? setOpen('') : setOpen(id)), [open]);

  const dispatch = useDispatch();
  const isInviteDelegateModalVisible = useSelector(checkIsInviteDelegateModalVisible);
  const delegateInvitationStatus = useSelector(delegateInvitationStatusData);
  const isLoading = useSelector(selectDelegateLoading);
  const handleOpenAddDelegateModal = (status, delegate_name) => {
    setDelegateEmail(status === 'EXPIRED' ? delegate_name : '');
    dispatch(toggleAddDelegateModal(!isInviteDelegateModalVisible));
  };

  const openAddDelegateModal = () => {
    setDelegateEmail('');
    dispatch(toggleAddDelegateModal(!isInviteDelegateModalVisible));
  };

  const getDelegateInvitationStatusData = useCallback(() => {
    if (open === '') {
      const metadata = {
        page: 1,
        pageSize: 5,
      };
      dispatch(getDelegateInvitationStatus({ metadata }));
    }
  }, [dispatch, open]);

  return (
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader
          onClick={getDelegateInvitationStatusData}
          className={open === '1' ? 'isActive' : ''}
          targetId="1"
        >
          <TextWrapper>Delegate(s)</TextWrapper>
        </AccordionHeader>
        <AccordionBody accordionId="1" style={{ maxHeight: '20rem' }}>
          <div style={{ maxHeight: '13rem', overflowY: 'auto' }}>
            {isLoading ? (
              <ComponentSpinner size="sm" />
            ) : (
              delegateInvitationStatus?.map((delegate) => (
                <DropdownItem
                  tag="div"
                  key={delegate._id}
                  className="d-flex align-items-center gap-50 cursor-pointer border-bottom border-light-grey"
                >
                  <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" />
                  <div className="ms-50 d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex flex-column">
                      <span className="mb-25 font-small-3 fw-light" id={`delegate-${delegate._id}`}>
                        {delegate.delegate_name?.length > 15
                          ? delegate.delegate_name.slice(0, 15) + '...'
                          : delegate.delegate_name}
                      </span>
                      {delegate.delegate_name?.length > 15 && (
                        <UncontrolledTooltip placement="top" target={`delegate-${delegate._id}`}>
                          <div className="d-flex flex-column align-items-start">
                            <p className="m-0">{delegate.delegate_name}</p>
                          </div>
                        </UncontrolledTooltip>
                      )}
                      {delegate.status === 'EXPIRED' && (
                        <span className="font-small-1 fw-light text-danger">Invitation expired</span>
                      )}
                    </div>
                    {delegate.status === 'EXPIRED' ? (
                      <CardText
                        className="text-center card-text fw-bold font-small-3 mt-20 text-primary earn-more cursor-pointer"
                        onClick={() => {
                          handleOpenAddDelegateModal(delegate.status, delegate.delegate_name);
                        }}
                      >
                        Resend Invite
                      </CardText>
                    ) : (
                      <div>
                        {delegate.status === 'INVITED' ? (
                          <Badge
                            className="rounded-pill py-1 px-2"
                            style={{ backgroundColor: theme.lightBlueBgColor, color: theme.darkBlueColor }}
                            color={theme.darkBlueColor}
                          >
                            Invited
                          </Badge>
                        ) : (
                          <Button tag="label" className="py-25 font-small-2 px-50 rounded-pill" color="primary" outline>
                            {delegate.status}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </DropdownItem>
              ))
            )}
          </div>
          <DropdownItem
            onClick={openAddDelegateModal}
            className="w-100 text-primary d-flex justify-content-start align-items-center gap-1"
          >
            <img alt="plus" src={addIcon} height={28} width={28} className="no-border-radius" />
            <span className="align-middle ">Add Delegate</span>
          </DropdownItem>
          {/* <DropdownItem className="w-100 text-primary d-flex justify-content-start align-items-center gap-1 border-top border-light-grey">
            <img alt="plus" src={settingsIcon} height={28} width={28} className="no-border-radius" />
            <span className="align-middle ">Delegate Setting</span>
          </DropdownItem> */}
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default DelegateAccordion;
