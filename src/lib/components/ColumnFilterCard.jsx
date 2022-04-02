// React
import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Style
import {
	Checkbox,
	Segment,
	Input,
	Divider,
	Button,
	List,
	Popup,
} from 'semantic-ui-react'

//Utils
import { getObjectProp, getUniqArray } from 'utils/index'

// External Libraries
import _ from 'lodash'

const ColumnFilterCard = (props) => {
	const {
		column,
		options,
		optionsCleaner = null,
		onApply = null,
		sortAccessor = null,
		setSortAccessor = null,
		sortOrder,
		setSortOrder,
		type = null,
	} = props

	const [filters, setFilters] = useState('')

	const [filteredOptions, setFilteredOptions] = useState([])
	const [currentOptions, setCurrentOptions] = useState([])
	const [canApply, setCanApply] = useState(false)

	useEffect(() => {
		const currentOptions = getOptionArray(column)
		setCurrentOptions(currentOptions)
	}, [column])

	const getOptionArray = (column) => {
		return getUniqArray(options, column.accessor).map((option) => {
			let value = null
			if (column.type == 'select') {
				value = column?.options.find(
					(selectableOption) =>
						selectableOption.value == getObjectProp(option, column.accessor)
				).text
			} else {
				value = getObjectProp(option, column.accessor)
			}
			return {
				label: value,
				checked: option.checked,
				...option,
			}
		})
	}

	const handleAscendSorting = (column) => {
		setSortAccessor(column.accessor)
		setSortOrder('ASC')
	}

	const handleDescendSorting = (column) => {
		setSortAccessor(column.accessor)
		setSortOrder('DESC')
	}

	useEffect(() => {
		canApply &&
			onApply(column.accessor, currentOptions, sortAccessor, sortOrder)
	}, [sortOrder, sortAccessor, canApply])

	const allOptionsChecked = useMemo(() => {
		return currentOptions.every((option) => {
			return option.checked
		})
	}, [filteredOptions])

	useEffect(() => {
		if (JSON.stringify(currentOptions) !== JSON.stringify(filteredOptions))
			setCanApply(true)
	}, [currentOptions, filteredOptions])

	useEffect(() => {
		// TODO: case for 'select' type
		let filteredLabeledOptions = currentOptions.filter((option) => {
			if (filters) {
				const { type = 'text' } = column
				switch (type) {
					case 'text':
					case 'number':
						return (option.label ? option.label : '')
							.toString()
							.toLocaleLowerCase()
							.includes(filters.toLocaleLowerCase())
					case 'boolean':
						switch (filters) {
							case 'si':
								return option
							case 'no':
								return !option
							default:
								return true
						}
					default:
						break
				}
			}
			return true
		})
		setFilteredOptions(filteredLabeledOptions)
	}, [filters, currentOptions])

	const handleCheckChange = (option) => {
		setCurrentOptions((previousCurrentOptions) => {
			let newOptions = previousCurrentOptions.map((prev) => {
				if (option.id == prev.id) {
					return {
						...prev,
						checked: !option.checked,
					}
				}
				return prev
			})
			return newOptions
		})
	}

	const handleCheckAll = (value) => {
		setCurrentOptions((previousCurrentOptions) => {
			let checkedOptions = previousCurrentOptions.map((prev) => {
				return {
					...prev,
					checked: value,
				}
			})
			return checkedOptions
		})
	}

	const componentList = useMemo(() => {
		return filteredOptions.map((item, index) => {
			return (
				<List.Item key={`item-${index}`}>
					<Checkbox
						key={`cb-${index}`}
						label={item.label}
						style={{ marginBottom: 10 }}
						onChange={(value) => {
							handleCheckChange(item)
						}}
						checked={item.checked}
					/>
				</List.Item>
			)
		})
	}, [filteredOptions])

	const footer = (
		<Button.Group>
			<Button
				icon="save outline"
				color="teal"
				content="Aplicar"
				labelPosition="left"
				type="button"
				onClick={(e) => {
					onApply &&
						onApply(column.accessor, currentOptions, sortAccessor, sortOrder)
				}}
				disabled={!canApply}
			/>
			<Button
				icon="erase"
				color="white"
				content="Limpiar"
				labelPosition="left"
				type="button"
				onClick={(e) => {
					onApply && onApply(column.accessor, options, sortAccessor, sortOrder)
				}}
				disabled={true}
			/>
		</Button.Group>
	)

	const header = (
		<>
			<Checkbox
				label="Seleccionar Todos"
				style={{ marginBottom: 10, marginRight: 10 }}
				onChange={(e, { checked }) => {
					handleCheckAll(checked)
				}}
				checked={allOptionsChecked}
			/>
			<Popup
				on="hover"
				content="Ordenar Ascendente"
				trigger={
					<Button
						icon="sort amount up"
						onClick={(e) => {
							handleAscendSorting(column)
						}}
						disabled={(sortOrder ?? 'ASC') == 'ASC' && sortAccessor != null}
					/>
				}
			/>
			<Popup
				on="hover"
				content="Ordenar Descendente"
				trigger={
					<Button
						icon="sort amount down"
						onClick={(e) => {
							handleDescendSorting(column)
						}}
						disabled={(sortOrder ?? 'DESC') == 'DESC' && sortAccessor != null}
					/>
				}
			/>
		</>
	)

	const renderInput = (type) => (
		<Input
			size="large"
			placeholder={`Buscar por ${column.Header}`}
			value={filters[column.accessor]}
			onChange={(e) => {
				const value = e.target.value
				setFilters(value)
			}}
			icon="search"
		/>
	)

	return (
		<>
			<Segment secondary>
				{header}
				<Divider></Divider>
				{renderInput(type)}
				<Divider></Divider>
				<div
					style={{
						height: '25vh',
						width: '15vw',
						overflow: 'hidden',
					}}
				>
					<List
						style={{
							height: '-webkit-fill-available',
							overflowY: 'scroll',
							paddingBottom: 30,
						}}
					>
						{componentList}
					</List>
				</div>
				<Divider></Divider>
				{footer}
			</Segment>
		</>
	)
}

ColumnFilterCard.propTypes = {
	sortAccessor: PropTypes.string,
	sortOrder: PropTypes.oneOf(['ASC', 'DESC']),
	setSortOrder: PropTypes.func,
	setSortAccessor: PropTypes.func,
	column: PropTypes.shape({
		width: PropTypes.number,
		label: PropTypes.string,
		accessor: PropTypes.string,
		filterable: PropTypes.bool,
		sortable: PropTypes.bool,
	}),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			checked: PropTypes.bool,
		})
	),
	type: PropTypes.string,
}

export default ColumnFilterCard
