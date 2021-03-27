import React, { useEffect } from 'react';
import { ReactComponent as AlphabeticalOrder } from '../../assets/alphabetical_order_icon.svg';
import { ReactComponent as ReverseOrder } from '../../assets/alphabetical_reverse_order_icon.svg';
import { ReactComponent as MaleIcon } from '../../assets/gender_male.svg';
import { ReactComponent as FemaleIcon } from '../../assets/gender_female.svg';
import './table.styles.scss';

const CheckIfIsSortedDesc = (condition, isSorted, C1, C2) => {
  const props = { 
    className: `${!isSorted ? 'notSorted' : ''}`, 
    width:"25px", 
    height: "25px" 
  }

  return condition ? <C1 {...props}/> : <C2 {...props}/>
}

const TableHeader = ({ Name, children, column, id, setFilter }) => {
  const { isSorted, isSortedDesc } = column;

  useEffect(() => {
    if(!Name && isSorted) {
      if(isSortedDesc) {
        return setFilter('col2', 'Male');
      }
      else {
        return setFilter('col2', 'Female');
      }
    }
    return setFilter('col2', undefined);
  }, [Name, isSorted, isSortedDesc, setFilter])

  return (
    <div className="tableHeader" id={id}>
      { children}
      {
        Name
        ?
        CheckIfIsSortedDesc(isSortedDesc, isSorted, ReverseOrder, AlphabeticalOrder)
        :
        CheckIfIsSortedDesc(isSortedDesc, isSorted, MaleIcon, FemaleIcon)
      }
    </div>
  );
}

export default TableHeader;