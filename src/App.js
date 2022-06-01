import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'
import { Button, Grid, Segment, Tab } from 'semantic-ui-react'
import './index.css'
import PaginatedTable from './lib/components/PaginatedTable'
import { generateRows } from './lib/utils/fakes'

const clientsSchema = {
	id: '{{datatype.number}}',
	name: '{{company.companyName}} {{company.companySuffix}}',
	email: '{{internet.email}}',
	date: '{{date.between}}',
	processed: '{{datatype.boolean}}',
}

const options = [
	{
		text: 'Foo',
		value: 'foo',
	},
	{
		text: 'Bar',
		value: 'bar',
	},
]

function App() {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState(generateRows(350, 560, clientsSchema))
	const [canSave, setCanSave] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 1500)
	}, [data])

	const panes = [
		{
			menuItem: 'Tab 1',
			render: () => (
				<div className='PageContainer'>
					<Button
						content='Recargar Datos'
						type='button'
						onClick={() => {
							setData(generateRows(350, 560, clientsSchema))
							setCanSave(true)
						}}
					/>
					<PaginatedTable
						loading={isLoading}
						title='Example'
						hideRemoveFiltersButton={true}
						onCancel={() => {
							setCanSave(false)
						}}
						enableExternalSave={canSave}
						onSave={true}
						onAddRow={(id) => ({
							id: id,
							name: faker.fake(
								'{{company.companyName}} {{company.companySuffix}}'
							),
							email: faker.fake('{{internet.email}}'),
							date: faker.fake('{{date.between}}'),
						})}
						rows={data}
						onInnerUpdate={(rows) => {
							console.log(rows)
						}}
						rowLimit={25}
						actionsActive={true}
						actionsWidth={125}
						onSelect={(row) => {
							console.log(row)
						}}
						onDelete={(deletedRow) => {
							console.log(deletedRow)
						}}
						onEditCell={({ row, column, value }) => {
							console.log(row)
							console.log(column)
							console.log(value)
						}}
						additionalActionButtons={(row) => {
							if (row.processed == 'true') {
								return [
									{
										name: 'Prueba',
										icon: 'search',
										action: (row) => {
											console.log(row)
										},
									},
								]
							} else {
								return [
									
								]
							}
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
								Header: 'Type',
								accessor: 'type',
								filterable: true,
								editable: true,
								type: 'select',
								options: options,
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
								permanentRender: true,
							},
						]}
					/>
				</div>
			),
		},
		{
			menuItem: 'Tab 2',
			render: () => <></>,
		},
	]

	return (
		<div className='PageContainer'>
			<Segment secondary>
				<Tab panes={panes} menu={{ pointing: true, secondary: true }} />
			</Segment>
		</div>
	)
}

export default App
