import React from 'react';

import style from './App.module.css';
import DishCard from '../dishCard/DishCard';
import DATA from '../../assets/data.json';
import BasketButton from '../basket/basketButton/BasketButton';
import BasketDetails from '../basket/basketDetails/BasketDetails';

const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dishes: DATA,
      basketItems: [],
      basketCountItems: 0,
      basketTotalPrice: 0,
      isBasketDetailOpen: false,
    };
  }

  _basketItems = (action, data) => {
    switch (action) {
      case ADD_ITEM:
        if (!this.state.basketItems.length) {
          this.setState({ basketItems: [data] });
          return;
        }
    }
  };

  toggleBasketDetail = () => {
    this.setState({ isBasketDetailOpen: !this.state.isBasketDetailOpen });
  };

  addDishToBasket = (id, name, price) => {
    this._updateBasket(ADD_ITEM, { id, name, price });
  };

  deleteDishFromBasket = (id) => {
    this._updateBasket(DELETE_ITEM, id);
  };

  render() {
    return (
      <div className={style.container}>
        <BasketDetails
          isHide={this.state.isBasketDetailOpen}
          toggleBasketDetail={this.toggleBasketDetail}
        />
        <header>
          <h1>Cafe Name</h1>
          <BasketButton
            countItem={this.countBasketItem}
            toggleBasketDetail={this.toggleBasketDetail}
          />
        </header>
        <main className={style.dishContainer}>
          {this.state.dishes.map((item, idx) => (
            <DishCard
              key={idx}
              name={item.name}
              imgSrc={item.imgSrc}
              price={item.price}
              ingredients={item.ingredients}
            />
          ))}
        </main>
      </div>
    );
  }
}

export default App;
