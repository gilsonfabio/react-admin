import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import api from '../services/api';
import { Button } from '@material-ui/core';
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

export default function Tabelas() {
  const classes = useStyles();
  const [cargos, setCargos] = useState([]);
  const [search, setSearch] = useState(['']);
  const navigate = useNavigate();

  function handleTabCompras() {
    api.put(`corCmpServ`).then(() => {
        alert('Compras atualizadas com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de atualização de compras!');
    })    
    navigate(-1);
  }

  function handleTabConvenios() {
    api.put(`corCmpConv`).then(() => {
        alert('Compras atualizadas com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de atualização de convênios!');
    })    
    navigate(-1);
  }

  function handleTabOrgaos() {
    api.post(`totOrgaos`).then(() => {
        alert('Compras atualizadas com sucesso!')
    }).catch(() => {
        alert('Erro na tentativa de atualização dos orgãos!');
    })    
    navigate(-1);
  }

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>
        <Button variant="contained" color="primary">
          <Link to={handleTabCompras} className={classes.link}>Atualiza Compras</Link>        
        </Button>
        <Button variant="contained" color="primary">
          <Link to={handleTabConvenios} className={classes.link}>Atualiza Convênios</Link>        
        </Button>
        <Button variant="contained" color="primary">
          <Link to={handleTabOrgaos} className={classes.link}>Atualiza Orgãos</Link>        
        </Button>
      </div>
      
    </div>
  );
}