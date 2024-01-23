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
import { useNavigate } from 'react-router-dom';
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
    marginTop: 40,
    padding: 10,
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

  totaliza: {
    width: 350,
    fontSize: 12,
  },
});

export default function Compras() {
  const classes = useStyles();
  const [compras, setCompras] = useState([]);
  const [datVencto, setDatVencto] = useState(['']);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    let newDate = new Date();
    let diaNew = newDate.getDate();
    let monthNew = newDate.getMonth() + 1;
    let yearNew = 0;

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
    setDatVencto(dataNew);

    console.log('Nova Data:', dataNew);

    //api.get(`compras`).then(response => {
    //    setCompras(response.data);        
    //})
       
    api.get(`findCompras/${datVencto}`).then(response => {
      setCompras(response.data);      
    })

    api.get(`totCompras/${datVencto}`).then(resp => {
      setTotal(resp.data);
    })
  },[]);

  useEffect(() => {
    api.get(`findCompras/${datVencto}`).then(response => {
        setCompras(response.data);        
    })

    api.get(`totCompras/${datVencto}`).then(resp => {
      setTotal(resp.data);
    })  
       
  },[datVencto]);
  
  return (
    <div>
      <MenBarra />
      <div className={classes.cadastrar}>      
      <TextField 
        className={classes.input}
        type="date"
        variant="outlined"
        margin="normal"
        id="datVencto"
        label="Dt. Vencimento"
        name="datVencto"
        autoFocus                
        value={datVencto} 
        onChange={(e) => {setDatVencto(e.target.value)}} 
      />
      <div className={classes.cadastrar}>
        <Button variant="contained" color="primary">
          <Link to={`/pdfExtConv/${datVencto}`} className="button-edit" >Imprime PDF</Link>        
        </Button>
      </div>
      <div className={classes.totaliza}>
        {total.map((cmp) => (
          <h1 key={cmp.totCmp}>              
            <p>TOTAL DAS COMPRAS:{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cmp.totCmp)}</p>
          </h1>
        ))}
      </div>
    </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Parcela</StyledTableCell>
            <StyledTableCell align="left">Emissão</StyledTableCell>
            <StyledTableCell align="left">Vencimento</StyledTableCell>
            <StyledTableCell align="left">Vlr. Parcela</StyledTableCell>
            <StyledTableCell align="left">Convenio</StyledTableCell>
            <StyledTableCell align="left">Servidor</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((row) => (
            <StyledTableRow key={row.parIdCompra} >
              <StyledTableCell align="left" component="th" scope="row">{row.parIdCompra}</StyledTableCell>
              <StyledTableCell align="left">{row.parNroParcela}</StyledTableCell>
              <StyledTableCell align="left">{row.cmpEmissao}</StyledTableCell>
              <StyledTableCell align="left">{row.parVctParcela}</StyledTableCell>
              <StyledTableCell align="left">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(row.parVlrParcela)}</StyledTableCell>
              <StyledTableCell align="left">{row.cmpConvenio}</StyledTableCell>
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