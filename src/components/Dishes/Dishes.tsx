import React, { useState, useEffect } from 'react';

import dataApi from 'api/data';
import DishCard from './DishCard';
import Loader from 'components/common/Loader';

import style from './Dishes.module.css';

import { IDish } from 'types';

interface IProps {
  searchDishValue: string,
  isBasketBusy: boolean,
  onAddDishToBasket: (dish: IDish) => void
}

const Dishes = (props: IProps) => {
  const [dishesRaw, setDishesRaw] = useState<IDish[]>([]);
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [prevSearchDishValue, setPrevSearchDishValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestErrMsg, setRequestErrMsg] = useState(null);

  const loadInitDishes = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data: IDish[] = await dataApi.get('dish');

      setDishesRaw(data);
      setDishes(data);
    } catch (e: any) {
      setRequestErrMsg(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const filterDishesBySearchParam = (searchParam: string) => {
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
  useEffect(() => {
    loadInitDishes()
  }, []);

  useEffect(() => {
    if (prevSearchDishValue !== props.searchDishValue) {
      filterDishesBySearchParam(props.searchDishValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevSearchDishValue, props.searchDishValue]);

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
