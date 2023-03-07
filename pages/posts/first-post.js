import Head from 'next/head'
// import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/layout'


export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      {
      // NOT IN HEAD!!!
      /* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      /> */}
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <Profile src="/img/avatar2.jpg" alt="My Ava" />
    </Layout>
  )
}

const Profile = (props) => (
  <Image
    src={props.src}
    height={200}
    width={200}
    alt={props.alt}
  />
)