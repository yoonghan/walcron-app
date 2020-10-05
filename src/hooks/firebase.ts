import {useState, useEffect, useMemo} from 'react';
import firebase from 'firebase/app';
import 'firebase/messaging';

export function withFirebaseCloudMessaging(baseUrl:string, userId:string) {
  const [firebaseMessaging, setFirebaseMessaging] = useState(null);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isPermissionRequired, setIsPermissionRequired] = useState(false);
  const [lastestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    if(firebaseMessaging !== null && isPushEnabled) {
      console.log("registered to message listener");
      firebaseMessaging.onMessage((payload) => {
        const notification = payload.notification;
        // try {
        //   if(notification.title.indexOf('ready') > -1) {
            setLatestMessage(notification.body);
        //   }
        // }catch(err) {
        //
        // }
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
      apiKey: "AIzaSyDmW-zt_s96mfkQhU5R26Q9H1UrVsA-GcA",
      projectId: "locker-db7b0",
      messagingSenderId: "1028008017896",
      appId: "1:1028008017896:web:2e97eeb079938636e02e5d"
    };
    firebase.initializeApp(firebaseConf);
    const messaging = firebase.messaging();
    _updateToken(messaging)();

    messaging.onTokenRefresh(_updateToken(messaging));
  }, []);

  return {
    isPermissionRequired: isPermissionRequired,
    isPushEnabled: isPushEnabled,
    lastestMessage: lastestMessage
  };
}
