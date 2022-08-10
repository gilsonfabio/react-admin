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
import { useNavigate } from 'react-router-dom';

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

export default function NewServidor() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const [usrNome, setUsrNome] = useState('');
  const [usrEmail,  setUsrEmail] = useState('');
  const [usrPassword,  setUsrPassword] = useState('');
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
  const [usrCargo,  setUsrCargo] = useState('');
  const [usrCartao,  setUsrCartao] = useState('');
  const [usrConjuge,  setUsrConjuge] = useState('');
  const [usrNasConjuge,  setUsrNasConjuge] = useState('');

  const [secretarias, setSecretarias] = useState([]);
  const [orgaos, setOrgaos] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [seqcartao, setSeqCartao] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const $arr_alfa = ["1828","9283","2837","8374","3746","7465","4650","6502","5029","0291","2918","9183","1837","8374","3746","7465","4653","6539","5391","3918","9182","1827","8274","2745","7456","4568","5682","6821","8211","2191","1918"];
  var nroCartao = '';

  useEffect(() => { 
    api.get(`secretarias`).then(resp => {
      setSecretarias(resp.data);
      
    })
    api.get(`orgaos`).then(res => {
      setOrgaos(res.data);
      
    })
    
    api.get(`parametros`).then(response => {
      setParametros(response.data);
      setSeqCartao(response.data[0].parSeqCartao);

      let newDate = new Date()
      let $_dia = newDate.getDate();
      let parInicial = '8321';
      let parSecundary = $arr_alfa[$_dia];
      let parFinal = parseInt(response.data[0].parSeqCartao);
      let nroCartao = parInicial + parSecundary + parFinal;
      setUsrCartao(nroCartao);
      console.log(response.data[0].parSeqCartao);
      console.log(nroCartao);
    })
   
  },[]);

  function handleCreateServidor(e) {
    e.preventDefault();
    
    api.post('newuser', {
      usrNome,
      usrEmail,
      usrCartao,
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
      usrPassword,
      usrTipContrato,
      usrFonTrabalho,
      usrCargo,
      usrConjuge,
      usrNasConjuge,
    }).then(() => {
        alert('Servidor(a) cadastrado com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
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
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <form onSubmit={handleCreateServidor} > 
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
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cargo"
                label="Cargo"
                name="cargo"
                autoFocus                
                value={usrCargo} 
                onChange={(e) => {setUsrCargo(e.target.value)}} 
            />
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
          </div>
          <div className={classes.right}>
            <TextField 
                className={classes.input}
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