import React, { useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Button } from 'reactstrap';
import RaiseDisputeModal from './overview/RaiseDisputeModal';

const index = () => {
  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);

  const toggleRaiseDisputeModal = () => {
    setRaiseDisputeModal(!raiseDisputeModal);
  };

  return (
    <>
      {raiseDisputeModal && <RaiseDisputeModal modal={raiseDisputeModal} toggleModal={toggleRaiseDisputeModal} />}
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrumbs data={[{ title: 'Dashboard', link: '/dashboard' }, { title: 'Disputes' }]} />
        <Button color="primary" className="mb-2" onClick={() => setRaiseDisputeModal(true)}>
          Raise Dispute
        </Button>
      </div>
    </>
  );
};

export default index;
