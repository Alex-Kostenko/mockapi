import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import { StyledAlert } from './styles';

interface Props {
  open: boolean;
  message: string;
  onSubmit: () => void;
  onClose: () => void;
}

const Alert: FC<Props> = ({ open, message, onSubmit, onClose }) => {
  const portal = document.getElementById('alert') as HTMLElement;
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <StyledAlert>
      <h2 className="title">{message}</h2>
      <div className="footer">
        <button className="submit-btn" onClick={onSubmit}>
          Ok
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </StyledAlert>,
    portal
  );
};

export default Alert;
