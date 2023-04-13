import styled from 'styled-components';

import { Paddings, Scales } from '../../../utils/constants';
import { Palette } from '../../../utils/palette';

export const StyledSubmitButton = styled.button`
  box-sizing: border-box;
  padding: ${Paddings.m} ${Paddings.xxl};
  cursor: pointer;
  border-radius: ${Scales.borderRadius};
  color: ${Palette.white};
  background-color: ${Palette.blue};

  :hover {
    background-color: ${Palette.blueLight};
  }

  :disabled {
    cursor: not-allowed;
    background-color: ${Palette.grey};
  }
`;
