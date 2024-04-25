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
import { selectUserData } from '../../../../redux/selectors/authSelectors';
import { clubStatus } from '../../../../utility/constants/Constant';

const NavbarSearch = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ** States
  const [suggestions, setSuggestions] = useState([]);
  const query = useSelector((state) => state.search);
  const userDetailsData = useSelector(selectUserData);

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;
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
      className={`${isDisabled && 'cursor-not-allowed'} nav-search w-100 mt-auto mb-auto ${
        query.isNavbarSearchBarOpen ? 'me-1 ms-50' : ''
      } `}
      onClick={() => {
        if (!isDisabled) {
          dispatch(toggleIsNavbarSearchBarOpen());
        }
      }}
    >
      {!query.isNavbarSearchBarOpen && (
        <NavLink className={`${isDisabled && 'cursor-not-allowed'} nav-link-search me-1 `}>
          <Icon.Search className="ficon" />
        </NavLink>
      )}

      <div
        className={classnames('search-input', {
          open: query.isNavbarSearchBarOpen === true || (query?.query && true),
        })}
      >
        <div className={`${isDisabled && 'cursor-not-allowed'} search-input-icon`}>
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
            color={theme.activeNavPillText}
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
