import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import PokemonCard from '../NewCard/PokemonCard.jsx'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')   // Gen 1 como en tu ejemplo
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center text-white">Cargando...</p>

  return (
    <Row xs={2} md={4} lg={5} className="g-4">
      {pokemons.map(p => (
        <Col key={p.name}>
          <PokemonCard pokemon={p} />
        </Col>
      ))}
    </Row>
  )
}

export default Home