import React, { useState, useEffect } from 'react';

import dataApi from 'api/data';
import BasketDetails from './BasketDetails';
import BasketButton from './BasketButton';
import Loader from 'components/common/Loader';

const Basket = (props) => {
  const [basketItems, setBasketItems] = useState([]);
  const [basketCountItems, setBasketCountItems] = useState(0);
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  const [isBasketDetailHidden, setIsBasketDetailHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [requestErrMsg, setRequestErrMsg] = useState(null);

  const onLoadChange = (isLoading) => {
    props.onChangeBasketBusy(isLoading);
    setIsLoading(isLoading);
  };

  const loadInitBasket = async () => {
    onLoadChange(true);
    try {
      const basket = await dataApi.get('basket');
      const [calcBasketCountItems, calcBasketTotalPrice] =
        calcBasketInfo(basket);
      setBasketItems(basket);
      setBasketCountItems(calcBasketCountItems);
      setBasketTotalPrice(calcBasketTotalPrice);
    } catch (e) {
      setRequestErrMsg(e.toString());
    } finally {
      onLoadChange(false);
    }
  };

  const calcBasketInfo = (basketItems) => {
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

  useEffect(() => {
    loadInitBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.newDishItemToBasket && !isLoading) {
      addDishToBasket(props.newDishItemToBasket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newDishItemToBasket]);

  const toggleBasketDetail = () => {
    setIsBasketDetailHidden(!isBasketDetailHidden);
  };

  const addDishToBasket = async (newItem) => {
    const existItemIdx = basketItems.findIndex(
      (item) => item.id === newItem.id
    );
    const newBasketItems = [...basketItems];
    onLoadChange(true);
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

      setBasketItems(newBasketItems);
      setBasketCountItems(basketCountItems + 1);
      setBasketTotalPrice(basketTotalPrice + newItem.price);
    } catch (e) {
      setRequestErrMsg(e.toString());
    } finally {
      props.onCleanNewDishItemToBasket();
      onLoadChange(false);
    }
  };

  const deleteDishFromBasket = async (id) => {
    onLoadChange(true);
    try {
      await dataApi.delete(`basket/${id}`);
      const filterBasketItems = basketItems.filter((item) => item.id !== id);
      const [calcBasketCountItems, calcBasketTotalPrice] =
        calcBasketInfo(filterBasketItems);

      setBasketItems(filterBasketItems);
      setBasketCountItems(calcBasketCountItems);
      setBasketTotalPrice(calcBasketTotalPrice);
    } catch (e) {
      setRequestErrMsg(e.toString());
    } finally {
      onLoadChange(false);
    }
  };

  const renderBasketButton = () => {
    if (isLoading) {
      return <Loader height={'64'} width={'64'} />;
    }

    if (requestErrMsg) {
      return <h1>Error</h1>;
    }

    return (
      <BasketButton
        countItems={basketCountItems}
        toggleBasketDetail={toggleBasketDetail}
      />
    );
  };

  return (
    <>
      <BasketDetails
        isBasketDetailHidden={isBasketDetailHidden}
        basketItems={basketItems}
        basketTotalPrice={basketTotalPrice}
        isBasketLoading={isLoading}
        toggleBasketDetail={toggleBasketDetail}
        deleteDishFromBasket={deleteDishFromBasket}
      />
      {renderBasketButton()}
    </>
  );
};

export default Basket;
