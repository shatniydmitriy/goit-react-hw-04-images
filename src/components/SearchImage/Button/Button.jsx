import PropTypes from 'prop-types';

import styles from '../Button/button.module.css';


const Button = ({ onLoadMore }) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        onLoadMore();
      }}
      type="button"
    >
      Load more
    </button>
  );
};
export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};