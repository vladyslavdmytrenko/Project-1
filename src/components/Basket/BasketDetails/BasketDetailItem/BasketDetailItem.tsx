import React from 'react';

import Loader from 'components/common/Loader';
import { ReactComponent as DeleteIcon } from 'assets/images/delete.svg';

import { IBasket } from 'types';

import style from './BasketDetailItem.module.css';

interface IProps {
  item: IBasket,
  isBasketLoading: boolean,
  deleteDishFromBasket: (id: number) => void
}

const BasketDetailItem = (props: IProps) => {
  return (
    <div className={style.card}>
      {props.isBasketLoading ? (
        <Loader width="64px" height="64px" />
      ) : (
        <>
          <span>
            <DeleteIcon
              onClick={() => props.deleteDishFromBasket(props.item.id)}
            />
          </span>
          <h3>{props.item.name}</h3>
          <h3>Quantity: {props.item.count}</h3>
          <h3>Sub-total: {props.item.price}</h3>
        </>
      )}
    </div>
  );
};

export default BasketDetailItem;
