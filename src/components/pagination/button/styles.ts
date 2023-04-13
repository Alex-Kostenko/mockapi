import styled from 'styled-components';

import { Scales } from '../../../utils/constants';
import { Palette } from '../../../utils/palette';

export const StyledPaginationButton = styled.button`
  cursor: pointer;
  min-height: 32px;
  width: 100px;
  border-radius: ${Scales.borderRadius};

  :hover:not(:disabled) {
    background: ${Palette.greyLight};
  }

  :disabled {
    cursor: not-allowed;
  }
`;
