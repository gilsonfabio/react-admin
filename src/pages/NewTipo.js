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
 
export default function NewTipo() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [tipDescricao, setTipDescricao] = useState('');
  const [tipParcelas, setTipParcelas] = useState('');
  
  function handleCreateTipo(e) {
    e.preventDefault();
    
    api.post('newtipo', {
        tipDescricao,  
        tipParcelas, 
    }).then(() => {
        alert('Tipo cadastrado com sucesso!')
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
            Informe a novo Tipo Contrato
          </Typography> 
        <form onSubmit={handleCreateTipo} >
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="descricao"
                label="Descrição do Tipo"
                name="descricao"
                autoFocus                
                value={tipDescricao} 
                onChange={(e) => {setTipDescricao(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="parcelas"
                label="Qtde Parcelas"
                name="parcelas"
                autoFocus                
                value={tipParcelas} 
                onChange={(e) => {setTipParcelas(e.target.value)}} 
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