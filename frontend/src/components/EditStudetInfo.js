import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StudentInfo from '../pages/StudentInfo';

function EditStudetInfo() {
  const { studentId } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const GetStudentInfo = async (e) => {
      try {

        const request = await fetch('/cramSchool/studentInfo', {
          method: 'POST',
          body: JSON.stringify({ studentID: studentId }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // console.log(request);
        const json = await request.json();

        if (!request.ok) {
          setError(json.error);
        } else {
          //console.log(json.findStudent)
          setStudentInfo(json.findStudent)
          setId(json.findStudent.id);
          setFirstName(json.findStudent.FiristName);
          setLastName(json.findStudent.LastName);
          setError(null);
        }
      } catch (error) {
        setError(error);
      }
    }

    GetStudentInfo();
  }, []);

  const handleInputChange = (e) => {
    // Update the state based on the input field
    switch (e.target.id) {
      case 'FirstName':
        setFirstName(e.target.value);
        setFirstNameEmpty(false);
        break;
      case 'LastName':
        setLastName(e.target.value);
        break;
      default:
        break;
    }
  };

  const UpdateStudentInfo = async (e) => {
    try {
      e.preventDefault()

      if (firstName === "") {
        setFirstNameEmpty(true);
        return;
      }

      const request = await fetch('/cramSchool/update/studentInfo', {
        method: 'PUT',
        body: JSON.stringify({ studentID: studentId, Id: id, LastName: lastName, FirstName: firstName }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await request.json()

      if (!request.ok) {
        setError(json.error);
      } else {
        //console.log(json);
        setStudentInfo(json.findStudent)
        navigate('/');
        setError(null);
      }

    } catch (error) {
      setError(error);
    }
  }

  const AddStudentParents = async (e) => {
    
  }

  return (
    <div>
      {studentInfo && <h3>{studentInfo.FiristName} Information</h3>}
      < div>
        <Button variant="outlined" onClick={AddStudentParents} style={{ height: '50px' }}>
          Add Parents
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>

        {studentInfo && (
          <TableContainer component={Paper} style={{ width: '500px' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <TextField id="Id" label="ID" variant="outlined" value={id} fullWidth disabled />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <TextField id="FirstName" label="First Name" value={firstName} variant="outlined" onChange={handleInputChange} error={firstNameEmpty} helperText={firstNameEmpty ? 'First Name cannot be empty' : ''} fullWidth />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <TextField id="LastName" label="Last Name" value={lastName} variant="outlined" onChange={handleInputChange} fullWidth />
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>)}
      </div>


      < div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Button variant="outlined" onClick={UpdateStudentInfo} style={{ height: '50px' }}>
          Store
        </Button>
      </div>

    </div >
  );

}

export default EditStudetInfo;