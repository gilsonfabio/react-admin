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
 
export default function NewCategory() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [secCodigo, setSecCodigo] = useState('');
  const [secDescricao, setSecDescricao] = useState('');
  const [secOrgAdm, setSecOrgAdm] = useState('');
  
  function handleCreateSecretaria(e) {
    e.preventDefault();
    
    api.post('newsecretaria', {
        secCodigo,
        secDescricao,  
        secOrgAdm, 
    }).then(() => {
        alert('Secretaria cadastrada com sucesso!')
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
            Informe a nova Secretaria
          </Typography> 
        <form onSubmit={handleCreateSecretaria} >
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codigo"
                label="Código da Secretaria"
                name="codigo"
                autoFocus                
                value={secCodigo} 
                onChange={(e) => {setSecCodigo(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="descricao"
                label="Descrição da Secretaria"
                name="descricao"
                autoFocus                
                value={secDescricao} 
                onChange={(e) => {setSecDescricao(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="orgao"
                label="Orgão Administrativo"
                name="orgao"
                autoFocus                
                value={secOrgAdm} 
                onChange={(e) => {setSecOrgAdm(e.target.value)}} 
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