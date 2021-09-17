import Collection from './collection';
import Codes from '../models/codes';

const resource = 'codes';

export default class CodesCollection extends Collection {
  constructor() {
    super(resource, Codes);
  }
}