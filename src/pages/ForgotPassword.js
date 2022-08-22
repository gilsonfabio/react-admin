import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../services/api';
import { TextField } from '@material-ui/core';
import MenBarra from '../components/MenBarra/MenBarra';

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
            <MenBarra />
            <main className={classes.main}>
                <div className={classes.paper}> 
                    <Typography variant="h6" noWrap>
                        Informe seu email
                    </Typography>         
                    <form onSubmit={handleEmail} >            
                        <TextField 
                            className={classes.input}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Endereço de Email"
                            name="email"
                            autoFocus                
                            value={email} 
                            onChange={(e) => {setEmail(e.target.value)}} 
                        />
                        <Button variant="contained" color="primary" type="submit" className={classes.submit}>
                            Solicitar
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}