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

export default function Convenios() {
  const classes = useStyles();
  const [convenios, setConvenios] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`convenios`).then(response => {
        setConvenios(response.data);
        
    })
  },[]);

  function handleDelete(row) {
    let idCon = row.cnvId;

    api.put(`delConvenio/${idCon}`).then(() => {
        alert('Convênio deletado com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de deletar o convênio!');
    })    
    navigate(-1);
  }

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
      <Button variant="contained" color="primary">
        <Link to={`/newConvenio`} className={classes.link}>Novo Convênio</Link>        
      </Button>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Nome Fantasia</StyledTableCell>
            <StyledTableCell align="left">Razão Social</StyledTableCell>
            <StyledTableCell align="left">CNPJ/CPF</StyledTableCell>
            <StyledTableCell align="left">Telefone</StyledTableCell>
            <StyledTableCell align="left">Contato</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {convenios.map((row) => (
            <StyledTableRow key={row.cnvId}>
              <StyledTableCell align="left" component="th" scope="row">{row.cnvId}</StyledTableCell>
              <StyledTableCell align="left">{row.cnvNomFantasia}</StyledTableCell>
              <StyledTableCell align="left">{row.cnvRazSocial}</StyledTableCell>
              <StyledTableCell align="left">{row.cnvCpfCnpj}</StyledTableCell>
              <StyledTableCell align="left">{row.cnvTelefone}</StyledTableCell>
              <StyledTableCell align="left">{row.cnvContato}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/altconvenio/${row.cnvId}`} >
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