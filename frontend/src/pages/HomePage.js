import * as React from 'react';
import StudentPanel from '../components/StudentPanel';
import AddNewStudent from '../components/AddNewStudent'

const HomePage = () => {
  return (
    <div>
      <AddNewStudent />
      <StudentPanel />
    </div>
  )

};

export default HomePage;