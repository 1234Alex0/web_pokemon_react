import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './PokemonCard.css'

function PokemonCard({ pokemon }) {
  // pokemon puede ser objeto simple (lista) o completo (detalle)
  const id = pokemon.url ? pokemon.url.split('/').slice(-2, -1)[0] : pokemon.id
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return (
    <Link to={`/pokemon/${id}`} className="text-decoration-none">
      <Card className="mb-4 shadow-sm hover-shadow-lg text-center border-0">
        <Card.Img variant="top" src={image} className="px-4 pt-4" style={{ height: '120px', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Subtitle className="text-muted">#{id.padStart(3, '0')}</Card.Subtitle>
          <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>
          {/* Tipos (solo si están cargados) */}
          {pokemon.types && (
            <div>
              {pokemon.types.map(t => (
                <Badge key={t.type.name} bg="secondary" className="mx-1 text-capitalize">
                  {t.type.name}
                </Badge>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </Link>
  )
}

export default PokemonCard