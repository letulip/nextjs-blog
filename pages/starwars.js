import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

// SSG Example
export default function Starwars() {
  return (
    <Layout>
      <Head>
        <title>Starwars Options List</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1>Starwars Options List</h1>
        <ul>
          <li><Link href="/starwars/people">Characters</Link></li>
          <li><Link href="/starwars/planets">Planets</Link></li>
        </ul>
      </section>
    </Layout>
  )
}