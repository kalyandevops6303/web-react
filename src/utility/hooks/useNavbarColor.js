// ** Store Imports
import { handleNavbarColor } from "@store/layout";
import { useDispatch, useSelector } from "react-redux";

const useNavbarColor = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state) => state.layout);

  // ** Return a wrapped version of useState's setter function
  const setNavbarColor = (value) => {
    dispatch(handleNavbarColor(value));
  };

  return { navbarColor: store.navbarColor, setNavbarColor };
};
export default useNavbarColor;
