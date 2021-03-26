import React, { useEffect } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { capitalize, formatDate } from '../../functions.utils';
import { ReactComponent as AlphabeticalOrder } from '../../assets/alphabetical_order_icon.svg';
import { ReactComponent as ReverseOrder } from '../../assets/alphabetical_reverse_order_icon.svg';
import { ReactComponent as MaleIcon } from '../../assets/gender_male.svg';
import { ReactComponent as FemaleIcon } from '../../assets/gender_female.svg';
import './table.styles.scss';

const getData = orders => {
  return orders.map(e => {
    const { name, gender, dob } = e;
    return ({
      col1: `${name.title} ${name.first} ${name.last}`,
      col2: capitalize(gender),
      col3: formatDate(new Date(dob.date)),
      col4: e
    })
  })
}

const TableHeader = ({ Name, children, column, id, ...props }) => {
  const { isSorted, isSortedDesc, setFilter } = column;

  useEffect(() => {
    if(!Name && isSorted) {
      if(isSortedDesc) {
        setFilter('Male');
      }
      else {
        setFilter('Female');
      }
    }
    else if(isSortedDesc === undefined) {
      setFilter(undefined);
    }
  }, [Name, isSorted, isSortedDesc])

  return (
    <div className="tableHeader" id={id}>
      { children}
      {
        Name
        ?
        (
          isSortedDesc 
          ?
          <ReverseOrder className={`${!isSorted ? 'notSorted' : ''}`} width="25px" height="25px"/>
          :
          <AlphabeticalOrder className={`${!isSorted ? 'notSorted' : ''}`} width="25px" height="25px"/>
        )
        :
        (
          isSortedDesc 
          ?
          <MaleIcon className={`${!isSorted ? 'notSorted' : ''}`} width="25px" height="25px"/>
          :
          <FemaleIcon className={`${!isSorted ? 'notSorted' : ''}`} width="25px" height="25px"/>
        )
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
          Header: (props) => <TableHeader id='sortByName' Name {...props}>Name</TableHeader>,
          accessor: 'col1'
        },
        {
          Header: (props) => <TableHeader id='filterByGender' {...props}>Gender</TableHeader>,
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
          Cell: ({ value }) => <div className="click" onClick={() => OnClick(value)}>Visualizar</div>,
          accessor: 'col4',
          disableSortBy: true
        }], [OnClick]
    );
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({ columns, data }, useFilters, useSortBy)

    return (
    <table {...getTableProps()}>
      <thead>
        {
        headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
            headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
              row.cells.map((cell, index) => {
                return (
                  <td id={`${index > 1 ? 'tableData' : (index === 1 ? 'genderData' : 'nameData')}`}
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