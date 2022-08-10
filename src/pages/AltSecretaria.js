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
 
export default function AltSecretaria() {
  const classes = useStyles();
  //const theme = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();

  const [secCodigo, setSecCodigo] = useState('');
  const [secDescricao, setSecDescricao] = useState('');
  const [secOrgAdm, setSecOrgAdm] = useState('');

  function handleCreateSecretaria(e) {
    e.preventDefault();
    
    let idSec = params.secId;
    api.put(`altsecretaria/${idSec}`, {
        secCodigo,
        secDescricao,
        secOrgAdm,   
      }).then(() => {
        alert('secretaria alterada com sucesso!')
      }).catch(() => {
        alert('Erro no cadastro!');
    })   
    navigate(-1); 
  }
   
  useEffect(() => {
    let idSec = params.secId;    
    api.get(`searchSec/${idSec}`).then(response => {
        //setCategorias(response.data);
        setSecCodigo(response.data[0].secCodigo);
        setSecDescricao(response.data[0].secDescricao);
        setSecOrgAdm(response.data[0].secOrgAdm);
    })
    
  },[]);
     
  return (  
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados da Secretaria 
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
               Salvar Alteração
           </Button>
        </form>
        </div>
      </main>
    </div>
  );
}