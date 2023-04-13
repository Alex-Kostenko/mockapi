import React, { ButtonHTMLAttributes, FC } from 'react';

import { StyledCancelButton } from './styles';

interface CancelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const CancelButton: FC<CancelButtonProps> = ({ title, ...props }) => {
  return <StyledCancelButton {...props}>{title}</StyledCancelButton>;
};

export default CancelButton;
