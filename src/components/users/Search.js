import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ clearUsers, showClear, setAlert, searchUsers }) => {
    const [text, setText] = useState('');

    const onSearch = (e) => {
        setText(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        if (text !== '') {
            searchUsers(text);
            setText('');
        } else {
            setAlert('Please enter something', 'light');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" onChange={onSearch} value={text} placeholder="Search users..." />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>

            {showClear && (
                <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            )}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
}

export default Search
