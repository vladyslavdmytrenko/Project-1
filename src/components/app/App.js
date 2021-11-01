import React from 'react';

import style from './App.module.css';
import DishCard from '../dishCard/DishCard';
import DATA from '../../assets/data.json';
import BasketButton from '../basket/basketButton/BasketButton';
import BasketDetails from '../basket/basketDetails/BasketDetails';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

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

  toggleBasketDetail = () => {
    this.setState({ isBasketDetailOpen: !this.state.isBasketDetailOpen });
  };

  addDishToBasket = (id, name, price) => {
    const existItemIdx = this.state.basketItems.findIndex(
      (item) => item.id === id
    );
    const newBasketItems = [...this.state.basketItems];

    if (existItemIdx !== -1) {
      newBasketItems[existItemIdx].count++;
      newBasketItems[existItemIdx].price += price;
    } else {
      newBasketItems.push({
        id: id,
        name: name,
        price: price,
        count: 1,
      });
    }

    this.setState({
      basketItems: newBasketItems,
      basketCountItems: this.state.basketCountItems + 1,
      basketTotalPrice: this.state.basketTotalPrice + price,
    });
  };

  deleteDishFromBasket = (id) => {
    const filterBasketItems = this.state.basketItems.filter(
      (item) => item.id !== id
    );
    const [calcBasketCountItems, calcBasketTotalPrice] =
      filterBasketItems.reduce(
        (prev, current) => {
          prev[0] += current.count;
          prev[1] += current.price;
          return prev;
        },
        [0, 0]
      );

    this.setState({
      basketItems: [...filterBasketItems],
      basketCountItems: calcBasketCountItems,
      basketTotalPrice: calcBasketTotalPrice,
    });
  };

  render() {
    return (
      <div className={style.container}>
        <BasketDetails
          isHide={this.state.isBasketDetailOpen}
          toggleBasketDetail={this.toggleBasketDetail}
          basketItems={this.state.basketItems}
          basketTotalPrice={this.state.basketTotalPrice}
          deleteDishFromBasket={this.deleteDishFromBasket}
        />
        <header>
          <div className={style.logoContainer}>
            <Logo className={style.logoIcon} />
          </div>
          <BasketButton
            countItem={this.countBasketItem}
            toggleBasketDetail={this.toggleBasketDetail}
            countItems={this.state.basketCountItems}
          />
        </header>
        <main className={style.dishContainer}>
          {this.state.dishes.map((item) => (
            <DishCard
              key={item.id}
              id={item.id}
              name={item.name}
              imgSrc={item.imgSrc}
              price={item.price}
              ingredients={item.ingredients}
              addDishToBasket={this.addDishToBasket}
            />
          ))}
        </main>
      </div>
    );
  }
}

export default App;
