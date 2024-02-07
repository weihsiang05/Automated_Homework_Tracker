import * as React from 'react';
import { useState } from 'react'
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NewSubject from '../pages/NewSubject';


function AddNewSubject() {

  const [subject, setSubject] = useState('');
  const [subjectFieldEmpty, setSubjectFieldEmpty] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const NewSubject = async (e) => {
    try {
      e.preventDefault();

      if (subject === "") {
        setSubjectFieldEmpty(true)
        return;
      } else {
        const request = await fetch('/cramSchool/new/subject', {
          method: 'POST',
          body: JSON.stringify({ subjectName: subject }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const json = await request.json()

        if (!request.ok) {
          setError(json.error);
        }
        else {
          if (json.status === "success") {
            setError(null);
            navigate('/');
          } else {
            setError(json.error);
          }
        }
      }
    } catch (error) {
      setError(error);
    }

  }

  const backToMainPage = () => {
    navigate('/');
  }

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case 'Subject':
        setSubjectFieldEmpty(false)
        setSubject(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <TableContainer component={Paper} style={{ width: '500px' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <TextField id="Subject" label="Subject Name" variant="outlined" onChange={handleInputChange} value={subject} error={subjectFieldEmpty} helperText={subjectFieldEmpty ? 'Subject can not be empty' : ''} fullWidth />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Button variant="outlined" onClick={NewSubject} style={{ height: '50px' }}>
          Store
        </Button>
      </div>

      <div>
        <Button variant="outlined" onClick={backToMainPage} style={{ height: '50px' }}>
          Back
        </Button>
      </div>

    </div>
  )
}

export default AddNewSubject;