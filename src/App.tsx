import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Path_player from './pages/Path_player/Path_player.tsx';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Path_player />} />
      </Routes>
    </Router>
  );
}

export default App;
