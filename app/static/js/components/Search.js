import React, { Component } from 'react';

class Search extends Component {
    render () {
        return (
            <div>Search.{this.props.params.id}</div>
        );
    }
}

export default Search;