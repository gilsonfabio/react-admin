import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import { TextField } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
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
 
export default function NewFiliacao() {
  const classes = useStyles();

  const params = useParams();  
  const navigate = useNavigate();
  const idUsr = params.usrId;

  const [filUsrId, setFilUsrId] = useState(idUsr);
  const [filId, setFilId] = useState(0);
  const [filNome, setFilNome] = useState('');
  const [filNascimento, setFilNascimento] = useState('');
  
  function handleCreateFiliacao(e) {
    e.preventDefault();
    
    api.post('newfiliacao', {
        filUsrId,
        filId,
        filNome,
        filNascimento   
    }).then(() => {
        alert('Filiação cadastrada com sucesso!')
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
            Informe a nova Filiação: {idUsr}
          </Typography> 
        <form onSubmit={handleCreateFiliacao} >
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codigo"
                label="Código da Filiação"
                name="codigo"
                autoFocus                
                value={filId} 
                onChange={(e) => {setFilId(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome da Filiação"
                name="nome"
                autoFocus                
                value={filNome} 
                onChange={(e) => {setFilNome(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                type="date"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nascimento"
                label="Nascimento da Filiação"
                name="nascimento"
                autoFocus                
                value={filNascimento} 
                onChange={(e) => {setFilNascimento(e.target.value)}} 
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