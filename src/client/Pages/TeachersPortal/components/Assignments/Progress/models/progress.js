import { extendObservable, observable } from 'mobx';
import Model from '../../../../../../models/model';

export default class Progress extends Model {
    constructor() {
        super();

        extendObservable(this, {
            progress: observable.map({})
        });

        this.resource = 'students/progress';
        this.Model = Progress;
    }
}