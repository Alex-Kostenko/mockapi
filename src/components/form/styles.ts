import styled from 'styled-components';

import { Paddings, Scales } from '../../utils/constants';
import { Palette } from '../../utils/palette';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Paddings.m};
  .form-input {
    display: flex;
    flex-direction: column;
  }
  .input-base {
    width: 100%;
    display: block;
    margin: 4px 0;
    min-height: 48px;
    min-width: 300px;
    border: 1px solid ${Palette.grey};
    padding: ${Paddings.m};
    border-radius: ${Scales.borderRadius};
    outline: none;
  }
  .error {
    border-color: ${Palette.red};
    color: ${Palette.red};
  }
  .error-text {
    font-size: 14px;
  }
  .input-label {
    text-transform: capitalize;
  }
`;
