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
 
export default function AltPassword() {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();
  const [codSeguranca, setCodSeguranca] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [nomUsuario, setNomUsuario] = useState('');
  const [codUsuario, setCodUsuario] = useState('');

  function handleUpdPassword(e) {
    e.preventDefault();
    
    let emailUsuario = params.emailUsuario;
    api.put(`updPassAdmin/${emailUsuario}`, {
        newPassword,
        codSeguranca,   
      }).then(() => {
        alert('Senha alterada com sucesso!')
      }).catch(() => {
        alert('Erro no cadastro!');
    })   
    navigate(-1); 
  }
   
  //
  //useEffect(() => {
  //  let idUsr = params.codUsuario; 
  //  console.log('Usuário:', idUsr);   
  //  api.get(`searchUser/${idUsr}`).then(response => {
  //      setCodUsuario(response.data[0].usrId);
  //      setNomUsuario(response.data[0].usrNome);
  //  })    
  //},[]);
  //

  return (  
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados do Usuário {nomUsuario}
        </Typography>         
        <form onSubmit={handleUpdPassword} > 
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codSegurança"
                label="Informe Código Segurança"
                name="codSegurança"
                autoFocus                
                value={codSeguranca} 
                onChange={(e) => {setCodSeguranca(e.target.value)}} 
            />           
            <TextField 
                className={classes.input}
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="Informe nova senha"
                name="newPassword"
                autoFocus                
                value={newPassword} 
                onChange={(e) => {setNewPassword(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cnfPassword"
                label="Confirme a nova senha"
                name="cnfPassword"
                autoFocus                
                value={cnfPassword} 
                onChange={(e) => {setCnfPassword(e.target.value)}} 
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