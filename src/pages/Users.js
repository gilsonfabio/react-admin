import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import api from '../services/api';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenBarra from '../components/MenBarra/MenBarra';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cadastrar: {
    marginTop: 70,
    padding: 10,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  }
});

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get(`users`).then(response => {
        setUsers(response.data);
        
    })
  },[]);
  
  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
      <Button variant="contained" color="primary">
        <Link to={`/newuser`} className={classes.link}>Novo Usuário</Link>        
      </Button>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Nome Usuário</StyledTableCell>
            <StyledTableCell align="left">Email Usuário</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.usrId}>
              <StyledTableCell align="left" component="th" scope="row">{row.usrId}</StyledTableCell>
              <StyledTableCell align="left">{row.usrNome}</StyledTableCell>
              <StyledTableCell align="left">{row.usrEmail}</StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/altuser/${row.usrId}`} >
                <EditIcon />
              </Link>                         
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}