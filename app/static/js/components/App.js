import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import * as Actions from '../actions';
import '../../css/normalize.css';
import '../../css/base.css';

class App extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.actions.setName();
    }

    handleClick (path) {
        const { pushState } = this.props;
        pushState(null, `/app/index.html/${path}`);
    }

    render () {
        const { name } = this.props;
        return (
            <div>
                <div>hello {name}</div>
                <input type="button" value="search" onClick={this.handleClick.bind(this, 'search')} />
                <input type="button" value="search/123" onClick={this.handleClick.bind(this, 'search/123')} />
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        name
    } = state;
    return {
        name
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
        pushState: bindActionCreators(pushState, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
