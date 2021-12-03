import React, { useState } from 'react';

import Logo from 'components/common/Logo';
import Search from 'components/Search';
import Basket from 'components/Basket';
import Dishes from 'components/Dishes';

import { IDish } from 'types';

import style from './App.module.css';

const App = () => {
  const [searchDishValue, setSearchDishValue] = useState('');
  const [newDishItemToBasket, setNewDishItemToBasket] = useState<IDish | null>(null);
  const [isBasketBusy, setIsBasketBusy] = useState<boolean>(false);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDishValue(e.target.value);
  };

  const onAddDishToBasket = (dish: IDish) => {
    setNewDishItemToBasket(dish);
  };

  const onCleanNewDishItemToBasket = () => {
    setNewDishItemToBasket(null);
  };

  const onChangeBasketBusy = (isBusy: boolean) => {
    setIsBasketBusy(isBusy);
  };

  return (
    <div className={style.container}>
      <header>
        <Logo />
        <Search value={searchDishValue} onSearchChange={onSearchChange} />
        <Basket
          newDishItemToBasket={newDishItemToBasket}
          onCleanNewDishItemToBasket={onCleanNewDishItemToBasket}
          onChangeBasketBusy={onChangeBasketBusy}
        />
      </header>
      <Dishes
        searchDishValue={searchDishValue}
        isBasketBusy={isBasketBusy}
        onAddDishToBasket={onAddDishToBasket}
      />
    </div>
  );
};

export default App;