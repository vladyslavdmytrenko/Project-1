import React from 'react';

import style from './BasketDetailItem.module.css';
import { ReactComponent as DeleteIcon } from '../../../../assets/images/delete.svg';

const BasketDetailItem = (props) => {
  return (
    <div className={style.card}>
      <span>
        <DeleteIcon onClick={() => props.deleteDishFromBasket(props.id)} />
      </span>
      <h3>{props.name}</h3>
      <h3>Quantity: {props.count}</h3>
      <h3>Sub-total: {props.price}</h3>
    </div>
  );
};

export default BasketDetailItem;
