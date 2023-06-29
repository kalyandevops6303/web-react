// ** React Imports
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ** Icons Imports

// ** Reactstrap Imports
import { CardTitle, CardText, Label } from 'reactstrap';

// ** Custom Components
import { OnBoardWrap, UserTypeCard } from './style';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { setUserType } from '../../redux/actions/authActions';
import LogoComp from './components/LogoComp';
import { selectIsLoggedIn } from '../../redux/selectors/authSelectors';

const UserType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSelection = (type) => {
    dispatch(setUserType(type));
    navigate('register');
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h2" className="card-title-onboard">
          Welcome! 👋🏻
        </CardTitle>
        <CardText className="mb-3 card-text">Please select a user type</CardText>

        <UserTypeCard onClick={() => handleSelection('TALENT')} className="mt-3 text-center">
          <CardTitle color="primary" tag="h2" className="select-card-title">
            Talent
          </CardTitle>
          <CardText className="card-text">Find clients and projects.</CardText>
        </UserTypeCard>
        <UserTypeCard onClick={() => handleSelection('CLIENT')} className="text-center">
          <CardTitle color="blue" tag="h2" className="select-card-title">
            Client
          </CardTitle>
          <CardText className="card-text">Find talent or project teams and hire for projects</CardText>
        </UserTypeCard>
        <div className="mt-2 d-flex justify-content-center sign-info">
          <Label>
            <small>Already have an account?</small>
          </Label>
          <Label tag={Link} to="/auth/login" className="primary">
            <small>Sign in</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default UserType;
