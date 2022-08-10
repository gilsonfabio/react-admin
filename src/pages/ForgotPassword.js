import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function ForgotPassword() {
  const classes = useStyles();  
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function handleEmail(e){
    e.preventDefault();
    try {
      await api.get(`envEmail/${email}`)
      navigate(-1); 
    } catch (err) {
      alert('Falha no login! Tente novamente.', email);
    }    
  }
       
  return (
    <div>
    <main>
      <form onSubmit={handleEmail}>
        <h1>Informe seu email</h1>
        <div>
          <TextField 
            type="text" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}}          
          />
        </div>
        <div>
            <Button variant="contained" color="primary" type="submit" className={classes.submit}>
                Solicitar
            </Button>
        </div>
      </form>
    </main>
    </div>
  );
}

