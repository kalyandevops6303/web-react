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
import { clearQuery, handleQuery } from '../../../../redux/reducers/gloabalSearch';

const NavbarSearch = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ** States
  const [suggestions, setSuggestions] = useState([]);
  const [navbarSearch, setNavbarSearch] = useState(false);
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

  return (
    <NavItem className="nav-search" onClick={() => setNavbarSearch(true)}>
      <NavLink className="nav-link-search me-1">
        <Icon.Search className="ficon" />
      </NavLink>
      <div
        className={classnames('search-input', {
          open: navbarSearch || query?.query,
        })}
      >
        <div className="search-input-icon">
          <Icon.Search color={theme.activeNavPillText} />
        </div>
        {navbarSearch || query?.query ? (
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
              setNavbarSearch(false);
              dispatch(clearQuery(''));
            }}
          />
        </div>
      </div>
    </NavItem>
  );
};

export default NavbarSearch;
