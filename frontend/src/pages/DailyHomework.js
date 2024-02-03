import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DailyHomework = () => {
  //const [links, setLinks] = useState('')
  const [error, setError] = useState(null);
  const { studentId } = useParams();

  console.log('studentId:', studentId);

  useEffect(() => {
    const fetchData = async () => {
      try {

        //const request = await fetch('/:studentID/edit/homework');
        // console.log('studentId:', studentId);

        const request = await fetch('/cramSchool/edit/homework', {
          method: 'POST',
          body: JSON.stringify({ studentID: studentId }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log(request)
        const json = await request.json();
        console.log(json);

        if (!request.ok) {
          setError(json.error);
        } else {
          //console.log(json)
          setError(null);
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {error && <div className="Error">{error.toString()}</div>}
      <h3></h3>
    </div>
  )
}



export default DailyHomework;