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
        <meta
          name="description"
          content="Check out letulip's personal blog developed with Next.js and React."
          key="desc"
        />
        <meta property="og:title" content={siteTitle} />
        <meta
          property="og:description"
          content="Check out letulip's personal blog developed with Next.js and React."
        />
        <meta
          property="og:image"
          content="/img/avatar2.jpg"
        />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hullo! I'm Igor &mdash; a front end and full stack (a little) developer. You can contact me on <a href='https://t.me/letulip'>Telegram</a></p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItemBig} key={id}>
              <Link href={`/posts/${id}`}>
                <h3 className={utilStyles.heading3after}>{title}</h3>
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