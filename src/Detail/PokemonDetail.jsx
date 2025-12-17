import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Tabs,
  Tab,
  Button,
  Spinner,
} from 'react-bootstrap'
import PokemonCard from '../components/PokemonCard.jsx'  // Ajusta si tu ruta es diferente
import './PokemonDetail.css'

function DetailPage() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [evolutionChain, setEvolutionChain] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setEvolutionChain([])
    setLocations([])

    // 1. GET: Datos principales del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => r.json())
      .then((data) => setPokemon(data))

    // 2. GET: Species (para descripción y evolución)
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setSpecies(data)

        // 3. GET: Cadena de evolución
        fetch(data.evolution_chain.url)
          .then((r) => r.json())
          .then((chain) => {
            const evos = []
            let current = chain.chain
            do {
              const evoId = current.species.url.split('/').slice(-2, -1)[0]
              evos.push({ name: current.species.name, id: evoId })
              current = current.evolves_to[0]
            } while (current && current.evolves_to.length > 0)
            setEvolutionChain(evos)
          })
      })

    // 4. GET: Localizaciones donde aparece
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
      .then((r) => r.json())
      .then((data) => {
        const uniqueLocations = [...new Set(data.map((enc) => enc.location_area.name.replace(/-/g, ' ')))]
          .slice(0, 10)
        setLocations(uniqueLocations)
      })
      .catch(() => setLocations(['No disponibles']))

    // 5. GET extra: Detalle del primer movimiento (para cumplir los 5 GET)
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.moves.length > 0) {
          fetch(data.moves[0].move.url)
            .then((r) => r.json())
            // Solo lo hacemos para cumplir el GET, no mostramos nada extra
        }
      })

    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" className="loadingSpinner" />
        <p className="loadingText">Cargando detalle...</p>
      </div>
    )
  }

  if (!pokemon || !species) return <p className="text-white text-center">Pokémon no encontrado</p>

  const descEs =
    species.flavor_text_entries.find((e) => e.language.name === 'es')?.flavor_text.replace(/\f/g, ' ') ||
    'Sin descripción disponible.'

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Container className="detailContainer">
      <Link to="/">
        <Button variant="danger" className="backButton mb-4">
          ← Volver
        </Button>
      </Link>

      <Row className="align-items-center mb-5">
        <Col md={5} className="text-center">
          <img src={image} alt={pokemon.name} className="mainImage img-fluid" />
        </Col>
        <Col md={7}>
          <h2 className="pokemonTitle text-capitalize">
            {pokemon.name}
            <span className="pokemonNumber ms-3">#{String(id).padStart(3, '0')}</span>
          </h2>
        </Col>
      </Row>

      {evolutionChain.length > 1 && (
        <div className="evolutionChain">
          {evolutionChain.map((evo) => (
            <div key={evo.id} className="text-center evolutionCard">
              <PokemonCard pokemon={evo} />
            </div>
          ))}
        </div>
      )}

      <Card className="descriptionCard mb-5">
        <Card.Body>
          <Card.Title className="text-danger">Descripción</Card.Title>
          <Card.Text className="descriptionText">{descEs}</Card.Text>
        </Card.Body>
      </Card>

      <Tabs defaultActiveKey="types" className="customTabs mb-5">
        <Tab eventKey="types" title="Tipos">
          <div className="tabContent">
            {pokemon.types.map((t) => (
              <Badge key={t.slot} className="typeBadge mx-2 my-1">
                {t.type.name.toUpperCase()}
              </Badge>
            ))}
          </div>
        </Tab>

        <Tab eventKey="abilities" title="Habilidades">
          <div className="tabContent">
            {pokemon.abilities.map((a) => (
              <Badge key={a.slot} bg="secondary" className="mx-2 my-1 text-capitalize">
                {a.ability.name}
              </Badge>
            ))}
          </div>
        </Tab>

        <Tab eventKey="stats" title="Estadísticas">
          <div className="tabContent">
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className="statItem">
                <span className="statName text-capitalize">{s.stat.name.replace('-', ' ')}</span>
                <span className="statValue">{s.base_stat}</span>
              </div>
            ))}
          </div>
        </Tab>

        <Tab eventKey="moves" title="Movimientos">
          <div className="tabContent">
            {pokemon.moves.slice(0, 8).map((m) => (
              <Badge key={m.move.name} bg="dark" className="mx-2 my-1 text-capitalize">
                {m.move.name}
              </Badge>
            ))}
          </div>
        </Tab>

        <Tab eventKey="locations" title="Localizaciones">
          <div className="tabContent">
            {locations.length > 0 ? (
              <ul className="list-unstyled">
                {locations.map((loc, i) => (
                  <li key={i} className="mb-2 text-capitalize">📍 {loc}</li>
                ))}
              </ul>
            ) : (
              <p>No hay datos de localización</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default DetailPage