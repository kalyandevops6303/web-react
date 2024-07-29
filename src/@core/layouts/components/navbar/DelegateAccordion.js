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
} from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '../../../components/avatar';
import addIcon from '../../../../assets/images/plus-rounded-circle.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsInviteDelegateModalVisible,
  delegateInvitationStatusData,
} from '../../../../redux/selectors/delegateSelectors';
import { toggleAddDelegateModal } from '../../../../redux/reducers/delegate';
import { getDelegateInvitationStatus } from '../../../../redux/actions/delegateActions';
import theme from '../../../../configs/themeVariables';

const DelegateAccordion = () => {
  const [open, setOpen] = useState('');
  const toggle = useCallback((id) => (open === id ? setOpen('0') : setOpen(id)), [open]);

  const dispatch = useDispatch();
  const isInviteDelegateModalVisible = useSelector(checkIsInviteDelegateModalVisible);
  const delegateInvitationStatus = useSelector(delegateInvitationStatusData);

  const openAddDelegateModal = () => dispatch(toggleAddDelegateModal(!isInviteDelegateModalVisible));

  const getDelegateInvitationStatusData = useCallback(() => {
    if (open === '0') {
      dispatch(getDelegateInvitationStatus());
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
          Delegate
        </AccordionHeader>
        <div style={{ maxHeight: '9rem', overflowY: 'auto' }}>
          <AccordionBody accordionId="1">
            {delegateInvitationStatus?.map((delegate, index) => (
              <DropdownItem tag="div" key={index} className="d-flex align-items-center gap-50 cursor-pointer">
                <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" />
                <div className="ms-50 d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex flex-column">
                    <span className="mb-25 font-small-3 fw-light">{delegate.delegate_name}</span>
                    {delegate.status === 'EXPIRED' && (
                      <span className="font-small-1 fw-light text-danger">Invitation expired</span>
                    )}
                  </div>
                  {delegate.status === 'EXPIRED' ? (
                    <CardText className="text-center card-text fw-bold font-small-3 mt-20 text-primary earn-more cursor-pointer">
                      Resend Invite
                    </CardText>
                  ) : (
                    <div>
                      {delegate.status === 'INVITED' ? (
                        <Badge
                          className="rounded-pill px-50 py-10"
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
            ))}
            <DropdownItem
              onClick={openAddDelegateModal}
              className="w-100 text-primary d-flex justify-content-start align-items-center gap-1"
            >
              <img alt="plus" src={addIcon} height={28} width={28} className="no-border-radius" />
              <span className="align-middle ">Add Delegate</span>
            </DropdownItem>
          </AccordionBody>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default DelegateAccordion;
