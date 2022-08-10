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
import { useParams } from 'react-router-dom';

import api from '../services/api';
import { Button } from '@material-ui/core';
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
  },
  button: {
    border: 'none',
    cursor: 'pointer',
  },
});

export default function Informacoes() {
  const classes = useStyles();
  const [informacoes, setInformacoes] = useState([]);
  const idUsr = params.usrId; 
  const params = useParams();

  useEffect(() => {
    //let idUsr = params.usrId; 
    api.get(`informacoes/${idUsr}`).then(response => {
        setInformacoes(response.data);
        
    })
  },[]);

  function handleDelete(row) {
    /*let idSec = row.movId;

    api.put(`delsecretaria/${idSec}`).then(() => {
        alert('Secretaria deletada com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de deletar a secretaria!');
    })    
    navigate(-1); */
  }

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
      <Button variant="contained" color="primary">
        <Link to={`/newinformacao/${idUsr}`} className={classes.link}>Nova Informação</Link>        
      </Button>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Servidor</StyledTableCell>
            <StyledTableCell align="left">Código</StyledTableCell>
            <StyledTableCell align="left">Data</StyledTableCell>
            <StyledTableCell align="left">Informação</StyledTableCell>            
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {informacoes.map((row) => (
            <StyledTableRow key={row.infId}>
              <StyledTableCell align="left" component="th" scope="row">{row.infUsrId}</StyledTableCell>
              <StyledTableCell align="left">{row.infId}</StyledTableCell>
              <StyledTableCell align="left">{row.infData}</StyledTableCell>
              <StyledTableCell align="left">{row.infDescricao}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/altinformacao/${row.infUsrId}/${row.infId}`} >
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