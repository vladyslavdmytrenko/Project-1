import React from 'react';

import style from './BasketButton.module.css';
import { ReactComponent as BasketIcon } from 'assets/images/basket.svg';

const BasketButton = (props) => {
  return (
    <div className={style.container} onClick={() => props.toggleBasketDetail()}>
      <BasketIcon className={style.icon} />
      {props.countItems > 0 && (
        <span className={style.countItem}>{props.countItems}</span>
      )}
    </div>
  );
};

export default BasketButton;
