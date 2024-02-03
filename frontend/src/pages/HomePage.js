import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentPanel from '../components/StudentPanel';

const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<StudentPanel />}
        />
      </Routes>
    </div>
  )

};

export default HomePage;