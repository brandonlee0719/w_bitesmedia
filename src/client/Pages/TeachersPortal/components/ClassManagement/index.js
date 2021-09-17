import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './style.less';
import Students from '../../../../collections/students';
import StudentDetail from '../StudentDetail';


export default observer(class TeachersPortal extends Component {
    constructor(props, context) {
        super(props, context);

        this.students = new Students();

        this.state = {
            activeStudent: undefined
        }
    }

    componentDidMount() {
        this.students.fetch()
            .then(()  => {
                const student =  this.students.first();
                if(student) {
                    student.active = true;
                    this.setState({
                        activeStudent: student
                    });
                }
            });

    }

    render() {
        return (
            <div className={`flex`}>
                <div className={'my-class'}>
                    <div className="class-title">
                        <p>My Class</p>
                        <p>Active / Completed</p>
                    </div>
                    {
                        this.students.map((student, index) => {
                            return <div key={student.studentId} className={student.active ? "class-member member-active" : "class-member"} onClick={() => {
                                this.students.models.forEach((student) => student.active = false);

                                student.active = true;
                                this.setState({
                                    activeStudent: student
                                });
                            }}>
                                {student.notification ? (
                                    <div className={student.active ? "member-state state-active" : "member-state"}>
                                        <div className={"member-state-number"}>{student.notification}</div>
                                    </div>): null}
                                <p className="member-name">{student.studentName}</p>
                                <p className="member-ac">{student.completedAssignments} / {student.totalAssignments}</p>
                            </div>
                        })
                    }
                    {/*<div className="manage_btn" onClick={this.props.manage_btn_click}>*/}
                        {/*Manage my Class*/}
                    {/*</div>*/}
                </div>

                {this.state.activeStudent ? (
                    <StudentDetail
                        student={this.state.activeStudent}
                    />
                ): null}
            </div>
        );
    }
});