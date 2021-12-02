import React from 'react';

import { IBasket } from 'types';

import BasketDetailItem from './BasketDetailItem/BasketDetailItem';

import style from './BasketDetails.module.css';

interface IProps {
  isBasketDetailHidden: boolean,
  isBasketLoading: boolean,
  basketTotalPrice: number,
  basketItems: IBasket[],
  deleteDishFromBasket: (id: number) => void,
  toggleBasketDetail: () => void,
}

const BasketDetails = (props: IProps) => {
  return (
    <div
      className={`${style.cart} ${props.isBasketDetailHidden ? style.hide : ''
        }`}
    >
      <h2>
        Cart
        <span onClick={() => props.toggleBasketDetail()}>X</span>
      </h2>
      <div className={style.itemContainer}>
        {props.basketItems.map((item: IBasket) => (
          <BasketDetailItem
            key={item.id}
            item={item}
            isBasketLoading={props.isBasketLoading}
            deleteDishFromBasket={props.deleteDishFromBasket}
          />
        ))}
      </div>
      <h2>{`Total: $${props.basketTotalPrice}`}</h2>
    </div>
  );
};

export default BasketDetails;
