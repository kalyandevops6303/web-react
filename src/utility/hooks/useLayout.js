/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
//* * React Imports
import { useEffect } from "react";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
import { handleLayout, handleLastLayout } from "@store/layout";

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
    if (window.innerWidth < 1200) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth);
    }
  }, []);

  if (window) {
    const breakpoint = 1200;

    useEffect(() => {
      if (window.innerWidth < breakpoint) {
        setLayout("vertical");
      } else {
        setLayout("horizontal");
      }
    }, [store.layout]);
  }

  return {
    layout: store.layout,
    setLayout,
    lastLayout: store.lastLayout,
    setLastLayout,
  };
};
