import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from "./modal.module.css"

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ close, children }) => {

    const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

    useEffect(() => {
      document.addEventListener('keydown', closeModal);
          return () => document.removeEventListener('keydown', closeModal);
    });
  
              return createPortal(
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={close}>
                    {children}
                    </div>
                </div>,
            modalRoot
    );
    

}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};