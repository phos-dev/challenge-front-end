import React from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { capitalize, formatDate } from '../../functions.utils';
import TableHeader from './tableHeader.component';
import './table.styles.scss';

const isFilterColumn = (idx) => {
  switch (idx) {
    case 0:
      return 'nameData';
    case 1:
      return 'genderData';
    default:
      return 'tableData';
  }
};

const prepareData = (orders) => {
  return orders.map((e) => {
    const { name, gender, dob } = e;
    return {
      col1: `${name.title} ${name.first} ${name.last}`,
      col2: capitalize(gender),
      col3: formatDate(new Date(dob.date)),
      col4: e
    };
  });
};

const Table = (props) => {
  const { data: receivedUsers, OnClick } = props;
  const data = React.useMemo(() => prepareData(receivedUsers), [receivedUsers]);

  const columns = React.useMemo(
    () => [
      {
        Header: (props) => (
          <TableHeader
            setFilter={(v) => props.column.setFilter(v)}
            id="sortByName"
            Name
            {...props}
          >
            Name
          </TableHeader>
        ),
        accessor: 'col1'
      },
      {
        Header: (props) => (
          <TableHeader
            setFilter={(v) => props.column.setFilter(v)}
            id="filterByGender"
            {...props}
          >
            Gender
          </TableHeader>
        ),
        accessor: 'col2',
        filter: (rows, id, filterValue) => {
          return rows.filter((row) => row.values[id] === filterValue);
        }
      },
      {
        Header: 'Birth',
        accessor: 'col3',
        disableSortBy: true
      },
      {
        Header: 'Actions',
        Cell: ({ value }) => (
          <div className="click" onClick={() => OnClick(value)}>
            Visualizar
          </div>
        ),
        accessor: 'col4',
        disableSortBy: true
      }
    ],
    [OnClick]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td id={`${isFilterColumn(index)}`} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
