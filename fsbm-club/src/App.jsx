import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Membres from './pages/membres';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside this wrapper share the same Navbar and Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="membres" element={<Membres />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}