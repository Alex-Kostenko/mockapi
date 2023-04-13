import styled from 'styled-components';

export const StyledPagination = styled.div`
  min-width: 470px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 10px;

  .page-select {
    width: 70px;
    cursor: pointer;
  }

  .page-size-select {
    cursor: pointer;
  }
`;
