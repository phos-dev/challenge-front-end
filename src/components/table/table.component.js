import React from 'react';
import { useTable } from 'react-table';
import { capitalize, compare, formatDate } from '../../functions.utils';
import { ReactComponent as AlphabeticalOrder } from '../../assets/alphabetical_order_icon.svg';
import './table.styles.scss';

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
      col2: capitalize(gender),
      col3: formatDate(new Date(dob.date)),
      col4: e
    })
  })
}

const TableHeader = ({A, children, ...props}) => {
  return (
    <div className="tableHeader">
      { children}
      {
        A
        ?
        <AlphabeticalOrder width="25px"/>
        :
        null
      }
    </div>
  );
}

const Table = props => {
    const { data : receivedUsers, OnClick } = props;
    const data = React.useMemo(() => getData(receivedUsers), [receivedUsers]);

    const columns = React.useMemo(
      () => [
        {
          Header: <TableHeader A>Name</TableHeader>,
          accessor: 'col1'
        },
        {
          Header: 'Gender',
          accessor: 'col2'
        },
        {
          Header: 'Birth',
          accessor: 'col3'
        },
        {
          Header: 'Actions',
          Cell: ({ value }) => <div className="click" onClick={() => OnClick(value)}>Visualizar</div>,
          accessor: 'col4'
        }], [OnClick]
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