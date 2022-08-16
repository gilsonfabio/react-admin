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
 
export default function NewBairro() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [baiDescricao, setBaiDescricao] = useState('');
  
  function handleCreateBairro(e) {
    e.preventDefault();
    
    api.post('newbairro', {
        baiDescricao,   
    }).then(() => {
        alert('Bairro cadastrado com sucesso!')
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
            Informe o novo Bairro
          </Typography> 
        <form onSubmit={handleCreateBairro} >            
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="descricao"
                label="Descrição do Bairro"
                name="descricao"
                autoFocus                
                value={baiDescricao} 
                onChange={(e) => {setBaiDescricao(e.target.value)}} 
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