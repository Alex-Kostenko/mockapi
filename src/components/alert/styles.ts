import React from 'react';
import styled from 'styled-components';

import { Palette } from '../../palette';

export const StyledAlert = styled.div`
  min-width: 600px;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -5%);
  background-color: #fafafa;
  z-index: 100;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 5px 5px ${Palette.grey};
  text-align: center;

  .title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 10px;
  }

  .footer {
    font-size: 20px;
    display: flex;
    margin-bottom: 15px;
  }

  button {
    min-height: 2rem;
    width: 100px;
    border-radius: 4px;
  }

  .submit-btn {
    background-color: ${Palette.blue};
    color: ${Palette.white};
    margin-left: 10px;
  }
`;
