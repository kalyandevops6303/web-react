// ** React Imports
import { Outlet } from 'react-router-dom';

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout';

// ** Menu Items Array
import navigation from '@src/navigation/vertical';

// ** Global Modals Container
import GlobalModal from '@/flexternships/app/components/core/modals/global';

const VerticalLayout = (props) => (
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  <Layout menuData={navigation} {...props}>
    <Outlet />
    <GlobalModal />
  </Layout>
);
export default VerticalLayout;
