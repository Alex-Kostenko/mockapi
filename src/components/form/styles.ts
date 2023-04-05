import React from 'react';

import styled from 'styled-components';

import { Palette } from '../../palette';
import { IFormErrors } from '../../utils/types';

export const StyledForm = styled.form.attrs(
  (props: { errors: IFormErrors }) => props
)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    min-height: 3rem;
    min-width: 300px;
    border: 1px solid ${Palette.grey};
    padding: 10px;
    border-radius: 4px;
    outline: none;
  }

  input[name='name'] {
    border-color: ${({ errors }) => errors.name && Palette.red};
  }
  input[name='age'] {
    border-color: ${({ errors }) => errors.age && Palette.red};
  }
  input[name='about'] {
    border-color: ${({ errors }) => errors.about && Palette.red};
  }

  .submit-btn {
    min-height: 2rem;
    max-width: 100px;
    background-color: ${Palette.blue};
    border-radius: 4px;
    color: ${Palette.white};
  }

  .submit-btn:hover {
    background-color: ${Palette.blueLight};
  }

  .submit-btn:disabled {
    background-color: ${Palette.grey};
  }

  .error {
    color: red;
  }
`;
