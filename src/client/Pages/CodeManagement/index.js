import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './style.less';
import Codes from '../../collections/codes';
import Create from './components/Create';

export default observer(class CodeManagement extends Component {
    constructor(props, context) {
        super(props, context);

        this.codes = new Codes();
        this.codes.limit = 100;

        this.state = {
            isCreateOpen: false
        };
    }

    componentDidMount() {
        this.codes.fetch();
    }

    handleSave = (model) => {
        this.codes.setModel(model);
        this.setState({
            isCreateOpen: false
        });
    }

    render() {
        const codes = this.codes;

        return (
            <div className={'class-management'}>
                <h3>Sign Up Codes</h3>
                <div className="standard-button" onClick={() => {
                    this.setState({
                        isCreateOpen: !this.state.isCreateOpen
                    })
                }}>Add Code</div>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Connected to</th>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map((code) => {
                            const name = code.fullName ? `${code.fullName} (${code.name})`: code.name;
                            let relationName = code.relationName || code.relationCode;
                            if(code.relations) {
                               const relations = [];

                               code.relations.forEach(function(relation) {
                                  relations.push((
                                      <div style={{marginBottom: '8px'}}>{relation.name}</div>
                                  ))
                               });

                               if(relations.length) {
                                   relationName = (
                                       <div>
                                           {relations}
                                       </div>
                                   )
                               }
                            }

                            return (
                                <tr key={code.id}>
                                    <td>{name}</td>
                                    <td>{code.type}</td>
                                    <td>{relationName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div>
                    {codes.offset + codes.limit <= codes.size ? (
                        <div className="standard-button" style={{float: 'right'}} onClick={() => {
                            codes.offset += this.codes.limit;
                            codes.fetch();
                        }}>More</div>
                    ): null}
                    <div className="standard-button" onClick={() => {
                        this.setState({
                            isCreateOpen: !this.state.isCreateOpen
                        })
                    }}>Add Code</div>
                    {this.state.isCreateOpen &&  (<Create open={this.state.isCreateOpen} onSave={this.handleSave} />)}
                </div>
            </div>
        );
    }
});