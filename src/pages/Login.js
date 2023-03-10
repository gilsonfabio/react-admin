import React, {useState} from 'react';
import { Button, createStyles, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: '#4682B4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      minHeight: '100vh',
      gap: theme.spacing(5),
      padding: theme.spacing(2),
    },
    sloganTitle: {
      marginBottom: theme.spacing(2),
    },
    versao: {
      fontSize: 10,
      color: '#ccc',
    },
    form: {
      padding: theme.spacing(4),
      maxWidth: '500px',
    },
    submit: {
      marginTop: theme.spacing(2),
    },
    divider: {
      margin: theme.spacing(4, 0),
    },
  })
);

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSignIn(e){
    e.preventDefault();
    try {
        const response = await api.get(`loginAdm/${email}/${password}`)
        localStorage.setItem('usuarioId', response.data.admId);
        localStorage.setItem('usuarioNome', response.data.admNome);
        navigate('/layout');
    } catch (err) {
        alert('Falha no login! Tente novamente.');
    }    
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.sloganTitle} variant="h3" component="h1">
          Card Admin 
        </Typography>
        <Typography variant="h4" component="h2">
          O seu administrador de cartões
        </Typography>
        <Typography className={classes.versao}>
          versão: 1.33 - 10/03/2023
        </Typography>
      </div>
      <Paper className={classes.form} elevation={3}>
        <form noValidate onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            placeholder="Seu e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            placeholder="Sua senha"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}} 
          />
          <Button
            className={classes.submit}
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
        </form>

        <Divider className={classes.divider} variant="fullWidth" />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Link to={`/forgotpassword`}>
              <Button variant="text" fullWidth={true}>
                Esqueceu a senha?
              </Button>
            </Link>
          </Grid>          
        </Grid>
      </Paper>
    </div>
  );
}