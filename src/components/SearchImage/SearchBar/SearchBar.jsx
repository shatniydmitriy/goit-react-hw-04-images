import { Component } from "react";
import PropTypes from "prop-types"
import { BsSearch } from 'react-icons/bs';

import styles from "./searchBar.module.css";

class SearchBar extends Component {

    state = {
        search: "",
    }
            
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }
            
    handelSubmit = e => {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit({ ...this.state });
        this.reset();

    }
    
    reset() {
        this.setState({
            search: "",
        })
    }



    render() {
        const { search } = this.state;
        const { handleChange, handelSubmit } = this;

        return (
            <header className={styles.searchbar}>
                <form className={styles.searchForm} onSubmit={handelSubmit}>
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
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}