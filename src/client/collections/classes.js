import Collection from './collection';
import Classes from '../models/classes';

const resource = 'classes';

export default class ClassesCollection extends Collection {
  constructor() {
    super(resource, Classes);
  }
}