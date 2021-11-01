import React from 'react';

import style from './App.module.css';
import DishCard from '../dishCard/DishCard';
import DATA from '../../assets/data.json';
import BasketButton from '../basket/basketButton/BasketButton';
import BasketDetails from '../basket/basketDetails/BasketDetails';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Search from '../search/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dishesRaw: DATA,
      dishes: DATA,
      basketItems: [],
      basketCountItems: 0,
      basketTotalPrice: 0,
      isBasketDetailOpen: false,
      searchValue: '',
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

  onSearchChange = (value) => {
    const filterDish = this.state.dishesRaw.filter((item) => {
      let isFind = false;

      if (item.name.toLowerCase().startsWith(value)) isFind = true;
      if (item.ingredients.find((item) => item.toLowerCase().includes(value)))
        isFind = true;

      return isFind;
    });
    this.setState({ dishes: [...filterDish], searchValue: value });
  };

  renderDish = () => {
    return this.state.dishes.length ? (
      this.state.dishes.map((item) => (
        <DishCard
          key={item.id}
          id={item.id}
          name={item.name}
          imgSrc={item.imgSrc}
          price={item.price}
          ingredients={item.ingredients}
          addDishToBasket={this.addDishToBasket}
        />
      ))
    ) : (
      <h1>No results found. Try another request</h1>
    );
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
          <Search
            value={this.state.searchValue}
            onSearchChange={this.onSearchChange}
          />
          <BasketButton
            countItem={this.countBasketItem}
            toggleBasketDetail={this.toggleBasketDetail}
            countItems={this.state.basketCountItems}
          />
        </header>
        <main className={style.dishContainer}>{this.renderDish()}</main>
      </div>
    );
  }
}

export default App;
