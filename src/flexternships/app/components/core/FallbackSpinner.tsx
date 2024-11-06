// ** Logo
import logo from '@flexternships/assets/images/ic_trumio_logo.png';
import Spinner from './Spinner';

export default function FallbackSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img className="h-10" src={logo} alt="logo" />
      <div className="mt-3 size-12">
        <Spinner />
      </div>
    </div>
  );
}
