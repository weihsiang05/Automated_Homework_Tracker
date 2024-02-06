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
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function EditStudetInfo() {
  const { studentId } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [parentFieldEmpty, setParentFieldEmpty] = useState(false);
  const [parentExistError, setParentExistError] = useState(null);
  const [studentParents, setStudentParents] = useState('');
  const [studentParentsRelationship, setStudentParentsRelationship] = useState('');
  const [studentParentsInfo, setStudentParentsInfo] = useState('');
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
          setStudentParentsInfo(json.parent);
          setStudentParentsRelationship(json.findStudentParent);
          setError(null);

          // try {

          //   const request = await fetch('/cramSchool/edit/studentParent');

          //   const json = await request.json();

          //   if (!request.ok) {
          //     setError(json.error);
          //   } else {
          //     console.log(json.parent)
          //     setStudentParentsInfo(json.parent);
          //     setError(null);
          //   }
          // } catch (error) {
          //   setError(error);
          // }
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
    //const selectedParent = studentParentsInfo.find((theParent) => theParent.id === studentParents);
    console.log(studentParents);
    //console.log(selectedParent.id);

    try {
      e.preventDefault()

      if (studentParents === "") {
        setParentFieldEmpty(true)
        return;
      } else {
        setParentFieldEmpty(false);
      }

      const request = await fetch('/cramSchool/add/studentParent', {
        method: 'POST',
        body: JSON.stringify({ studentID: studentId, parentID: studentParents }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await request.json()

      if (!request.ok) {
        setError(json.error);
      } else {
        if (json.status === "error") {
          console.log(json.error)
          setParentExistError(json.error)
        } else {
          setStudentParentsRelationship(json.findStudentParent)
          setParentExistError(null)
          setError(null);
        }
      }

    } catch (error) {
      setError(error);
    }
  }

  const SelectedParent = (e) => {
    e.preventDefault();
    setStudentParents(e.target.value)
  }

  const DeleteParent = async (parentId) => {

    console.log(parentId)
    try {

      const request = await fetch('/cramSchool/delete/studentParent', {
        method: 'DELETE',
        body: JSON.stringify({ studentID: studentId, parentID: parentId }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await request.json()

      if (!request.ok) {
        setError(json.error);
      } else {
        setStudentParentsRelationship(json.findStudentParent)
        setError(null);
      }

    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      {studentInfo && <h3>{studentInfo.FiristName} Information</h3>}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ minWidth: 120, marginRight: '10px', width: '200px' }}>
          <FormControl fullWidth style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-label">Parents</InputLabel>
            <Select
              id="parent"
              value={studentParents}
              label="parent"
              onChange={SelectedParent}
              error={parentFieldEmpty}
            >
              {studentParentsInfo && studentParentsInfo.map((parentsList) => (
                <MenuItem key={parentsList.id} value={parentsList.id}>
                  {parentsList.name}
                </MenuItem>
              ))}
            </Select>
            {parentFieldEmpty && <div style={{ color: 'red' }}>Please select parent!</div>}
            {parentExistError && <div style={{ color: 'red' }}>{parentExistError}</div>}
          </FormControl>
        </Box>

        <Button variant="outlined" onClick={AddStudentParents} style={{ height: '50px' }}>
          Add
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
        <div>

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

        <div>
          {studentParentsRelationship && studentParentsRelationship.map((relationship) => (
            <TableContainer component={Paper} style={{ width: '500px' }} key={relationship['Parent.name']}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField id={relationship['Parent.name']} label="Student Parent" variant="outlined" value={relationship['Parent.name']} fullWidth disabled />
                        <div style={{ marginLeft: '10px' }}>
                          <Button variant="outlined" onClick={() => DeleteParent(relationship['Parent.id'])} style={{ height: '50px' }}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          ))}
        </div>
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