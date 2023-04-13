import React, { ButtonHTMLAttributes, FC } from 'react';

import { StyledButton } from './styles';

interface LoadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading: boolean;
}

const LoadButton: FC<LoadButtonProps> = ({
  title,
  isLoading,
  className,
  ...props
}) => {
  return (
    <StyledButton className="load-more-button-wrap">
      <button {...props} className={'load-more-button'}>
        {isLoading ? <div className="btn-loader" /> : title}
      </button>
    </StyledButton>
  );
};

export default LoadButton;
