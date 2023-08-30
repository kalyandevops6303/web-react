import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Button } from 'reactstrap';

const index = () => (
  <div>
    <div className="d-flex justify-content-between align-items-center">
      <BreadCrumbs data={[{ title: 'Dashboard', link: '/dashboard' }, { title: 'Disputes' }]} />
      <Button color="primary">Raise Dispute</Button>
    </div>
  </div>
);

export default index;
