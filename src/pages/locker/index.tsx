import {SFC, useEffect, useState, useMemo} from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconBox from '../../components/IconBox';
import Button from '../../components/Button';
import {withFirebaseCloudMessaging} from '../../hooks/firebase';
import {withOrders} from '../../hooks/orders';
import { GetStaticProps } from 'next';

const Locker:SFC<any> = ({baseUrl, userId}) => {
  const {isPermissionRequired, isPushEnabled, lastestMessage, lastestData} = withFirebaseCloudMessaging(baseUrl, userId);
  const {orders, updateOrders, isFetchingOrder} = withOrders(baseUrl, userId);
  const [myOrders, setMyOrders] = useState([]);
  const [requestedPin, updateRequestedPin] = useState<object|undefined>(undefined);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const updateIntervalInSeconds = 10000;

  const _getPin = (orderId:string, partnerId:string) => () => {
    setIsRetrieving(true);
    fetch(`${baseUrl}/app/api/locker/users/${userId}/orders/${orderId}/partner/${partnerId}/unlock`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer'
    })
    .then(resp => {
      if (resp.status >= 400 && resp.status < 600) {
        throw new Error("Bad response from server");
      }
      else {
        return resp.json();
      }
    })
    .then(resp => {
      updateRequestedPin({
        orderId: orderId,
        partnerId: partnerId,
        pin: resp.info.pin
      })
    })
    .catch(err => alert('error'))
    .finally(() => {
      setIsRetrieving(false);
    })
  }

  const _callUnlock = (orderId:string, partnerId:string, pin:string) => {
    fetch(`${baseUrl}/app/api/locker/users/${userId}/orders/${orderId}/partner/${partnerId}/unlock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        pin: pin
      })
    })
    .then(resp => resp.json())
    .then(resp => { alert('Unlock triggered.') })
  }

  const _drawnOrders = useMemo(() => {
    if(myOrders) {
      return myOrders.map((elem, idx) => (
        <tr key={`order${idx}-${elem.orderId}`}>
          <td className="border px-4 py-2">{elem.partnerId}</td>
          <td className="border px-4 py-2">{elem.orderId}</td>
          <td className={`border px-4 py-2 ${elem.status==='Ready'?'bg-green-500':'bg-blue-500'}`}>{elem.status}</td>
          <td className="border px-4 py-2">{elem.createdDateTime}</td>
          <td className="border px-4 py-2">{elem.lastModifiedDateTime}</td>
          <td className="border px-4 py-2 bg-yellow-300">
            <Button onClick={_getPin(elem.orderId, elem.partnerId)} disabled={isRetrieving}>retrieve</Button>
          </td>
        </tr>
      ))
    }
    return (<></>);
  }, [myOrders, isRetrieving]);

  useEffect(() => {
    if(requestedPin) {
      const unlock = window.confirm('Sure to unlock?');
      if(unlock) {
        _callUnlock(requestedPin.orderId, requestedPin.partnerId, requestedPin.pin);
      }
      updateRequestedPin(undefined);
    }
  }, [requestedPin])

  useEffect(() => {
    console.log('isPushEnabled', isPushEnabled);
    if(isPushEnabled === false) {
      console.log('update via intervals');
      setInterval(() => {
        updateOrders();
      }, updateIntervalInSeconds);
    }
  }, [isPushEnabled]);

  useEffect(() => {
    const currentOrders = [...orders];
    if(typeof lastestData !== 'undefined') {
      const orderFound = currentOrders.find(element => element.orderId === lastestData.orderId && element.partnerId == lastestData.partnerId);

      if(orderFound) {
        orderFound.status = lastestData.status;
        orderFound.lastModifiedDateTime = new Date().toISOString();
      }
      else {
        currentOrders.push({
          orderId: lastestData.orderId,
          status: lastestData.status,
          createdDateTime: new Date().toISOString(),
          lastModifiedDateTime: new Date().toISOString(),
          partnerId: lastestData.partnerId
        })
      }
    }
    setMyOrders(currentOrders);
  }, [orders, lastestData]);

  useEffect(() => {
    const visibilityChangeFunc = () => {
      updateOrders();
    }

    document.addEventListener('visibilitychange', visibilityChangeFunc, false);

    return () => {
      document.removeEventListener('visibilitychange', visibilityChangeFunc, false);
    }
  }, []);

  return (
    <div className="container items-center p-4 mx-auto min-h-screen justify-center">
      <Head>
        <title>Locker Applications</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" key="viewport"/>
      </Head>
      <h2>Welcome, {userId}</h2>
      <div>
        <h3> Your orders currently </h3>
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Partner Id</th>
              <th className="w-1/4 px-4 py-2">Order Id</th>
              <th className="w-1/4 px-4 py-2">Status</th>
              <th className="w-1/2 px-4 py-2">Created Datetime</th>
              <th className="w-1/2 px-4 py-2">Modified Datetime</th>
              <th className="w-1/4 px-4 py-2">Get PIN</th>
            </tr>
          </thead>
          <tbody>
            {_drawnOrders}
          </tbody>
        </table>
      </div>
      <div className="flex text-sm">
        <h4>Legend:</h4>
        <div className={"mx-1 px-1 bg-blue-500"}>
          Preparing / Order Placed
        </div>
        <div className={"mx-1 px-1 bg-green-500"}>
          Ready
        </div>
      </div>
      <div className="p-3 text-blue-700">
        <h3 className="py-2">Debug</h3>
        <div className="text-sm">Update Status: {isFetchingOrder?"Getting latest Update":"Stable"}</div>
        <span>{lastestMessage}</span>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    USER_ID,
    BACKEND_SERVER
  } = process.env;

  return {
    props: {
      baseUrl: BACKEND_SERVER,
      userId: USER_ID
    }
  }
};

export default Locker;