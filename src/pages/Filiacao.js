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

export default function Filiacao() {
  const classes = useStyles();
  const [filhos, setFilhos] = useState([]);

  const params = useParams();  

  useEffect(() => {
    let idUsr = params.usrId;
    api.get(`filiacao/${idUsr}`).then(response => {
        setFilhos(response.data);
        
    })
  },[]);

  function handleDelete(row) {
    //let idSec = row.movId;
    //api.put(`delsecretaria/${idSec}`).then(() => {
    //    alert('Secretaria deletada com sucesso!')
    //}).catch(() => {
    //    alert('Erro na tentativa de deletar a secretaria!');
    //})    
    //navigate(-1);
  }

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
      <Button variant="contained" color="primary">
        <Link to={`/newfiliacao/${params.usrId}`} className={classes.link}>Novo Filiação</Link>        
      </Button>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Código</StyledTableCell>
            <StyledTableCell align="left">Nome Filiação</StyledTableCell>
            <StyledTableCell align="right">Nascimento</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filhos.map((row) => (
            <StyledTableRow key={row.filId}>
              <StyledTableCell align="left" component="th" scope="row">{row.filId}</StyledTableCell>
              <StyledTableCell align="left">{row.filUsrId}</StyledTableCell>
              <StyledTableCell align="left">{row.filNome}</StyledTableCell>
              <StyledTableCell align="right">{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(row.filNascimento))}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/altfiliacao/${row.filUsrId}/${row.filId}`} >
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