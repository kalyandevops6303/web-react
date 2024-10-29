/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
//* * React Imports
import { useEffect } from 'react';

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux';
import { handleLayout, handleLastLayout } from '@store/layout';

export const useLayout = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state) => state.layout);

  const setLayout = (value) => {
    dispatch(handleLayout(value));
  };

  const setLastLayout = (value) => {
    dispatch(handleLastLayout(value));
  };
  const handleWindowWidth = () => {
    const breakpoint = 1200;
    if (window.innerWidth < breakpoint) {
      setLayout('vertical');
    } else {
      setLayout('horizontal');
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth);
    }

    return () => window.removeEventListener('resize', handleWindowWidth);
  }, []);

  if (window) {
    useEffect(() => {
      handleWindowWidth();
    }, [store.layout]);
  }

  return {
    layout: store.layout,
    setLayout,
    lastLayout: store.lastLayout,
    setLastLayout,
  };
};
