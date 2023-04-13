import styled from 'styled-components';

import { Paddings } from '../../utils/constants';
import { Palette } from '../../utils/palette';

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border: 1px solid ${Palette.greyLight};

  .table-row {
    :last-child {
      .table-body-cell {
        border-bottom: 0;
      }
    }
  }

  .table-header-cell,
  .table-body-cell {
    text-align: start;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid ${Palette.greyLight};
    border-right: 1px solid ${Palette.greyLight};

    :first-child {
      text-align: center;
    }

    :last-child {
      text-align: center;
      border-right: 0;
    }

    .cell-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .edit-input {
      border: 1px solid ${Palette.greyLight};
      width: 100%;
      padding: ${Paddings.s};
      font-size: inherit;
      font-family: inherit;
    }
  }

  .table-header-cell {
    cursor: pointer;
    .add-new-user-btn {
      cursor: pointer;
      font-size: 32px;
      background: none;
    }
  }

  .action-btns {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

export const StyledTableWrapper = styled.div`
  width: 100%;
  min-width: 470px;
  overflow-x: scroll;
`;
