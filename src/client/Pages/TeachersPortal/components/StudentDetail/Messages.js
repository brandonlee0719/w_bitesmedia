import React, { Component } from 'react';
import { observer } from 'mobx-react';

export default observer(class Messages extends Component {
    render() {
        return (
            <div className={"messages-div"}>
                <p className="member-body-title">MESSAGES</p>
            </div>
        )
    }
});