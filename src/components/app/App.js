import React from 'react';

import Logo from 'components/common/Logo';
import Search from 'components/Search';
import Basket from 'components/Basket';
import Dishes from 'components/Dishes';

import style from './App.module.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchDishValue: '',
      newDishItemToBasket: null,
      isBasketBusy: false,
    };
  }

  onSearchChange = (e) => {
    this.setState({ searchDishValue: e.target.value });
  };

  onAddDishToBasket = (dish) => {
    this.setState({ newDishItemToBasket: dish });
  };

  onCleanNewDishItemToBasket = () => {
    this.setState({ newDishItemToBasket: null });
  };

  onChangeBasketBusy = (isBusy) => {
    this.setState({ isBasketBusy: isBusy });
  };

  render() {
    return (
      <div className={style.container}>
        <header>
          <Logo />
          <Search
            value={this.state.searchDishValue}
            onSearchChange={this.onSearchChange}
          />
          <Basket
            newDishItemToBasket={this.state.newDishItemToBasket}
            onCleanNewDishItemToBasket={this.onCleanNewDishItemToBasket}
            onChangeBasketBusy={this.onChangeBasketBusy}
          />
        </header>
        <Dishes
          searchDishValue={this.state.searchDishValue}
          isBasketBusy={this.state.isBasketBusy}
          onAddDishToBasket={this.onAddDishToBasket}
        />
      </div>
    );
  }
}

export default App;
