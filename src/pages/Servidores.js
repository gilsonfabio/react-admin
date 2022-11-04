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
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import HowToRegIcon from '@material-ui/icons/HowToReg';
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

  cpf: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
  },

  btnCpf: {
    height: 53,
    marginTop: 3,
    marginLeft: 5,
  },

  btnCadastrar: {
    height: 50,
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  input: {
    width: 350,
  },
});

export default function Servidores() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(['']);
  const [cpfAnt, setCpfAnt] = useState();

  useEffect(() => {
    api.get(`users`).then(response => {
        setUsers(response.data);
        
    })
  },[]);

  useEffect(() => {
    api.get(`classUser/${search}`).then(response => {
        setUsers(response.data);
     
    })
  },[search]);
  
  function handleBusAnterior(e) {
    api.get(`usrAnterior/${cpfAnt}`).then(response => {
      alert('Servidor(a) cadastrado com sucesso!') 
    }).catch(() => {
      alert('Erro no cadastro!');
    })   
  }
  
  /*<Link to={`/newservidor`} className="button-edit" className={classes.link}>Novo Servidor</Link> */

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
        <Button variant="contained" color="primary" className={classes.btnCadastrar}>
          <Link to={`/newservidor`} className={classes.link}>Novo Servidor</Link>        
        </Button>
        <div className={classes.cpf}>
          <TextField 
            className={classes.input}
            variant="outlined"
            margin="normal"
            id="cpf"
            label="Cpf Servidor Antigo"
            name="cpf"
            autoFocus                
            value={cpfAnt} 
            onChange={(e) => {setCpfAnt(e.target.value)}} 
          />
          <Button variant="contained" color="primary" className={classes.btnCpf} onClick={handleBusAnterior} >
            <HowToRegIcon />        
          </Button>
        </div>
        <TextField 
          className={classes.input}
          variant="outlined"
          margin="normal"
          id="descricao"
          label="Busca Servidor"
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
            <StyledTableCell align="left">Nome Usuário</StyledTableCell>
            <StyledTableCell align="left">Email Usuário</StyledTableCell>
            <StyledTableCell align="right">Filiação</StyledTableCell>
            <StyledTableCell align="right">Informações</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Ficha</StyledTableCell>
            <StyledTableCell align="right">Contrato</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.usrId} >
              <StyledTableCell align="left" component="th" scope="row">{row.usrId}</StyledTableCell>
              <StyledTableCell align="left">{row.usrNome}</StyledTableCell>
              <StyledTableCell align="left">{row.usrEmail}</StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/filiacao/${row.usrId}`} >
                <FaceIcon />
              </Link>                         
              </StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/informacoes/${row.usrId}`} >
                <AssignmentIndIcon />
              </Link>                         
              </StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/stacartao/${row.usrId}`} >
                <CreditCardIcon />
              </Link>                         
              </StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/impficha/${row.usrId}`} >
                <LocalPrintshopIcon />
              </Link>                         
              </StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/pdfcnvcontrato/${row.usrId}`} >
                <LocalPrintshopIcon />
              </Link>                         
              </StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/altservidor/${row.usrId}`} >
                <EditIcon />
              </Link>                          
              </StyledTableCell>
              <StyledTableCell align="right">
              <IconButton aria-label="delete">
              <Link to={`/delServidor/${row.usrId}`} >
                <DeleteIcon />
              </Link>
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