import Head from 'next/head'
import Layout from '../../components/layout'
import SWListItem from '../../components/swListItem'
import utilStyles from '../../styles/utils.module.css'

// SSG Example
export default function People({ chars }) {
  return (
    <Layout>
      <Head>
        <title>Starwars Characters List</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1>Starwars Characters List</h1>
        <ul>
          {chars.results.map((char, idx) => (
            <SWListItem type="people" idx={idx} item={char}></SWListItem>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://swapi.dev/api/people')
  const chars = await res.json()

  return {
    props: {
      chars,
    }
  }
}