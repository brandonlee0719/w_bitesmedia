import Collection from './collection';
import Assignment from '../models/assignment';

const resource = 'assignments';

export default class AssignmentCollection extends Collection {
  constructor() {
    super(resource, Assignment);
  }
}