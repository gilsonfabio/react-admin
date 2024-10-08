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
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import MenBarra from '../components/MenBarra/MenBarra';
import { TextField } from '@material-ui/core';

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 70,
    padding: 10,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  button: {
    border: 'none',
    cursor: 'pointer',
  },
  input: {
    width: 350,
  },
});

export default function Secretarias() {
  const classes = useStyles();
  const [secretarias, setSecretarias] = useState([]);
  const [search, setSearch] = useState(['']);
  
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`secretarias`).then(response => {
        setSecretarias(response.data);
        
    })
  },[]);

  useEffect(() => {
    api.get(`searchSecDesc/${search}`).then(response => {
        setSecretarias(response.data);
     
    })
  },[search]);

  function handleDelete(row) {
    let idSec = row.movId;

    api.put(`delsecretaria/${idSec}`).then(() => {
        alert('Secretaria deletada com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de deletar a secretaria!');
    })    
    navigate(-1);
  }

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
        <Button variant="contained" color="primary">
          <Link to={`/newsecretaria`} className={classes.link}>Nova Secretaria</Link>        
        </Button>
        <TextField 
          className={classes.input}
          variant="outlined"
          margin="normal"
          id="descricao"
          label="Busca Secretária"
          name="descricao"
          autoFocus                
          value={search} 
          onChange={(e) => {setSearch(e.target.value)}} 
        />
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Código</StyledTableCell>
            <StyledTableCell align="left">Descrição</StyledTableCell>
            <StyledTableCell align="left">Orgão</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {secretarias.map((row) => (
            <StyledTableRow key={row.secId}>
              <StyledTableCell align="left" component="th" scope="row">{row.secId}</StyledTableCell>
              <StyledTableCell align="left">{row.secCodigo}</StyledTableCell>
              <StyledTableCell align="left">{row.secDescricao}</StyledTableCell>
              <StyledTableCell align="left">{row.secOrgAdm}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/altsecretaria/${row.secId}`} >
                  <EditIcon />
                </Link>                         
              </StyledTableCell>              
              <StyledTableCell align="right">
                <button className={classes.button} type="button" onClick={() => handleDelete(row)}>
                  <DeleteIcon />
                </button> 
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}