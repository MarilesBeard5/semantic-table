import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

export const formatColumn = (format, value, datecustom) => {
	const type = typeof format === 'string' ? format : format.type
	const decimals = typeof format === 'string' ? 2 : format.decimals

	const transform = function (org, n, x, s, c) {
		const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
			num = org.toFixed(Math.max(0, ~~n))

		return (c ? num.replace('.', c) : num).replace(
			new RegExp(re, 'g'),
			'$&' + (s || ',')
		)
	}
	switch (type) {
		case 'currency':
			return !isNaN(value)
				? `$${transform(parseFloat(value), decimals, 3, ',', '.')}`
				: value
		case 'number':
			return !isNaN(value)
				? `${transform(parseFloat(value), decimals, 3, ',', '.')}`
				: value
		case 'percentage':
			return !isNaN(value)
				? `${transform(parseFloat(value), decimals, 3, ',', '.')}%`
				: value
		case 'date':
			if (!value) {
				return ''
			}
			return moment(value).format('DD/MM/YYYY')
		case 'datecustom':
			if (!value) {
				return ''
			}
			return moment(value).format(datecustom)
		default:
			return value
	}
}

export const processValue = (newValue, column) => {
	const { type = 'text' } = column
	switch (type) {
		case 'text':
			return newValue
		case 'number':
			return isNaN(parseInt(newValue)) ? null : newValue
		case 'select':
			let found = column?.options.find((option) => option.value === newValue)
			return found ? found.value : null
		case 'boolean':
			return (newValue == 'true' || newValue === true) ? 'true' : 'false'
		default:
			return newValue
	}
}

/**
 * Returns a unique copy of the given object array by the specified property, ignoring
 * any other property in each object.
 * @param {Array <Object> } array - The original array.
 * @param {String} prop - The object prop that specifies the uniqueness parameter
 *
 * @returns {Array <Object>} The result unique array.
 *
 * @example
 * let array = [{ foo: 'one' bar: 3}, { foo: 'one' bar: 2}, { foo: 'three' bar: 1}]
 *
 * let uniq_array = getUniqArray(array, 'foo')
 * // [{ foo: 'one' bar: 3}, { foo: 'three' bar: 1}]
 */
export const getUniqArray = (array, prop) => {
	const newProp = prop.replaceAll('.', '_').toLowerCase()
	let copy = array.map((member) => {
		let value = getObjectProp(member, prop)
		if (value) {
			return { ...member, [newProp]: value }
		}
		return member
	})
	return _.uniqBy(copy, newProp)
}

/**
 * Returns an sorted copy of the given object array by a specific prop, specifying the sort order
 * @param {Array <Object> } array - The original array.
 * @param {Object} sorter - The sorter object that specifies the sort order
 * @param {('asc'|'desc')} sorter.order - One of 'asc' and 'desc'
 * @param {String} sorter.accessor - The object prop to order by
 *
 * @returns {Array <Object>} The sorted array.
 *
 * @example
 * let array = [{ foo: 'one' bar: 3}, { foo: 'two' bar: 2}, { foo: 'three' bar: 1}]
 *
 * let sorted_array = getSortedArray(array, {accessor: 'foo', order: 'asc'})
 * // [{ foo: 'one' bar: 3}, { foo: 'three' bar: 1}, { foo: 'two' bar: 2}]
 */
export const getSortedArray = (array, sorter) => {
	let sortedArray = _.orderBy(
		array,
		[sorter?.accessor ?? null],
		[(sorter?.order ?? null)?.toLocaleLowerCase() ?? null]
	)
	return sortedArray
}

export const getArrayFromNestedProp = function (stringProp) {
	let s = stringProp
	s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
	s = s.replace(/^\./, '') // strip a leading dot
	let a = s.split('.')
	return a
}

export const getObjectProp = function (object, stringProp) {
	let o = object
	let a = getArrayFromNestedProp(stringProp)
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i]
		if (o == null) return
		if (k in o) {
			o = o[k]
		} else {
			return
		}
	}
	return o
}

export const uuid = function () {
	let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
