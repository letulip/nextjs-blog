import Head from 'next/head'
import Layout from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.css'

// SSG Example
export default function CharInfo({ info }) {
  return (
    <Layout>
      <Head>
        <title>{info.name} Info</title>
      </Head>
      <h1>{info.name}</h1>
      {/* "height": "172", 
      "mass": "77", 
      "hair_color": "blond", 
      "skin_color": "fair", 
      "eye_color": "blue", 
      "birth_year": "19BBY", 
      "gender": "male", */}
      <h4>Height: {info.height}</h4>
      <h4>Mass: {info.mass}</h4>
      <h4>Hair color: {info.hair_color}</h4>
      <h4>Skin color: {info.skin_color}</h4>
      <h4>Eye color: {info.eye_color}</h4>
      <h4>Birth year: {info.birth_year}</h4>
      <h4>Gender: {info.gender}</h4>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://swapi.dev/api/people')
  const people = await res.json()

  const paths = people.results.map((char, idx) => ({
    params: { char_id: idx.toString() },
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://swapi.dev/api/people/${params.char_id}`)
  const data = await res.json()

  return {
    props: {
      info: data,
    }
  }
}