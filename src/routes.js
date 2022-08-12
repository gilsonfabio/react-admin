import React from 'react';
import { Routes, Route }  from 'react-router-dom';

import Login from './pages/Login';
import Layout from './pages/Layout';
import Users from './pages/Users';
import NewUser from './pages/NewUser';
import AltUser from './pages/AltUser';
import Admin from './pages/Administradores';
import NewAdmin from './pages/NewAdmin';
import AltAdmin from './pages/AltAdmin';

import Secretarias from './pages/Secretarias';
import AltSecretaria from './pages/AltSecretaria';
import NewSecretaria from './pages/NewSecretaria';

import Atividades from './pages/Atividades';
import AltAtividade from './pages/AltAtividade';
import NewAtividade from './pages/NewAtividade';

import Convenios from './pages/Convenios';
import AltConvenio from './pages/AltConvenio';
import NewConvenio from './pages/NewConvenio';

import OrgAdmin from './pages/OrgAdmin';
import AltOrgAdmin from './pages/AltOrgAdmin';
import NewOrgAdmin from './pages/NewOrgAdmin';

import Cargos from './pages/Cargos';
import AltCargo from './pages/AltCargo';
import NewCargo from './pages/NewCargo';

import Servidores from './pages/Servidores';
import AltServidor from './pages/AltServidores';
import NewServidor from './pages/NewServidor';

import Filiacao from './pages/Filiacao';
import Informacoes from './pages/Informacoes';
import NewFiliacao from './pages/NewFiliacao';
import AltFiliacao from './pages/AltFiliacao';
import AltInformacao from './pages/AltInformacao';
import NewInformacao from './pages/NewInformacao';

import ForgotPassword from './pages/ForgotPassword';

import Extratos from './pages/Compras';
import PdfCmpVenc from './pages/PdfCmpVenc';
import ExtAdmin from './pages/ExtAdmin';
import PdfExtConv from './pages/PdfExtConv';
import StaCartao from './pages/StaCartao';
import ImpFicha from './pages/ImpFicha';
import PdfCnvContrato from './pages/PdfCnvContrato';

export default function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/layout" element={<Layout />} />  
            <Route path="/users" element={<Users />} /> 
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            <Route path="/newuser" element={<NewUser />} />
            <Route path="/altuser/:usrId" element={<AltUser/>} />
            <Route path="/admin" element={<Admin />} />   
            <Route path="/newadmin" element={<NewAdmin />} />
            <Route path="/altadmin" element={<AltAdmin />} />

            <Route path="/secretarias" element={<Secretarias />} />
            <Route path="/altsecretaria/:secId" element={<AltSecretaria />} />
            <Route path="/newsecretaria" element={<NewSecretaria />} />

            <Route path="/atividades" element={<Atividades />} />
            <Route path="/altAtividade/:atvId" element={<AltAtividade />} />
            <Route path="/newatividade" element={<NewAtividade />} />

            <Route path="/convenios" element={<Convenios />} />
            <Route path="/altconvenio/:cnvId" element={<AltConvenio />} />
            <Route path="/newconvenio" element={<NewConvenio />} />

            <Route path="/orgadmin" element={<OrgAdmin />} />
            <Route path="/altorgadmin/:orgId" element={<AltOrgAdmin />} />
            <Route path="/neworgadmin" element={<NewOrgAdmin />} />

            <Route path="/cargos" element={<Cargos />} />
            <Route path="/altcargo/:crgId" element={<AltCargo />} />
            <Route path="/newcargo" element={<NewCargo />} />

            <Route path="/servidores" element={<Servidores />} />
            <Route path="/altservidor/:usrId" element={<AltServidor/>} />
            <Route path="/newservidor" element={<NewServidor/>} />

            <Route path="/filiacao/:usrId" element={<Filiacao/>} />
            <Route path="/informacoes/:usrId" element={<Informacoes/>} />
            <Route path="/newinformacao/:usrId" element={<NewInformacao/>} />
            <Route path="/newfiliacao/:usrId" element={<NewFiliacao/>} />
            <Route path="/altfiliacao/:filUsrId/:filId" element={<AltFiliacao/>} />
            <Route path="/altfinformacao/:infUsrId/:infId" element={<AltInformacao/>} />

            <Route path="/extratos" element={<Extratos/>} />
            <Route path="/pdfCmpVenc/:datVencto/" element={<PdfCmpVenc />} />
            <Route path="/extAdmin/" element={<ExtAdmin />} />
            <Route path="/pdfExtConv/:datVencto/" element={<PdfExtConv />} />
            <Route path="/stacartao/:usrId" element={<StaCartao/>} />
            <Route path="/impficha/:usrId" element={<ImpFicha/>} />
            <Route path="/pdfcnvcontrato/:usrId" element={<PdfCnvContrato/>} />

        </Routes>        
    )
}
