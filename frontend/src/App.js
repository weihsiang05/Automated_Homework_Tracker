import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DailyHomework from './pages/DailyHomework';
import StudentInfo from './pages/StudentInfo'
import NewStudent from './pages/NewStudent';
import NewSubject from './pages/NewSubject';

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
            path="/:studentId/dailyHomework/*"
            element={<DailyHomework />}
          />

          <Route
            path="/:studentId/studentInfo/*"
            element={<StudentInfo />}
          />

          <Route
            path="/newStudent"
            element={<NewStudent />}
          />

          <Route
            path="/newSubject"
            element={<NewSubject />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );

}


export default App;
