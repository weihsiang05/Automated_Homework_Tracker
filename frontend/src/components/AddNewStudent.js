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


function AddNewStudent() {

  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idFieldEmpty, setIdFieldEmpty] = useState(false)
  const [firstNameFieldEmpty, setFirstNameFieldEmpty] = useState(false)
  const [studentExistError, setStudentExistError] = useState('')
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const NewStudent = async (e) => {
    try {
      e.preventDefault();

      if (id === "") {
        setIdFieldEmpty(true)
        return;
      } else if (firstName === "") {
        setFirstNameFieldEmpty(true)
        return;
      } else {
        const request = await fetch('/cramSchool/new/student', {
          method: 'POST',
          body: JSON.stringify({ studentID: id, firstName: firstName, lastName: lastName }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const json = await request.json()

        if (!request.ok) {
          setError(json.error);
        } else {

          if (json.status === "success") {
            setStudentExistError('')
            setError(null);
            navigate('/');
          } else {
            setStudentExistError(json.error);
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
      case 'Id':
        setStudentExistError('')
        setIdFieldEmpty(false)
        setId(e.target.value);
        break;
      case 'FirstName':
        setFirstNameFieldEmpty(false)
        setFirstName(e.target.value);
        break;
      case 'LastName':
        setLastName(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {studentExistError && <div style={{ color: 'red' }}>{studentExistError}</div>}
      <div>
        <TableContainer component={Paper} style={{ width: '500px' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <TextField id="Id" label="ID" variant="outlined" onChange={handleInputChange} value={id} error={idFieldEmpty} helperText={idFieldEmpty ? 'ID cannot be empty' : ''} fullWidth />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <TextField id="FirstName" label="First Name" variant="outlined" onChange={handleInputChange} value={firstName} error={firstNameFieldEmpty} helperText={firstNameFieldEmpty ? 'First Name cannot be empty' : ''} fullWidth />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <TextField id="LastName" label="Last Name" variant="outlined" onChange={handleInputChange} fullWidth />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Button variant="outlined" onClick={NewStudent} style={{ height: '50px' }}>
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

export default AddNewStudent;