import React, { Component } from 'react';
import '../../css/normalize.css';
import '../../css/base.css';

class App extends Component {

    render () {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default App;