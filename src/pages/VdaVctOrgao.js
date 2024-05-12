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
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    marginTop: 40,
    padding: 10,
    hover: {
      cursor: 'pointer',
    }
  },

  btnCadastrar: {
    height: 50,
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  input: {
    width: 300,
  },

  select: {
    marginTop: 16,
    marginBottom: 8,
    width: 430,
  },

  totaliza: {
    width: 300,
    fontSize: 12,
  },
});

export default function VdaVctOrgao() {
  const classes = useStyles();
  const [compras, setCompras] = useState([]);
  const [datInicio, setDatInicio] = useState(['']);
  const [datFinal, setDatFinal] = useState(['']);
  const [total, setTotal] = useState([]);
  const [convenio, setConvenio] = useState(0);
  const [servidor, setServidor] = useState(0);

  const [atualiza, setAtualiza] = useState(0);

  useEffect(() => {

    let newDate = new Date();
    let diaNew = newDate.getDate();
    let monthNew = newDate.getMonth() + 1;
    let yearNew = newDate.getFullYear();
    
    if (diaNew > 15) {
        monthNew = newDate.getMonth() + 2;
    }  
    if (monthNew > 12) {
        monthNew = 1
        yearNew = newDate.getFullYear() + 1
    }else {
        yearNew = newDate.getFullYear();
    }
      
    let dataNew = yearNew + '-' + monthNew + '-' + 15;
    setDatInicio(dataNew);

    console.log('Nova Data:', datInicio);
    
    //api.post('totOrgao', {
    //  datInicio,
    //}).then((response) => {
    //  setCompras(response.data);
    //}).catch(() => {
    //  alert('Erro na leitura Orgão Administrativo!');
    //})  

  },[]);

  useEffect(() => {    

    console.log('Data Modificada:', datInicio);

    if (atualiza === 1 ) {
      api.post('totOrgao', {
        datInicio,
      }).then((response) => {
        setCompras(response.data);
      }).catch(() => {
        alert('Erro na leitura Orgão Administrativo!');
      })  
    }
    
    setAtualiza(1);

  },[datInicio]);

  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>      
        <TextField 
          className={classes.input}
          type="date"
          variant="outlined"
          margin="normal"
          id="datInicio"
          label="Data Inicial"
          name="datInicio"
          autoFocus                
          value={datInicio} 
          onChange={(e) => {setDatInicio(e.target.value)}} 
        />
          
        <div className={classes.cadastrar}>
          <Button variant="contained" color="primary">
            <Link to={`/pdfVctOrgao/${datInicio}`} className={classes.link}>PDF</Link>        
          </Button>
        </div>     
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Orgão Administrativo</StyledTableCell>
            <StyledTableCell align="left">Ano Vencto</StyledTableCell>
            <StyledTableCell align="left">Mes Vencto</StyledTableCell>
            <StyledTableCell align="left">Tot. Vendas</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((row) => (
            <StyledTableRow key={row.idTotOrg} >
              <StyledTableCell align="left" component="th" scope="row">{row.idTotOrg}</StyledTableCell>
              <StyledTableCell align="left">{row.orgDescricao}</StyledTableCell>
              <StyledTableCell align="left">{row.orgTotAno}</StyledTableCell>
              <StyledTableCell align="left">{row.orgTotMes}</StyledTableCell>
              <StyledTableCell align="left">{Intl.NumberFormat('en-US', {style: 'currency', currency: 'BRL'}).format(row.orgTotVlrVenda)}</StyledTableCell>
              <StyledTableCell align="right">
              <Link to={() => {}} >
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