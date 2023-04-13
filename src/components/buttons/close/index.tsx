import React, { ButtonHTMLAttributes, FC } from 'react';

import { Palette } from '../../../utils/palette';
import CloseIcon from '../../icons/CloseIcon';
import { StyledCloseButton } from './styles';

const CloseButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <StyledCloseButton {...props}>
      <CloseIcon size="24px" fill={Palette.greyLight} />
    </StyledCloseButton>
  );
};

export default CloseButton;
