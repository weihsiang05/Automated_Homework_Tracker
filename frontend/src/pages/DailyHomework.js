import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import StudentHomeworks from '../components/StudentHomeworks'

const DailyHomework = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<StudentHomeworks />}
        />
      </Routes>
    </div>
  )
};

export default DailyHomework;