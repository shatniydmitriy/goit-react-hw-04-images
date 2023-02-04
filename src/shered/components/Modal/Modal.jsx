import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from "./modal.module.css"

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.closeModal);
  }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal);
  }

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') {
            this.props.close();
    }
  }


    render() {
        const { children, close } = this.props;
        const { closeModal } = this;

            return createPortal(
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={close}>
                    {children}
                    </div>
                </div>,
            modalRoot
    );
    }
    

}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};