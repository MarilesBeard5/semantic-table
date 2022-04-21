import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import {
	Button,
	Icon,
	Popup,
	Header,
	Grid,
	Table,
	Menu,
	Segment,
	Label,
	Statistic,
} from 'semantic-ui-react'

import styles from '../styles/global.module.scss'

//Components
import PaginatedTableHeader from './PaginatedTableHeader'
import PaginatedTableCell from './PaginatedTableCell'

//Utils
import { getObjectProp, getSortedArray, processValue } from '../utils/index'

//External
import _ from 'lodash'
import { CSVLink } from 'react-csv'

//Virtualized Rows Size
import { useWindowDimensions } from './WindowSize'
import moment from 'moment'

const rowActionButton = `${styles.IconButton}` + ' ' + `${styles.nonBordered}`
const tableActionButton =
	`ui blue basic button ${styles.Bordered}` + ' ' + `${styles.shadowOnHover}`

const DOTS = '...'

const PaginatedTable = (props) => {
	const {
		title = 'Table',
		columns = [],
		actionsActive = false,
		actionsWidth = 100,
		onDelete = null,
		onSelect = null,
		onCancel = null,
		onEditCell = null,
		onSave = null,
		onAdd = null,
		onAddRow = null,
		enableExportToCSV = false,
		rowLimit = 15,
		loading = false,
		paginated = true,
		additionalActionButtons = [],
		additionalHeaderButtons = [],
		saveButtonText = 'Guardar',
		cancelButtonText = 'Cancelar',
		newRowButtonText = 'Nueva Fila',
		addButtonText = 'Nuevo',
		removeFiltersButtonText = 'Limpiar Filtros',
		editRowButtonText = 'Editar',
		deleteRowButtonText = 'Borrar',
		exportToCSVButtonText = 'Exportar a CSV',
		actionsHeaderText = 'Acciones',
		numberOfRecordsText = 'Total: ',
	} = props

	// Inner States
	const [rows, setRows] = useState(props.rows ?? [])
	const [filteredRows, setFilteredRows] = useState(props.rows ?? [])
	const [hasBeenFiltered, setHasBeenFiltered] = useState(false)
	const [canSave, setCanSave] = useState(false)
	const [sortOrder, setSortOrder] = useState(null)
	const [sortAccessor, setSortAccessor] = useState(null)
	const [page, setPage] = useState(1)
	const [slice, setSlice] = useState([])
	const [range, setRange] = useState([])

	const [focused, setFocused] = useState({
		condition: false,
		id: null,
	})

	//Table Dimensions
	const { width: innerWidth, height: innerHeight } = useWindowDimensions()

	const tableHeight = useMemo(() => {
		return props.height ? props.height : innerHeight / 2
	}, [props.height, innerHeight])

	/**
	 * =====================================================================
	 * LOGICA
	 * =====================================================================
	 */

	useEffect(() => {
		const localRows = (props.rows ?? []).map((row) => {
			return {
				...row,
				checked: true,
			}
		})
		setFilteredRows(localRows)
		setRows(localRows)
	}, [props.rows])

	const renderByFilter = (
		{ accessor, type },
		options,
		sortBy,
		sortDirection
	) => {
		let newRows = getSortedArray(rows, {
			order: sortDirection,
			accessor: sortBy,
		})

		let renderedRows = newRows.map((row) => {
			let currentRowValue =
				type == 'select' ? row[accessor] : getObjectProp(row, accessor)
			let found = options.find((option) => {
				let foundRowValue = getObjectProp(option, accessor)
				return currentRowValue === foundRowValue
			})
			return found ? { ...row, checked: found.checked } : row
		})
		setHasBeenFiltered(true)
		setFilteredRows(renderedRows)
	}

	const removeFilters = () => {
		setFilteredRows(rows)
		setHasBeenFiltered(false)
	}

	const onBlurRow = (value, row, column) => {
		let newRow = {}
		let newRows = []
		const oldValue = processValue(getObjectProp(row, column.accessor), column)
		if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
			newRows = filteredRows.map((r) => {
				if (row.id === r.id) {
					newRow = {
						...r,
						[column.accessor]: value,
					}

					if (onEditCell) {
						onEditCell({ row: newRow, column, value })
					}
					return newRow
				}
				return r
			})
			setCanSave(true)
			setFilteredRows(newRows)
			setRows(newRows)
		}
	}

	const onCancelEdition = () => {
		const localRows = (props.rows ?? []).map((row) => {
			return {
				...row,
				checked: true,
			}
		})
		setFilteredRows(localRows)
		setRows(localRows)
		if (onCancel && typeof onCancel == 'function') {
			onCancel(rows)
		}
		setCanSave(false)
	}

	const onRowDelete = (row) => {
		const truncatedData = rows.filter((r) => r.id !== row.id)
		if (onDelete && typeof onDelete == 'function') {
			onDelete(row)
		}
		setRows(truncatedData)
		setFilteredRows(truncatedData)
		setCanSave(true)
	}

	const onSaveRows = () => {
		// Compare newRows vs rows;
		const { deleteItems, updateItems } = props.rows.reduce(
			(acum, item) => {
				const found = filteredRows.find((r) => r.id === item.id)
				if (!found) {
					// It was delete it
					return {
						...acum,
						deleteItems: [...acum.deleteItems, { id: item.id }],
					}
				} else {
					delete found.checked
					// It may be updated
					if (_.isEqual(found, item)) {
						// No UPDATE
						return acum
					} else {
						// Yes Update
						return {
							...acum,
							updateItems: [...acum.updateItems, found],
						}
					}
				}
			},
			{
				deleteItems: [],
				updateItems: [],
			}
		)

		const createItems = _.differenceBy(rows, props.rows, 'id')

		const data = {
			deleteItems,
			updateItems,
			createItems,
			rows,
		}
		onSave(data)
		setCanSave(false)
	}

	const onAddNewRow = () => {
		const id = moment().unix().toString().slice(3)
		if (onAddRow && typeof onAddRow == 'function') {
			const newRowData = onAddRow(id)
			const newRows = [
				{
					id,
					_fake: true,
					checked: true,
					...newRowData,
				},
				...rows,
			]
			setFilteredRows(newRows)
			setRows(newRows)
			setCanSave(true)
		}
	}

	/**
	 * =====================================================================
	 * PAGINADO
	 * =====================================================================
	 */

	useEffect(() => {
		if (slice.length < 1 && page !== 1) {
			setPage(page - 1)
		}
	}, [slice, page])

	const getRange = (start, end) => {
		let length = end - start + 1
		return Array.from({ length }, (_, idx) => idx + start)
	}

	const calculatedRange = useMemo(() => {
		const limit = rowLimit
		const length = filteredRows.filter((row) => row.checked).length
		const totalPageCount = Math.ceil(length / limit)

		// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const siblingCount = 1
		const totalPageNumbers = siblingCount + 5

		if (totalPageNumbers >= totalPageCount) {
			return getRange(1, totalPageCount)
		}

		const leftSiblingIndex = Math.max(page - siblingCount, 1)
		const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount)

		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

		const firstPageIndex = 1
		const lastPageIndex = totalPageCount

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount
			let leftRange = getRange(1, leftItemCount)

			return [...leftRange, DOTS, totalPageCount]
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount
			let rightRange = getRange(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = getRange(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [filteredRows, rowLimit, page])

	useEffect(() => {
		if (paginated) {
			setRange(calculatedRange)
			const slicedData = filteredRows
				.filter((row) => row.checked)
				.slice((page - 1) * rowLimit, page * rowLimit)
			setSlice(slicedData)
		}
	}, [filteredRows, page, calculatedRange, rowLimit, paginated])

	/**
	 * ==================================================
	 * EXPORT
	 * ==================================================
	 */

	const formatExportTitle = (title) => {
		let trimmedSpacesTitle = title.replace(/\s+/g, '')
		let parsedTitle = trimmedSpacesTitle.toLowerCase()
		return parsedTitle
	}

	const exportData = useMemo(() => {
		let data = []
		let headers = []
		let rowsToSend = []
		let accessors = []
		columns.forEach((c) => {
			headers.push(c.Header)
			accessors.push(c.accessor)
		})
		rowsToSend = filteredRows
			.filter((row) => row.checked)
			.map((r) => {
				return columns.map((c) => {
					if (accessors.includes(c.accessor)) {
						let valueToSend = getObjectProp(r, c.accessor)
						return valueToSend
					}
				})
			})
		data.push(headers)
		rowsToSend.forEach((rts) => {
			data.push(rts)
		})
		return data
	}, [filteredRows, columns])

	/**
	 * ==================================================
	 * RENDERING
	 * ==================================================
	 */

	//Actions Column
	const renderActionsColumn = (row) => {
		return (
			<td
				className="ui center aligned"
				style={{
					width: `${actionsWidth}px`,
					flex: `${actionsWidth} 0 auto`,
					maxWidth: `${actionsWidth}px`,
				}}
			>
				{onSelect && (
					<Popup
						content={editRowButtonText}
						trigger={
							<Button
								className={rowActionButton}
								onClick={() => {
									typeof onSelect == 'function' && onSelect(row)
								}}
								color="blue"
								size="tiny"
								type="button"
								icon="edit"
								tabIndex={-1}
							/>
						}
						on="hover"
					/>
				)}
				{onDelete && (
					<Popup
						content={deleteRowButtonText}
						trigger={
							<Button
								className={rowActionButton}
								onClick={() => {
									onRowDelete(row)
								}}
								color="blue"
								size="tiny"
								type="button"
								icon="trash"
								tabIndex={-1}
							/>
						}
						on="hover"
					/>
				)}
				{additionalActionButtons.map((action, index) => {
					return (
						<Popup
							key={`action-button-${index}=${action.name}`}
							content={action.name}
							trigger={
								<Button
									className={rowActionButton}
									onClick={() => {
										action.action(row)
									}}
									color="blue"
									size="tiny"
									type="button"
									icon={action.icon}
								/>
							}
							on="hover"
						/>
					)
				})}
			</td>
		)
	}

	//Cell
	const renderCell = (row, column) => {
		return (
			<PaginatedTableCell
				row={row}
				column={column}
				value={row[column.accessor]}
				onEditCell={onBlurRow}
				isEditable={column.editable}
				setCanSave={setCanSave}
				isFocused={isFocused}
			/>
		)
	}

	//No Content
	const renderNoContent = (
		<Segment>
			<Statistic>
				<Label attached="top">
					<Header content="No hay Datos" />
				</Label>
			</Statistic>
		</Segment>
	)

	//Loading
	const renderLoading = (
		<Segment>
			<Statistic>
				<Label attached="top">
					<Header content="Cargando" />
				</Label>
			</Statistic>
		</Segment>
	)

	const hasRows = rows.length > 0 ? rows.length > 0 : props.rows.length > 0

	const numberOfRecords = useMemo(() => {
		return filteredRows.filter((r) => r.checked != false).length
	}, [filteredRows])

	const isFocused = (condition, row) => {
		setFocused({
			condition: condition,
			id: row.id,
		})
	}

	return (
		<>
			<>
				<Grid stackable padded>
					<Grid.Row
						verticalAlign="middle"
						textAlign="left"
						style={{ paddingBottom: '10px', width: innerWidth / 1.5 }}
					>
						{onSave && (
							<Button
								className={tableActionButton}
								style={{ background: 'transparent', color: 'blue' }}
								onClick={() => {
									onSaveRows()
								}}
								color="blue"
								size="tiny"
								type="button"
								icon="save"
								content={saveButtonText}
								disabled={!canSave}
							/>
						)}
						{onCancel && (
							<Button
								className={tableActionButton}
								style={{ background: 'transparent', color: 'blue' }}
								onClick={() => {
									onCancelEdition()
								}}
								color="blue"
								size="tiny"
								type="button"
								icon="times"
								content={cancelButtonText}
								disabled={!canSave}
							/>
						)}
						{onAdd && (
							<Button
								className={tableActionButton}
								style={{ background: 'transparent', color: 'blue' }}
								onClick={() => {
									onAdd()
								}}
								color="blue"
								size="tiny"
								type="button"
								icon="plus"
								content={addButtonText}
							/>
						)}
						{onAddRow && (
							<Button
								className={tableActionButton}
								style={{ background: 'transparent', color: 'blue' }}
								onClick={() => {
									onAddNewRow()
								}}
								color="blue"
								size="tiny"
								type="button"
								icon="plus"
								content={newRowButtonText}
							/>
						)}
						<Button
							className={tableActionButton}
							style={{ background: 'transparent', color: 'blue' }}
							onClick={() => {
								removeFilters()
							}}
							color="blue"
							size="tiny"
							type="button"
							icon="times"
							content={removeFiltersButtonText}
							disabled={!hasBeenFiltered}
						/>
						{enableExportToCSV && (
							<CSVLink
								className={tableActionButton}
								data={exportData}
								filename={`${formatExportTitle(title)}-${moment().format(
									'DD/MM/YYYY'
								)}.csv`}
							>
								<Icon className={styles.IconLabel} name="excel file"></Icon>
								{exportToCSVButtonText}
							</CSVLink>
						)}
						{/* {additionalHeaderButtons.map((item) => {
							return (
								<Button
									className={tableActionButton}
									style={{ background: 'transparent', color: 'blue' }}
									onClick={(e) => {
										item.action(rows)
									}}
									color="blue"
									size="tiny"
									type="button"
									content={item.label}
									icon={item.icon}
									disabled={item.disabled ? item.disabled : false}
								/>
							)
						})} */}
					</Grid.Row>
				</Grid>
				{hasRows && !loading && (
					<>
						<div
							style={{
								maxHeight: innerHeight / 1.35,
								width: innerWidth / 1.05,
								height: tableHeight,
								overflowX: 'auto',
							}}
						>
							<PaginatedTableHeader
								columns={columns}
								rows={filteredRows}
								height={rows.length * 3.5}
								width={innerWidth}
								actionsActive={actionsActive}
								actionsWidth={actionsWidth}
								applyFilter={renderByFilter}
								sortOrder={sortOrder}
								setSortOrder={setSortOrder}
								sortAccessor={sortAccessor}
								setSortAccessor={setSortAccessor}
								actionsHeaderText={actionsHeaderText}
							/>

							<Table
								className="ui celled fixed single line very compact table"
								style={{
									display: 'block',
									tableLayout: 'fixed',
									width: 'max-content',
								}}
								columns={columns.length}
								definition
								unstackable
							>
								{(paginated ? slice : filteredRows).map((row, rowIndex) => {
									return (
										row.checked != 'false' && (
											<tr
												key={`row-${rowIndex}`}
												className={`ui table row`}
												style={{
													backgroundColor:
														focused.condition &&
														focused.id === row.id &&
														'#1e56aa15',
												}}
											>
												{actionsActive && renderActionsColumn(row)}
												{columns.map((column, index) => {
													const colorIsAFunction =
														typeof column.color == 'function'
													const backgroundColor = colorIsAFunction
														? column.color(row)
														: column.color
													return (
														<td
															key={`column-${rowIndex + ' ' + index}`}
															style={{
																overflow:
																	column.type == 'select' && focused.condition
																		? 'visible'
																		: 'auto',
																width: `${column.width}px`,
																maxWidth: `${column.width}px`,
																backgroundColor: backgroundColor,
															}}
														>
															{renderCell(row, column)}
														</td>
													)
												})}
											</tr>
										)
									)
								})}
							</Table>
						</div>
						<Grid style={{ margin: '1vh' }}>
							<Grid.Row columns={1}>
								<Grid.Column stretched>
									<Table.Footer>
										<Menu floated="left">
											<Menu.Item
												key={'number-of-records-item'}
												style={{
													backgroundColor: '#1e56aa15',
												}}
											>
												{numberOfRecordsText} {numberOfRecords}
											</Menu.Item>
										</Menu>
										{paginated && (
											<Menu floated="right" pagination>
												{range.map((el, index) => (
													<Menu.Item
														key={`menu-item-${el}`}
														onClick={() => {
															if (!isNaN(el)) setPage(el)
														}}
														index={el}
														style={{
															backgroundColor:
																page === (!isNaN(el) && el) && '#1e56aa15',
														}}
													>
														{el}
													</Menu.Item>
												))}
											</Menu>
										)}
									</Table.Footer>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</>
				)}
			</>
			{(!hasRows || loading) && (loading ? renderLoading : renderNoContent)}
		</>
	)
}

PaginatedTable.propTypes = {
	title: PropTypes.string,
	rows: PropTypes.array,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			width: PropTypes.number,
			Header: PropTypes.string,
			accessor: PropTypes.string,
			type: PropTypes.string,
			editable: PropTypes.bool,
			filterable: PropTypes.bool,
			options: PropTypes.arrayOf(
				PropTypes.shape({
					Header: PropTypes.string,
					key: PropTypes.string,
					value: PropTypes.any,
					color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
				})
			),
		})
	),
	actionsActive: PropTypes.bool,
	actionsWidth: PropTypes.number,
	onSave: PropTypes.func,
	onAdd: PropTypes.func,
	onAddRow: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	onSelect: PropTypes.func,
	onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	onEditCell: PropTypes.func,
	enableExportToCSV: PropTypes.bool,
	rowLimit: PropTypes.number,
	loading: PropTypes.bool,
	paginated: PropTypes.bool,
	height: PropTypes.number,
	additionalActionButtons: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			icon: PropTypes.string,
			action: PropTypes.func,
		})
	),
	saveButtonText: PropTypes.string,
	cancelButtonText: PropTypes.string,
	newRowButtonText: PropTypes.string,
	addButtonText: PropTypes.string,
	removeFiltersButtonText: PropTypes.string,
	editRowButtonText: PropTypes.string,
	deleteRowButtonText: PropTypes.string,
	exportToCSVButtonText: PropTypes.string,
	actionsHeaderText: PropTypes.string,
	numberOfRecordsText: PropTypes.string,
}

export default PaginatedTable
