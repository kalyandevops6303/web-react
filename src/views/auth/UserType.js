// ** React Imports
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ** Icons Imports

// ** Reactstrap Imports
import { CardTitle, CardText, Label } from 'reactstrap';

// ** Custom Components
import { OnBoardWrap, UserTypeCard } from './style';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { loginUserWithGoogle, setUserType } from '../../redux/actions/authActions';
import LogoComp from './components/LogoComp';
import { selectIsLoggedIn } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import { clearDataSuccess } from '../../redux/reducers/auth';
import { getItem, removeItem } from '../../utility/localStorageControl';
import { validateReferral } from '../../redux/actions/referralAndRewardActions';
import { validateReferralLoading } from '../../redux/selectors/referralAndRewardSelectors';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { checkPointRedirection } from '../../utility/Utils';

const UserType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthLoading = useSelector((state) => state.auth.googleAuthLoading);
  const validateReferralIsLoading = useSelector(validateReferralLoading);
  const isUserVisited = getItem('isUserVisited');

  const googleId = getItem('google_id_token');

  const handleSelection = (type) => {
    const onSuccess = (response) => {
      removeItem('google_id_token');
      checkPointRedirection({ response, navigate });
    };

    // Error handler for Google login
    const onError = () => {
      removeItem('google_id_token');
    };

    dispatch(setUserType(type));
    if (googleId) {
      dispatch(loginUserWithGoogle({ id_token: googleId, user_type: type, onError, onSuccess }));
    } else {
      navigate('/auth/register');
    }
  };
  useEffect(() => {
    if (location.search.includes('?referral_token=')) {
      dispatch(validateReferral(location.search.split('?referral_token=')[1]));
    }

    dispatch(clearDataSuccess());
  }, []);

  useEffect(() => {
    if (isUserVisited) {
      navigate('/auth/login');
    }
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <OnBoardWrap>
      {validateReferralIsLoading ? (
        <ComponentSpinner className="mt-4 ms-5" />
      ) : (
        <div className="card-onboard">
          <LogoComp />
          <CardTitle tag="h2" className="card-title-onboard">
            Welcome! 👋🏻
          </CardTitle>

          {isAuthLoading ? (
            <ComponentSpinner className="mt-2" />
          ) : (
            <>
              <CardText className="mt-3 card-text">
                Please <span className="fw-bolder">select</span> a user type
              </CardText>
              <UserTypeCard onClick={() => handleSelection(userTypes.talent)} className="mt-1 text-center">
                <CardTitle color="primary" tag="h2" className="select-card-title">
                  Talent
                </CardTitle>
                <CardText className="card-text">Find projects and teams</CardText>
              </UserTypeCard>
              <UserTypeCard onClick={() => handleSelection(userTypes.client)} className="text-center">
                <CardTitle color="blue" tag="h2" className="select-card-title">
                  Client
                </CardTitle>
                <CardText className="card-text">Hire great teams and talent</CardText>
              </UserTypeCard>
              <div className="mt-2 d-flex justify-content-center sign-info">
                <Label>
                  <small>Already have a trumio account?</small>
                </Label>
                <Label tag={Link} to="/auth/login" className="primary">
                  <small>Sign in</small>
                </Label>
              </div>
            </>
          )}
        </div>
      )}
    </OnBoardWrap>
  );
};

export default UserType;
