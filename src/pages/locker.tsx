import {SFC} from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconBox from '../components/IconBox';
import {withFirebaseCloudMessaging} from '../hooks/firebase';
import { GetServerSideProps } from 'next'

const Locker:SFC<any> = ({baseUrl, userId}) => {
  const {isPermissionRequired, isPushEnabled, lastestMessage} = withFirebaseCloudMessaging(baseUrl, userId);

  return (
    <div className="container items-center p-4 mx-auto min-h-screen justify-center">
      <Head>
        <title>Locker Applications</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" key="viewport"/>
      </Head>
      <h2>Welcome, {userId}</h2>
      <div className="p-3">
        <h3 className="py-2 text-blue-700">Debug</h3>
        <span>{lastestMessage}</span>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    USER_ID,
    BACKEND_SERVER
  } = process.env;

  return {
    props: {
      baseUrl: BACKEND_SERVER,
      userId: USER_ID
    },
  }
};

export default Locker;
