import Collection from './collection';
import Article from '../models/article';

const resource = 'articles';

export default class ArticleCollection extends Collection {
  constructor() {
    super(resource, Article);
  }
}