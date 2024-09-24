import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import themeConfig from '@src/configs/themeConfig';
import { LayoutState } from '@src/types';

const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed');
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
};

const initialDirection = () => {
  const item = window.localStorage.getItem('direction');
  return item ? JSON.parse(item) : themeConfig.layout.isRTL;
};

const initialSkin = () => {
  const item = window.localStorage.getItem('skin');
  return item ? JSON.parse(item) : themeConfig.layout.skin;
};

const initialState: LayoutState = {
  skin: initialSkin(),
  isRTL: initialDirection(),
  layout: themeConfig.layout.type,
  lastLayout: themeConfig.layout.type,
  menuCollapsed: initialMenuCollapsed(),
  footerType: themeConfig.layout.footer.type,
  navbarType: themeConfig.layout.navbar.type,
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth,
  navbarColor: themeConfig.layout.navbar.backgroundColor,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleRTL: (state: LayoutState, action: PayloadAction<boolean>) => {
      window.localStorage.setItem('direction', JSON.stringify(action.payload));
      state.isRTL = action.payload;
    },
    handleSkin: (state: LayoutState, action: PayloadAction<string>) => {
      window.localStorage.setItem('skin', JSON.stringify(action.payload));
      state.skin = action.payload;
    },
    handleLayout: (state: LayoutState, action: PayloadAction<string>) => {
      state.layout = action.payload;
    },
    handleFooterType: (state: LayoutState, action: PayloadAction<string>) => {
      state.footerType = action.payload;
    },
    handleNavbarType: (state: LayoutState, action: PayloadAction<string>) => {
      state.navbarType = action.payload;
    },
    handleMenuHidden: (state: LayoutState, action: PayloadAction<boolean>) => {
      state.menuHidden = action.payload;
    },
    handleLastLayout: (state: LayoutState, action: PayloadAction<string>) => {
      state.lastLayout = action.payload;
    },
    handleNavbarColor: (state: LayoutState, action: PayloadAction<string>) => {
      state.navbarColor = action.payload;
    },
    handleContentWidth: (state: LayoutState, action: PayloadAction<string>) => {
      state.contentWidth = action.payload;
    },
    handleMenuCollapsed: (state: LayoutState, action: PayloadAction<boolean>) => {
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload));
      state.menuCollapsed = action.payload;
    },
  },
});

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
} = layoutSlice.actions;

export default layoutSlice.reducer;
