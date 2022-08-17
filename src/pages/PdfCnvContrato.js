import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useParams } from 'react-router-dom';

import api from '../services/api';
import MenBarra from "../components/MenBarra/MenBarra";

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles({
    buttonArea: {
        width: '100vw',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imprimir: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '200px',
    },

    button: {
      marginTop: '300px',
      color: '#fff',
      display: 'block',
      width: '260px',
      height: '45px',
      outline: 'none',
      fontSize: '18px',
      fontWeight: '400',
      borderRadius: '6px',
      cursor: 'pointer',
      flexWrap: 'wrap',
      backgroundColor: '#1f80e0',
      border: '2px solid #1f80e0',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#1f80e0',
        backgroundColor: 'transparent',
      },
    },      

    filtros: {
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '200px',
        marginTop: '100px',
        backgroundColor: '#fff',        
    },
      
    input: {
        height: '100px',
        width: '30px',
        borderRadius: '6px',
        outline: 'none',
        padding: '15px',
        fontFamily: 'Poppins',
        transition: 'all 0.3s ease',
    },
});

function PdfCnvContrato() {
    const [servidores, setServidores] = useState([]);
    const [nomServidor, setNomServidor] = useState('');
    const [identidade, setIdentidade] = useState('');
    const [orgEmissor, setOrgEmissor] = useState('');
    const [cpfServidor, setCpfServidor] = useState('');
    const [matricula, setMatricula] = useState('');
    const [cargo, setCargo] = useState('');
    const [lotacao, setLotacao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [orgaoadm, setOrgAdmin] = useState('');
    const [tipUser, setTipUser] = useState('');

    //const srvId = localStorage.getItem('usuarioId');
    const params = useParams(); 
    const classes = useStyles();

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const dateNow = moment(); 
    const dia = moment().format('DD');
    const mes = moment().format('MMMM');
    const ano = moment().format('YYYY');

    const reportTitle = [
        {
            text: `Contrato Convênio`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45],
        }       
    ];

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        content: [
            {
                text: 'CONTRATO DE CONVÊNIO/AUTORIZAÇÃO DE DESCONTO EM FOLHA DE PAGAMENTO.\n\n',
                style: 'header',
                alignment: 'center',
                fontSize: 15, bold: true,
            },
            {
                text: [
                    'CONTRATO DE CONVÊNIO para utilização do Cartão CALDASCARD que entre si fazem A Associação Cultural, Esportiva e Social',
                    'dos Servidores Públicos Municipais de Caldas Novas e o Servidor Público estável, Comissionado/Contratado adiante qualificado.\n\n',
                    'Por este instrumento que fazem de um lado, como CONTRATADO a Associação Cultural, Esportiva e Social dos Servidores Públicos',
                    ' Municipais de Caldas Novas, do Estado de Goiás, com sede nesta cidade, a Avenida E, Quadra AI 04, Lote 01, Estância Itanhangá I, ',
                    'inscrita no CNPJ sob o nº.: 33458971000139, neste ato representada por sua diretora Financeira ', 
                    {text: 'ROSIMEIRE PEREIRA MARTINS', fontSize: 12, bold: true},
                    ', brasileiro, solteira, servidor público, portador no RG nº.: 3254870, CPF nº.:624.087.801-44 ; ao qual gerenciará a consignação dos filiados do a  ',
                    {text: 'SINDICATO DOS SERVIDORES PÚBLICOS MUNICIPAIS DE CALDAS NOVAS - SINDICALDAS ', fontSize: 12},
                    ', entidade sindical sem fins lucrativos, inscrita no CNPJ sob o número 00.619.564/0001-07, com sede na Av.E, Qd AI 04 LT 01 Estancia Itanhanga I,',
                    ' Cep 75680-368 - Caldas Novas- Goiás, por meio de seu Presidente, nos termos do Estatuto Social e ata de eleição e posse que possam fazer parte ',
                    'integrante do presente instrumento, representado, pelo presidente, senhor ',
                    {text: 'EURÍPEDES ISRAEL DE MORAIS ', fontSize: 12, bold: true},
                    ', brasileiro, casado, servidor público, inscrito no CPF: 228.434.691.04, portador da cédula de identidade nº 1145789 SSP/GO, e de outro lado, ',
                    'como CONTRATANTE, o servidor público municipal, efetivo/não efetivo, e em exercício de cargo comissionado/contratado a seguir qualificado:\n\n',
                ]
            },
            {text: `Nome do Servidor: ${nomServidor}\n\n`, fontsize: 10},
            {text: `Nº Identidade:${identidade} / Orgão Emissor: ${orgEmissor} / Nº CPF: ${cpfServidor} \n\n`, fontsize: 10},
            {text: `Matricula: ${matricula} / Cargo: ${cargo} / Lotação: ${lotacao} / Orgão Adm: ${orgaoadm} \n\n`, fontsize: 10},
            {text: `Endereço: ${endereco} / Bairro: ${bairro} / Cep: ${cep} \n\n`, fontsize: 10},
            {text: `Telefones: ${telefone} \n\n`, fontsize: 10},
            {text: 'Com base nas normas legais vigentes, ajustam e celebram entre si o presente contrato, regendo-se o mesmo pelas cláusulas e condições seguintes:\n\n'},
            {text: [
                    {text: 'Cláusula primeira – ', fontSize: 10, bold: true},
                    'A Associação por meio deste, se obriga a fornecer o Cartão CALDASCARD para operações de crédito nos estabelecimentos conveniados com a Associação Cultural,',
                    'Esportiva e Social dos Servidores Públicos Municipais de Caldas Novas.\n\n',
                    {text: 'Parágrafo 1º', fontSize: 10, bold: true},
                    ': A Associação poderá conferir ao CONTRATANTE um crédito de até 30% (trinta por cento) do salário-bruto, aferido pelo último demonstrativo de pagamento salarial,',
                    'no sistema parcelado e em caso de comprometimento deste percentual, poderá por analise da administradora, conceder mais 15% (quinze por cento) no sistema rotativo',
                    '(uma vez) para compra exclusiva de alimentos, remédios e itens de primeira necessidade, conforme regras do estatuto sindical.\n\n',
                    {text: 'Parágrafo 2º', fontSize: 10, bold: true},
                    ': O CONTRATANTE (servidor público) autoriza o desconto em folha de pagamento, dos valores gastos mensalmente com o Cartão, a serem realizados no mês imediatamente ',
                    'posterior às compras e em caso de exoneração, ', 
                    {text: 'aposentadoria ou desligamento por qualquer motivo, autoriza até 100% (cem por cento) o valor em sua rescisão contratual para a garantia dos valores restantes. \n\n', fontSize: 10, bold: true},
                    {text: 'Assinatura: ____________________________________________________________________________________________________\n\n', fontSize: 10, bold: true},
                    {text: 'Parágrafo 3º', fontSize: 10, bold: true},
                    ': O CONTRATANTE (servidor público) se obriga a manter seus dados atualizados, além de informar imediatamente, por escrito a perda do cartão, solicitando seu bloqueio,',
                    'além de se responsabilizar quanto ao uso correto da senha e o uso do cartão respeitando sempre as regras aqui pactuadas.\n\n',
                    {text: 'Parágrafo 4º', fontSize: 10, bold: true},
                    ': O CONTRATANTE (servidor público), não poderá emprestar seu cartão a terceiros, simular compras sob pena de exclusão do uso do cartão.\n\n',
                    {text: 'Parágrafo 5º', fontSize: 10, bold: true},
                    ': O CONTRATANTE (servidor público), caso não reconheça qualquer compra, deverá se diligenciar até o estabelecimento com o intuito de ',
                    'identificação, entregando contestação ao comercio/serviço e a administradora do cartão. \n\n',  
                    {text: 'Parágrafo 6º', fontSize: 10, bold: true},
                    ': O CONTRATANTE (servidor público) pagará R$ 10,00(dez reais) por cada via do cartão e em caso de extravio a despesas com bloqueios e ',
                    'a confecção de novos cartões ficará a cargo deste. \n\n',
                    {text: 'Parágrafo 7º', fontSize: 10, bold: true},
                    ': O CONTRATANTE (servidor público) em caso de mudança de matrícula funcional, por qualquer motivo, já autoriza a transferência automática dos débitos em sua folha de pagamento.\n\n', 
                    {text: 'Assinatura: ____________________________________________________________________________________________________\n\n', fontSize: 10, bold: true},
                    {text: 'Parágrafo 8º', fontSize: 10, bold: true},
                    ': O CONTRATANTE (servidor público) em caso de não realização de débito em folha por qualquer motivo, faculta-se a dirigir junto a administradora e realizar o pagamento,',
                    'ou autoriza a cobrança em duplicidade para compensação dos valores.\n\n',   
                    {text: 'Assinatura: ____________________________________________________________________________________________________\n\n', fontSize: 10, bold: true},
                    {text: 'Cláusula segunda – ', fontSize: 10, bold: true},
                    'O presente contrato tem seu termo inicial de vigência a partir de sua assinatura por tempo indeterminado ou até a data do último dia do mês de trabalho, ',
                    'em caso de exoneração do cargo exercido pelo servidor e ou descumprimento contratual.\n\n',
                    {text: 'Cláusula terceira – ', fontSize: 10, bold: true},
                    'O presente contrato pode ser rescindido por interesse de qualquer das partes, mediante comunicação escrita, devidamente fundamentada, realizada em período não ',
                    'inferior a 30 (trinta) dias, mantendo os descontos em folha até sua quitação. \n\n',
                    {text: 'Parágrafo único ', fontSize: 10, bold: true},
                    'Sem prejuízo do caput dessa cláusula, o presente instrumento pode ser ainda rescindido de imediato, mediante simples comunicação do CONTRATADO, entregue com comprovação ',
                    'de recebimento, em caso de inadimplência no cumprimento das obrigações pecuniárias assumidas pelo CONTRATANTE, caso em que constatando-se culpa do mesmo, responderá ele, ',
                    'CONTRATANTE, pelas perdas e danos decorrentes da rescisão.\n\n',   
                    {text: 'Cláusula quarta – ', fontSize: 10, bold: true},
                    'A responsabilidade tanto do CONTRATADO como do CONTRATANTE é limitada ao descrito nas cláusulas deste contrato. \n\n',
                    {text: 'Cláusula quinta – ', fontSize: 10, bold: true},
                    'O CONTRATADO não pode transferir todo ou parcialmente o presente instrumento, sem prévio e expresso consentimento da CONTRATANTE. \n\n',
                    {text: 'Cláusula sexta – ', fontSize: 10, bold: true},
                    'As partes acordam que facultará ao CONTRATADO, o direito de realizar a cobrança dos valores devidos e não passíveis de desconto por advento da rescisão do contrato de ',
                    'trabalho em até 100%, através de todos os meios admitidos em direito, obrigando a CONTRATANTE, seus herdeiros e sucessores em caso de saldo insuficiente em sua rescisão.\n\n',
                    {text: 'Parágrafo único', fontSize: 10, bold: true},
                    'Caso haja morte ou incapacidade civil do CONTRATADO, seus sucessores ou representante legal arcarão com os valores devidos na proporção do espólio deixado pelo de cujus.\n\n',
                    {text: 'Cláusula sétima – ', fontSize: 10, bold: true},
                    'O CONTRATANTE reconhece que o cargo em comissão/contrato em que ocupa é de exoneração ad nutum, e que pode ser dispensado a qualquer tempo, por ato próprio do Chefe do ',
                    'Poder Executivo, bem como, em caso de contrato de prestador de serviços, reconhece que o mesmo também pode ser rescindido a qualquer tempo por conveniência e oportunidade da ',
                    'Administração, razão pela qual se compromete, em caso de exoneração ou rescisão contratual, a efetuar os pagamentos de todos os valores devidos a  ASSOCIAÇÃO por advento do',
                    ' uso do CARTÃO CALDASCAR, que por qualquer motivo não puderem ser descontados do instrumento de rescisão, sendo que estes casos a concessão de crédito e parcelas ficara exclusivamente ',
                    'a critério da administradora.\n\n',
                    {text: 'Parágrafo único ', fontSize: 10, bold: true},
                    'O CONTRATANTE reconhece e concorda que fica facultado a administradora, em caso do não pagamento previsto neste contrato, fazer inscrever os dados cadastrais do CONTRATANTE em órgãos ',
                    'de proteção ao crédito, especialmente SPC e SERASA e cartório, independente de qualquer ação judicial ou administrativa.\n\n',
                    {text: 'Cláusula oitava – ', fontSize: 10, bold: true},
                    'Fica estipulada uma multa de 10% (dez por cento), apurada sobre o valor efetivamente devido após a aplicação de atualização monetária (índice INPC/IBGE) juros de 2% ao mês, no caso do ',
                    'não pagamento dos valores devidos após a celebração da rescisão de contrato, sem prejuízo da responsabilidade por perdas e danos, ressalvando-se os casos fortuitos e eventos de força ',
                    'maior, além de honorários advocatícios de 10%.\n\n',
                    {text: 'Cláusula nona – ', fontSize: 10, bold: true},
                    'As partes dão ao presente instrumento o caráter de título executivo extrajudicial, nos termos do art. 585, inciso II, do Código de Processo Civil.\n\n',
                    {text: 'Cláusula décima – ', fontSize: 10, bold: true},
                    'Fica eleito o foro da Comarca de Caldas Novas/GO, para dirimirem as dúvidas provenientes da execução e cumprimento do mesmo, renunciando a qualquer outro',
                    ', por mais especial que se apresente, sendo regido ainda pelo Código Civil e regras estatutárias, tendo em vista que o caráter é de associatividade sem fins lucrativos.\n\n',
                    'E por estarem certos, justos e contratos, firmam o presente em duas vias de igual teor e forma, na presença de duas testemunhas que também assinam.\n\n',
                    `Caldas Novas/GO, ${dia}   de ${mes}     de ${ano}          \n\n\n`,
                    '______________________________________________________________________________\n\n\n',
                    'Rosimeire Pereira Martins – Diretora Financeira da Associação Cultural, Esportiva e Social dos Servidores Públicos Municipais de Caldas Novas.\n\n',
                    '______________________________________________________________________________\n\n\n', 
                    'Contratante-servidor.\n\n',
                    '______________________________________________________________________________\n\n\n', 
                    'Eurípedes Israel de Morais - Presidente do Sindicato dos Servidores Públicos Municipais de Caldas Novas-Sindicaldas.\n\n\n\n\n',
                    'Testemunha 1: _______________________________________ CPF\n\n\n',
                    'Testemunha 2: _______________________________________ CPF\n\n\n',
                    {text: 'Vencimento: _________de ______________de ___________ \n\n\n', fontSize: 12, bold: true, alignment: 'right'},
                    {text: 'Nº _________________                                                                                                   R$:________________________ \n\n\n\n\n\n', fontSize: 12, bold: true},
                    'No dia _    _______ __________________________________________de____________________________________de\n\n\n',
                    '_____________________________ pagar ________ por esta única via de NOTA PROMISSÓRIA a Associação\n\n',
                    {text:'Cultural,   Esportiva   e   Social   dos   Servidores   Públicos   Municipais  de  Caldas  Novas  CPF/CNPJ\n\n', alignment: 'justify'},
                    '33.458.971/0001-39 ou à sua ordem, a quantia de _____________________________________________________\n\n',
                    'em moeda corrente deste país, pagável em ____________________________________________________________\n\n',
                    'Emitente:__________________________________________                       Data de Emissão: ______/______/_______\n\n',
                    'CPF/CNPJ:__________________________________Endereço:________________________________________________\n\n',
                    '_______________________________________________________________________________________________________\n\n\n\n',
                    {text: 'Ass.do emitente__________________________________________\n\n', alignment: 'center'},
                ]
            },                        
        ],
    };
    
    function emitePdf() {
            
        pdfMake.createPdf(docDefinition).open(); 
    };

    useEffect(() => {
        let srvId = params.usrId;
        
        console.log('Servidor:',srvId)

        api.get(`pdfSrvContrato/${srvId}`).then(resp => {
            setServidores(resp.data);
            setNomServidor(resp.data.usrNome); 
            setIdentidade(resp.data.usrIdentidade);
            setOrgEmissor(resp.data.usrOrgEmissor);
            setCpfServidor(resp.data.usrCpf); 
            setMatricula(resp.data.usrMatricula);
            setCargo(resp.data.crgDescricao);
            setLotacao(resp.data.usrTrabalho); 
            setEndereco(resp.data.usrEndereco);  
            setBairro(resp.data.baiDescricao);  
            setCep(resp.data.usrCep);  
            setTelefone(resp.data.usrCelular);
            setOrgAdmin(resp.data.orgDescricao);  
            setTipUser(resp.data.usrTipContrato);  
        })
    },[]);

    return (
        <div>
            <MenBarra />
            <div className={classes.imprimir}>
                <button className={classes.button} type="button" onClick={() => emitePdf()}>
                    <PictureAsPdfIcon /> Abrir Contrato PDF
                </button>
            </div>             
        </div>
    );
}

export default PdfCnvContrato;