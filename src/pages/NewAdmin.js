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
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));
 
export default function NewAdmin() {
  const classes = useStyles();

  const [admNome, setAdmNome] = useState('');
  const [admEmail,  setAdmEmail] = useState('');
  const [admSenha,  setAdmSenha] = useState('');
  const [admNivAcesso, setAdmNivAcesso] = useState(0);
  
  const navigate = useNavigate();
  
  function handleCreateAdmin(e) {
    e.preventDefault();
    
    api.post('newadmin', {
        admNome, 
        admEmail,  
        admSenha,  
        admNivAcesso      
    }).then(() => {
        alert('administrador(a) cadastrado com sucesso!')
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
            Informe dados do Filme
          </Typography> 
        <form onSubmit={handleCreateAdmin} >
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
                value={admNome} 
                onChange={(e) => {setAdmNome(e.target.value)}} 
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
                value={admEmail} 
                onChange={(e) => {setAdmEmail(e.target.value)}} 
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
                value={admSenha} 
                onChange={(e) => {setAdmSenha(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nivAcesso"
                label="Nivel de Acesso"
                name="nivAcesso"
                autoFocus                
                value={admNivAcesso} 
                onChange={(e) => {setAdmNivAcesso(e.target.value)}} 
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