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
  const [usrEmail,  setUsrEmail] = useState('');
  const [usrCelular,  setUsrCelular] = useState('');
  const [usrCpf,  setUsrCpf] = useState('');
  const [usrMatricula,  setUsrMatricula] = useState('');
  const [usrSecretaria,  setUsrSecretaria] = useState('');
  const [usrNascimento,  setUsrNascimento] = useState('');
  const [usrTipCadastro,  setUsrTipCadastro] = useState('');
  const [usrIdentidade,  setUsrIdentidade] = useState('');
  const [usrOrgEmissor,  setUsrOrgEmissor] = useState('');
  const [usrEstCivil,  setUsrEstCivil] = useState('');
  const [usrEndereco,  setUsrEndereco] = useState('');
  const [usrBairro,  setUsrBairro] = useState('');
  const [usrCidade,  setUsrCidade] = useState('');
  const [usrEstado,  setUsrEstado] = useState('');
  const [usrCep,  setUsrCep] = useState('');
  const [usrFonResid,  setUsrFonResid] = useState('');
  const [usrTrabalho,  setUsrTrabalho] = useState('');
  const [usrAdmissao,  setUsrAdmissao] = useState('');
  const [usrSalLiquido,  setUsrSalLiquido] = useState('');
  const [usrSalBase, setUsrSalBase] = useState('');
  const [usrSalBruto,  setUsrSalBruto] = useState('');
  const [usrTipContrato,  setUsrTipContrato] = useState('');
  const [usrFonTrabalho,  setUsrFonTrabalho] = useState('');
  const [usrCargo, setUsrCargo] = useState('');
  const [usrConjuge, setUsrConjuge] = useState('');
  const [usrNasConjuge, setUsrNasConjuge] = useState('');
  const [usrObsBloqueio, setUsrObsBloqueio] = useState('');
  const [usrCartao, setUsrCartao] = useState('');
  const [usrPassword, setUsrPassword] = useState('');

  const [secretarias, setSecretarias] = useState([]);
  const [orgaos, setOrgaos] = useState([]);
  const [cargos, setCargos] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => { 
    let idUsr = params.usrId;    
    api.get(`searchUser/${idUsr}`).then(response => {
        setUsrNome(response.data[0].usrNome);
        setUsrEmail(response.data[0].usrEmail);
        setUsrCelular(response.data[0].usrCelular);
        setUsrCpf(response.data[0].usrCpf);
        setUsrMatricula(response.data[0].usrMatricula);
        setUsrSecretaria(response.data[0].usrSecretaria);
        setUsrNascimento(response.data[0].usrNascimento);
        setUsrTipCadastro(response.data[0].usrTipCadastro);
        setUsrIdentidade(response.data[0].usrIdentidade);
        setUsrOrgEmissor(response.data[0].usrOrgEmissor);
        setUsrEstCivil(response.data[0].usrEstCivil);
        setUsrEndereco(response.data[0].usrEndereco);
        setUsrBairro(response.data[0].usrBairro);
        setUsrCidade(response.data[0].usrCidade);
        setUsrEstado(response.data[0].usrEstado);
        setUsrCep(response.data[0].usrCep);
        setUsrFonResid(response.data[0].usrFonResid);
        setUsrTrabalho(response.data[0].usrTrabalho);
        setUsrAdmissao(response.data[0].usrAdmissao);
        setUsrSalLiquido(response.data[0].usrSalLiquido);
        setUsrSalBase(response.data[0].usrSalBase);
        setUsrSalBruto(response.data[0].usrSalBruto);
        setUsrTipContrato(response.data[0].usrTipContrato);
        setUsrFonTrabalho(response.data[0].usrFonTrabalho);
        setUsrCargo(response.data[0].usrCargo);
        setUsrConjuge(response.data[0].usrConjuge);
        setUsrNasConjuge(response.data[0].usrNasConjuge);
        setUsrObsBloqueio(response.data[0].usrObsBloqueio);
    })
     
    api.get(`secretarias`).then(resp => {
      setSecretarias(resp.data);
      
    })
      
    api.get(`orgaos`).then(res => {
      setOrgaos(res.data);
      
    })

    api.get(`cargos`).then(respo => {
      setCargos(respo.data);
      
    })
  },[]);

  function handleUpdServidor(e) {
    e.preventDefault();
    
    let idSrv = params.usrId;
    api.put(`altservidor/${idSrv}`, {
      usrNome,
      usrEmail,
      usrCelular,
      usrCpf,
      usrMatricula,
      usrSecretaria,
      usrNascimento,
      usrTipCadastro,
      usrIdentidade,
      usrOrgEmissor,
      usrEstCivil,
      usrEndereco,
      usrBairro,
      usrCidade,
      usrEstado,
      usrCep,
      usrFonResid,
      usrTrabalho,
      usrAdmissao,
      usrSalLiquido,
      usrSalBase,
      usrSalBruto,
      usrTipContrato,
      usrFonTrabalho,
      usrCargo,
      usrConjuge,
      usrNasConjuge,
      usrObsBloqueio,
    }).then(() => {
        alert('Servidor alterado com sucesso!')
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
        <Tab label="Básicos" {...a11yProps(0)} />
        <Tab label="Endereço" {...a11yProps(1)} />
        <Tab label="Trabalho" {...a11yProps(2)} />
        <Tab label="Operacional" {...a11yProps(3)} />
        <Tab label="        " {...a11yProps(4)} />
        <Tab label="        " {...a11yProps(5)} />
        <Tab label="        " {...a11yProps(6)} />
      </Tabs>
      <form onSubmit={handleUpdServidor} > 
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
              id="email"
              label="Email do Usuário"
              name="email"
              autoFocus                
              value={usrEmail} 
              onChange={(e) => {setUsrEmail(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              type="date"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nascimento"
              label="Nascimento"
              name="nascimento"
              autoFocus                
              value={usrNascimento} 
              onChange={(e) => {setUsrNascimento(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="celular"
              label="Celular"
              name="celular"
              autoFocus                
              value={usrCelular} 
              onChange={(e) => {setUsrCelular(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="tipcadastro"
              label="Tipo de Cadastro"
              name="tipcadastro"
              autoFocus                
              value={usrTipCadastro} 
              onChange={(e) => {setUsrTipCadastro(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="conjuge"
                label="Conjuge"
                name="conjuge"
                autoFocus                
                value={usrConjuge} 
                onChange={(e) => {setUsrConjuge(e.target.value)}} 
            />
          </div>
          <div className={classes.right}>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoFocus                
                value={usrCpf} 
                onChange={(e) => {setUsrCpf(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="identidade"
                label="Identidade"
                name="identidade"
                autoFocus                
                value={usrIdentidade} 
                onChange={(e) => {setUsrIdentidade(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="orgemissor"
                label="Orgão Emissor"
                name="orgemissor"
                autoFocus                
                value={usrOrgEmissor} 
                onChange={(e) => {setUsrOrgEmissor(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="estadocivil"
                label="Estado Civil"
                name="estadocivil"
                autoFocus                
                value={usrEstCivil} 
                onChange={(e) => {setUsrEstCivil(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                type="date"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nasconjuge"
                label="Nascimento Conjuge"
                name="nasconjuge"
                autoFocus                
                value={usrNasConjuge} 
                onChange={(e) => {setUsrNasConjuge(e.target.value)}} 
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
              label="Endereço"
              name="endereco"
              autoFocus                
              value={usrEndereco} 
              onChange={(e) => {setUsrEndereco(e.target.value)}} 
            />            
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cidade"
              label="Cidade"
              name="cidade"
              autoFocus                
              value={usrCidade} 
              onChange={(e) => {setUsrCidade(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Cep"
              label="CEP"
              name="cep"
              autoFocus                
              value={usrCep} 
              onChange={(e) => {setUsrCep(e.target.value)}} 
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
              label="Bairro"
              name="bairro"
              autoFocus                
              value={usrBairro} 
              onChange={(e) => {setUsrBairro(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="estado"
              label="Estado"
              name="estado"
              autoFocus                
              value={usrEstado} 
              onChange={(e) => {setUsrEstado(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fonResidencial"
                label="Fone Residencial"
                name="fonResidencial"
                autoFocus                
                value={usrFonResid} 
                onChange={(e) => {setUsrFonResid(e.target.value)}} 
            />            
          </div>
        </div>  
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className={classes.dados}>
          <div className={classes.left}>
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="matricula"
              label="Matricula"
              name="matricula"
              autoFocus                
              value={usrMatricula} 
              onChange={(e) => {setUsrMatricula(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="trabalho"
              label="Trabalho"
              name="trabalho"
              autoFocus                
              value={usrTrabalho} 
              onChange={(e) => {setUsrTrabalho(e.target.value)}} 
            />
            <Select 
                className={classes.select}
                variant="outlined"
                label="Secretaria"
                labelId="Secretaria" 
                id="secretaria" 
                value={usrSecretaria} 
                onChange={(e) => {setUsrSecretaria(e.target.value)}}                 
            >
              {secretarias.map((row) => (
                <MenuItem key={row.secId} value={row.secId}>{row.secDescricao}</MenuItem>
              ))}
            </Select>
            <TextField 
              className={classes.input}
              type="date"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="admissao"
              label="Data Admissao"
              name="admissao"
              autoFocus                
              value={usrAdmissao} 
              onChange={(e) => {setUsrAdmissao(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="salarioliq"
              label="Salario Liquido"
              name="salarioliq"
              autoFocus                
              value={usrSalLiquido} 
              onChange={(e) => {setUsrSalLiquido(e.target.value)}} 
            />
          </div>
          <div className={classes.right}>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="tipContrato"
                label="Tipo de Contrato"
                name="tipContrato"
                autoFocus                
                value={usrTipContrato} 
                onChange={(e) => {setUsrTipContrato(e.target.value)}} 
            />
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="foneTrabalho"
              label="Fone do Trabalho"
              name="fonTrabalho"
              autoFocus                
              value={usrFonTrabalho} 
              onChange={(e) => {setUsrFonTrabalho(e.target.value)}} 
            />                     
            <Select 
                className={classes.select}
                variant="outlined"
                label="Cargo"
                labelId="Cargo" 
                id="cargo" 
                value={usrCargo} 
                onChange={(e) => {setUsrCargo(e.target.value)}}                 
            >
              {cargos.map((row) => (
                <MenuItem key={row.crgId} value={row.crgId}>{row.crgDescricao}</MenuItem>
              ))}
            </Select>
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="salariobruto"
                label="Salario Bruto"
                name="salariobruto"
                autoFocus                
                value={usrSalBruto} 
                onChange={(e) => {setUsrSalBruto(e.target.value)}} 
            />  
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="salariobase"
                label="Salario Base"
                name="salariobase"
                autoFocus                
                value={usrSalBase} 
                onChange={(e) => {setUsrSalBase(e.target.value)}} 
            />          
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div className={classes.dados}>
          <div className={classes.left}>
            <TextField 
              className={classes.input}
              disabled="true"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cartao"
              label="Cartão Servidor"
              name="cartao"
              autoFocus                
              value={usrCartao} 
              onChange={(e) => {setUsrCartao(e.target.value)}} 
            />   
            <TextField 
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="obsbloqueio"
              label="Observação de Bloqueio"
              name="obsbloqueio"
              autoFocus                
              value={usrObsBloqueio} 
              onChange={(e) => {setUsrObsBloqueio(e.target.value)}} 
            />            
          </div>
          <div className={classes.right}>
            <TextField 
                className={classes.input}
                disabled="true"
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Senha Servidor"
                name="password"
                autoFocus                
                value={usrPassword} 
                onChange={(e) => {setUsrPassword(e.target.value)}} 
            />
          </div>
        </div>
      </TabPanel>
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