import styled from 'styled-components';

import { Palette } from '../../palette';
import { PADDINGS, SCALES } from '../../utils/constants';

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border: 1px solid ${Palette.greyLight};

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
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
      padding: ${PADDINGS.s};
      font-size: inherit;
      font-family: inherit;
    }
  }

  th {
    .add-new-user-btn {
      cursor: pointer;
      font-size: 32px;
      background: none;
    }
  }

  .btn {
    box-sizing: border-box;
    padding: ${PADDINGS.m} ${PADDINGS.xxl};
    cursor: pointer;
    border-radius: ${SCALES.borderRadius};
  }

  .action-btns {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .cancel-btn {
    color: ${Palette.black};
    background-color: ${Palette.background};
    border: 1px solid ${Palette.greyLight};
  }

  .cancel-btn:hover {
    color: ${Palette.blueLight};
    border: 1px solid ${Palette.blueLight};
  }

  .submit-btn {
    color: ${Palette.white};
    background-color: ${Palette.blue};
  }

  .submit-btn:hover {
    background-color: ${Palette.blueLight};
  }

  .submit-btn:disabled {
    cursor: not-allowed;
    background-color: ${Palette.grey};
  }
`;

export const StyledTableWrapper = styled.div`
  width: 100%;
  min-width: 470px;
  overflow-x: scroll;
`;
