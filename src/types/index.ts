export interface LayoutState {
  skin: string;
  isRTL: boolean;
  layout: string;
  lastLayout: string;
  menuCollapsed: boolean;
  footerType: string;
  navbarType: string;
  menuHidden: boolean;
  contentWidth: string;
  navbarColor: string;
}

export interface Bookmark {
  id: string;
  isBookmarked: boolean;
}

export interface NavbarLayoutState {
  query: string;
  bookmarks: Bookmark[];
  suggestions: Bookmark[];
}

export type Metadata = {
  page_size: number;
  page: number;
  current_page?: number;
  has_next_page?: boolean;
};
