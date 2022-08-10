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
 
export default function AltOrgAdmin() {
  const classes = useStyles();
  //const theme = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();
  const [orgDescricao, setOrgDescricao] = useState('');

  function handleCreateOrgAdmin(e) {
    e.preventDefault();
    
    let idOrg = params.orgId;
    api.put(`altorgao/${idOrg}`, {
        orgDescricao,   
      }).then(() => {
        alert('Orgão Administrativo alterado com sucesso!')
      }).catch(() => {
        alert('Erro no cadastro!');
    })   
    navigate(-1); 
  }
   
  useEffect(() => {
    let idOrg = params.catId;    
    api.get(`searchOrg/${idOrg}`).then(response => {
        setOrgDescricao(response.data[0].orgDescricao);
    })
    
  },[]);
     
  return (  
    <div>
      <MenBarra />
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados do Orgão Administrativo 
        </Typography>         
        <form onSubmit={handleCreateOrgAdmin} >            
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="descricao"
                label="Descrição do Orgão"
                name="descricao"
                autoFocus                
                value={orgDescricao} 
                onChange={(e) => {setOrgDescricao(e.target.value)}} 
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