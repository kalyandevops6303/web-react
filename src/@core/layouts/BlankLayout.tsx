import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { clearAllFormData } from '../../redux/reducers/formData';
import useSkin from '@src/utility/hooks/useSkin';
import { AppDispatch } from '@src/redux/store';

const BlankLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { skin } = useSkin();

  // useEffect(() => {
  //   setIsMounted(true);
  //   return () => setIsMounted(false);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  useEffect(() => {
    dispatch(clearAllFormData());
  }, [window.location.href]);

  return (
    <div
      className={classnames('blank-page', {
        'dark-layout': skin === 'dark',
      })}
    >
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;
