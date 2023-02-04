import { Component } from 'react';
import { Notify } from 'notiflix';

import Modal from 'shered/components/Modal/Modal';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageDetails from './ImageDetails/ImageDetails';

import {searchImage} from "../../shered/services/image-api"

class ImageSearch extends Component {
    state = {
    search: '',
    items: [],
    page: 1,
    loading: false,
    error: null,
    imageDetails: null,
    showModal: false,
    totalHits: null,
    };
    

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
          this.fetchImages();
      }
      
    }
    async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImage(search, page);
      data.hits.length === 0
        ? Notify.info('Sorry, nothing found')
        : this.setState(({ items }) => ({ items: [...items, ...data.hits] }));
      this.setState({ totalHits: data.totalHits });
    }
    catch (error) {
      this.setState({ error: error.message });
    }
    finally {
      this.setState({ loading: false });
    }
    }
    
  searchImage = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
    }
    

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    }
    

  showImage = ({ largeImageURL, tags }) => {
    this.setState({
      imageDetails: { largeImageURL, tags },
      showModal: true,
    });
    }
    

  closeModal = () => {
    this.setState({
      showModal: false,
      imageDetails: null,
    });
    }
    

  render() {
    const { items, loading, error, showModal, imageDetails, totalHits } =
      this.state;
    const { searchImage, onLoadMore, showImage, closeModal } = this;
    return (
      <div>
        <SearchBar onSubmit={searchImage} />
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
}

export default ImageSearch;