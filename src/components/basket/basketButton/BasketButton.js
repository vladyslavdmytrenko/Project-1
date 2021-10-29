import React from 'react';

import style from './BasketButton.module.css';
import { ReactComponent as BasketIcon } from '../../../assets/images/basket.svg';

const BasketButton = (props) => {
  return (
    <div className={style.container} onClick={() => props.toggleBasketDetail()}>
      <BasketIcon className={style.icon} />
      {props.countItems ? (
        <span className={style.countItem}>{props.countItems}</span>
      ) : null}
    </div>
  );
};

export default BasketButton;
