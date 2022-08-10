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

export default function Atividades() {
  const classes = useStyles();
  const [atividades, setAtividades] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`atividades`).then(response => {
        setAtividades(response.data);
        
    })
  },[]);

  function handleDelete(row) {
    let idAtv = row.atvId;

    api.put(`delAtividade/${idAtv}`).then(() => {
        alert('Ramo de Atividade deletado com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de deletar a atividade!');
    })    
    navigate(-1);
  }

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
      <Button variant="contained" color="primary">
        <Link to={`/newAtividade`} className={classes.link}>Nova Atividade</Link>        
      </Button>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Descrição</StyledTableCell>
            <StyledTableCell align="left">% Taxa Adm</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {atividades.map((row) => (
            <StyledTableRow key={row.atvId}>
              <StyledTableCell align="left" component="th" scope="row">{row.atvId}</StyledTableCell>
              <StyledTableCell align="left">{row.atvDescricao}</StyledTableCell>
              <StyledTableCell align="left">{row.atvTaxAdm}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/altAtividade/${row.atvId}`} >
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