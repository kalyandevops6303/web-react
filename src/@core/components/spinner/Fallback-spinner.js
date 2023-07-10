// ** Logo
import logo from '@src/assets/images/ic_trumio_logo.png';

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader d-flex justify-content-center">
      <img className="fallback-logo" src={logo} alt="logo" />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;
