import React, { Component } from 'react';
import '../../css/pager.css';

class Pager extends Component {

    handleClick (page, e) {
        e.preventDefault();
        this.props.onPageClick(page);
    }

    render () {

        const { pager, currPage } = this.props;

        let pagerNodes = pager.map((page, index) => {
            return (
                <li key={index} className={+page === +currPage ? 'curr' : ''}>
                    <a href="#" onClick={this.handleClick.bind(this, page)}>{page}</a>
                </li>
            );
        });
        return (
            <div className="pager">
                <ul>{pagerNodes}</ul>
            </div>
        );
    }
}

export default Pager;