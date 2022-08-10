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
 
export default function AltAtividade() {
  const classes = useStyles();
  //const theme = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();

  const [atvDescricao, setAtvDescricao] = useState('');
  const [atvTaxAdm, setAtvTaxAdm] = useState('');

  function handleCreateAtividade(e) {
    e.preventDefault();
    
    let idAtv = params.atvId;
    api.put(`altatividade/${idAtv}`, {
        atvDescricao,
        atvTaxAdm,   
      }).then(() => {
        alert('Atividade alterada com sucesso!')
      }).catch(() => {
        alert('Erro na alteração!');
    })   
    navigate(-1); 
  }
   
  useEffect(() => {
    let idAtv = params.atvId;    
    api.get(`searchAtiv/${idAtv}`).then(response => {
        setAtvDescricao(response.data[0].atvDescricao);
        setAtvTaxAdm(response.data[0].atvTaxAdm);
    })
    
  },[]);
     
  return (  
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados da Atividade 
        </Typography>         
        <form onSubmit={handleCreateAtividade} >
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="descricao"
                label="Descrição da Atividade"
                name="descricao"
                autoFocus                
                value={atvDescricao} 
                onChange={(e) => {setAtvDescricao(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="taxa"
                label="Taxa Administrativa"
                name="taxa"
                autoFocus                
                value={atvTaxAdm} 
                onChange={(e) => {setAtvTaxAdm(e.target.value)}} 
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