import React, {useState, useEffect} from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import api from '../services/api';
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
    select: {
      width: 300,
    },
}));
 
export default function AltAdmin() {
  const classes = useStyles();
  const navigate = useNavigate();

  const params = useParams();

  const [admNome, setAdmNome] = useState('');
  const [admEmail,  setAdmEmail] = useState('');
  const [admSenha,  setAdmSenha] = useState('');
  const [admNivAcesso, setAdmNivAcesso] = useState('');
  
  function handleCreateAdmin(e) {
    e.preventDefault();
    let idAdm = params.admId;
    
    api.put(`altadmin/${idAdm}`, {
        admNome, 
        admEmail,  
        admSenha,  
        admNivAcesso  
    }).then(() => {
        alert('Administrador(a) alterado com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })    
    navigate(-1);
  }

  useEffect(() => {
    let idAdm = params.admId;

    api.get(`searchAdmin/${idAdm}`).then(response => {
        setAdmNome(response.data[0].admNome);
        setAdmEmail(response.data[0].admEmail);
        setAdmSenha(response.data[0].admSenha);
        setAdmNivAcesso(response.data[0].admNivAcesso);
    })
  },[]);

  return (
    <div>
      <MenBarra />        
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados do Administrador
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
                type="email"
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
                type="password"
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
                type="number"
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
               Salvar Alteração
           </Button>
        </form>
        </div>
      </main>
    </div>
  );
}