import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';

import Modal from 'shered/components/Modal/Modal';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageDetails from './ImageDetails/ImageDetails';

import {searchImage} from "../../shered/services/image-api"

const ImageSearch = () => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [imageDetails, setImageDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [totalHits, setTotalHits] = useState(null);
  
    useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await searchImage(search, page);
        data.hits.length === 0
          ? Notify.info('Sorry, nothing found')
          : setItems(prevItems => [...prevItems, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      };
      
      fetchImages();
  }, [search, page]);

  const onSearchImage = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };
  const showImage = ({ largeImageURL, tags }) => {
    setImageDetails({ largeImageURL, tags });
    setShowModal(true);
  };
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const closeModal = () => {
    setShowModal(false);
    setImageDetails(null);
  };

    return (
    <div>
      <SearchBar onSubmit={onSearchImage} />
      {items.length !== 0 && (
        <ImageGallery items={items} showImage={showImage} />
      )}
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {totalHits > items.length && !loading && (
        <Button onLoadMore={onLoadMore} />
      )}
      {showModal && (
        <Modal close={closeModal}>
          <ImageDetails {...imageDetails} />
        </Modal>
      )}
    </div>
  );


}

export default ImageSearch;