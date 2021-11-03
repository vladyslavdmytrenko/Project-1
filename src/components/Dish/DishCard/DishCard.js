import React from 'react';

import style from './DishCard.module.css';
import imageMeal from 'assets/images/meal.png';

const DishCard = (props) => {
  const { imgSrc, name, price, ingredients } = props.dish;

  return (
    <div className={style.container}>
      <div className={style.container_img}>
        <img src={imgSrc || imageMeal} alt="meal" />
      </div>
      <div className={style.header}>
        <h2>{name}</h2>
        <h2>{`$${price}`}</h2>
      </div>
      <div>{ingredients.join(', ')}</div>
      <button
        className={style.btn}
        onClick={() => props.onAddDishToBasket(props.dish)}
        disabled={props.disableBtn}
      >
        Add to card
      </button>
    </div>
  );
};

export default DishCard;
