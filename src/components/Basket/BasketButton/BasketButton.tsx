import React from 'react';

import { ReactComponent as BasketIcon } from 'assets/images/basket.svg';

import style from './BasketButton.module.css';

interface IProps {
  countItems: number | undefined,
  toggleBasketDetail: () => void,
}

const BasketButton = (props: IProps) => {
  return (
    <div className={style.container} onClick={() => props.toggleBasketDetail()}>
      <BasketIcon className={style.icon} />
      {!!props.countItems && (
        <span className={style.countItem}>{props.countItems}</span>
      )}
    </div>
  );
};

export default BasketButton;
