import React from 'react';

import style from './BasketDetails.module.css';

const BasketDetails = (props) => {
  return (
    <div className={`${style.cart} ${props.isHide || style.hide}`}>
      <h2>
        Cart
        <span onClick={() => props.toggleBasketDetail()}>X</span>
      </h2>
      <h2>{`Total: $${0}`}</h2>
    </div>
  );
};

export default BasketDetails;
