import {useState, useEffect, useMemo} from 'react';
import firebase from 'firebase/app';
import 'firebase/messaging';

interface INotificationData {
  orderId: string,
  status: string,
  partnerId: string
}

export function withFirebaseCloudMessaging(apiKey:string, projectId:string, messagingSenderId:string, appId:string, baseUrl:string, userId:string) {
  const [firebaseMessaging, setFirebaseMessaging] = useState(null);
  const [isPushEnabled, setIsPushEnabled] = useState<Boolean|undefined>(undefined);
  const [isPermissionRequired, setIsPermissionRequired] = useState(false);
  const [lastestMessage, setLatestMessage] = useState("");
  const [isIOSDevice, updateAsIOSDevice] = useState(false);
  const [lastestData, setLatestData] = useState<INotificationData|undefined>(undefined);

  useEffect(() => {
    if(firebaseMessaging !== null && isPushEnabled) {
      console.log("registered to message listener");
      firebaseMessaging.onMessage((payload) => {
        const notification = payload.notification;
        const data = (payload.data as INotificationData);
        setLatestMessage(notification.body);
        setLatestData(data);
      });
    }
  }, [firebaseMessaging, isPushEnabled]);

  const _sendTokenToServer = (pushNotificationToken:string) => {
    fetch(`${baseUrl}/app/api/locker/users/${userId}/notification`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"push_notification_token":pushNotificationToken})
    })
    .then(imgResp => (imgResp.json()))
    .then(imgResp => {
      setIsPushEnabled(true);
    });
  }

  const _updateToken = (messaging:any) => () => {
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        _sendTokenToServer(currentToken);
        setFirebaseMessaging(messaging);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
        setIsPermissionRequired(true);
        setIsPushEnabled(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      setIsPushEnabled(false);
    });
  }

  useEffect(() => {
    const firebaseConf = {
      apiKey,
      projectId,
      messagingSenderId,
      appId
    };
    try {
      firebase.initializeApp(firebaseConf);
      const messaging = firebase.messaging();
      _updateToken(messaging)();

      messaging.onTokenRefresh(_updateToken(messaging));
    }
    catch(err) {
      if(err.message.indexOf('duplicate-app') === -1) {
        alert("Firebase is not supported on iOS browser/related devices.\nThere will be no notification update.");
        setIsPushEnabled(false);
      }
    }
  }, []);

  return {
    isPermissionRequired: isPermissionRequired,
    isPushEnabled: isPushEnabled,
    lastestMessage: lastestMessage,
    lastestData: lastestData
  };
}
