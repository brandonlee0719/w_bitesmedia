import Collection from './collection';
import Student from '../models/student';

const resource = 'students';

export default class StudentCollection extends Collection {
  constructor() {
    super(resource, Student);
  }
}