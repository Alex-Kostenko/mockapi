import React from 'react';
import styled from 'styled-components';

import { Palette } from '../../palette';

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;

  .modal {
    width: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${Palette.background};
    z-index: 100;
    padding: 2rem 3rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .header {
    font-weight: 700;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .close-btn {
    background: none;
    width: 30px;
  }
`;
