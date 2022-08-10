import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import { TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));
 
export default function NewUser() {
  const classes = useStyles();

  const [usrNome, setUsrNome] = useState('');
  const [usrEmail,  setUsrEmail] = useState('');
  const [usrSenha,  setUsrSenha] = useState('');
  const [usrCelular,  setUsrCelular] = useState('');
  const [usrCpf,  setUsrCpf] = useState('');
  const [usrMatricula,  setUsrMatricula] = useState('');
  const [usrSecretaria,  setUsrSecretaria] = useState('');
  const [usrNascimento,  setUsrNascimento] = useState('');
  const [usrStatus,  setUsrStatus] = useState('A');
  
  const navigate = useNavigate();
  
  function handleCreateUser(e) {
    e.preventDefault();
    
    api.post('newuser', {
        usrNome, 
        usrEmail,  
        usrSenha,  
        usrCelular,
        usrCpf,
        usrMatricula,
        usrSecretaria,
        usrNascimento,
        usrStatus     
    }).then(() => {
        alert('usuário cadastrado com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })    
    navigate(-1);
  }

  return (
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Informe dados do Servidor(a)
          </Typography> 
        <form onSubmit={handleCreateUser} >
        <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome do Usuário"
                name="nome"
                autoFocus                
                value={usrNome} 
                onChange={(e) => {setUsrNome(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email do Usuário"
                name="email"
                autoFocus                
                value={usrEmail} 
                onChange={(e) => {setUsrEmail(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="senha"
                label="Senha do Usuário"
                name="senha"
                autoFocus                
                value={usrSenha} 
                onChange={(e) => {setUsrSenha(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="celular"
                label="Celular"
                name="celular"
                autoFocus                
                value={usrCelular} 
                onChange={(e) => {setUsrCelular(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoFocus                
                value={usrCpf} 
                onChange={(e) => {setUsrCpf(e.target.value)}} 
            />  
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="matricula"
                label="Matricula"
                name="matricula"
                autoFocus                
                value={usrMatricula} 
                onChange={(e) => {setUsrMatricula(e.target.value)}} 
            /> 
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="secretaria"
                label="Secretaria"
                name="secretaria"
                autoFocus                
                value={usrSecretaria} 
                onChange={(e) => {setUsrSecretaria(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nascimento"
                label="Nascimento"
                name="nascimento"
                autoFocus                
                value={usrNascimento} 
                onChange={(e) => {setUsrNascimento(e.target.value)}} 
            /> 
            <Button variant="contained" color="primary" type="submit" className={classes.submit}>
              Salvar cadastro
            </Button>
        </form>
        </div>
      </main>
    </div>
  );
}