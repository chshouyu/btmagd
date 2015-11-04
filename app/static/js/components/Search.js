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
import { doSearch, getMagnetLink } from '../actions';
import '../../css/search.css';

class Search extends Component {

    componentDidMount () {
        const { doSearch, params: { id } } = this.props;
        id && doSearch(id);
    }

    search () {
        const { pushState, doSearch } = this.props;
        let keyword = this.refs.keyword.getValue().trim();

        if (keyword) {
            pushState(null, `/${keyword}`);
            doSearch(keyword);
        }
    }

    getLink (index, link, hasLink, e) {
        e.preventDefault();
        if (hasLink) return;
        const { getMagnetLink } = this.props;
        getMagnetLink(index, link);
    }

    renderTable (list) {

        if (!list || !list.length) {
            return null;
        }

        const { magnetLinks } = this.props;

        let listNodes = list.map((item, index) => {
            let magnetLink = magnetLinks[`${index}`];
            return (
                <TableRow key={index}>
                    <TableRowColumn width="62%">{item.title}</TableRowColumn>
                    <TableRowColumn>{item.size}</TableRowColumn>
                    <TableRowColumn>{item.date}</TableRowColumn>
                    <TableRowColumn>
                        <FlatButton
                            linkButton={true}
                            href={magnetLink || '##'}
                            label={magnetLink ? '右键复制' : '获取链接'}
                            onClick={this.getLink.bind(this, index, item.link, magnetLink)}
                            secondary={magnetLink ? true : false}
                        />
                    </TableRowColumn>
                </TableRow>
            );
        });

        return (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width="62%">名称</TableHeaderColumn>
                        <TableHeaderColumn>大小</TableHeaderColumn>
                        <TableHeaderColumn>日期</TableHeaderColumn>
                        <TableHeaderColumn>操作</TableHeaderColumn>
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

    render () {

        const { list, params: { id }, isLoading } = this.props;

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
                        defaultValue={id}
                    />
                    <RaisedButton style={btnStyle} label="搜索" onClick={this.search.bind(this)} />
                </div>
                <div className="result-wrapper">
                    {isLoading &&
                        <CircularProgress style={loadingStyle} mode="indeterminate" size={1} />
                    }
                    {!isLoading && list.length > 0 &&
                        this.renderTable(list)
                    }
                    {!isLoading && list.length === 0 &&
                        this.renderEmpty()
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { list, isLoading, magnetLinks } = state;
    return {
        list,
        isLoading,
        magnetLinks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        pushState: bindActionCreators(pushState, dispatch),
        doSearch: bindActionCreators(doSearch, dispatch),
        getMagnetLink: bindActionCreators(getMagnetLink, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);