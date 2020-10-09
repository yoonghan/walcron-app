import Head from 'next/head';
import {SFC, useState, useEffect, useMemo} from 'react';
import Icon from '../components/Icon';
import IconBox from '../components/IconBox';
import {withPwaHooks} from '../hooks/pwa';
import { GetStaticProps } from 'next';

const Index:SFC<any> = ({baseUrl}) => {
  const [ready, updateReady] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);
  const {isInstallable, drawnPwaButton} = withPwaHooks();

  const retryWaitInterval = 5000;
  const allowedRetries = 5;

  const _doMonitorCheck = () => {
    fetch(`${baseUrl}/api/monitor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer'
    })
    .then(resp => (resp.json()))
    .then(resp => { updateReady(resp.status === 'ok') })
    .catch(err => { updateReady(false)})
    .finally(() => {
      setRetryCounter(retryCounter + 1);
    })
  }

  useEffect(() => {
    if(!ready && retryCounter < allowedRetries) {
      setTimeout(_doMonitorCheck, retryWaitInterval)
    }
  }, [retryCounter, ready]);

  useEffect(() => {
    _doMonitorCheck()
  }, []);

  const _drawnMessage = useMemo(() => {
    if(ready) {
      return <span>Please choose the application which you would like to execute.</span>
    }

    if(retryCounter < allowedRetries) {
      return <span><em className="animate-blink">PLEASE WAIT: </em> Warming up and getting server ready.</span>
    }
    else {
      return <span><em className="text-red-500">ERROR: </em> Exhausted retry, maybe a refresh may help.</span>
    }
  }, [retryCounter, ready])

  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <Head>
        <title>Walcron Applications</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" key="viewport"/>
      </Head>
      <main>
        <h1 className="text-xl text-center mb-3">Walcron mobile/web application center.</h1>
        <div className="mb-3 p-3 flex flex-col justify-center border-solid border-4 border-gray-600 text-center">
          <h2 className="text-lg">Download as Application</h2>
          <div className="font-mono code text-sm my-4">Bored of not able to run as a mobile app? Install it!</div>
          <hr className="py-2"/>
          <div>
            {drawnPwaButton}
          </div>
        </div>

        <hr/>

        <div className="my-4 text-center">
          {_drawnMessage}
        </div>

        <section className="p-3 flex flex-col md:flex-row justify-center">
          <div className="md:max-w-md">
            <IconBox href="/locker" disabled={!ready}>
              <div className="flex flex-col justify-center text-center items-center">
                <Icon icon={['fas', 'lock']} size="lg" width="16"/>
                <h3 className="pt-3">Food Lockers</h3>
              </div>
            </IconBox>
          </div>
        </section>
      </main>
      <div className={"text-red-500"}></div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    BACKEND_SERVER
  } = process.env;

  return {
    props: {
      baseUrl: BACKEND_SERVER
    }
  }
}

export default Index;
