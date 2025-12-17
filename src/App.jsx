import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DetailPage from './pages/DetailPage.jsx'
import GenerationPage from './pages/GenerationPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-primary">
        <div className="container py-4">
          <h1 className="text-center text-warning mb-5 display-3 fw-bold">Pokedex</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generations" element={<GenerationPage />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
