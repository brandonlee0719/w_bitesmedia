import Model from './model';

class ClassesModel extends Model {

	constructor() {
		super();
		this.resource = 'classes';
		this.Model = ClassesModel;
	}
}

export default ClassesModel;