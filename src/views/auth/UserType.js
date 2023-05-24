// ** React Imports
import { Link } from 'react-router-dom';

// ** Icons Imports

// ** Reactstrap Imports
import { CardTitle, CardText } from 'reactstrap';

// ** Illustrations Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';

// ** Custom Components
import { OnBoardWrap, UserTypeCard } from './style';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

const UserType = () => (
  <OnBoardWrap>
    <div className="card-onboard">
      <img alt="logo" src={Logo} className="card-logo" />
      <CardTitle tag="h2" className="card-title-onboard">
        Welcome! 👋🏻
      </CardTitle>
      <CardText className="mb-3 card-text">Please select a user type</CardText>
      <Link to="/auth/register">
        <UserTypeCard className="mt-3 text-center">
          <CardTitle color="primary" tag="h2" className="select-card-title">
            Talent
          </CardTitle>
          <CardText className="card-text">Find clients and projects.</CardText>
        </UserTypeCard>
      </Link>
      <UserTypeCard className="text-center">
        <CardTitle color="blue" tag="h2" className="select-card-title">
          Client
        </CardTitle>
        <CardText className="card-text">Find talent or project teams and hire for projects</CardText>
      </UserTypeCard>
    </div>
  </OnBoardWrap>
);

export default UserType;
