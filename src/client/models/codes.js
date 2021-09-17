import {extendObservable, observable} from 'mobx';
import Model from './model';

class CodesModel extends Model {

    constructor() {
        super();

        extendObservable(this, {
            type: '',
            relationName: '',
            relationCode: '',
            username: '',
            fullName: '',
            relations: observable.map({})
        });

        this.resource = 'codes';
        this.Model = CodesModel;
    }
}

export default CodesModel;