import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';
import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableRowColumn,
  TableHeaderColumn
} from 'material-ui/lib/table';
import { doSearch, getMagnetLink, getLuckWord } from '../actions';
import Pager from './Pager';
import { BASE_URL } from '../config';
import '../../css/search.css';

class Search extends Component {

  componentDidUpdate (prevProps, prevState) {
    const { params: { id: prevId, page: prevPage } } = prevProps;
    const { doSearch, params: { id: nowId, page: nowPage } } = this.props;
    const keywordField = this.refs.keyword;
    if (prevId !== nowId || prevPage !== nowPage) {
      doSearch(nowId, nowPage);
      keywordField.setValue(nowId);
      document.title = `BTMAGD-${nowId}`;
    }
  }

  componentDidMount () {
    const { doSearch, params: { id, page } } = this.props;
    document.title = `BTMAGD-${id}`;
    id && doSearch(id, page);
  }

  search () {
    const { pushState, doSearch } = this.props;
    let keyword = this.refs.keyword.getValue().trim();

    if (keyword) {
      pushState(null, `/${keyword}`);
    }
  }

  getLink (index, link, hasLink, isLoading, e) {
    e.preventDefault();
    if (hasLink || isLoading) return;
    const { getMagnetLink } = this.props;
    getMagnetLink(index, link);
  }

  doGetLuckWord () {
    const { getLuckWord, pushState } = this.props;
    getLuckWord().then((luckWord) => {
      if (luckWord) {
        pushState(null, `/${luckWord}`);
      }
    });
  }

  handlePageClick (page) {
    const { pushState, params: { id } } = this.props;
    pushState(null, `/${id}/${page}`);
  }

  renderTable (list) {

    if (!list || !list.length) {
      return null;
    }

    const { magnetLinks } = this.props;

    let listNodes = list.map((item, index) => {
      let magnetLinkItem = magnetLinks[`${index}`];
      let magnetLink = magnetLinkItem && magnetLinkItem.link;
      let isLoading = magnetLinkItem && magnetLinkItem.isLoading;
      let isError = magnetLinkItem && magnetLinkItem.isError;
      return (
        <TableRow key={index}>
          <TableRowColumn dangerouslySetInnerHTML={{__html: item.title}} className="title"></TableRowColumn>
          <TableRowColumn width="12%">{item.size}</TableRowColumn>
          <TableRowColumn width="12%">{item.date}</TableRowColumn>
          <TableRowColumn width="12%">
            <FlatButton
              linkButton={true}
              href={magnetLink || '##'}
              label={isLoading ? '...' : (isError ? '重试' : (magnetLink ? '右键复制' : '获取链接'))}
              onClick={this.getLink.bind(this, index, item.link, magnetLink, isLoading)}
              secondary={magnetLink ? true : false}
              style={{textAlign: 'center'}} />
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Table className="result-table" selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>名称</TableHeaderColumn>
            <TableHeaderColumn width="12%">大小</TableHeaderColumn>
            <TableHeaderColumn width="12%">日期</TableHeaderColumn>
            <TableHeaderColumn width="12%">操作</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true}>{listNodes}</TableBody>
      </Table>
    );
  }

  renderEmpty () {
    return (
      <div className="no-result">没有结果</div>
    );
  }

  renderTimeoutError () {
    return (
      <div className="error-msg timeout-error">请求超时，请确认<a target="_blank" href={BASE_URL}>{BASE_URL}</a>能在您的浏览器中正常访问</div>
    );
  }

  render () {

    const { list, params: { id, page }, isLoading, errorStatus, pager } = this.props;

    let btnStyle = {
      margin: '4px 0 0 10px'
    };

    let loadingStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block'
    };

    return (
      <div className="search-container">
        <div className="search-form">
          <TextField
            ref="keyword"
            className="keyword"
            fullWidth={true}
            onEnterKeyDown={this.search.bind(this)}
            inputStyle={{fontSize: '20px'}}
            defaultValue={id} />
          <RaisedButton style={btnStyle} label="搜索" onClick={this.search.bind(this)} />
          <RaisedButton style={btnStyle} label="手气不错" onClick={this.doGetLuckWord.bind(this)} />
        </div>
        <div className="result-wrapper">
          {isLoading &&
            <CircularProgress style={loadingStyle} mode="indeterminate" size={1} />
          }
          {!isLoading && list.length > 0 &&
            this.renderTable(list)
          }
          {!isLoading && !errorStatus.errType && list.length === 0 &&
            this.renderEmpty()
          }
          {!isLoading && errorStatus.errType && errorStatus.errType === 'timeout_error' &&
            this.renderTimeoutError()
          }
          {!isLoading && pager.length > 0 &&
            <Pager
              pager={pager}
              currPage={page || 1}
              onPageClick={this.handlePageClick.bind(this)} />
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, isLoading, magnetLinks, errorStatus, pager } = state;
  return {
    list,
    isLoading,
    magnetLinks,
    errorStatus,
    pager
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushState: bindActionCreators(pushState, dispatch),
    doSearch: bindActionCreators(doSearch, dispatch),
    getMagnetLink: bindActionCreators(getMagnetLink, dispatch),
    getLuckWord: bindActionCreators(getLuckWord, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);