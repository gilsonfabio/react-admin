import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import api from '../services/api';

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
    buttonArea: {
        width: '100vw',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    button: {
      color: '#fff',
      display: 'block',
      width: '260px',
      height: '45px',
      outline: 'none',
      fontSize: '18px',
      fontWeight: '400',
      borderRadius: '6px',
      cursor: 'pointer',
      flexWrap: 'wrap',
      backgroundColor: '#1f80e0',
      border: '2px solid #1f80e0',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#1f80e0',
        backgroundColor: 'transparent',
      },
    },      

    filtros: {
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '200px',
        marginTop: '100px',
        backgroundColor: '#fff',        
    },
      
    input: {
        height: '100px',
        width: '30px',
        borderRadius: '6px',
        outline: 'none',
        padding: '15px',
        fontFamily: 'Poppins',
        transition: 'all 0.3s ease',
    },

});

function ArqCmpTxt() {
    const classes = useStyles();
    const [vendas, setVendas] = useState([]);

    const params = useParams();  

    const headers = [
        {label:'Matricula', key: 'Matricula'},
        {label:'Mome Servidor', key: 'Nome Servidor'},
        {label:'Valr Total', key: 'Valor Total'},
    ];

    const csvReport = {
        filename:'Arquivo.csv',
        Headers: headers,
        data: vendas
    };
    
    useEffect(() => {
        let dataInicial = params.datVencto;
        let orgId = params.orgao;     
        api.get(`downloadTxt/${dataInicial}/${orgId}`).then(resp => {
            setVendas(resp.data);  
        })
    },[]);

    return (

        <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Matricula</StyledTableCell>
            <StyledTableCell align="left">Servidor</StyledTableCell>
            <StyledTableCell align="left">Total Compras</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendas.map((row) => (
            <StyledTableRow key={row.usrMatricula} >
              <StyledTableCell align="left" component="th" scope="row">{row.usrMAtricula}</StyledTableCell>
              <StyledTableCell align="left">{row.usrNome}</StyledTableCell>
              <StyledTableCell align="left">{row.usrVlrUsado}</StyledTableCell>
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
            <div>
                <CSVLink {...csvReport }>Exporta CSV</CSVLink>
            </div>             
        </div>
    );
}

export default ArqCmpTxt;