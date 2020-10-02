import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconBox from '../components/IconBox';
import {withPwaHooks} from '../hooks/pwa';

export default function Home() {

  const {isInstallable, drawnPwaButton} = withPwaHooks();

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

        <article className="my-4 text-center">
          <span>Please choose the application which you would like to execute.</span>
        </article>

        <section className="p-3 flex flex-col md:flex-row justify-center">
          <div className="md:max-w-md">
            <IconBox href="/lockers">
              <div className="flex flex-col justify-center text-center items-center">
                <FontAwesomeIcon icon={['fas', 'lock']} />
                <h3 className="pt-3">Food Lockers</h3>
              </div>
            </IconBox>
          </div>
        </section>
      </main>
    </div>
  )
}
