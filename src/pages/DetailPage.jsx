import { Container } from 'react-bootstrap'
import PokemonDetail from '../Detail/PokemonDetail.jsx'

function DetailPage() {
  return (
    <Container className="py-5 text-white">
      <h2 className="text-warning mb-4">Detalle del Pokémon</h2>
      <PokemonDetail />
    </Container>
  )
}

export default DetailPage