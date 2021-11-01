import React from 'react';

import style from './Search.module.css';

const Search = (props) => {
  return (
    <input
      type="text"
      value={props.value}
      className={style.input}
      placeholder="Search by name or ingredient..."
      onChange={(e) => props.onSearchChange(e.target.value.toLocaleLowerCase())}
    />
  );
};

export default Search;
