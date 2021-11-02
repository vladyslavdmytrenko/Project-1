import React from 'react';

import style from './App.module.css';
import DishCard from '../dishCard/DishCard';
import BasketButton from '../basket/basketButton/BasketButton';
import BasketDetails from '../basket/basketDetails/BasketDetails';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Search from '../search/Search';
import dataApi from '../../api/data';
import { ReactComponent as Loader } from '../../assets/images/loader.svg';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dishesRaw: [],
      dishes: [],
      basketItems: [],
      basketCountItems: 0,
      basketTotalPrice: 0,
      isBasketDetailOpen: false,
      searchValue: '',
      isLoading: false,
      isRequestErr: null,
    };
  }

  _loadData = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await dataApi.get('dish');
      const basket = await dataApi.get('basket');
      const [calcBasketCountItems, calcBasketTotalPrice] = this._calcBasketInfo(
        basket.data
      );
      this.setState({
        dishesRaw: data.data,
        dishes: data.data,
        basketItems: [...basket.data],
        basketCountItems: calcBasketCountItems,
        basketTotalPrice: calcBasketTotalPrice,
      });
    } catch (e) {
      this.setState({ isRequestErr: e.string() });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount = () => {
    this._loadData();
  };

  _calcBasketInfo = (basketItems) => {
    const basketInfo = basketItems.reduce(
      (prev, current) => {
        prev[0] += current.count;
        prev[1] += current.price;
        return prev;
      },
      [0, 0]
    );
    return basketInfo;
  };

  toggleBasketDetail = () => {
    this.setState({ isBasketDetailOpen: !this.state.isBasketDetailOpen });
  };

  addDishToBasket = async (id, name, price) => {
    const existItemIdx = this.state.basketItems.findIndex(
      (item) => item.id === id
    );
    const newBasketItems = [...this.state.basketItems];

    if (existItemIdx !== -1) {
      newBasketItems[existItemIdx].count++;
      newBasketItems[existItemIdx].price += price;
      await dataApi.put(`basket/${newBasketItems[existItemIdx].id}`, {
        ...newBasketItems[existItemIdx],
      });
    } else {
      let results = {
        id: id,
        name: name,
        price: price,
        count: 1,
      };
      await dataApi.post('basket', results);
      newBasketItems.push(results);
    }

    this.setState({
      basketItems: newBasketItems,
      basketCountItems: this.state.basketCountItems + 1,
      basketTotalPrice: this.state.basketTotalPrice + price,
    });
  };

  deleteDishFromBasket = async (id) => {
    await dataApi.delete(`basket/${id}`);
    const filterBasketItems = this.state.basketItems.filter(
      (item) => item.id !== id
    );
    const [calcBasketCountItems, calcBasketTotalPrice] =
      this._calcBasketInfo(filterBasketItems);

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
    if (this.state.isLoading) {
      return <Loader />;
    }
    if (this.state.isRequestErr) {
      return <h1>{this.state.isRequestErr}</h1>;
    }
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
