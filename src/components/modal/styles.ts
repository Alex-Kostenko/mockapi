import styled from 'styled-components';

import { Palette } from '../../palette';
import { SCALES } from '../../utils/constants';

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
    padding: 32px 48px;
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

    .modal-btn {
      box-sizing: border-box;
      padding: 10px 30px;
      cursor: pointer;
      border-radius: ${SCALES.borderRadius};
    }

    .cancel-btn {
      color: ${Palette.black};
      background-color: ${Palette.background};
      border: 1px solid ${Palette.greyLight};
    }

    .cancel-btn:hover {
      color: ${Palette.blueLight};
      border: 1px solid ${Palette.blueLight};
    }

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
