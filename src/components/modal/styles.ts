import styled from 'styled-components';

import { Paddings, Scales } from '../../utils/constants';
import { Palette } from '../../utils/palette';

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;

  .modal {
    width: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${Palette.background};
    z-index: 100;
    padding: ${Paddings.xxl} ${Paddings.xxxl};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  .header {
    font-weight: 700;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .close-btn {
      cursor: pointer;
      background: none;
      width: 30px;
    }
  }
  .footer {
    margin-top: 30px;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 20px;

    .submit-btn {
      color: ${Palette.white};
      background-color: ${Palette.blue};
    }

    .submit-btn:hover {
      background-color: ${Palette.blueLight};
    }

    .submit-btn:disabled {
      cursor: not-allowed;
      background-color: ${Palette.grey};
    }
  }
`;
