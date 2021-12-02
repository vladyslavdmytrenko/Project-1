import React, { ChangeEvent } from 'react';

import style from './Search.module.css';

interface IProps {
  value: string,
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = (props: IProps) => {
  return (
    <input
      type="text"
      value={props.value}
      className={style.input}
      placeholder="Search by name or ingredient..."
      onChange={(e) => props.onSearchChange(e)}
    />
  );
};

export default Search;
