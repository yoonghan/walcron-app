import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconBox from '../components/IconBox';

export default function Home() {
  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <Head>
        <title>Walcron Applications</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" key="viewport"/>
      </Head>
      <main>
        <h1 className="font-mono text-xl code">
          Welcome to Walcron App, choose the app you need.

          <section className="p-3">
            <IconBox href="/lockers">
              <div className="flex flex-col justify-center text-center items-center">
                <FontAwesomeIcon icon={['fas', 'lock']} />
                <h3 className="pt-3">Food Lockers</h3>
              </div>
            </IconBox>
          </section>
        </h1>
      </main>
    </div>
  )
}
