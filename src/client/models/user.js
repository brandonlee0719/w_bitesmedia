import {extendObservable} from 'mobx';
import Model from './model';

class User extends Model {

    constructor() {
        super();

        extendObservable(this, {
        });

        this.resource = 'user';
        this.Model = User;
    }

    static getAposUser() {
        var user;
        try {
            user = JSON.parse($('[data-apos-user]').attr('data-apos-user'))
        } catch (e) {
        }
        return user;
    }
}

export default User;