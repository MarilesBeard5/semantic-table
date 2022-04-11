import { Header } from 'semantic-ui-react'
import './index.css'
import PaginatedTable from './lib/components/PaginatedTable'

function App() {
	return (
		<div className="PageContainer">
			<PaginatedTable
				title="Example"
				paginated={false}
				rows={[
					{
						title: 'Foo',
						description: 'Neque porro quisquam',
					},
					{
						title: 'Bar',
						description: 'Aenean eget consectetur',
					},
				]}
				columns={[
					{
						width: 250,
						Header: 'Title',
						accessor: 'title',
						filterable: true,
					},
					{
						width: 225,
						Header: 'Description',
						accessor: 'description',
						filterable: true,
					},
				]}
				actionsWidth={200}
			/>
		</div>
	)
}

export default App
