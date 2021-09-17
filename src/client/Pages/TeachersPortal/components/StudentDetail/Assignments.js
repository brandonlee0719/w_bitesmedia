import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Assignments from '../../../../collections/assignments';
import AssignmentForm from '../Assignments/Form';
import AssignmentProgress from '../Assignments/Progress';


export default observer(class AssignmentView extends Component {
    constructor(props){
        super(props);

        this.assignments = new Assignments();
        this.state = {
            open: false
        };
    }

    componentDidMount() {
        this.assignments.fetch();
    }

    handleAddClick = () => {
        this.setState({
            open: !this.state.open
        })
    };

    render() {
        return (
            <div>
                <p className="member-body-title">ASSIGNMENTS</p>
                <div>
                    {
                        this.assignments.map((assignment, index) => {
                            return <div key={`ass-${index}`} className="assign-bite">
                                <div className="assign-bite-div" style={{
                                    backgroundImage: `url(${assignment.articleImage})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPositionY: '25%'}}>
                                    <div className="assign-bite-details">
                                        <p className="assign-bite-title">{assignment.name}</p>
                                        <p><AssignmentProgress student={this.props.student} articleId={assignment.articleId} assignment={assignment}/></p>
                                        <p>Assigned {assignment.startDate}</p>
                                        <p>Due {assignment.endDate}</p>
                                        {assignment.individual ? (<p>For this student only</p>): null}
                                    </div>
                                    {/*<div className="assign-bite-more" onClick={this.assign_more_click}>*/}
                                        {/*<img src={this.props.mainPath + "/img/more.png"}></img>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="assign-progress">
                                    <div className="real-progress" style={{ width: `${assignment.progress}%`}} />
                                </div>
                            </div>
                        })
                    }

                    <div className="assign-new-bite" onClick={this.handleAddClick}>
                        <div className="add-bite-icon" >+</div>
                        <p className="add-bite-title">Assign a new article</p>
                    </div>
                    {this.state.open ? (<AssignmentForm open={this.state.open} onSave={(model) => {
                        this.setState({
                            open: false
                        });

                        this.assignments.setModel(model);
                    }} />): null}
                </div>
            </div>
        )
    }
});