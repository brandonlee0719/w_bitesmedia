import React, { Component } from 'react';
import './style.less';
import Modal from 'react-awesome-modal';


export default class ClassSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            visible: true
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const { collection } = this.props;

        return (
            <div>
                <div className="class-title">
                    {
                        collection.size ?
                        (<select value={this.state.value} onChange={this.handleChange}>
                            {collection.toArray().map((model) => {
                                return (<option key={model._id} value={model._id}>{model.name}</option>)
                            })}
                        </select>): (
                            <p>To get started, create a class</p>
                        )
                    }
                    <div className={'class-select-buttons'}>
                        <div className={'button'}></div>
                        <div className={'button'}>+ Add Class</div>
                    </div>
                </div>

                <div><p>Active / Completed</p></div>
            </div>
        );
    }
}
