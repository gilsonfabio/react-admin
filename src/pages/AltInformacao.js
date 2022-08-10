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
 
export default function AltInformacao() {
  const classes = useStyles();
  //const theme = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();
  const [infDescricao, setInfDescricao] = useState('');
  
  function handleCreateInformacao(e) {
    e.preventDefault();
    
    let idUsr = params.infUsrId;
    let idInf = params.infId;
    api.put(`altinformacao/${idUsr}/${idInf}`, {
        infDescricao,
      }).then(() => {
        alert('informacao alterada com sucesso!')
      }).catch(() => {
        alert('Erro na atualização!');
    })   
    navigate(-1); 
  }
   
  useEffect(() => {
    let idUsr = params.infUsrId;    
    let idInf = params.infId;
    api.get(`searchInf/${idUsr}/${idInf}`).then(response => {
        setInfDescricao(response.data[0].infDescricao);
    })
    
  },[]);
     
  return (  
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados da Informação 
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
               Salvar Alteração
           </Button>
        </form>
        </div>
      </main>
    </div>
  );
}