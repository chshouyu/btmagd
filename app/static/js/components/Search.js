import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import RaisedButton from 'material-ui/lib/raised-button';
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
import { doSearch } from '../actions';
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

    renderTable (list) {

        if (!list || !list.length) {
            return null;
        }

        let listNodes = list.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn width="70%">{item.title}</TableRowColumn>
                    <TableRowColumn>{item.size}</TableRowColumn>
                    <TableRowColumn>{item.date}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width="70%">名称</TableHeaderColumn>
                        <TableHeaderColumn>大小</TableHeaderColumn>
                        <TableHeaderColumn>日期</TableHeaderColumn>
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
    const { list, isLoading } = state;
    return {
        list,
        isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        pushState: bindActionCreators(pushState, dispatch),
        doSearch: bindActionCreators(doSearch, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);