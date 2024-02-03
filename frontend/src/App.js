import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DailyHomework from './pages/DailyHomework';

function App() {

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/:studentId/dailyHomework"
            element={<DailyHomework />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );

}


export default App;
