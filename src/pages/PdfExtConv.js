import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';

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

function PdfExtConv() {
    const classes = useStyles();
    const [vendas, setVendas] = useState([]);

    const [datPrint, setDatPrint] = useState('');

    const params = useParams();  

    //const [datInicial, setDatInicial] = useState();
    //const [datFinal, setDatFinal] = useState();

    //const soma = 0;

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    //const datNow = moment().format('DD-MM-YYYY');
    //const horNow = moment().format('hh:mm:ss');  
    
    const reportTitle = [
        {
            text: `Relatório Extrato Administrativo - Vencimento: ${datPrint}`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45],
        }       
    ];

    //const arrayConvenios = [];

    const dados = vendas.map((venda) => {
        return [
            {text: venda.tcnvId, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: venda.cnvCpfCnpj, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: venda.cnvNomFantasia, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(venda.tcnvVlrTotal), fontSize: 8, alignment: 'right', margin: [0, 2, 0, 2]},
            {text: Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(venda.tcnvVlrTaxa), fontSize: 8, alignment: 'right', margin: [0, 2, 0, 2]},
            {text: Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(venda.tcnvVlrLiquido), fontSize: 8, alignment: 'right', margin: [0, 2, 0, 2]},
            {text: Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(venda.tcnvVlrSistema), fontSize: 8, alignment: 'right', margin: [0, 2, 0, 2]}
        ]              
    });

    const totCompras = vendas.map(item => item.tcnvVlrTotal).reduce((prev, curr) => prev + curr, 0);
    const totTaxa = vendas.map(item => item.tcnvVlrTaxa).reduce((prev, curr) => prev + curr, 0);
    const totLiquido = vendas.map(item => item.tcnvVlrLiquido).reduce((prev, curr) => prev + curr, 0);
    const totSistema = vendas.map(item => item.tcnvVlrSistema).reduce((prev, curr) => prev + curr, 0);

    const details = [
        {
            table: {
                headerRows: 1,
                widths: [15, 70, 120, 60,60,60,60],
                body: [
                    [
                        {text: 'ID', style: 'tableHeader', fontSize: 8},
                        {text: 'CNPJ', style: 'tableHeader', fontSize: 8},
                        {text: 'CONVENIO', style: 'tableHeader', fontSize: 8},
                        {text: 'TOT. DA COMPRA', style: 'tableHeader', fontSize: 8, alignment: 'right'},
                        {text: 'TOT. DA TAXA', style: 'tableHeader', fontSize: 8, alignment: 'right'},
                        {text: 'TOT. LIQUIDO', style: 'tableHeader', fontSize: 8, alignment: 'right'},
                        {text: 'TOT. SISTEMA', style: 'tableHeader', fontSize: 8, alignment: 'right'},
                    ],
                    ...dados
                ]
            },
            layout: 'headerLineOnly'
        },
    ];

    function Rodape(currentPage, pageCount){      
        return [  
            {
                columns: [
                    {text: 'Tot.Vendas:' + Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totCompras), alignment: 'left', fontSize: 8, margin: [10,0,0,0]},
                    {text: 'Tot.Taxa:' + Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totTaxa), alignment: 'left', fontSize: 8, margin: [10,0,0,0]},
                    {text: 'T.Liquido:' + Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totLiquido), alignment: 'left', fontSize: 8, margin: [10,0,0,0]},
                    {text: 'T.Sistema:' + Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totSistema), alignment: 'left', fontSize: 8, margin: [10,0,0,0]},
                    {text: 'Página: ' + currentPage + ' / ' + pageCount, alignment: 'right', fontSize: 8, margin: [0,0,20,0] }
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
        setDatPrint(moment(params.datVencto).utc().locale('pt-br').format('L'));
        let dataInicial = params.datVencto;        
        console.log(dataInicial);
        //console.log(dataFinal);

        api.get(`pdfExtAdm/${dataInicial}`).then(resp => {
            setVendas(resp.data);  
        })                

    },[]);
 
    function emitePdf() {
        pdfMake.createPdf(docDefinition).open(); 
    };

    return (
        <>
            <button className={classes.button} type="button" onClick={() => emitePdf()}>
                <DeleteIcon />
            </button> 
            
        </>
    );
}

export default PdfExtConv;