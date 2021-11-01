import React from 'react';

import style from './BasketDetails.module.css';
import BasketDetailItem from './basketDetailItem/BasketDetailItem';

const BasketDetails = (props) => {
  return (
    <div className={`${style.cart} ${props.isHide || style.hide}`}>
      <h2>
        Cart
        <span onClick={() => props.toggleBasketDetail()}>X</span>
      </h2>
      <div className={style.itemContainer}>
        {props.basketItems.map((item) => (
          <BasketDetailItem
            key={item.id}
            id={item.id}
            name={item.name}
            count={item.count}
            price={item.price}
            deleteDishFromBasket={props.deleteDishFromBasket}
          />
        ))}
      </div>
      <h2>{`Total: $${props.basketTotalPrice}`}</h2>
    </div>
  );
};

export default BasketDetails;
