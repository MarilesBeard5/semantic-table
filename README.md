## Semantic Table

DataTable made with styled components from [React Semantic UI](https://react.semantic-ui.com).

Installation:
```
npm i semantic-table
```

Dependencies:
This package depends on the following packages
* [React Semantic UI](https://react.semantic-ui.com).
* [Cleave JS](https://nosir.github.io/cleave.js/)

A sample implementation to this would look like the following:

```
<SemanticTable			
    title="Example"
    rows={[
        {
            title: 'Foo',
            description: 'Neque porro quisquam'
        },
        {
            title 'Bar',
            description: 'Aenean eget consectetur'
        }
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
```