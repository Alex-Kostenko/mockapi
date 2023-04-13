import React, { ButtonHTMLAttributes, FC } from 'react';

import { StyledPaginationButton } from './styles';

interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: FC<PaginationButtonProps> = ({ title, ...props }) => {
  return <StyledPaginationButton {...props}>{title}</StyledPaginationButton>;
};

export default Button;
