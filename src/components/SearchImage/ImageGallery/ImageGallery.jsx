import PropTypes from 'prop-types';

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"

import styles from "./imageGallery.module.css"

const ImageGallery = ({ items, showImage }) => {
      return (
    <ul className={styles.imageGallery}>
      {items.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            src={webformatURL}
            largeImageURL={largeImageURL}
            showImage={showImage}
          />
        );
      })}
    </ul>
  );
    
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  showImage: PropTypes.func.isRequired,
};