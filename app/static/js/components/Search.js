import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import {
    Table,
    TableRow,
    TableBody,
    TableHeader,
    TableRowColumn,
    TableHeaderColumn
} from 'material-ui/lib/table';
import '../../css/search.css';

class Search extends Component {

    search () {
        let keyword = this.refs.keyword.getValue().trim();

        if (keyword) {
            
        }
    }

    render () {
        const { id } = this.props.params;

        let btnStyle = {
            margin: '4px 0 0 10px'
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
                        value={id}
                    />
                    <RaisedButton style={btnStyle} label="搜索" onClick={this.search.bind(this)} />
                </div>
                <div className="result-wrapper">
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>名称</TableHeaderColumn>
                                <TableHeaderColumn>大小</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            <TableRow>
                                <TableRowColumn>你还是老样子{id}</TableRowColumn>
                                <TableRowColumn>200M</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>那又怎么样呢{id}</TableRowColumn>
                                <TableRowColumn>300M</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default connect(null)(Search);