import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Path_player from './pages/Path_player/Path_player.tsx';
import Leaderboard from './pages/Leaderboard/Leaderboard.tsx';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Path_player />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
