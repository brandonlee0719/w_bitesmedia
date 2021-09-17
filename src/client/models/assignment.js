import {extendObservable} from 'mobx';
import Model from './model';

class AssignmentModel extends Model {

    constructor() {
        super();

        extendObservable(this, {
            individual: false,
            startDate: '',
            endDate: '',
            articleId: '',
            articleSlug: '',
            articleImage: '',
            articleThumbnail: '',
            progress: 0
        });

        this.resource = 'assignments';
        this.Model = AssignmentModel;
    }
}

export default AssignmentModel;