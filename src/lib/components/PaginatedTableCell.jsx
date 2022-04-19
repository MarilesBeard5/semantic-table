import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

//Input Components
import { Header, TextArea, Icon, Select } from 'semantic-ui-react'
import Cleave from 'cleave.js/react'
//Utils
import { formatColumn, getObjectProp, processValue } from '../utils/index'

const renderCell = (
	column,
	value,
	onEdit,
	isEditable,
	willRenderCell,
	handleBlur,
	inputRef
) => {
	const { type = 'text' } = column

	if (isEditable && willRenderCell) {
		switch (type) {
			case 'text':
				return (
					<input
						className="InputField"
						type={type}
						value={value ? value : ''}
						placeholder={column.placeholder}
						onChange={(e) => {
							let newValue = e.target.value
							onEdit(newValue)
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			case 'currency':
				return (
					<Cleave
						className="InputField"
						value={value}
						style={{ textAlign: 'right' }}
						placeholder={column.placeholder}
						onChange={(e) => {
							const value = e.target.rawValue
							let isValid = true
							const maxValue = null
							if (maxValue != null) {
								const floatValue = parseFloat(value)
								isValid = floatValue <= maxValue
							}

							if (isValid) {
								onEdit(value)
							}
						}}
						options={{
							numeral: true,
							rawValueTrimPrefix: true,
							numeralDecimalScale: 2,
							prefix: '$',
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			case 'boolean':
				return (
					<input
						className="InputField"
						type={'checkbox'}
						checked={value}
						onChange={(e) => {
							let newValue = e.target.checked
							onEdit(newValue)
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			case 'select':
				return (
					<Select
						className="InputField"
						placeholder="Seleccione una opción"
						options={column.options}
						value={value ? value : ''}
						search
						compact
						defaultOpen
						onChange={(e, data) => {
							onEdit(data.value)
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			case 'textarea':
				return (
					<TextArea
						className="InputField"
						value={value}
						placeholder={column.placeholder}
						onChange={(e, opt) => {
							onEdit(opt.value)
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			case 'number':
				return (
					<input
						className="InputField"
						type="number"
						value={value ? value : ''}
						placeholder={column.placeholder}
						onChange={(e) => {
							let newValue = e.target.value
							onEdit(newValue)
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			case 'color':
				return (
					<div style={{ textAlign: 'center' }}>
						<input
							className="InputField"
							type="color"
							value={value ? value : ''}
							placeholder={column.placeholder}
							onChange={(e) => {
								let newValue = e.target.value
								onEdit(newValue)
							}}
							style={{ width: `${column.width / 2}px` }}
							onBlur={(e) => {
								handleBlur()
							}}
							ref={inputRef}
						/>
					</div>
				)
			case 'two-factor':
				return (
					<input
						className="InputField"
						type="number"
						value={value ? value : ''}
						placeholder={column.placeholder}
						onChange={(e) => {
							let newValue = e.target.value
							if (newValue === 6 || newValue === 8) {
								return undefined
							}
							if (newValue % 2 !== 0) {
								return undefined
							}
							onEdit(newValue)
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			case 'date':
				return (
					<input
						className="InputField"
						value={value ? value : ''}
						type={type}
						onChange={(e) => {
							let newValue = e.target.value
							onEdit(newValue)
						}}
						onBlur={(e) => {
							handleBlur()
						}}
						ref={inputRef}
					/>
				)
			default:
				break
		}
	} else {
		switch (type) {
			case 'text':
				return <span>{value}</span>

			case 'date':
				return <span>{value ? formatColumn('date', value) : ''}</span>

			case 'datetime':
				return (
					<span>
						{value
							? formatColumn('datecustom', value, 'DD/MM/YYYY hh:mm a')
							: ''}
					</span>
				)

			case 'time':
				return <span>{value ? formatColumn('time', value) : ''}</span>

			case 'currency':
				return (
					<span style={{ margin: 'auto' }}>
						{formatColumn('currency', value ? value : 0)}
					</span>
				)

			case 'number':
				return (
					<span style={{ margin: 'auto' }}>
						{formatColumn('number', value ? value : 0)}
					</span>
				)

			case 'boolean':
				if (column.customBooleanText) {
					return value
						? column.customBooleanText?.true
						: column.customBooleanText?.false
				} else {
					return <Icon size="large" name={value ? 'check' : 'close'} />
				}
			case 'textarea':
				return (
					<span
						style={{
							maxHeight: '100px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							// whiteSpace: 'nowrap'
						}}
					>
						{value}
					</span>
				)

			case 'select':
				const item = column.options.find((option) => value === option.value)
				return <span>{item?.text}</span>
			default:
				return null
		}
	}
}

const PaginatedTableCell = (props) => {
	const { row, column, onEditCell, isEditable, setCanSave = false, isFocused = null } = props

	const inputRef = useRef(null)

	const [value, setValue] = useState(getObjectProp(row, column.accessor))
	const [willRenderCell, setWillRenderCell] = useState(false)

	useEffect(() => {
		const currentValue = getObjectProp(row, column.accessor)
		const newValue = processValue(currentValue, column)
		setValue(newValue)
	}, [row, processValue, column])

	useEffect(() => {
		if (inputRef.current) {
			willRenderCell ? inputRef.current.focus() : inputRef.current.blur()
		}
	}, [inputRef, willRenderCell])

	useEffect(() => {
		isFocused(willRenderCell)
	}, [willRenderCell])

	const onEdit = (newValue) => {
		setValue(newValue)
	}

	const handleBlur = () => {
		onEditCell(value, row, column)
		setWillRenderCell(false)
	}

	return (
		<Header
			as="h5"
			style={{ height: '15px', cursor: isEditable && 'cell' }}
			contentEditable={isEditable}
			onFocus={() => {
				setWillRenderCell(true)
			}}
		>
			<Header.Content style={{ display: 'block' }}>
				{renderCell(
					column,
					value,
					onEdit,
					isEditable,
					willRenderCell,
					handleBlur,
					inputRef,
				)}
			</Header.Content>
		</Header>
	)
}

PaginatedTableCell.propTypes = {
	column: PropTypes.shape({
		width: PropTypes.number,
		Header: PropTypes.string,
		accessor: PropTypes.string,
		type: PropTypes.string,
		editable: PropTypes.bool,
	}),
	onEditCell: PropTypes.func,
	row: PropTypes.object,
	value: PropTypes.any,
	isEditable: PropTypes.bool,
	isFocused: PropTypes.func,
	setCanSave: PropTypes.func,
}

export default PaginatedTableCell
