import styled from 'styled-components';

import { Paddings, Scales } from '../../../utils/constants';
import { Palette } from '../../../utils/palette';

export const StyledCancelButton = styled.button`
  box-sizing: border-box;
  padding: ${Paddings.m} ${Paddings.xxl};
  cursor: pointer;
  border-radius: ${Scales.borderRadius};
  color: ${Palette.black};
  background-color: ${Palette.background};
  border: 1px solid ${Palette.greyLight};

  :hover {
    color: ${Palette.blueLight};
    border: 1px solid ${Palette.blueLight};
  }
`;
