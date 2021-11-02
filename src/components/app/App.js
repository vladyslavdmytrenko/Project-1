import React from 'react';

import Logo from 'components/common/Logo';
import Search from 'components/Search';
import Basket from 'components/Basket';
import Dish from 'components/Dish';

import style from './App.module.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchDishValue: '',
      newDishItemToBasket: null,
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
          />
        </header>
        <Dish
          searchDishValue={this.state.searchDishValue}
          onAddDishToBasket={this.onAddDishToBasket}
        />
      </div>
    );
  }
}

export default App;
