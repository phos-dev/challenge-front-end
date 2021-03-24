import React from 'react';
import { useTable } from 'react-table';
import { compare, formatDate } from './table.utils';


const getData = (orders, value) => {
  return orders.sort((a, b) => {
    switch (value) {
      case 'new': return compare(b.date, a.date);
      case 'lowprice': return compare(a.total, b.total);
      case 'highprice': return compare(b.total, a.total);
      default: return 1;
    }
  }).map(e => {
    const { name, gender, dob } = e;
    return ({
      col1: `${name.title} ${name.first} ${name.last}`,
      col2: gender,
      col3: formatDate(new Date(dob.date)),
      col4: e
    })
  })
}

const Table = ({ data : receivedUsers, OnClick }) => {
  console.log(receivedUsers)
    const data = React.useMemo(
      () => getData(receivedUsers), []
    );

    const columns = React.useMemo(
      () => [
        {
          Header: 'Name',
          accessor: 'col1'
        },
        {
          Header: 'Gender',
          accessor: 'col2'
        },
        {
          Header: 'Gender',
          accessor: 'col3'
        },
        {
          Header: 'Itens',
          Cell: ({ value }) => <div className="click" onClick={() => OnClick(value)}>Visualizar</div>,
          accessor: 'col4'
        }], []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      { 
        columns,
        data,
        initialState : {
          sortBy: [
              {
                id: 'col2',
                desc: true
            }
            ]
        }
      })

    return (
    <table {...getTableProps()}>
      <thead>
        {
        headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
            headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
        rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {
              row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}>
                    {
                    cell.render('Cell')
                    }
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;