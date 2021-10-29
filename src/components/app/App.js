import React from 'react';

import style from './App.module.css';
import DishCard from '../dishCard/DishCard';
import DATA from '../../assets/data.json';
import BasketButton from '../basket/basketButton/BasketButton';
import BasketDetails from '../basket/basketDetails/BasketDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dishes: DATA,
      basket: [],
      countBasketItem: 0,
      isBasketDetailOpen: false,
    };
  }

  toggleBasketDetail = () => {
    console.log(this.state.isBasketDetailOpen);
    this.setState({ isBasketDetailOpen: !this.state.isBasketDetailOpen });
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
