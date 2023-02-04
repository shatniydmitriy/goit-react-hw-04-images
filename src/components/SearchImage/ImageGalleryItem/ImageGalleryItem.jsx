import PropTypes from 'prop-types';

import styles from "./imageGalleryItem.module.css"

const ImageGalleryItem = ({ src, showImage, largeImageURL, tags }) => {
  return (
    <li class={styles.imageGalleryItem}
      onClick={() => showImage({ largeImageURL, tags })}
    >
      <img className={styles.imageGalleryItemImage} src={src} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};