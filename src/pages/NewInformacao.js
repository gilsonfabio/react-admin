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
 
export default function NewInformacao() {
  const classes = useStyles();

  const params = useParams();  
  const navigate = useNavigate();
  const idUsr = params.usrId;

  const [infUsrId, setInfUsrId] = useState(idUsr);
  const [infDescricao, setInfDescricao] = useState('');
  
  function handleCreateInformacao(e) {
    e.preventDefault();
    
    api.post('newinformacao', {
        infUsrId,
        infDescricao   
    }).then(() => {
        alert('Informação cadastrada com sucesso!')
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
            Informe a nova Informação: {idUsr}
          </Typography> 
        <form onSubmit={handleCreateInformacao} >
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="informacao"
                label="Descrição da Informação"
                name="informacao"
                autoFocus                
                value={infDescricao} 
                onChange={(e) => {setInfDescricao(e.target.value)}} 
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