import styled from 'styled-components';

import { Palette } from '../../palette';
import { PADDINGS, SCALES } from '../../utils/constants';

export const StyledButton = styled.div`
  display: inline-block;

  .load-more-button {
    font-family: inherit;
    position: relative;
    background: ${Palette.blue};
    color: ${Palette.white};
    border-radius: ${SCALES.borderRadius};
    margin: 0 auto;
    display: block;
    border: 0;
    padding: ${PADDINGS.m} ${PADDINGS.xxl};
    z-index: 2;
    cursor: pointer;
    transition: all 0.5s;
    overflow: hidden;
  }

  .load-more-button:hover {
    background: ${Palette.blueLight};
  }

  .load-more-button:disabled {
    background: ${Palette.greyLight};
    cursor: not-allowed;
  }

  .btn-loader,
  .btn-loader:after {
    border-radius: 50%;
    width: 15px;
    height: 15px;
  }
  .btn-loader {
    font-size: 6px;
    display: inline-block;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    border-left: 2px solid #ffffff;
    transform: translateZ(0);
    animation: loaderSpin 1.1s infinite linear;
  }

  @keyframes loaderSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
