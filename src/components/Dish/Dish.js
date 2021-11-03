import React from 'react';

import dataApi from 'api/data';
import DishCard from './DishCard';
import Loader from 'components/common/Loader';

import style from './Dish.module.css';

class Dish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishesRaw: [],
      dishes: [],
      prevSearchDishValue: '',
      isLoading: false,
      requestErrMsg: null,
    };
  }

  componentDidMount() {
    this._loadInitDishes();
  }

  componentDidUpdate() {
    if (this.state.prevSearchDishValue !== this.props.searchDishValue) {
      this.filterDishesBySearchParam(this.props.searchDishValue);
    }
  }

  _loadInitDishes = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await dataApi.get('dish');
      this.setState({
        dishesRaw: data.data,
        dishes: data.data,
      });
    } catch (e) {
      this.setState({ requestErrMsg: e.toString() });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  filterDishesBySearchParam = (searchParam) => {
    const filterDish = this.state.dishesRaw.filter((item) => {
      return (
        item.name.toLowerCase().startsWith(searchParam.toLowerCase()) ||
        item.ingredients.find((item) =>
          item.toLowerCase().includes(searchParam.toLowerCase())
        )
      );
    });
    this.setState({ dishes: filterDish, prevSearchDishValue: searchParam });
  };

  renderDish = () => {
    if (this.state.isLoading) {
      return <Loader />;
    }
    if (this.state.requestErrMsg) {
      return <h1>{this.state.requestErrMsg}</h1>;
    }
    return this.state.dishes.length ? (
      this.state.dishes.map((item) => (
        <DishCard
          key={item.id}
          dish={item}
          onAddDishToBasket={this.props.onAddDishToBasket}
          disableBtn={this.props.isBasketBusy}
        />
      ))
    ) : (
      <h1>No results found. Try another request</h1>
    );
  };

  render() {
    return <div className={style.dishContainer}> {this.renderDish()} </div>;
  }
}

export default Dish;
