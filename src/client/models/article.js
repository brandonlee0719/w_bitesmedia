import {extendObservable} from 'mobx';
import Model from './model';

class ArticleModel extends Model {

    constructor() {
        super();

        extendObservable(this, {
            title: '',
            slug: ''
        });

        this.resource = 'articles';
        this.Model = ArticleModel;
    }
}

export default ArticleModel;