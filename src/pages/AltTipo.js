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
 
export default function AltTipo() {
  const classes = useStyles();
  //const theme = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();

  const [tipDescricao, setTipDescricao] = useState('');
  const [tipParcelas, setTipParcelas] = useState('');

  function handleCreateTipo(e) {
    e.preventDefault();
    
    let tipId = params.idTip;
    api.put(`alttipo/${tipId}`, {
        tipDescricao,
        tipParcelas,   
      }).then(() => {
        alert('tipo alterado com sucesso!')
      }).catch(() => {
        alert('Erro no cadastro!');
    })   
    navigate(-1); 
  }
   
  useEffect(() => {
    let idTip = params.tipId;    
    api.get(`searchSec/${idTip}`).then(response => {
        //setTipos(response.data);
        setTipDescricao(response.data[0].tipDescricao);
        setTipParcelas(response.data[0].tipParcelas);
    })
    
  },[]);
     
  return (  
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados do Tipo de Contrato 
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
               Salvar Alteração
           </Button>
        </form>
        </div>
      </main>
    </div>
  );
}