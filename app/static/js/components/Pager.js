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
                <ul>
                    {+currPage > +pager[0] &&
                        <li className="prev-page">
                            <a href="#" onClick={this.handleClick.bind(this, +currPage - 1)}>上一页</a>
                        </li>
                    }
                    {pagerNodes}
                    {+currPage < +pager[pager.length - 1] &&
                        <li className="next-page">
                            <a href="#" onClick={this.handleClick.bind(this, +currPage + 1)}>下一页</a>
                        </li>
                    }
                </ul>
            </div>
        );
    }
}

export default Pager;