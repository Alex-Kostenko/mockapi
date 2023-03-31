import React from 'react';
import styled from 'styled-components';
import { Palette } from '../../palette';

export const Styles = styled.div`
  padding: 1rem;

  table {
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
      padding: 1rem;
      border-bottom: 1px solid ${Palette.greyLight};
      border-right: 1px solid ${Palette.greyLight};

      :last-child {
        border-right: 0;
        text-align: center;
      }
    }

    th {
      background: ${Palette.greyLight};

      .add-new-user-btn {
        font-size: 4rem;
        background: none;
        text-align: center;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }

  button {
    min-height: 2rem;
    width: 100px;
    border-radius: 4px;
  }
`;

export const StyledSaveButton = styled.button`
  background-color: ${Palette.blue};
  color: ${Palette.white};
  margin-right: 10px;
`;
