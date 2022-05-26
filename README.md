# Semantic Table

DataTable made with styled components from [React Semantic UI](https://react.semantic-ui.com).

Installation:

```
npm i semantic-table
```

Dependencies:
This component depends on the following packages

- [React Semantic UI](https://react.semantic-ui.com).
- [Cleave JS](https://nosir.github.io/cleave.js/).
- [React CSV](https://github.com/react-csv/react-csv).
- [Moment JS](https://momentjs.com)
- [Decimal JS](https://mikemcl.github.io/decimal.js/)

## Basic Example

---

```
const data = [
    {
        id: 9888,
        name: "Hartmann, Runolfsson and Stroman Inc",
        email: "Moshe67@gmail.com"
    },
    {
        id: 28451,
        name: "Jacobson Inc Inc",
        email: "Green19@hotmail.com"
    },
    {
        id: 72265,
        name: "Bahringer, Padberg and Upton Inc",
        email: "Casandra_Heaney97@gmail.com"
    },
]

<PaginatedTable
    title="Example"
    onCancel={true}
    rows={data}
    rowLimit={15}
    actionsActive={false}
    columns={[
        {
            width: 250,
            Header: 'Code',
            accessor: 'id',
        },
        {
            width: 225,
            Header: 'Name',
            accessor: 'name',
        },
        {
            width: 225,
            Header: 'Email',
            accessor: 'email',
        },
    ]}
/>
```

## Props

---

| Prop                       | Type               | Description                                                                                                                                                                                                                                                                                                                             |
| -------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                      | string             | The title used for exporting table data to CSV                                                                                                                                                                                                                                                                                          |
| rows                       | array              | Array of objects to be displayed in the table                                                                                                                                                                                                                                                                                           |
| columns                    | array              | Array of colums to be displayed, each column will access to the corresponding attribute from each row data (see structure [here](#columns)) it can control whether the column can be filtered, ordered and edited                                                                                                                       |
| rowLimit                   | numeric            | The number of rows to be displayed per page                                                                                                                                                                                                                                                                                             |
| loading                    | boolean            | Controls whether the table will show a "loading" message to indicate that data is being loaded into the table                                                                                                                                                                                                                           |
| actionsActive              | boolean            | Whether each row will have a set of actions (see structure [here](#row-actions))                                                                                                                                                                                                                                                        |
| actionsWidth               | numeric            | Width in pixels of the first column that will display the actions buttons                                                                                                                                                                                                                                                               |
| onSave                     | function           | Function to execute to save changes on rows                                                                                                                                                                                                                                                                                             |
| enableExternalSave         | boolean            | Controls whether table should save via external manipulation                                                                                                                                                                                                                                                                            |
| onAdd                      | function           | Function to execute if the user wants to create a new item with an external component (form or modal form)                                                                                                                                                                                                                              |
| onAddRow                   | boolean / function | If set to true, it will create a new row on click, if a function is given, it will expect an object with custom data to match the given rows structure                                                                                                                                                                                  |
| onSelect                   | function           | Function to execute if the user clicks on the "pencil" icon button on a specific row it as access to the selected row                                                                                                                                                                                                                   |
| onDelete                   | boolean / function | If set to true, it will display a button to remove the selected row ("trash" icon button), if a function is given, it will allow a custom function to be executed after the deletion has been made, the function has access to the remaining rows, if the function returns a false boolean, then it will not trigger the inner deletion |
| onCancel                   | boolean / function | If set to true, it will cancel all changes made on the table, if a function is given, it will allow a custom function to be executed after the cancelation has been made                                                                                                                                                                |
| onEditCell                 | function           | Function to execute after a cell has been edited, it will execute on blur, if the function returns a false boolean, then it will not trigger the inner edition                                                                                                                                                                          |
| onInnerUpdate              | function           | Function to execute after any table rows change                                                                                                                                                                                                                                                                                         |
| enableExportToCSV          | boolean            | If set to true, it will display a button that will export all displayed data in the table (ignoring pagination, it will only export data that hasn't been filtered) in a Comma Separated Values (CSV) format, it uses the "title" prop and a timestamp to name the exported file                                                        |
| height                     | numeric            | The table height, max varies depending on screen size                                                                                                                                                                                                                                                                                   |
| additionalActionButtons    | array              | Additional buttons to be displayed on each row, each button will have a custom action and icon to give it the desired look and functionality (see structure [here](#columns))                                                                                                                                                           |
| additionalHeaderButtons    | array              | Additional buttons to be displayed on the header section, each button will have a custom action and icon to give it the desired look and functionality (see structure [here](#additional-header-actions))                                                                                                                               |
| saveButtonText             | string             | Custom text for save button                                                                                                                                                                                                                                                                                                             |
| cancelButtonText           | string             | Custom text for cancel button                                                                                                                                                                                                                                                                                                           |
| newRowButtonText           | string             | Custom text for newRow button                                                                                                                                                                                                                                                                                                           |
| addButtonText              | string             | Custom text for add button                                                                                                                                                                                                                                                                                                              |
| removeFiltersButtonText    | string             | Custom text for removeFilters button                                                                                                                                                                                                                                                                                                    |
| hideRemoveFiltersButton    | boolean            | Control whether the removeFiltersButton will appear or not                                                                                                                                                                                                                                                                              |
| editRowButtonText          | string             | Custom text for editRow ave button                                                                                                                                                                                                                                                                                                      |
| deleteRowButtonText        | string             | Custom text for deleteRow button                                                                                                                                                                                                                                                                                                        |
| exportToCSVButtonText      | string             | Custom text for exportToCSV button                                                                                                                                                                                                                                                                                                      |
| actionsHeaderText          | string             | Custom text for actions header                                                                                                                                                                                                                                                                                                          |
| numberOfRecordsText        | string             | Custom text for total records label                                                                                                                                                                                                                                                                                                     |
| showRecords                | boolean            | Control whether the table will show total of records                                                                                                                                                                                                                                                                                    |
| numberOfRecordsPerPageText | string             | Custom text for total records per page label                                                                                                                                                                                                                                                                                            |
| showRecordsPerPage         | boolean            | Controls whether the table will show total of records per page                                                                                                                                                                                                                                                                          |
| paginated                  | boolean            | Controls whether the table is paginated or not, defaults to true                                                                                                                                                                                                                                                                        |

## Loading

---

```
const data = [
    {
        id: 9888,
        name: "Hartmann, Runolfsson and Stroman Inc",
        email: "Moshe67@gmail.com"
    },
    {
        id: 28451,
        name: "Jacobson Inc Inc",
        email: "Green19@hotmail.com"
    },
    {
        id: 72265,
        name: "Bahringer, Padberg and Upton Inc",
        email: "Casandra_Heaney97@gmail.com"
    },
]

const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
        setIsLoading(false)
    }, 1500)
}, [])


<PaginatedTable
    loading={isLoading}
    title="Example"
    onCancel={true}
    rows={data}
    rowLimit={15}
    actionsActive={false}
    columns={[
        {
            width: 250,
            Header: 'Code',
            accessor: 'id',
        },
        {
            width: 225,
            Header: 'Name',
            accessor: 'name',
        },
        {
            width: 225,
            Header: 'Email',
            accessor: 'email',
        },
    ]}
/>
```

## Header Actions

---

| Prop              | Type               | Description                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onSave            | function           | Function to execute to save changes on rows                                                                                                                                                                                                                                      |
| onAdd             | function           | Function to execute if the user wants to create a new item with an external component (form or modal form)                                                                                                                                                                       |
| onAddRow          | boolean / function | If set to true, it will create a new row on click, if a function is given, it will expect an object with custom data to match the given rows structure                                                                                                                           |
| onCancel          | boolean / function | If set to true, it will cancel all changes made on the table, if a function is given, it will allow a custom function to be executed after the cancelation has been made                                                                                                         |
| onEditCell        | function           | Function to execute after a cell has been edited, it will execute on blur                                                                                                                                                                                                        |
| enableExportToCSV | boolean            | If set to true, it will display a button that will export all displayed data in the table (ignoring pagination, it will only export data that hasn't been filtered) in a Comma Separated Values (CSV) format, it uses the "title" prop and a timestamp to name the exported file |

### Example

```
const data = [
    {
        id: 9888,
        name: "Hartmann, Runolfsson and Stroman Inc",
        email: "Moshe67@gmail.com"
    },
    {
        id: 28451,
        name: "Jacobson Inc Inc",
        email: "Green19@hotmail.com"
    },
    {
        id: 72265,
        name: "Bahringer, Padberg and Upton Inc",
        email: "Casandra_Heaney97@gmail.com"
    },
]


<PaginatedTable
    title="Example"
    onCancel={true}
    rows={data}
    rowLimit={15}
    actionsActive={false}
    onSave={({ deleteItems, updateItems, createItems, rows }) => {
        console.log(deleteItems)
        console.log(updateItems)
        console.log(createItems)
        console.log(rows)
    }}
    onAdd={() => {
        console.log('This can be used to display an external form or modal form! Control the rendered rows externally')
    }}
    onAddRow={(id) => {
        return {
            id: id,
            name: "Daugherty Inc LLC"
            email: "Connor.Bergstrom56@yahoo.com"
        }
    }}
    onCancel={true}
    onEditCell={(editedRow) => {
        console.log('This is the new data: ')
        console.log(editedRow)
    }}
    enableExportToCSV={true}
    columns={[
        {
            width: 250,
            Header: 'Code',
            accessor: 'id',
        },
        {
            width: 225,
            Header: 'Name',
            accessor: 'name',
        },
        {
            width: 225,
            Header: 'Email',
            accessor: 'email',
        },
    ]}
/>
```

## Row Actions

---

| Prop                    | Type               | Description                                                                                                                                                                                                                                       |
| ----------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actionsActive           | boolean            | Whether each row will have a set of actions (see structure [here]())                                                                                                                                                                              |
| actionsWidth            | numeric            | Width in pixels of the first column that will display the actions buttons                                                                                                                                                                         |
| onSelect                | function           | Function to execute if the user clicks on the "pencil" icon button on a specific row it as access to the selected row                                                                                                                             |
| onDelete                | boolean / function | If set to true, it will display a button to remove the selected row ("trash" icon button), if a function is given, it will allow a custom function to be executed after the deletion has been made, the function has access to the remaining rows |
| additionalActionButtons | array              | Additional buttons to be displayed on each row, each button will have a custom action and icon to give it the desired look and functionality, icons [here](https://react.semantic-ui.com/elements/icon/)                                          |

### Example

```
const data = [
    {
        id: 9888,
        name: "Hartmann, Runolfsson and Stroman Inc",
        email: "Moshe67@gmail.com"
    },
    {
        id: 28451,
        name: "Jacobson Inc Inc",
        email: "Green19@hotmail.com"
    },
    {
        id: 72265,
        name: "Bahringer, Padberg and Upton Inc",
        email: "Casandra_Heaney97@gmail.com"
    },
]

const additionalActionButtons = [
    {
        name: 'View',
        icon: 'eye',
        action: (row) => {
            console.log(row)
        }
    },
     {
        name: 'Email',
        icon: 'mail',
        action: (row) => {
            console.log('Mail sent to ' + row.email)
        }
    }
]

<PaginatedTable
    title="Example"
    onCancel={true}
    rows={data}
    rowLimit={15}
    actionsActive={true}
    actionsWidth={125}
    onSelect={(selectedRow) => {
        console.log(selectedRow)
    }}
    onDelete={(remainingRows) => {
        console.log(remainingRows)
    }}
    additionalActionButtons={additionalActionButtons}
    columns={[
        {
            width: 250,
            Header: 'Code',
            accessor: 'id',
        },
        {
            width: 225,
            Header: 'Name',
            accessor: 'name',
        },
        {
            width: 225,
            Header: 'Email',
            accessor: 'email',
        },
    ]}
/>
```

## Columns

Each column will have the following structure:

| Prop       | Type    | Description                                                                                                                        |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| width      | numeric | The column's width, data exceeding this width will trigger an horizontal scrollbar                                                 |
| Header     | string  | The column's title to be displayed on the table header                                                                             |
| accessor   | string  | The name of the row attribute that holds the value to be displayed                                                                 |
| type       | string  | Format and input type that the column will have, can be one of: **text, currency, boolean, select, textarea, number, color, date** |
| options    | array   | If the type is **select**, then an options array has to be provided (**see the structure below**)                                  |
| editable   | boolean | Whether the column can be edited or not                                                                                            |
| filterable | boolean | Whether the column can be filtered or not                                                                                          |

### Column Options

| Prop  | Type              | Description                                                                                                                                                                                                   |
| ----- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key   | string            | The unique key identifier                                                                                                                                                                                     |
| text  | string            | The option text to display                                                                                                                                                                                    |
| value | any               | The actual value of each option                                                                                                                                                                               |
| color | string / function | The column color, if a string is given, it will have that static color for every cell in the column, if a function is given, it will have access to the current row and condittionaly format an specific cell |

## Additional Header Actions

---

Each additional header button will have the following structure:

| Prop     | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| label    | string   | The text content of the button           |
| icon     | string   | The button icon to be displayed          |
| action   | function | Action to be executed on click of button |
| disabled | boolean  | Whether the button is disabled or not    |

### Example

```
const data = [
    {
        id: 9888,
        name: "Hartmann, Runolfsson and Stroman Inc",
        email: "Moshe67@gmail.com"
    },
    {
        id: 28451,
        name: "Jacobson Inc Inc",
        email: "Green19@hotmail.com"
    },
    {
        id: 72265,
        name: "Bahringer, Padberg and Upton Inc",
        email: "Casandra_Heaney97@gmail.com"
    },
]

<PaginatedTable
    title="Example"
    onCancel={true}
    rows={data}
    rowLimit={15}
    actionsActive={true}
    actionsWidth={125}
    onSelect={(selectedRow) => {
        console.log(selectedRow)
    }}
    onDelete={(remainingRows) => {
        console.log(remainingRows)
    }}
    additionalHeaderButtons={
            [
                {
                    label: 'Prueba',
                    icon: 'search',
                    action: (rows) => {
                        console.log(rows)
                    },
                },
            ]
        }
    columns={[
        {
            width: 250,
            Header: 'Code',
            accessor: 'id',
        },
        {
            width: 225,
            Header: 'Name',
            accessor: 'name',
        },
        {
            width: 225,
            Header: 'Email',
            accessor: 'email',
        },
    ]}
/>
```
