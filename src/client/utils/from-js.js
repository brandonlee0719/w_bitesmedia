export default function(data) {
	const model = this;
	for (const key in data) {
		const value = data[key]

		if (value !== null) {
			if (model.hasOwnProperty(key)) {
				if (model[key] && model[key].set) {
					for (const k in data[key]) {
						if(!isNaN(parseInt(k, 10))) {
							model[key].set(parseInt(k, 10), data[key][k]);
						} else {
							model[key].set(k, data[key][k]);
						}
					}
				} else {
					model[key] = data[key];
				}
			} else if (model[key] && model[key].set) {
				// if this is a mapping, then set each value of the object
				for (const k in value) {
					model[key].set(k, value[k]);
				}
			} else if (model[key] && model[key].push) {
				if (value && value.forEach) {
					value.forEach(function (element) {
						model[key].push(element)
					})
				} else if (value && Object.keys(value)) {
					Object.keys(value).forEach(function (id) {
						model[key].push(value[id])
					})
				}
			} else {
				if (value !== null && value !== undefined) {
					model[key] = value;
				}
			}
		}
	}
	return model;
}