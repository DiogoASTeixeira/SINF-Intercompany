import React from 'react'
import styled from 'styled-components'
import { useTable, useRowSelect } from 'react-table'
import './DataTable.css';
import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0px;
    background: #fff;
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;


      :last-child {
        border-right: 0;
      }
    }
  }
`

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>Selected Rows: {selectedRowIds.size}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: [...selectedRowIds.values()],
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
}

function NTable(){

  const columns = React.useMemo(
     () => [
       // Let's make a column for selection
       {
         id: 'selection',
         // The header can use the table's getToggleAllRowsSelectedProps method
         // to render a checkbox
         Header: ({ getToggleAllRowsSelectedProps }) => (
           <div>
             <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
           </div>
         ),
         // The cell can use the individual row's getToggleRowSelectedProps method
         // to the render a checkbox
         Cell: ({ row }) => (
           <div>
             <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
           </div>
         ),
       },
       {
         Header: 'List of Products',
         columns: [

           {
             Header: 'Product ID',
             accessor: 'id',
           },
           {
             Header: 'Product Name',
             accessor: 'name',
           },
           {
             Header: 'Wholesale cost',
             accessor: 'cost',
           },
         ],
       },
     ],
     []
   )

   const data = React.useMemo(() => makeData(10, 3), [])

   return (
     <Styles>
       <Table columns={columns} data={data} />
     </Styles>
   )
}

export default NTable
