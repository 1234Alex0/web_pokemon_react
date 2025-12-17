import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import PokemonList from '../List/PokemonList.jsx'

function GenerationPage() {
  const [generation, setGeneration] = useState('1')

  return (
    <Container className="py-5 text-white">
      <h2 className="text-warning mb-4">Explorar por generación</h2>

      <div className="d-flex justify-content-end mb-3">
        <Form.Select
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
          style={{ maxWidth: 300 }}
          aria-label="Seleccionar generación"
        >
          <option value="1">Generación I (1-151)</option>
          <option value="2">Generación II (152-251)</option>
          <option value="3">Generación III (252-386)</option>
          <option value="4">Generación IV (387-493)</option>
          <option value="5">Generación V (494-649)</option>
          <option value="6">Generación VI (650-721)</option>
          <option value="7">Generación VII (722-809)</option>
          <option value="8">Generación VIII (810-898)</option>
          <option value="9">Generación IX (899-1008)</option>
          <option value="all">Todas las generaciones</option>
        </Form.Select>
      </div>

      <PokemonList generation={generation} />
    </Container>
  )
}

export default GenerationPage
