import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudentHeader from './StudentHeader';
import Assignments from './Assignments';
import Report from './Report';
import Messages from './Messages';

export default observer(class MemberDetail extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            active: 'assignments',
            student: props.student
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            student: nextProps.student
        });
    }

    render() {
        const state = this.state;

        return (
            <div className="member-detail">
                <StudentHeader
                    student={this.props.student}
                    active={state.active}
                    setActive={(active) => {
                        this.setState({
                            active
                        });
                    }}
                />
                <div className="member-body">
                    {state.active === 'assignments' ? (<Assignments
                        {...this.props}
                        student={this.state.student}
                    />): null}

                    {state.active === 'messages' ? (<Messages
                        {...this.props}
                    />): null}

                    {state.active === 'report' ? (<Report
                        {...this.props}
                    />): null}
                </div>
            </div>
        );
    }
});