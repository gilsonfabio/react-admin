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

function PdfCmpVenc() {
    const classes = useStyles();
    const [vendas, setVendas] = useState([]);

    const params = useParams();  

    const [datPrint, setDatPrint] = useState();
    //const [datFinal, setDatFinal] = useState();

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    //const datNow = moment().format('DD-MM-YYYY');
    //const horNow = moment().format('hh:mm:ss');  
    
    const reportTitle = [
        {text: `Relatório de Vendas Vencimento data: ${datPrint}`,fontSize: 15,bold: true,margin: [15, 20, 0, 45]},
    ];

    const dados = vendas.map((venda) => {
        return [
            {text: venda.parIdCompra, fontSize: 7, margin: [0, 2, 0, 2]},
            {text: venda.parNroParcela, fontSize: 7, margin: [0, 2, 0, 2]},
            {text: venda.usrMatricula, fontSize: 7, margin: [0, 2, 0, 2]},
            {text: venda.usrNome, fontSize: 7, margin: [0, 2, 0, 2]},
            {text: venda.cnvNomFantasia, fontSize: 7, margin: [0, 2, 0, 2]},
            {text: moment(venda.cmpEmissao).format('DD-MM-YYYY'), fontSize: 7, margin: [0, 2, 0, 2]},
            {text: moment(venda.parVctParcela).format('DD-MM-YYYY'), fontSize: 7, margin: [0, 2, 0, 2]},
            {text: Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(venda.parVlrParcela), fontSize: 7, alignment: 'right', margin: [0, 2, 0, 2]}
        ]              
    });

    const totCompras = vendas.map(item => item.parVlrParcela).reduce((prev, curr) => prev + curr, 0);

    const details = [
        {
            table: {
                headerRows: 1,
                widths: [20, 10, 50, 100, 100, 50, 50, 50],
                body: [
                    [
                        {text: 'ID', style: 'tableHeader', fontSize: 7},
                        {text: 'PARC', style: 'tableHeader', fontSize: 7},
                        {text: 'MATRICULA', style: 'tableHeader', fontSize: 7},
                        {text: 'NOME SERVIDOR(A)', style: 'tableHeader', fontSize: 7},  
                        {text: 'CONVENIO', style: 'tableHeader', fontSize: 7},
                        {text: 'EMISSÃO', style: 'tableHeader', fontSize: 7},
                        {text: 'VENCIMENTO', style: 'tableHeader', fontSize: 7},                                                                      
                        {text: 'VLR. DA COMPRA', style: 'tableHeader', fontSize: 7, alignment: 'right'},
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
        setDatPrint(params.datVencto);
        let dataInicial = params.datVencto;
        let dataFinal = params.datVencto;
        let orgId = params.orgao;
        if (orgId === '') {
           orgId = '999';
        }

        console.log(dataInicial);
        console.log(dataFinal);
        console.log(orgId);


        if (orgId !== '999') {
            console.log('1')
            api.get(`pdfVctOrgao/${dataInicial}/${dataFinal}/${orgId}`).then(resp => {
                setVendas(resp.data);  
            })
        }else {
            console.log('2')
            api.get(`pdfVdaVenc/${dataInicial}/${dataFinal}`).then(resp => {
                setVendas(resp.data);  
            })
        }            

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

export default PdfCmpVenc;