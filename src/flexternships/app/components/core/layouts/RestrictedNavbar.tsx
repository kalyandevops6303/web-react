import logo from '@flexternships/assets/images/ic_trumio_logo.png';

export default function RestrictedNavbar() {
  return (
    <div className="w-full p-4 flex justify-center shadow-restricted-navbar bg-white-fa">
      <img className="h-7" src={logo} alt="logo" />
    </div>
  );
}
