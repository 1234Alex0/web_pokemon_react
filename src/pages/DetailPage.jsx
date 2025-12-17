import { Container, Spinner } from 'react-bootstrap'

function DetailPage() {
  return (
    <Container className="py-5 text-white">
      <h2 className="text-warning mb-4">Detalle del Pokémon</h2>
      <div className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Cargando detalle...</p>
      </div>
      <p>(Aquí irá el detalle completo cuando lo terminemos)</p>
    </Container>
  )
}

export default DetailPage