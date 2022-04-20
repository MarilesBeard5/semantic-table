const { faker } = require('@faker-js/faker')
const _ = require('lodash')

export const generateRows = (min = 1, max = 5, schema) => {
	const length = _.random(min, max, false)
	return Array.from({ length: length }).map(() => {
		const innerObject = (schema) =>
			Object.keys(schema).reduce((entity, key) => {
				if (Object.prototype.toString.call(schema[key]) === '[object Object]') {
					entity[key] = innerObject(schema[key])
					return entity
				}
				entity[key] = faker.fake(schema[key])
				return entity
			}, {})

		return innerObject(schema)
	})
}
