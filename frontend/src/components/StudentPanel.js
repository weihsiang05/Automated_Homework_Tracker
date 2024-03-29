import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function StudentPanel() {
  const navigate = useNavigate();
  const [studentNames, setStudentNames] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentName = { studentNames };
        const request = await fetch('/cramSchool');

        //console.log(request);

        const json = await request.json();
        if (!request.ok) {
          setError(json.error);
        } else {
          console.log(json);
          setError(null);
          setResponseData(json); // Store the response data in state
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const DirectToStudentHomeworkPage = async (studentId) => {
    navigate(`/${studentId}/dailyHomework`);
  }

  const DirectToStudentInfoPage = async (studentId) => {
    navigate(`/${studentId}/studentInfo`);
  }

  const DirectToAddNewStudentPage = async () => {
    navigate('/newStudent');
  }

  const DirectToAddNewSubjectPage = async () => {
    navigate('/newSubject');
  }

  return (
    <div>

      <div>
        <Button variant="outlined" onClick={DirectToAddNewStudentPage} style={{ height: '50px' }}>
          Add Student
        </Button>
      </div>

      <div>
        <Button variant="outlined" onClick={DirectToAddNewSubjectPage} style={{ height: '50px' }}>
          Add Subject
        </Button>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>StudentID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Homework</StyledTableCell>
                <StyledTableCell align="right">information</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responseData ? (
                responseData.map((student) => (
                  <StyledTableRow key={student.id}>
                    <StyledTableCell component="th" scope="row">
                      {student.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{student.FiristName}</StyledTableCell>
                    <StyledTableCell align="right">
                      {/* <Button variant="outlined" style={{ marginBottom: '20px' }}>
                    <Link to={`/${student.id}/dailyHomework`} style={{ textDecoration: 'none' }}>+</Link>
                  </Button> */}
                      <Button variant="outlined" onClick={() => DirectToStudentHomeworkPage(student.id)} style={{ marginBottom: '20px' }}>
                        +
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant="outlined" onClick={() => DirectToStudentInfoPage(student.id)} style={{ marginBottom: '20px' }}>
                        Edit
                      </Button>
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
    </div>

  );
}

export default StudentPanel;