import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Palette } from '../../utils/palette';
import CloseIcon from '../icons/CloseIcon';
import { StyledModal } from './styles';

interface ModalProps {
  open: boolean;
  children?: ReactNode;
  onClose: () => void;
  title: string;
}

const Modal: FC<ModalProps> = ({ open, children, onClose, title }) => {
  const portal = document.getElementById('modal') as HTMLElement;
  if (!open) {
    document.body.style.overflow = 'unset';
    return null;
  }

  document.body.style.overflow = 'hidden';

  return ReactDOM.createPortal(
    <StyledModal>
      <div className="modal">
        <div className="header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            <CloseIcon size="24px" fill={Palette.greyLight} />
          </button>
        </div>
        {children}
      </div>
    </StyledModal>,
    portal,
  );
};

export default Modal;
