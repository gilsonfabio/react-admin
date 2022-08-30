import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';

import api from '../services/api';

import MenBarra from "../components/MenBarra/MenBarra";

const useStyles = makeStyles({
    buttonArea: {
        width: '100vw',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imprimir: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '200px',
    },

    button: {
      marginTop: '300px',
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

function DelServidor() {
    const params = useParams(); 
    const classes = useStyles();
        
    function deletaUsr() {
        let idSrv = params.usrId;
        api.put(`deletaUsr/${idSrv}`, {

        }).then(() => {
            alert('Servidor Excluido com sucesso!')
        }).catch(() => {
            alert('Erro na exclusão!');
        })   
        navigate(-1);            
        
    };

    return (
        <div>
            <MenBarra />
            <div className={classes.imprimir}>
                <button className={classes.button} type="button" onClick={() => deletaUsr()}>
                    <DeleteIcon />Confirma Exclusão Servidor
                </button>
            </div>             
        </div>
    );
}

export default DelServidor;