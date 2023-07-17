// ** React Imports
import { useState } from 'react';

// ** Third Party Components
import classnames from 'classnames';
import * as Icon from 'react-feather';

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components
import Autocomplete from '@components/autocomplete';
import theme from '../../../../configs/themeVariables';
import { useNavigate } from 'react-router';
import { clearQuery, handleQuery, toggleIsNavbarSearchBarOpen } from '../../../../redux/reducers/gloabalSearch';

const NavbarSearch = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ** States
  const [suggestions, setSuggestions] = useState([]);
  const query = useSelector((state) => state.search);
  // ** ComponentDidMount

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = (e) => {
    if (e.target.value.length > 0) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        dispatch(handleQuery(e.target.value));
        navigate(`/search`);
      }
    }
  };

  // ** Function to handle search suggestion Click

  return (
    <NavItem
      className="nav-search"
      onClick={() => {
        dispatch(toggleIsNavbarSearchBarOpen());
      }}
    >
      {!query.isNavbarSearchBarOpen && (
        <NavLink className="nav-link-search me-1">
          <Icon.Search className="ficon" />
        </NavLink>
      )}

      <div
        className={classnames('search-input', {
          open: query.isNavbarSearchBarOpen === true || (query?.query && true),
        })}
      >
        <div className="search-input-icon">
          <Icon.Search color={theme.activeNavPillText} />
        </div>
        {query.isNavbarSearchBarOpen || query?.query ? (
          <Autocomplete
            className="form-control"
            suggestions={suggestions}
            filterKey="title"
            filterHeaderKey="groupTitle"
            grouped={true}
            placeholder="Explore Trumio..."
            autoFocus={true}
            onKeyDown={onKeyDown}
            defaultValue={query?.query}
          />
        ) : null}
        <div className="search-input-close">
          <Icon.X
            className="ficon"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleIsNavbarSearchBarOpen());
              dispatch(clearQuery(''));
            }}
          />
        </div>
      </div>
    </NavItem>
  );
};

export default NavbarSearch;
