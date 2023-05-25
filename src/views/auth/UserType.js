// ** React Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icons Imports

// ** Custom Components
import { OnBoardWrap, UserTypeCard } from "./style";

// ** Reactstrap Imports
import { CardTitle, CardText } from "reactstrap";

// ** Illustrations Imports
import Logo from "@src/assets/images/ic_trumio_logo.png";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserType = () => {
  const CreateOfferSchema = yup.object().shape({
    brandName: yup.string().required("Brand Name is required"),
    offerName: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    offerURL: yup.string().url("URL must be valid").required("URL is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date(),
    uploadKey: yup.string(),
  });

  const { register, errors, handleSubmit, control, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateOfferSchema),
  });
  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h2" className="card-title-onboard">
          Welcome! 👋🏻
        </CardTitle>
        <CardText className="mb-3 card-text">
          Please select a user type
        </CardText>
        <Link to="/register">
          <UserTypeCard className="mt-3 text-center">
            <CardTitle color="primary" tag="h2" className="select-card-title">
              Talent
            </CardTitle>
            <CardText className="card-text">
              Find clients and projects.
            </CardText>
          </UserTypeCard>
        </Link>
        <UserTypeCard className="text-center">
          <CardTitle color="blue" tag="h2" className="select-card-title">
            Client
          </CardTitle>
          <CardText className="card-text">
            Find talent or project teams and hire for projects
          </CardText>
        </UserTypeCard>
      </div>
    </OnBoardWrap>
  );
};

export default UserType;
