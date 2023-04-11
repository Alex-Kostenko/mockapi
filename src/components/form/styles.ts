import styled from 'styled-components';

import { Palette } from '../../palette';
import { PADDINGS, SCALES } from '../../utils/constants';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${PADDINGS.m};
  .form-input {
    display: flex;
    flex-direction: column;
  }
  .input-base {
    margin: 4px 0;
    min-height: 48px;
    min-width: 300px;
    border: 1px solid ${Palette.grey};
    padding: ${PADDINGS.m};
    border-radius: ${SCALES.borderRadius};
    outline: none;
  }
  .error {
    border-color: ${Palette.red};
    color: ${Palette.red};
  }
  .error-text {
    font-size: 14px;
  }
`;
