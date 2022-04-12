import { Header } from 'semantic-ui-react'
import './index.css'
import PaginatedTable from './lib/components/PaginatedTable'

function App() {
	return (
		<div className="PageContainer">
			<PaginatedTable
				title="Example"
				paginated={false}
				onCancel={true}
				onAddRow={(id) => ({
					title: 'New Title',
					description: 'Lorem Ipsum',
					type: 'NONE'
				})}
				rows={[]}
				columns={[
					{
						width: 250,
						Header: 'Title',
						accessor: 'title',
						filterable: true,
						editable: true,
					},
					{
						width: 225,
						Header: 'Description',
						accessor: 'description',
						filterable: true,
					},
					{
						width: 225,
						Header: 'Type',
						accessor: 'type',
						type: 'select',
						filterable: true,
						editable: true,
						options: [
							{
								text: 'FOO',
								value: 'FOO',
							},
							{
								text: 'BAR',
								value: 'BAR',
							},
							{
								text: 'NONENONENONENONENONENONE',
								value: 'NONE',
							},
						],
					},
				]}
				actionsWidth={200}
			/>
		</div>
	)
}

export default App
