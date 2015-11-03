import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

class Home extends Component {

    search (e) {
        e.preventDefault();

        let keyword = this.refs.keyword.value.trim();
        const { pushState } = this.props;
        
        if (keyword) {
            pushState(null, `/${keyword}`);
        }
    }

    render () {
        return (
            <div className="index-wrapper">
                <div className="index-form">
                    <input type="text" ref="keyword" />
                    <div className="btns">
                        <input type="button" value="搜索" onClick={this.search.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pushState: bindActionCreators(pushState, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Home);