import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function StudentHomeworks() {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [error, setError] = useState(null);
  const { studentId } = useParams();
  const [todayHomework, setTodayHomework] = useState(null);
  const [subject, setSubject] = useState(null);
  const [statuses, setStatuses] = useState('');
  const [createSubject, setCreateSubject] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {

        const request = await fetch('/cramSchool/edit/homework', {
          method: 'POST',
          body: JSON.stringify({ studentID: studentId }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // console.log(request);
        const json = await request.json();
        console.log(json.subject);
        console.log(json.todayHomework);

        if (!request.ok) {
          setError(json.error);
        } else {
          //console.log(json)
          setError(null);
          setTodayHomework(json.todayHomework);
          setSubject(json.subject);
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);

  const AddSubject = async (e) => {
    try {
      e.preventDefault()

      const selectedSubject = subject.find((subjectItem) => subjectItem.subjectName === createSubject);
      // console.log(selectedSubject.id)

      if (selectedSubject) {
        const request = await fetch('/cramSchool/edit/homework/add', {
          method: 'POST',
          body: JSON.stringify({ studentID: studentId, subjectID: selectedSubject.id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const json = await request.json()

        if (!request.ok) {
          setError(json.error);
        } else {
          //console.log(json)
          setError(null);
          setTodayHomework(json.todayHomework);
          setSubject(json.subject);
        }
      } else {
        setError(error);
      }

    } catch (error) {
      setError(error);
    }

  }

  const handleChange = (event, homeworkId) => {
    const newStatuses = [...statuses];
    newStatuses[homeworkId] = event.target.value;
    setStatuses(newStatuses);
  };

  const handleSubject = (e) => {
    e.preventDefault();
    setCreateSubject(e.target.value)
  }


  return (
    <div>
      {error && <div className="Error">{error.toString()}</div>}

      {todayHomework && Array.from(new Set(todayHomework.map(item => item['student.FiristName']))).map(uniqueFirstName => {
        return (<h3 key={uniqueFirstName}>{uniqueFirstName}{" Today's Homework"}</h3>)
      })}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ minWidth: 120, marginRight: '10px', width: '200px' }}>
          <FormControl fullWidth style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>

            <Select
              id="Subject"
              value={createSubject}
              label="subject"
              onChange={handleSubject}
            >
              {subject && subject.map((subjectItem) => (
                <MenuItem key={subjectItem.id} value={subjectItem.subjectName}>
                  {subjectItem.subjectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button variant="outlined" onClick={AddSubject} style={{ height: '50px' }}>
          Create
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TableContainer component={Paper} sx={{ minWidth: 400, maxWidth: 800 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Subject</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todayHomework ? (todayHomework.map((todayHomework) => (
                <StyledTableRow key={todayHomework.id}>
                  <StyledTableCell align="center">{todayHomework['subject.subjectName']}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                          labelId={todayHomework['subject.subjectName']}
                          id={todayHomework['subject.subjectName']}
                          value={statuses[todayHomework.id] || ''}
                          label="status"
                          onChange={(event) => handleChange(event, todayHomework.id)}
                        >
                          <MenuItem value={"Do not Finished"}>Do not Finished</MenuItem>
                          <MenuItem value={"Process"}>Process</MenuItem>
                          <MenuItem value={"Completed"}>Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
              ) : (
                <TableRow>
                  <StyledTableCell align="center">
                    Can't render the studernt Info!
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </div>

      <div>
        {/* <Button variant="outlined" style={{ height: '50px' }}>
          Back
        </Button>

        <Button variant="outlined" onClick={DeleteStudent} style={{ height: '50px' }}>
          Delete
        </Button> */}
      </div>

    </div >
  )
}

export default StudentHomeworks;