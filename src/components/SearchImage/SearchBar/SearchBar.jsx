import PropTypes from "prop-types"
import { BsSearch } from 'react-icons/bs';

import initialState from "./initialSttate";
import useForm from "shered/hooks/useForm";

import styles from "./searchBar.module.css";

const SearchBar = ({ onSubmit }) => {
      const { state, handleChange, handleSubmit } = useForm({
       initialState,
       onSubmit,
  });
    const { search } = state;
    


        return (
            <header className={styles.searchbar}>
                <form className={styles.searchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={styles.searchFormButton}>
                    <BsSearch />
                    <span className={styles.searchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        onChange={handleChange}
                        className={styles.searchFormInput}
                        value={search}
                        name="search"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        required
                    />
                </form>
                </header>
        )
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}