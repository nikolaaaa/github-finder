import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
    }

    search = (e) => { 
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.text !== '') {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        } else {
            this.props.setAlert('Please enter something', 'light');
        }

    }

    render() {
        const { clearUsers, showClear } = this.props; 

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" onChange={this.search} value={this.state.text} placeholder="Search users..." />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>

                {showClear && (
                    <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
                )}
            </div>
        )
    }
}

export default Search
