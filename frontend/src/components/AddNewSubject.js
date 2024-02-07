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


function AddNewSubject() {

  const [subject, setSubject] = useState('');
  const [subjectFieldEmpty, setSubjectFieldEmpty] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

}

export default AddNewSubject;