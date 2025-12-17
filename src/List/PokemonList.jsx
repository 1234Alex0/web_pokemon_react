import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import PokemonCard from '../components/PokemonCard.jsx'
import './PokemonList.css'  

function PokemonList() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cambia limit=151 cuando quieras toda la Gen 1. Usa 20 o 50 mientras desarrollas para que cargue rápido
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error cargando Pokémon:', err)
        setLoading(false)
      })
  }, [])

  // Pantalla de carga con estilo rojo/negro
  if (loading) {
    return (
      <div className="loadingContainer">
        <Spinner animation="border" className="loadingSpinner" size="lg" />
        <p className="loadingText">Cargando Pokédex...</p>
      </div>
    )
  }

  // Lista principal
  return (
    <div className="pokemonGrid">
      <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-4">
        {pokemons.map((pokemon) => (
          <Col key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PokemonList