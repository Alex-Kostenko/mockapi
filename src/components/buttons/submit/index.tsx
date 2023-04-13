import React, { ButtonHTMLAttributes, FC } from 'react';

import { StyledSubmitButton } from './styles';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ title, ...props }) => {
  return <StyledSubmitButton {...props}>{title}</StyledSubmitButton>;
};

export default SubmitButton;
