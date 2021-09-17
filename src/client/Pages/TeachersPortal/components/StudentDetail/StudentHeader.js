import React, { Component } from 'react';
import { observer } from 'mobx-react';

export default observer(class MemberHeader extends Component {
    render() {
        return (
            <div className="member-header">
                <div className="mem-info">
                    <div className="mem-photo" />
                    <p className="mem-name">{this.props.student.studentName}</p>
                </div>
                <div className="mem-header-btns">
                    <div className={this.props.active === 'assignments' ? "assignments-btn active-btn" : "assignments-btn"} onClick={() => this.props.setActive('assignments')}>
                        Assignments
                    </div>
                    {false && (<div className={this.props.active === 'messages'  ? "messages-btn active-btn" : "messages-btn"} onClick={() => this.props.setActive('messages')}>
                        Messages
                    </div>)}
                    {false && (<div className={this.props.active === 'report' ? "report-btn active-btn" : "report-btn"} onClick={() => this.props.setActive('report')}>
                        Report
                    </div>)}
                </div>
            </div>
        )
    }
})