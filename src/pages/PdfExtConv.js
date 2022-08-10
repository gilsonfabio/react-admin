import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
//import moment from 'moment';
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

    const params = useParams();  

    //const [datInicial, setDatInicial] = useState();
    //const [datFinal, setDatFinal] = useState();

    //const soma = 0;

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

    const arrayConvenios = [];

    const dadosCnv = arrayConvenios.map((convenio) => {
        return [
            {text: convenio.idCnv, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: convenio.nomCnv, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(convenio.totCnv), fontSize: 8, alignment: 'right', margin: [0, 2, 0, 2]}
        ]              
    });

    const totCompras = arrayConvenios.map(item => item.totCnv).reduce((prev, curr) => prev + curr, 0);

    const details = [
        {
            table: {
                headerRows: 1,
                widths: [30, 140, 70],
                body: [
                    [
                        {text: 'ID', style: 'tableHeader', fontSize: 8},
                        {text: 'CONVENIO', style: 'tableHeader', fontSize: 8},
                        {text: 'VLR. DA COMPRA', style: 'tableHeader', fontSize: 8, alignment: 'right'},
                    ],
                    ...dadosCnv
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
        let dataInicial = params.datVencto;
        let dataFinal = params.datVencto;

        //console.log(dataInicial);
        //console.log(dataFinal);

        api.get(`pdfVdaVenc/${dataInicial}/${dataFinal}`).then(resp => {
            setVendas(resp.data);  
        })                

    },[]);
 
    function emitePdf() {
        for (let i = 0; i < vendas.length; i++) {
            const convenio = vendas[i].cnvNomFantasia;
            const vlrParcela = vendas[i].parVlrParcela;

            for(let x = 0; x <= arrayConvenios.length; x++) {
                if ( !arrayConvenios[x] ) {
                    arrayConvenios.push(
                        {idCnv: x, nomCnv: convenio, totCnv: vlrParcela }
                    );
                    console.log('Novo: ', x, arrayConvenios[x]);      
                    x = 50;
                }else {
                    if(convenio === arrayConvenios[x].nomCnv) {
                        arrayConvenios[x].totCnv += vlrParcela;
                        console.log('Somando: ', x, arrayConvenios[x]);   
                        x = 50;
                    }
                }                         
            }    
        }

        console.log(arrayConvenios);      
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