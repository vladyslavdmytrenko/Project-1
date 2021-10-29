import React from 'react';

import style from './App.module.css';
import DishCard from '../dishCard/DishCard';
import DATA from '../../assets/data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dishes: DATA,
    };
  }

  render() {
    return (
      <div className={style.container}>
        <header>
          <h1>Cafe Name</h1>
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
