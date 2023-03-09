import Head from 'next/head'
import Layout from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.css'

// SSR Example
export default function PlanetInfo({ info }) {
  return (
    <Layout>
      <Head>
        <title>{info.name} Planet Info</title>
      </Head>
      <h1>{info.name}</h1>
      {/* "rotation_period": "23", 
      "orbital_period": "304", 
      "diameter": "10465", 
      "climate": "arid", 
      "gravity": "1 standard", 
      "terrain": "desert", 
      "surface_water": "1", 
      "population": "200000", */}
      <h4>Rotation period: {info.rotation_period}</h4>
      <h4>Orbital period: {info.orbital_period}</h4>
      <h4>Diameter: {info.diameter}</h4>
      <h4>Climate: {info.climate}</h4>
      <h4>Gravity: {info.gravity}</h4>
      <h4>Terrain: {info.terrain}</h4>
      <h4>Surface water: {info.surface_water}</h4>
      <h4>Population: {info.population}</h4>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  // query is reserved props
  const res = await fetch(`https://swapi.dev/api/planets/${query.planet_id}`)
  const data = await res.json()

  return {
    props: {
      info: data,
    }
  }
}