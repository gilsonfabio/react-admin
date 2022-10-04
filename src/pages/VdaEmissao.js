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

export default function VdaEmissao() {
  const classes = useStyles();
  const [compras, setCompras] = useState([]);
  const [datInicio, setDatInicio] = useState(['']);
  const [datFinal, setDatFinal] = useState(['']);
  const [total, setTotal] = useState([]);
  const [convenio, setConvenio] = useState(0);
  const [servidor, setServidor] = useState(0);

  useEffect(() => {

    let newDate = new Date();
    let diaNew = newDate.getDate();
    let monthNew = newDate.getMonth() + 1;
    let yearNew = newDate.getFullYear();
        
    let dataNew = yearNew + '-' + monthNew + '-' + diaNew;
    setDatInicio(dataNew);
    setDatFinal(dataNew);

    console.log('Nova Data:', dataNew);
       
    api.get(`cmpPeriodo/${datInicio}/${datFinal}/${convenio}/${servidor}`).then(response => {
      setCompras(response.data);
      
    })

    api.get(`somCompras/${datInicio}/${datFinal}/${convenio}/${servidor}`).then(resp => {
      setTotal(resp.data);
    })

  },[]);

  useEffect(() => {
    api.get(`cmpPeriodo/${datInicio}/${datFinal}/${convenio}/${servidor}`).then(response => {
        setCompras(response.data);
    })
    api.get(`somCompras/${datInicio}/${datFinal}/${convenio}/${servidor}`).then(resp => {
        setTotal(resp.data);
    })     
  },[datInicio, datFinal, convenio, servidor]);
  
  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>      
        <TextField 
          className={classes.input}
          variant="outlined"
          margin="normal"
          id="datInicio"
          label="Data Inicial"
          name="datInicio"
          autoFocus                
          value={datInicio} 
          onChange={(e) => {setDatInicio(e.target.value)}} 
        />

        <TextField 
          className={classes.input}
          variant="outlined"
          margin="normal"
          id="datFinal"
          label="Data Final"
          name="datFinal"
          autoFocus                
          value={datFinal} 
          onChange={(e) => {setDatFinal(e.target.value)}} 
        />
 
        <TextField 
          className={classes.input}
          variant="outlined"
          margin="normal"
          id="convenio"
          label="Informe CNPJ Convênio"
          name="convenio"
          autoFocus                
          value={convenio} 
          onChange={(e) => {setConvenio(e.target.value)}} 
        />
  
        <TextField 
          className={classes.input}
          variant="outlined"
          margin="normal"
          id="servidor"
          label="Informe CPF Servidor"
          name="servidor"
          autoFocus                
          value={servidor} 
          onChange={(e) => {setServidor(e.target.value)}} 
        />
  
        <div className={classes.cadastrar}>
          <Button variant="contained" color="primary">
            <Link to={`/pdfCmpEmis/${datInicio}/${datFinal}/${convenio}/${servidor}`} className={classes.link}>PDF</Link>        
          </Button>
        </div>

        <div className={classes.totaliza}>
          {total.map((cmp) => (
            <h2 key={cmp.totCmp}>              
              <p>TOTAL DAS COMPRAS:{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cmp.totCmp)}</p>
            </h2>
          ))}
        </div>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Qtd.Parc</StyledTableCell>
            <StyledTableCell align="left">Emissão</StyledTableCell>
            <StyledTableCell align="left">Vlr. Compra</StyledTableCell>
            <StyledTableCell align="left">Convenio</StyledTableCell>
            <StyledTableCell align="left">Servidor</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((row) => (
            <StyledTableRow key={row.cmpId} >
              <StyledTableCell align="left" component="th" scope="row">{row.cmpId}</StyledTableCell>
              <StyledTableCell align="left">{row.cmpQtdParcela}</StyledTableCell>
              <StyledTableCell align="left">{row.cmpEmissao}</StyledTableCell>
              <StyledTableCell align="left">{Intl.NumberFormat('en-US', {style: 'currency', currency: 'BRL'}).format(row.cmpVlrCompra)}</StyledTableCell>
              <StyledTableCell align="left">{row.cnvNomFantasia}</StyledTableCell>
              <StyledTableCell align="left">{row.usrNome}</StyledTableCell>
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