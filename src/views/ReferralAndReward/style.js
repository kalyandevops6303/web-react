import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const NotesContainer = styled.div`
  border-radius: 6px;
  background: ${theme.infoBannerBg};

  .notes-heading {
    font-size: 15px;
    font-weight: 600;
    color: ${theme.activeNavPillText};
  }

  .notes-info {
    font-size: 15px;
    font-weight: 400;
    color: ${theme.activeNavPillText};
  }
`;

export const TableContainer = styled.div`
  .rdt_TableRow {
    padding: 0.8rem 0;
  }
  .rdt_TableHeadRow {
    background: ${theme.tableHeaderColor};
    font-weight: 600;
  }
  .table-data {
    font-size: 14px;
  }
`;
