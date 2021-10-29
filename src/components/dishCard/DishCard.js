import React from 'react';

import style from './DishCard.module.css';
import imageMeal from '../../assets/images/meal.png';

const DishCard = ({ name, imgSrc, price, ingredients }) => {
  return (
    <div className={style.container}>
      <div className={style.container_img}>
        <img src={imgSrc ? imgSrc : imageMeal} alt="meal" />
      </div>
      <div className={style.header}>
        <h2>{name}</h2>
        <h2>{`$${price}`}</h2>
      </div>
      <div>
        {ingredients.map((item, idx, arr) => (
          <span key={idx}>
            {`${item}${idx + 1 !== arr.length ? ', ' : ''}`}
          </span>
        ))}
      </div>
      <button className={style.btn}>Add to card</button>
    </div>
  );
};

export default DishCard;
