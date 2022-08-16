import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenBarra from '../components/MenBarra/MenBarra';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';
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
 
export default function AltConvenio() {
  const classes = useStyles();
  //const theme = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();
  const [value, setValue] = React.useState(0);

  const [cnvNomFantasia, setNomFantasia] = useState('');
  const [cnvRazSocial, setRazSocial] = useState('');
  const [cnvTelefone, setTelefone] = useState('');
  const [cnvEmail, setEmail] = useState('');
  const [cnvCpfCnpj, setCpfCnpj] = useState('');
  const [cnvContato, setContato] = useState('');
  const [cnvAtividade, setAtividade] = useState('');
  const [cnvPassword, setPassword] = useState('');
  const [cnvCanPassword, setCanPassword] = useState('');
  const [cnvEndereco, setEndereco] = useState('');
  const [cnvBairro, setBairro] = useState('');
  const [cnvCidade, setCidade] = useState('');
  const [cnvEstado, setEstado] = useState('');
  const [cnvCep, setCep] = useState('');
  
  //const [convenios, setConvenios] = useState([]);
  const [atividades, setAtividades] = useState([]);

  function handleCreateConvenio(e) {
    e.preventDefault();
    
    let idCnv = params.cnvId;
    api.put(`altconvenio/${idCnv}`, {
      cnvRazSocial, 
      cnvNomFantasia,
      cnvCpfCnpj,            
      cnvEmail,
      cnvTelefone,
      cnvContato,
      cnvAtividade,
      cnvPassword,
      cnvCanPassword,
      cnvEndereco,
      cnvBairro,
      cnvCidade,
      cnvEstado,
      cnvCep      
      }).then(() => {
        alert('Convênio alterado com sucesso!')
      }).catch(() => {
        alert('Erro na alteração!');
    })   
    navigate(-1); 
  }
   
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let idCnv = params.cnvId;    
    api.get(`searchConv/${idCnv}`).then(response => {
        setNomFantasia(response.data[0].cnvNomFantasia);
        setRazSocial(response.data[0].cnvRazSocial);
        setTelefone(response.data[0].cnvTelefone);
        setEmail(response.data[0].cnvEmail);
        setCpfCnpj(response.data[0].cnvCpfCnpj);
        setContato(response.data[0].cnvContato);
        setAtividade(response.data[0].cnvAtividade);
        setEndereco(response.data[0].cnvEndereco);
        setBairro(response.data[0].cnvBairro);
        setCidade(response.data[0].cnvCidade);
        setEstado(response.data[0].cnvEstado);
        setCep(response.data[0].cnvCep);

        api.get(`atividades`).then(resp => {
            setAtividades(resp.data);
            
        })

    })    
  },[]);
     
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
        <Tab label="Básicos" {...a11yProps(0)} />
        <Tab label="Endereço" {...a11yProps(1)} />
        <Tab label="Segurança" {...a11yProps(2)} />
        <Tab label="        " {...a11yProps(3)} />
        <Tab label="        " {...a11yProps(4)} />
        <Tab label="        " {...a11yProps(5)} />
        <Tab label="        " {...a11yProps(6)} />
      </Tabs>
      <form onSubmit={handleCreateConvenio} > 
      <TabPanel value={value} index={0}>
        <div className={classes.dados}>
          <div className={classes.left}>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nomFantasia"
                label="Nome Fantasia"
                name="nomFantasia"
                autoFocus                
                value={cnvNomFantasia} 
                onChange={(e) => {setNomFantasia(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                autoFocus                
                value={cnvTelefone} 
                onChange={(e) => {setTelefone(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cnpjcpf"
                label="Cnpj/Cpf"
                name="cnpjcpf"
                autoFocus                
                value={cnvCpfCnpj} 
                onChange={(e) => {setCpfCnpj(e.target.value)}} 
            />
            <Select 
                className={classes.select}
                variant="outlined"
                label="Atividade"
                labelId="Atividade" 
                id="atividade" 
                value={cnvAtividade} 
                onChange={(e) => {setAtividade(e.target.value)}}                 
            >
              {atividades.map((row) => (
                <MenuItem key={row.atvId} value={row.atvId}>{row.atvDescricao}</MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.right}>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="razSocial"
                label="Razão Social"
                name="razSocial"
                autoFocus                
                value={cnvRazSocial} 
                onChange={(e) => {setRazSocial(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus                
                value={cnvEmail} 
                onChange={(e) => {setEmail(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="contato"
                label="Contato"
                name="contato"
                autoFocus                
                value={cnvContato} 
                onChange={(e) => {setContato(e.target.value)}} 
            />         
          </div>
        </div>  
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.dados}>
          <div className={classes.left}>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="endereco"
                label="Endereço Convênio"
                name="endereco"
                autoFocus                
                value={cnvEndereco} 
                onChange={(e) => {setEndereco(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cidade"
                label="Cidade do convenio"
                name="cidade"
                autoFocus                
                value={cnvCidade} 
                onChange={(e) => {setCidade(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Cep"
                label="Cep do convenio"
                name="Cep"
                autoFocus                
                value={cnvCep} 
                onChange={(e) => {setCep(e.target.value)}} 
            />    
          </div>
          <div className={classes.right}>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="bairro"
                label="Bairro do convenio"
                name="bairro"
                autoFocus                
                value={cnvBairro} 
                onChange={(e) => {setBairro(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="estado"
                label="Estado do convenio"
                name="estado"
                autoFocus                
                value={cnvEstado} 
                onChange={(e) => {setEstado(e.target.value)}} 
            />
          </div>
        </div>  
      </TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
      <TabPanel value={value} index={4}></TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
      <TabPanel value={value} index={6}></TabPanel>
        <div>
        <Button variant="contained" color="primary" type="submit" className={classes.submit}>
          Salvar cadastro
        </Button>
        </div>  
      </form>
    </div>    
    </>
  );
}