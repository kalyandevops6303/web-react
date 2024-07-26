import React, { useCallback, useState } from 'react';
import { DropdownItem, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import UserNameRoleCompanyComp from '../../../components/username-role-company';
import addIcon from '../../../../assets/images/plus-rounded-circle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsInviteDelegateModalVisible } from '../../../../redux/selectors/delegateSelectors';
import { toggleAddDelegateModal } from '../../../../redux/reducers/delegate';

const DelegateAccordion = () => {
  const [open, setOpen] = useState('');
  const toggle = (id) => (open === id ? setOpen() : setOpen(id));
  const dispatch = useDispatch();
  const isInviteDelegateModalVisible = useSelector(checkIsInviteDelegateModalVisible);

  const openAddDelegateModal = () => dispatch(toggleAddDelegateModal(!isInviteDelegateModalVisible));

  // mock data to show delegates
  const delegateData = [
    {
      first_name: 'Rahul',
      last_name: 'Gautam',
      role: 'Delegate1',
      image_uri: defaultAvatar,
    },
    {
      first_name: 'Claire',
      last_name: 'Dunphy',
      role: 'Delegate2',
      image_uri: defaultAvatar,
    },
  ];

  return (
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader className="isActive" targetId="1">
          Delegate
        </AccordionHeader>
        <div style={{ maxHeight: '9rem', overflowY: 'auto' }}>
          <AccordionBody accordionId="1">
            <DropdownItem
              onClick={openAddDelegateModal}
              className="w-100 text-primary d-flex justify-content-start align-items-center gap-1"
            >
              <img alt="plus" src={addIcon} height={28} width={28} className="no-border-radius" />
              <span className="align-middle ">Add Delegate</span>
            </DropdownItem>
            {delegateData?.map((delegate, index) => (
              <DropdownItem key={index} className="w-100">
                <UserNameRoleCompanyComp data={delegate} />
              </DropdownItem>
            ))}
          </AccordionBody>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default DelegateAccordion;
