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
import { TextField } from '@material-ui/core';

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
});

export default function Cargos() {
  const classes = useStyles();
  const [cargos, setCargos] = useState([]);
  const [search, setSearch] = useState(['']);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`cargos`).then(response => {
        setCargos(response.data);
        
    })
  },[]);

  function handleDelete(row) {
    let idCrg = row.crgId;

    api.put(`delcargo/${idCrg}`).then(() => {
        alert('Cargo deletado com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de deletar o cargo!');
    })    
    navigate(-1);
  }

  useEffect(() => {
    api.get(`buscargo/${search}`).then(response => {
        setCargos(response.data);
     
    })
  },[search]);

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
        <Button variant="contained" color="primary">
          <Link to={`/newcargo`} className={classes.link}>Novo Cargo</Link>        
        </Button>
        <TextField 
          className={classes.input}
          variant="outlined"
          margin="normal"
          id="descricao"
          label="Busca Cargo"
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
            <StyledTableCell align="left">Descrição</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cargos.map((row) => (
            <StyledTableRow key={row.crgId}>
              <StyledTableCell align="left" component="th" scope="row">{row.crgId}</StyledTableCell>
              <StyledTableCell align="left">{row.crgDescricao}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/altcargo/${row.crgId}`} >
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