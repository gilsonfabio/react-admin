import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import TheatersIcon from '@material-ui/icons/Theaters';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import CancelIcon from '@material-ui/icons/Cancel';
import { useNavigate } from 'react-router-dom';

import bannerCine from '../assets/images/bannerCard1.jpg';

import { Link  } from 'react-router-dom';
import api from '../services/api';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  image: {
    width: '100vw',
    height: '92vh',
  }, 

  iteLink: {
    textDecoration: 'none',
    color: '#111111',
  }

}));

export default function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const [userNome, setUserNome] = useState('');
  const [userCodigo, setUserCodigo] = useState('');

  const codUsuario = localStorage.getItem('usuarioId'); 
  const nomeUsuario = localStorage.getItem('usuarioNome'); 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseApp = () => {
    localStorage.clear();
    navigate(-1); 
  };

  const menu = [
    { name: 'Orgão Admin.', to: '/orgadmin', icon: <PeopleIcon /> },  
    { name: 'Secretarias', to: '/secretarias', icon: <PeopleIcon /> },    
    { name: 'Cargos', to: '/cargos', icon: <TheatersIcon /> },
    { name: 'R.Atividades', to: '/atividades', icon: <AssignmentReturnedIcon /> },
    { name: 'Convênios', to: '/convenios', icon: <AssignmentReturnedIcon /> },
    { name: 'Bairros', to: '/bairros', icon: <AssignmentReturnedIcon /> },
  ];
  const menUser = [
    { name: 'Tipos Contrato', to: '/tipos', icon: <PeopleIcon /> },
    { name: 'Servidores', to: '/servidores', icon: <PeopleIcon /> },
    { name: 'Administradores', to: '/admin', icon: <PeopleIcon /> },    
  ];
  const menAdmin = [
    { name: 'Extrato', to: '/extratos', icon: <PeopleIcon /> },
    { name: 'Vdas Emissão', to: '/vdaemissao', icon: <PeopleIcon /> },    
    { name: 'Vdas Vencimento', to: '/vdavencimento', icon: <AssignmentReturnedIcon /> },    
    { name: 'Extrato Admin', to: '/extAdmin', icon: <AssignmentReturnedIcon /> },   
    { name: 'Compras Servidor', to: '/cmpservidor', icon: <AssignmentReturnedIcon /> },
    { name: 'Vdas Org.Admin', to: '/vdaOrgao', icon: <AssignmentReturnedIcon /> },    
  ];

  useEffect(() => {    
    let idAdm = codUsuario; 
    //console.log('Usuário:', idAdm);   
    api.get(`searchAdmin/${idAdm}`).then(response => {
        setUserCodigo(response.data[0].admId);
        setUserNome(response.data[0].admNome);
    }).catch (err => { 
        alert('Falha no login! Tente novamente.', idAdm)
        localStorage.clear()
        navigate(-1); 
    })        
  },[]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Card Admin - Bem-vindo {nomeUsuario}
          </Typography>          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((menuItem, index) => (
            <Link to ={menuItem.to} passHref className={classes.iteLink}>
              <ListItem button component="a">
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
        {menUser.map((menIteUser, index) => (
            <Link to ={menIteUser.to} passHref className={classes.iteLink}>
              <ListItem button component="a">
                <ListItemIcon>{menIteUser.icon}</ListItemIcon>
                <ListItemText primary={menIteUser.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
        {menAdmin.map((menIteAdmin, index) => (
            <Link to ={menIteAdmin.to} passHref className={classes.iteLink}>
              <ListItem button component="a">
                <ListItemIcon>{menIteAdmin.icon}</ListItemIcon>
                <ListItemText primary={menIteAdmin.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <Button variant="contained" endIcon={<CancelIcon />} onClick={handleCloseApp}>
          Sair
        </Button>  
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          <img src={bannerCine} alt="Banner" className={classes.image}/>   
      </main>
    </div>
  );
}