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

function ArqCmpTxt() {
    const classes = useStyles();
    const [vendas, setVendas] = useState([]);

    const params = useParams();  

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    useEffect(() => {
        let dataInicial = params.datVencto;
        let orgId = params.orgao;     
        api.get(`downloadTxt/${dataInicial}/${orgId}`).then(resp => {
            setVendas(resp.data);  
        })
    },[]);

    return (
        <>
            <button className={classes.button} type="button" onClick={() => {}}>
                <PictureAsPdfIcon />
            </button> 
            
        </>
    );
}

export default ArqCmpTxt;