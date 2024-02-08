import styled from 'styled-components';
import theme from '../../configs/themeVariables';

// eslint-disable-next-line import/prefer-default-export
export const TableContainer = styled.div`
  border-radius: 6px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1);

  .rdt_Table {
    border-radius: 6px;
    border-top: 1px solid #ebe9f1;
    border-left: 1px solid #ebe9f1;
    border-right: 1px solid #ebe9f1;
  }
  .rdt_TableHeadRow {
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid #ebe9f1;
    background: ${theme.tableHeaderColor};
    font-weight: 600;
    text-transform: uppercase;
  }
  .rdt_TableBody :last-child {
    border-radius: 0 0 6px 6px;
  }
  .rdt_TableRow {
    border-bottom: 1px solid #c2c2c2;
    padding: 1rem 0 !important;
  }
  .rdt_TableCell {
    .avatar-logo {
      min-width: 28px;
    }
    .name-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
