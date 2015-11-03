import React, { Component } from 'react';

class Search extends Component {
    render () {
        const { id } = this.props.params;
        return (
            <div>Search.{id}</div>
        );
    }
}

export default Search;