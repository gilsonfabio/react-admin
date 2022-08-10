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
 
export default function AltFiliacao() {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();
  
  //let idUsr = params.filServ;
  //let idFil = params.filId;
  const [filNome, setFilNome] = useState('');
  const [filNascimento, setFilNascimento] = useState('');

  function handleCreateFiliacao(e) {
    e.preventDefault();
    let idUsr = params.filUsrId;
    let idFil = params.filId;
    api.put(`altfiliacao/${idUsr}/${idFil}`, {
        filNome,
        filNascimento   
      }).then(() => {
        alert('Filiação alterada com sucesso!')
      }).catch(() => {
        alert('Erro no cadastro!');
    })   
    navigate(-1); 
  }
   
  useEffect(() => {
    let idUsr = params.filUsrId;
    let idFil = params.filId;

    console.log(idUsr);
    console.log(idFil);

    api.get(`searchFiliacao/${idUsr}/${idFil}`).then(response => {
        setFilNome(response.data[0].filNome);
        setFilNascimento(response.data[0].filNascimento);
    })
    
  },[]);
     
  return (  
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados da Filiação 
        </Typography>         
        <form onSubmit={handleCreateFiliacao} >
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
               Salvar Alteração
           </Button>
        </form>
        </div>
      </main>
    </div>
  );
}