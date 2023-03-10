import Head from 'next/head'
import Layout from '../../components/layout'
import SWListItem from '../../components/swListItem'
import utilStyles from '../../styles/utils.module.css'

// SSG Example
export default function Planets({ planets }) {
  return (
    <Layout>
      <Head>
        <title>Starwars Planets List</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1>Starwars Planets List</h1>
        <ul>
          {planets.results.map((planet, idx) => (
            <SWListItem type="planet" idx={idx} item={planet}></SWListItem>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://swapi.dev/api/planets')
  const planets = await res.json()

  return {
    props: {
      planets,
    }
  }
}