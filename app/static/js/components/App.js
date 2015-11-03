import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

    render () {
        const { name } = this.props;
        return (
            <div>hello {name}</div>
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
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
