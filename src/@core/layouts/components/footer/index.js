// ** Icons Import
import { Heart } from 'react-feather';

const Footer = () => (
  <p className="clearfix mb-0">
    <span className="float-md-start d-block d-md-inline-block mt-25">
      Copyright ©{new Date().getFullYear()} Trumio
      <span className="d-none d-sm-inline-block">, All rights Reserved</span>
    </span>
  </p>
);

export default Footer;
