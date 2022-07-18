import React from 'react'
import PropTypes from 'prop-types'

import { Button, Popup, Header } from 'semantic-ui-react'

import styles from '../styles/global.module.scss'

//Components
import ColumnFilterCard from './ColumnFilterCard'

// eslint-disable-next-line no-useless-concat
const actionButton = `${styles.IconButton}` + ' ' + `${styles.nonBordered}`

const PaginatedTableHeader = (props) => {
	const {
		rows = [],
		columns = [],
		actionsActive,
		actionsWidth,
		sortOrder,
		setSortOrder,
		sortAccessor,
		setSortAccessor,
		applyFilter = null,
		revertFilter = null,
		actionsHeaderText
	} = props

	//Column Header
	const renderHeaderCell = (columnData, label) => {
		return (
			<th
				className="ui center aligned th"
				style={{
					width: `${columnData.width}px`,
					flex: `${columnData.width} 0 auto`,
					maxWidth: `${columnData.width}px`,
					borderCollapse: 'collapse',
				}}
			>
				<Header
					as="h5"
					content={label}
					style={{ display: 'inline', marginLeft: '10px' }}
				/>
				{columnData.filterable && (
					<Popup
						content={
							<ColumnFilterCard
								optionsCleaner={revertFilter}
								column={columnData}
								options={rows}
								onApply={applyFilter}
								sortOrder={sortOrder}
								setSortOrder={setSortOrder}
								sortAccessor={sortAccessor}
								setSortAccessor={setSortAccessor}
							/>
						}
						trigger={
							<Button
								className={actionButton}
								color="teal"
								size="tiny"
								type="button"
								icon="filter"
							/>
						}
						on="click"
						pinned
						position="bottom center"
					/>
				)}
			</th>
		)
	}

	//Action Column Header
	const renderActionsHeaderCell = (label) => {
		return (
			<th
				className="ui center aligned th"
				style={{
					width: `${actionsWidth}px`,
					flex: `${actionsWidth} 0 auto`,
					maxWidth: `${actionsWidth}px`,
					borderCollapse: 'collapse',
				}}
			>
				<Header as="h5" content={label} className={styles.simpleHeader} />
			</th>
		)
	}

	//No Content
	//const renderNoContent =

	return (
		<table
			className={`ui fixed very compact unstackable table`}
			style={{
				display: 'inline-block',
				tableLayout: 'fixed',
				width: 'max-content',
				marginBottom: 0,
				marginRight: '10px',
			}}
		>
			<tr>
				{actionsActive && renderActionsHeaderCell(actionsHeaderText)}
				{columns.map((column, index) =>
					renderHeaderCell(column, column.Header)
				)}
			</tr>
		</table>
	)
}

PaginatedTableHeader.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			width: PropTypes.number,
			Header: PropTypes.string,
			accessor: PropTypes.string,
			other: PropTypes.any,
		})
	),
	sortAccessor: PropTypes.string,
	sortOrder: PropTypes.oneOf(['ASC', 'DESC']),
	setSortOrder: PropTypes.func,
	setSortAccessor: PropTypes.func,
	actionsActive: PropTypes.bool,
	actionsWidth: PropTypes.number,
	applyFilter: PropTypes.func,
	revertFilter: PropTypes.func,
	actionsHeaderText: PropTypes.string,
}

export default PaginatedTableHeader
