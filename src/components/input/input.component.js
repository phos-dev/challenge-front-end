import React from 'react';
import { ReactComponent as Search } from '../../assets/search_user_icon.svg';
import './input.styles.scss';

const Input = ({ onChange, ...props }) => {

  return (
    <div className="input" >
      <input placeholder="Searching" type="text" onChange={onChange} {...props}/>
      <Search height="auto"/>
    </div>
  );
}

export default Input;