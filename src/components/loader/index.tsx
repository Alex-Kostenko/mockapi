import React from 'react';
import { StyledLoader } from './styles';

const Loader = () => {
  return (
    <StyledLoader>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </StyledLoader>
  );
};

export default Loader;
