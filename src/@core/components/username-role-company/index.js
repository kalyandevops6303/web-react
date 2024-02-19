import PropTypes from 'prop-types';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import { useNavigate } from 'react-router-dom';

const UserNameRoleCompanyComp = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/TALENT/${data?.user_id}`);
  };

  return (
    <div className="d-flex align-items-center gap-1 mb-1 cursor-pointer" onClick={handleNavigate}>
      <div className="name-info d-flex gap-50 align-items-center">
        <Avatar img={data?.image_uri || avatar7} imgHeight="38" imgWidth="38" />
        <div className="ms-50">
          <h6 className="mb-0 fw-bold">
            {data.first_name} {data.last_name}
          </h6>
          <span className="font-small-2">{data?.role?.name || data?.company || data?.role}</span>
        </div>
      </div>
    </div>
  );
};
UserNameRoleCompanyComp.propTypes = {
  data: PropTypes.object,
};
UserNameRoleCompanyComp.defaultProps = {
  data: {},
};

export default UserNameRoleCompanyComp;
