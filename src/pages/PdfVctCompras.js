import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import api from '../services/api';

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

function PdfVctCompras() {
    const classes = useStyles();
    const [vendas, setVendas] = useState([]);

    const params = useParams();  

    //const [datInicial, setDatInicial] = useState();
    //const [datFinal, setDatFinal] = useState();

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    //const datNow = moment().format('DD-MM-YYYY');
    //const horNow = moment().format('hh:mm:ss');  
    
    const reportTitle = [
        {
            text: `Relatório de Vendas Vencimento`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45],
        }       
    ];

    const dados = vendas.map((venda) => {
        return [
            {text: venda.parIdCompra, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: venda.parNroParcela, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: venda.usrMatricula, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: venda.usrNome, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: venda.cnvNomFantasia, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: moment(venda.cmpEmissao + 1).format('DD-MM-YYYY'), fontSize: 8, margin: [0, 2, 0, 2]},
            {text: moment(venda.parVctParcela + 1).format('DD-MM-YYYY'), fontSize: 8, margin: [0, 2, 0, 2]},
            {text: Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(venda.parVlrParcela), fontSize: 8, alignment: 'right', margin: [0, 2, 0, 2]}
        ]              
    });

    const totCompras = vendas.map(item => item.parVlrParcela).reduce((prev, curr) => prev + curr, 0);

    const details = [
        {
            table: {
                headerRows: 1,
                widths: [30, 30, 70, 140, 100, 50, 60, 70],
                body: [
                    [
                        {text: 'ID', style: 'tableHeader', fontSize: 8},
                        {text: 'PARC', style: 'tableHeader', fontSize: 8},
                        {text: 'MATRICULA', style: 'tableHeader', fontSize: 8},
                        {text: 'NOME SERVIDOR(A)', style: 'tableHeader', fontSize: 8},  
                        {text: 'CONVENIO', style: 'tableHeader', fontSize: 8},
                        {text: 'EMISSÃO', style: 'tableHeader', fontSize: 8},
                        {text: 'VENCIMENTO', style: 'tableHeader', fontSize: 8},                                                                      
                        {text: 'VLR. DA COMPRA', style: 'tableHeader', fontSize: 8, alignment: 'right'},
                    ],
                    ...dados,
                ]
            },            
            layout: 'headerLineOnly'
        },
    ];

    function Rodape(currentPage, pageCount){      
        return [  
            {
                columns: [
                    {text: 'Total de Vendas..............' + Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totCompras), alignment: 'left', fontSize: 10, margin: [10,0,0,0]},
                    {text: 'Página: ' + currentPage + ' / ' + pageCount, alignment: 'right', fontSize: 10, margin: [0,0,20,0] }
                ],                
            },                    
        ]
    };

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: Rodape,

    };
   
    useEffect(() => {
        let dataInicio = params.datInicio;
        let dataFinal = params.datFinal;
        let cnpjCnv = params.convenio;
        let cpfSrv = params.servidor;
        
        console.log('data incial:', dataInicio);
        console.log('data incial:', dataFinal);
        console.log('convenio:', cnpjCnv);
        console.log('servidor:', cpfSrv);

        api.get(`pdfVctCompras/${dataInicio}/${dataFinal}/${cnpjCnv}/${cpfSrv}`).then(resp => {
           setVendas(resp.data);  
        })
    },[]);

    function emitePdf() {
             
        pdfMake.createPdf(docDefinition).open();
    };

    return (
        <>
            <button className={classes.button} type="button" onClick={() => emitePdf()}>
                <PictureAsPdfIcon />
            </button> 
            
        </>
    );
}

export default PdfVctCompras;