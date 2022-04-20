import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'
import './index.css'
import PaginatedTable from './lib/components/PaginatedTable'
import { generateRows } from './lib/utils/fakes'

const clientsSchema = {
	id: '{{datatype.number}}',
	name: '{{company.companyName}} {{company.companySuffix}}',
	email: '{{internet.email}}',
	date: '{{date.between}}'
}

const data = generateRows(50, 70, clientsSchema)

function App() {
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 1500)
	}, [])
	return (
		<div className="PageContainer">
			<PaginatedTable
				loading={isLoading}
				title="Example"
				onCancel={true}
				onAddRow={(id) => ({
					id: faker.fake('{{datatype.number}}'),
					name: faker.fake('{{company.companyName}} {{company.companySuffix}}'),
					email: faker.fake('{{internet.email}}'),
				})}
				rows={data}
				height={612}
				rowLimit={15}
				actionsActive={true}
				actionsWidth={125}
				onSelect={(row) => {
					console.log(row)
				}}
				onDelete={(deletedRow) => {
					console.log(deletedRow)
				}}
				onEditCell={({row, column, value}) => {
					console.log(row)
					console.log(column)
					console.log(value)
				}}
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
				]}
			/>
		</div>
	)
}

export default App
