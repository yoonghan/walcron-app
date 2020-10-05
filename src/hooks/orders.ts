import {useState, useEffect, useMemo} from 'react';

export function withOrders(baseUrl:string, userId:string) {
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrder = () => {
    fetch(`${baseUrl}/app/api/locker/users/${userId}/orders`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(orderResp => (orderResp.json()))
    .then(orderResp => {
      if(orderResp.orders) {
        setOrders(orderResp.orders);
      }
      else {
        setOrders([]);
      }
    })
    .catch(err => console.error('order error', err));
  }

  useEffect(() => {
    if(isFetchingOrder) {
      return;
    }

    fetchOrder();
  }, [isFetchingOrder]);

  useEffect(() => {
    fetchOrder();
  }, []);

  return {
    orders: orders,
    updateOrders: () => {setIsFetchingOrder(true)}
  };
}
