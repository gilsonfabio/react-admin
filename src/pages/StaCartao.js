import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenBarra from '../components/MenBarra/MenBarra';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../services/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 600,
    marginTop: 80,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dados: {
    display: 'flex',
    flexDirection: 'row',
    width: 1000,
  },

  left: {
    width: 450,
    height: 500,
    padding: 10,
  },
  right: {
    width: 450,
    height: 500,
    padding: 10,
  },
  select: {
    marginTop: 16,
    marginBottom: 8,
    width: 430,
  },
  
}));

export default function AltServidores() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [usrNome, setUsrNome] = useState('');  
  const [usrObsBloqueio, setUsrObsBloqueio] = useState('');
  const [usrCartao, setUsrCartao] = useState('');
  const [usrStatus, setUsrStatus] = useState('');

  const status = [
      {'staId':'A', 'staDescricao':'LIBERADO' },
      {'staId':'B', 'staDescricao':'BLOQUEADO'},
  ];  
   
  const navigate = useNavigate();
  const params = useParams();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const idUsr = params.usrId; 
   
  useEffect(() => { 
    //let idUsr = params.usrId;    
    api.get(`searchUser/${idUsr}`).then(response => {
        setUsrNome(response.data[0].usrNome);
        setUsrObsBloqueio(response.data[0].usrObsBloqueio);
        setUsrCartao(response.data[0].usrCartao);
        setUsrStatus(response.data[0].usrStatus);
    })
  },[]);
  
  function handleUpdStatus(e) {
    e.preventDefault();
       
    let idSrv = params.usrId;
    api.put(`altstatus/${idSrv}`, {
      usrNome,
      usrObsBloqueio,
      usrCartao,
      usrStatus,      
    }).then(() => {
        alert('Status Cartão alterado com sucesso!')
    }).catch(() => {
        alert('Erro na alteração!');
    })   
    navigate(-1); 
  }

  return (
    <>
    <div>
      <MenBarra />
    </div>  
    <div className={classes.root}>        
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Dados" {...a11yProps(0)} />
        <Tab label="        " {...a11yProps(1)} />
        <Tab label="        " {...a11yProps(2)} />
        <Tab label="        " {...a11yProps(3)} />
        <Tab label="        " {...a11yProps(4)} />
        <Tab label="        " {...a11yProps(5)} />
        <Tab label="        " {...a11yProps(6)} />
      </Tabs>
      <form onSubmit={handleUpdStatus} > 
      <TabPanel value={value} index={0}>
        <div className={classes.dados}>
          <div className={classes.left}>
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome do Usuário"
              name="nome"
              autoFocus                
              value={usrNome} 
              onChange={(e) => {setUsrNome(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cartao"
              label="Cartão do Usuário"
              name="cartao"
              autoFocus                
              value={usrCartao} 
              onChange={(e) => {setUsrCartao(e.target.value)}} 
            />        
          </div>
          <div className={classes.right}>
            <Select 
                className={classes.select}
                variant="outlined"
                label="status"
                labelId="Status Atual" 
                id="status" 
                value={usrStatus} 
                onChange={(e) => {setUsrStatus(e.target.value)}}                 
            >
              {status.map((row) => (
                <MenuItem key={row.staId} value={row.staId}>{row.staDescricao}</MenuItem>
              ))}
            </Select>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="observacao"
                label="Observação do Status"
                name="observacao"
                autoFocus                
                value={usrObsBloqueio} 
                onChange={(e) => {setUsrObsBloqueio(e.target.value)}} 
            />            
          </div>
        </div>  
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
      <TabPanel value={value} index={4}></TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
      <TabPanel value={value} index={6}></TabPanel>
        <div>
        <Button variant="contained" color="primary" type="submit" className={classes.submit}>
          Salvar Status
        </Button>
        </div>  
      </form>
    </div>    
    </>
  );
}