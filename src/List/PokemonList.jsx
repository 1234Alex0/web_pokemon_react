import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import PokemonCard from '../NewCard/PokemonCard.jsx'
import './PokemonList.css'

//Rangos de IDs por generación
const GEN_RANGES = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 898],
  9: [899, 1008],
}

function PokemonList({ generation = 'all' }) {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (generation === 'all') {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
        .then((res) => res.json())
        .then((data) => setPokemons(data.results))
        .catch((err) => console.error('Error cargando Pokémon:', err))
        .finally(() => setLoading(false))
    } else {
      const gid = Number(generation)
      const range = GEN_RANGES[gid]
      if (!range) {
        setPokemons([])
        setLoading(false)
        return
      }
      const [min, max] = range
      const offset = min - 1
      const limit = max - min + 1
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => setPokemons(data.results))
        .catch((err) => console.error('Error cargando generación:', err))
        .finally(() => setLoading(false))
    }
  }, [generation])

  if (loading) {
    return (
      <div className="loadingContainer">
        <Spinner animation="border" className="loadingSpinner" size="lg" />
        <p className="loadingText">Cargando Pokédex...</p>
      </div>
    )
  }

  return (
    <div className="pokemonGrid">
      <Row sm={3} md={4} lg={5} xl={6} className="g-4">
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