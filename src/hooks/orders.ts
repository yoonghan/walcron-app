import {useState, useEffect, useMemo} from 'react';

export function withOrders(baseUrl:string, userId:string) {
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrder = () => {
    if(isFetchingOrder) {
      return;
    }

    setIsFetchingOrder(true);
    fetch(`${baseUrl}/app/api/locker/users/${userId}/orders`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(orderResp => (orderResp.json()))
    .then(orderResp => {
      setIsFetchingOrder(false);
      if(orderResp.orders) {
        setOrders(orderResp.orders);
      }
      else {
        setOrders([]);
      }
    })
    .catch(err => {
      console.error('order error', err);
      setIsFetchingOrder(false);
    });
  }

  const _doOrderFetch = () => {
    fetchOrder();
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return {
    orders: orders,
    isFetchingOrder: isFetchingOrder,
    updateOrders: _doOrderFetch
  };
}
