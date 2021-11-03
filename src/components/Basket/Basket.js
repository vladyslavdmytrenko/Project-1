import React from 'react';

import dataApi from '../data';
import BasketDetails from './BasketDetails';
import BasketButton from './BasketButton';
import Loader from 'components/common/Loader';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basketItems: [],
      basketCountItems: 0,
      basketTotalPrice: 0,
      isBasketDetailHidden: true,
      isLoading: false,
      requestErrMsg: null,
    };
  }

  componentDidMount() {
    this._loadInitBasket();
  }

  componentDidUpdate() {
    if (this.props.newDishItemToBasket && !this.state.isLoading) {
      this.addDishToBasket(this.props.newDishItemToBasket);
    }
  }

  _onLoadChange = (isLoading) => {
    this.props.onChangeBasketBusy(isLoading);
    this.setState({ isLoading: isLoading });
  };

  _loadInitBasket = async () => {
    this._onLoadChange(true);
    try {
      const basket = await dataApi.get('basket');
      const [calcBasketCountItems, calcBasketTotalPrice] = this._calcBasketInfo(
        basket.data
      );
      this.setState({
        basketItems: [...basket.data],
        basketCountItems: calcBasketCountItems,
        basketTotalPrice: calcBasketTotalPrice,
      });
    } catch (e) {
      this.setState({ requestErrMsg: e.toString() });
    } finally {
      this._onLoadChange(false);
    }
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
    this.setState({ isBasketDetailHidden: !this.state.isBasketDetailHidden });
  };

  addDishToBasket = async (newItem) => {
    const existItemIdx = this.state.basketItems.findIndex(
      (item) => item.id === newItem.id
    );
    const newBasketItems = [...this.state.basketItems];
    this._onLoadChange(true);
    try {
      if (existItemIdx !== -1) {
        newBasketItems[existItemIdx].count++;
        newBasketItems[existItemIdx].price += newItem.price;
        await dataApi.put(`basket/${newBasketItems[existItemIdx].id}`, {
          ...newBasketItems[existItemIdx],
        });
      } else {
        const results = {
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          count: 1,
        };
        await dataApi.post('basket', results);
        newBasketItems.push(results);
      }

      this.setState({
        basketItems: newBasketItems,
        basketCountItems: this.state.basketCountItems + 1,
        basketTotalPrice: this.state.basketTotalPrice + newItem.price,
      });
    } catch (e) {
      this.setState({ requestErrMsg: e.toString() });
    } finally {
      this.props.onCleanNewDishItemToBasket();
      this._onLoadChange(false);
    }
  };

  deleteDishFromBasket = async (id) => {
    this._onLoadChange(true);
    try {
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
    } catch (e) {
      this.setState({ requestErrMsg: e.toString() });
    } finally {
      this._onLoadChange(false);
    }
  };

  renderBasketButton() {
    if (this.state.isLoading) {
      return <Loader height={'64'} width={'64'} />;
    }

    if (this.state.requestErrMsg) {
      return <h1>{this.state.requestErrMsg}</h1>;
    }

    return (
      <BasketButton
        countItems={this.state.basketCountItems}
        toggleBasketDetail={this.toggleBasketDetail}
      />
    );
  }

  render() {
    return (
      <>
        <BasketDetails
          isBasketDetailHidden={this.state.isBasketDetailHidden}
          basketItems={this.state.basketItems}
          basketTotalPrice={this.state.basketTotalPrice}
          isBasketLoading={this.state.isLoading}
          toggleBasketDetail={this.toggleBasketDetail}
          deleteDishFromBasket={this.deleteDishFromBasket}
        />
        {this.renderBasketButton()}
      </>
    );
  }
}

export default Basket;