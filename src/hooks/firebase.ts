import {useState, useEffect, useMemo} from 'react';

export function withFirebaseCloudMessaging(userId:string, _writer:(message:string)=>void) {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isPermissionRequired, setIsPermissionRequired] = useState(false);

  const sendTokenToServer = (tokenId:string) => {
    
  }

  useEffect(() => {
    const messaging = firebase.messaging();
    try {
      messaging.getToken().then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        setIsPushEnabled(true);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
        setIsPermissionRequired(true);
        setIsPushEnabled(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      setIsPushEnabled(false);
    });

  });

  return {
    isPermissionRequired: isPermissionRequired,
    isPushEnabled: isPushEnabled
  };
}
