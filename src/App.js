import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import './index.css'
import PaginatedTable from './lib/components/PaginatedTable'
import { generateRows } from './lib/utils/fakes'

const clientsSchema = {
	id: '{{datatype.number}}',
	name: '{{company.companyName}} {{company.companySuffix}}',
	email: '{{internet.email}}',
	date: '{{date.between}}',
	processed: '{{datatype.boolean}}'
}

function App() {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState(generateRows(350, 560, clientsSchema))
	useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 1500)
	}, [data])
	return (
		<div className="PageContainer">
			<Button content="Recargar Datos" type="button" onClick={() => {
				setData(generateRows(50, 70, clientsSchema))
			}} />
			<PaginatedTable
				loading={isLoading}
				title="Example"
				hideRemoveFiltersButton={true}
				showRecords
				showRecordsPerPage
				onCancel={true}
				onSave={true}
				onAddRow={(id) => ({
					id: id,
					name: faker.fake('{{company.companyName}} {{company.companySuffix}}'),
					email: faker.fake('{{internet.email}}'),
					date: faker.fake('{{date.between}}')
				})}
				rows={data}
				height={612}
				rowLimit={20}
				actionsActive={true}
				actionsWidth={125}
				onSelect={(row) => {
					console.log(row)
				}}
				enableExternalSave={false}
				onDelete={(deletedRow) => {
					console.log(deletedRow)
				}}
				onEditCell={({row, column, value}) => {
					console.log(row)
					console.log(column)
					console.log(value)
				}}
				additionalHeaderButtons={
					[
						{
							label: 'Prueba',
							icon: 'search',
							action: (rows) => {
								console.log(rows)
							}
						}
					]
				}
				columns={[
					{
						width: 250,
						Header: 'Code',
						accessor: 'id',
						filterable: true,
						editable: false,
					},
					{
						width: 225,
						Header: 'Name',
						accessor: 'name',
						filterable: true,
						editable: true,
					},
					{
						width: 225,
						Header: 'Email',
						accessor: 'email',
						filterable: true,
						editable: true,
					},
					{
						width: 225,
						Header: 'Date',
						accessor: 'date',
						type: 'date',
						filterable: true,
						editable: true,
					},
					{
						width: 225,
						Header: 'Checked',
						accessor: 'processed',
						type: 'boolean',
						filterable: true,
						editable: true,
					},
				]}
			/>
		</div>
	)
}

export default App
