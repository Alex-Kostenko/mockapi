import React from 'react';

import { StyledLoader } from './styles';

const Loader = () => {
  return (
    <StyledLoader>
      <div className="lds-ellipsis">
        <div className="ellips" />
        <div className="ellips" />
        <div className="ellips" />
        <div className="ellips" />
      </div>
    </StyledLoader>
  );
};

export default Loader;
