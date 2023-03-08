import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  // console.log(person)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hullo! I'm Igor. I'm a front end developer. You can contact me on <a href='https://t.me/letulip'>Telegram</a></p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItemBig} key={id}>
              <Link href={`/posts/${id}`}>
                <h3>{title}</h3>
              </Link>
              <h4>Pub date: <Date dateString={date} /></h4>
            </li>
          ))}
        </ul>
      </section>

      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <p>{person.name}</p>
      </section> */}
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  // const res = await fetch('https://swapi.dev/api/people/1')
  // const person = await res.json()
  return {
    props: {
      // person,
      allPostsData,
    }
  }
}

async function getSWPerson() {
  const res = await fetch('https://swapi.dev/api/people/1')
  return res.json()
}