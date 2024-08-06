// ** React Imports

// ** Reactstrap Imports
import { Button } from 'reactstrap';

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/error.svg';

// ** Styles
import '@styles/base/pages/page-misc.scss';

const NotFound = () => (
  // ** Hooks

  <div className="misc-wrapper">
    <div className="misc-inner p-2 p-sm-3">
      <div className="w-100 text-center">
        <h2 className="mb-1">Oops, This page does not exist.</h2>
        <a href="/dashboard">
          <Button color="primary" className="btn-sm-block mb-2">
            Back to home
          </Button>
        </a>
        <img className="img-fluid" src={illustrationsLight} alt="Not authorized page" />
      </div>
    </div>
  </div>
);
export default NotFound;
