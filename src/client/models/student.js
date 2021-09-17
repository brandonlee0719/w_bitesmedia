import {extendObservable} from 'mobx';
import Model from './model';

class StudentModel extends Model {

    constructor() {
        super();

        extendObservable(this, {
            studentId: '',
            studentName: '',
            totalAssignments: 0,
            completedAssignments: 0,
            active: false,
            notification: 0
        });

        this.resource = 'students';
        this.Model = StudentModel;
    }
}

export default StudentModel;