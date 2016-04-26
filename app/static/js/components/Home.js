import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import '../../css/home.css';

class Home extends Component {

  search (e) {

    let keyword = this.refs.keyword.getValue().trim();

    const { pushState } = this.props;
    
    if (keyword) {
      pushState(null, `/${keyword}`);
    }
  }

  render () {

    let btnStyle = {
      margin: '0 20px',
      width: '110px'
    };

    return (
      <div className="index-wrapper">
        <div className="index-form">
          <TextField
            ref="keyword"
            fullWidth={true}
            onEnterKeyDown={this.search.bind(this)}
            inputStyle={{fontSize: '20px'}} />
          <div className="btns">
            <RaisedButton style={btnStyle} label="搜索" onClick={this.search.bind(this)} />
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