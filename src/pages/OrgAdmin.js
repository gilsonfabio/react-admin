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

export default function OrgAdmin() {
  const classes = useStyles();
  const [orgAdmin, setOrgAdmin] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`orgaos`).then(response => {
        setOrgAdmin(response.data);
        
    })
  },[]);

  function handleDelete(row) {
    let idOrg = row.orgId;

    api.put(`delorgadmin/${idOrg}`).then(() => {
        alert('Orgão Admin. deletado com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de deletar o orgão administrativo!');
    })    
    navigate(-1);
  }

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
      <Button variant="contained" color="primary">
        <Link to={`/neworgadmin`} className={classes.link}>Novo Orgão</Link>        
      </Button>
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
          {orgAdmin.map((row) => (
            <StyledTableRow key={row.orgId}>
              <StyledTableCell align="left" component="th" scope="row">{row.orgId}</StyledTableCell>
              <StyledTableCell align="left">{row.orgDescricao}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/altorgadmin/${row.orgId}`} >
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