import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const ClientTableContainer = styled.div`
  border-radius: 6px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1);

  .rdt_Table {
    max-width: 97vw;
    border-radius: 6px;
    border-top: 1px solid ${theme.cardHeaderBorderColor};
    border-left: 1px solid ${theme.cardHeaderBorderColor};
    border-right: 1px solid ${theme.cardHeaderBorderColor};
  }
  .rdt_TableHeadRow {
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    background: ${theme.tableHeaderColor};
    font-weight: 600;
    text-transform: uppercase;
  }
  .rdt_TableHeadRow > :first-child {
    position: absolute !important;
    right: 2px !important;
  }
  .rdt_TableBody :last-child {
    border-radius: 0 0 6px 6px;
  }
  .rdt_TableRow {
    border-bottom: 1px solid #c2c2c2;
    padding: 1rem 0 !important;
    color: ${theme.bodyColor};
  }
  .rdt_TableRow > :first-child {
    position: absolute !important;
    right: 2px !important;
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

    .extra-milestones {
      border-radius: 17px;
      border: 1px solid ${theme.navPillText};
    }
  }
  .rdt_ExpanderRow {
    color: ${theme.bodyColor};

    .expanded-view:last-child {
      border-bottom: 1px solid #c2c2c2;
      border-radius: 0;
    }
    .expanded-view > :not(:last-child) {
      border-bottom: 1px solid #e0e0e0 !important;
    }

    .expanded-details {
      margin-top: -2px;

      .empty-container {
        width: 30%;
        border-top: 2px solid ${theme.white};
      }
      .details-container {
        width: 64.8%;
        border-radius: 0;

        .additional-details {
          width: 24.5%;
        }
      }
    }
  }
`;

export const TableContainer = styled.div`
  border-radius: 6px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1);

  .rdt_Table {
    max-width: 97vw;
    border-radius: 6px;
    border-top: 1px solid ${theme.cardHeaderBorderColor};
    border-left: 1px solid ${theme.cardHeaderBorderColor};
    border-right: 1px solid ${theme.cardHeaderBorderColor};
  }
  .rdt_TableHeadRow {
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    background: ${theme.tableHeaderColor};
    font-weight: 600;
    text-transform: uppercase;
  }
  .rdt_TableRow {
    border-bottom: 1px solid #c2c2c2;
    padding: 1rem 0 !important;
    color: ${theme.bodyColor};
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

    .extra-milestones {
      border-radius: 17px;
      border: 1px solid ${theme.navPillText};
    }
  }
`;

export const ExpandRowDisabled = styled.div`
  background: ${theme.white};
  width: 100%;
  height: 10px;
`;
