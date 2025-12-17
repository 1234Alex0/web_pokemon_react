
import { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PokemonCard from '../NewCard/PokemonCard.jsx'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')  
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center text-white">Cargando...</p>

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/generations">
          <Button variant="danger">Explorar por generación</Button>
        </Link>
      </div>

      <Row xs={2} md={4} lg={5} className="g-4">
      {pokemons.map(p => (
        <Col key={p.name}>
          <PokemonCard pokemon={p} />
        </Col>
      ))}
      </Row>
    </>
  )
}

export default Home