import React, { useState, useEffect } from 'react';

import dataApi from 'api/data';
import DishCard from './DishCard';
import Loader from 'components/common/Loader';

import style from './Dishes.module.css';

const Dishes = (props) => {
  const [dishesRaw, setDishesRaw] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [prevSearchDishValue, setPrevSearchDishValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestErrMsg, setRequestErrMsg] = useState(null);

  const loadInitDishes = async () => {
    setIsLoading(true);
    try {
      const data = await dataApi.get('dish');

      setDishesRaw(data);
      setDishes(data);
    } catch (e) {
      setRequestErrMsg(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const filterDishesBySearchParam = (searchParam) => {
    const filterDish = dishesRaw.filter((item) => {
      return (
        item.name.toLowerCase().startsWith(searchParam.toLowerCase()) ||
        item.ingredients.find((item) =>
          item.toLowerCase().includes(searchParam.toLowerCase())
        )
      );
    });
    setDishes(filterDish);
    setPrevSearchDishValue(searchParam);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadInitDishes(), []);

  useEffect(() => {
    if (prevSearchDishValue !== props.searchDishValue) {
      filterDishesBySearchParam(props.searchDishValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDish = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (requestErrMsg) {
      return <h1>{requestErrMsg}</h1>;
    }
    return dishes.length ? (
      dishes.map((item) => (
        <DishCard
          key={item.id}
          dish={item}
          onAddDishToBasket={props.onAddDishToBasket}
          disableBtn={props.isBasketBusy}
        />
      ))
    ) : (
      <h1>No results found. Try another request</h1>
    );
  };

  return <div className={style.dishContainer}> {renderDish()} </div>;
};

export default Dishes;
